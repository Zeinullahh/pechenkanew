import { test } from "node:test";
import assert from "node:assert/strict";
import { DOMAIN_COLUMNS } from "../src/components/sandbox/mockData.js";
import {
  answerSecurityQuestion,
  createInitialState,
  filterTraffic,
  isIncoming,
  matchesFolder,
  matchesSearch,
  sandboxReducer,
  THREAT_CATEGORIES,
} from "../src/components/sandbox/sandboxState.js";
const reduce = (state, type, args = {}) =>
  sandboxReducer(state, { type, ...args });

test("every reference domain and sender has real local drilldown data in both directions", () => {
  const state = createInitialState();
  assert.equal(DOMAIN_COLUMNS.length, 6);
  for (const column of DOMAIN_COLUMNS) {
    assert.equal(column.length, 7);
    for (const { domain, users } of column) {
      assert.ok(
        filterTraffic(state.emails).some((e) =>
          e.senderEmail.endsWith(`@${domain}`),
        ),
      );
      assert.ok(
        filterTraffic(state.emails, { direction: "outgoing" }).some((e) =>
          e.recipient.endsWith(`@${domain}`),
        ),
      );
      for (const user of users)
        assert.ok(
          state.emails.some((e) => e.senderEmail === `${user}@${domain}`),
        );
    }
  }
});

test("CMC selection opens the exact email, folder, and recipient in Webmail", () => {
  let state = createInitialState();
  state = reduce(state, "SEARCH", { query: "unrelated" });
  state = reduce(state, "OPEN", { id: "em-malware-03", fromCmc: true });
  assert.equal(state.mode, "webmail");
  assert.equal(state.selectedEmailId, "em-malware-03");
  assert.equal(state.folder, "malware");
  assert.equal(state.search, "");
  assert.ok(state.emails.find((e) => e.id === state.selectedEmailId).isRead);
});

test("both attack types appear in quarantine and the five-category CMC grid; purge removes every copy and audits once", () => {
  let state = createInitialState();
  const baseline = state.emails.filter(
    (e) => isIncoming(e) && e.threatType !== "secure",
  ).length;
  for (const expectedType of ["phishing", "malware"]) {
    state = reduce(state, "ATTACK");
    const attack = state.emails[0];
    assert.equal(attack.threatType, expectedType);
    assert.equal(
      state.emails.filter((e) => isIncoming(e) && e.threatType !== "secure")
        .length,
      baseline + 2,
    );
    assert.ok(THREAT_CATEGORIES.some((category) => category.matches(attack)));
    assert.ok(matchesFolder(attack, expectedType));
    const logsBefore = state.logs.length;
    state = reduce(state, "PURGE", { id: attack.id });
    assert.ok(!state.emails.some((e) => e.campaignId === attack.campaignId));
    assert.equal(state.logs.length, logsBefore + 1);
    assert.match(state.logs[0].detail, /2 domain mailboxes/);
    assert.equal(
      state.emails.filter((e) => isIncoming(e) && e.threatType !== "secure")
        .length,
      baseline,
    );
    assert.equal(reduce(state, "PURGE", { id: attack.id }), state);
  }
});

test("time and sender/subject filters affect actual traffic, including an empty result", () => {
  const state = createInitialState();
  const short = filterTraffic(state.emails, { hours: 1 });
  assert.ok(short.length < filterTraffic(state.emails).length);
  assert.ok(short.every((e) => Date.parse(e.timestamp) >= state.now - 3600000));
  assert.equal(
    filterTraffic(state.emails, { from: "nonexistent.invalid" }).length,
    0,
  );
  const exact = filterTraffic(state.emails, {
    from: "invoicing@apex",
    subject: "overdue",
    start: "2026-09-20T09:00:00Z",
    end: "2026-09-20T10:00:00Z",
  });
  assert.deepEqual(
    exact.map((e) => e.id),
    ["em-malware-03"],
  );
});

test("mail actions persist across tabs; drafts, replies, scheduled messages, and trash have distinct membership", () => {
  let state = createInitialState();
  state = reduce(state, "STAR", { id: "em-link-02" });
  state = reduce(state, "MODE", { mode: "cmc" });
  state = reduce(state, "MODE", { mode: "webmail" });
  assert.ok(
    matchesFolder(
      state.emails.find((e) => e.id === "em-link-02"),
      "important",
    ),
  );
  state = reduce(state, "GENERATE_REPLY", { id: "em-clean-04" });
  state = reduce(state, "EDIT_REPLY", {
    id: "em-clean-04",
    body: "Thanks, reviewed.",
  });
  state = reduce(state, "SEND_REPLY", { id: "em-clean-04" });
  assert.equal(state.emails[0].body, "Thanks, reviewed.");
  assert.ok(matchesFolder(state.emails[0], "sent"));
  assert.ok(
    matchesFolder(
      state.emails.find((e) => e.id === "em-clean-04"),
      "auto-responded",
    ),
  );
  for (const folder of ["drafts", "scheduled"]) {
    state = reduce(state, "COMPOSE", {
      email: {
        recipient: "team@example.com",
        subject: folder,
        body: "Local mail",
        folder,
        scheduledAt: "2026-09-21T09:00:00Z",
      },
    });
    assert.ok(matchesFolder(state.emails[0], folder));
    assert.ok(!matchesFolder(state.emails[0], "unfiltered"));
  }
  const scheduled = state.emails[0];
  state = reduce(state, "SEND_SCHEDULED", { id: scheduled.id });
  assert.ok(matchesFolder(state.emails[0], "sent"));
  state = reduce(state, "TRASH", { id: "em-malware-03" });
  assert.ok(!filterTraffic(state.emails).some((e) => e.id === "em-malware-03"));
  state = reduce(state, "RESTORE", { id: "em-malware-03" });
  assert.ok(filterTraffic(state.emails).some((e) => e.id === "em-malware-03"));
});

test("hash search and incident chat tolerate incomplete attachment metadata and use current incidents", () => {
  const state = createInitialState();
  const email = state.emails.find((e) => e.id === "em-malware-03");
  assert.ok(
    matchesSearch(
      email,
      email.securityAnalysis.attachments[0].sha256.slice(0, 20),
    ),
  );
  assert.match(
    answerSecurityQuestion(
      "Inspect attachment hash",
      email,
      state.emails,
      state.logs,
    ),
    /SHA-256/,
  );
  assert.match(
    answerSecurityQuestion(
      "Is this invoice legitimate?",
      email,
      state.emails,
      state.logs,
    ),
    /Malware/,
  );
  assert.match(
    answerSecurityQuestion(
      "quarantine summary",
      null,
      state.emails,
      state.logs,
    ),
    /5 quarantined/,
  );
  assert.doesNotThrow(() =>
    matchesSearch(
      { ...email, securityAnalysis: { attachments: [null, {}] } },
      "hash",
    ),
  );
});

test("reset restores a pristine fixture and all shared UI state after arbitrary changes", () => {
  const initial = createInitialState();
  let state = reduce(initial, "ATTACK");
  state = reduce(state, "PURGE", { id: "em-phish-01" });
  state = reduce(state, "FOLDER", { folder: "trash" });
  state = reduce(state, "SEARCH", { query: "invoice" });
  state = reduce(state, "ADD_FOLDER", { name: "Investigation" });
  state = reduce(state, "RESET");
  assert.deepEqual(state, { ...createInitialState(), resetVersion: 1 });
  assert.deepEqual(initial, createInitialState());
});

test("WebSOC state actions support parameter change, themes, blacklist, agents, and attack simulation", () => {
  let state = createInitialState();
  assert.ok(state.websoc);
  assert.equal(state.websoc.agents.length, 4);
  assert.equal(state.websoc.selectedParam, "Bandwidth");
  assert.equal(state.websoc.theme, "primary");
  assert.ok(state.websoc.blacklist.includes("KP"));

  // Change parameter & theme
  state = reduce(state, "WEBSOC_PARAM", { param: "RPS" });
  assert.equal(state.websoc.selectedParam, "RPS");

  state = reduce(state, "WEBSOC_THEME", { theme: "emerald" });
  assert.equal(state.websoc.theme, "emerald");

  // Blacklist addition & removal
  state = reduce(state, "WEBSOC_BLACKLIST_ADD", { code: "FR" });
  assert.ok(state.websoc.blacklist.includes("FR"));

  state = reduce(state, "WEBSOC_BLACKLIST_REMOVE", { code: "FR" });
  assert.ok(!state.websoc.blacklist.includes("FR"));

  // Agent registration, verification, config update, deletion
  state = reduce(state, "WEBSOC_ADD_AGENT", {
    domain: "test.silenceai.net",
    ipAddress: "10.0.0.1",
  });
  const newAgent = state.websoc.agents.find((a) => a.domain === "test.silenceai.net");
  assert.ok(newAgent);

  state = reduce(state, "WEBSOC_UPDATE_AGENT_CONFIG", {
    id: newAgent.id,
    ports: [80, 443, 8080],
    enable2FA: true,
  });
  const updatedAgent = state.websoc.agents.find((a) => a.id === newAgent.id);
  assert.deepEqual(updatedAgent.ports, [80, 443, 8080]);
  assert.equal(updatedAgent.enable2FA, true);

  state = reduce(state, "WEBSOC_DELETE_AGENT", {
    id: newAgent.id,
    domain: newAgent.domain,
  });
  assert.ok(!state.websoc.agents.some((a) => a.id === newAgent.id));

  // Attack simulation in WebSOC
  state = reduce(state, "ATTACK");
  assert.equal(state.websoc.underAttack, true);
  assert.ok(state.websoc.anomalyMsg.includes("4,850 RPS"));
  assert.equal(state.websoc.topCountries[0].code, "RU");
  assert.equal(state.websoc.topCountries[0].requestsPerSecond, 4850);

  // Top up balance
  state = reduce(state, "WEBSOC_TOPUP", { amount: 50 });
  assert.equal(state.websoc.userBalance, 1300);
  assert.equal(state.websoc.paymentHistory[0].amount, "$50.00");

  // Dismiss anomaly
  state = reduce(state, "WEBSOC_DISMISS_ANOMALY");
  assert.equal(state.websoc.anomalyMsg, null);
});

