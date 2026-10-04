import { test } from "node:test";
import assert from "node:assert/strict";
import { DOMAIN_COLUMNS } from "../src/components/sandbox/mockData.js";
import {
  answerSecurityQuestion,
  createInitialEmailState,
  createInitialState,
  createInitialWebState,
  emailSandboxReducer,
  filterTraffic,
  isIncoming,
  matchesFolder,
  matchesSearch,
  sandboxReducer,
  THREAT_CATEGORIES,
  webSandboxReducer,
} from "../src/components/sandbox/sandboxState.js";
const reduce = (state, type, args = {}) =>
  sandboxReducer(state, { type, ...args });

test("Pricing email and web sandboxes keep their state and attacks separate", () => {
  let email = createInitialEmailState();
  let web = createInitialWebState();
  assert.ok(!("websoc" in email));
  assert.ok(!("emails" in web));
  assert.equal(emailSandboxReducer(email, { type: "MODE", mode: "websoc" }), email);

  email = emailSandboxReducer(email, { type: "MODE", mode: "webmail" });
  email = emailSandboxReducer(email, { type: "ATTACK" });
  assert.equal(email.mode, "webmail");
  assert.equal(email.emails.length, createInitialEmailState().emails.length + 2);
  assert.ok(!("websoc" in email));
  assert.equal(web.websoc.underAttack, false);

  web = webSandboxReducer(web, { type: "ATTACK" });
  assert.equal(web.websoc.underAttack, true);
  assert.ok(!("emails" in web));
  assert.equal(webSandboxReducer(web, { type: "MODE", mode: "cmc" }), web);
  web = webSandboxReducer(web, { type: "RESET" });
  assert.equal(web.websoc.underAttack, false);
  assert.equal(email.mode, "webmail");
});

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

import { createInitialServerState, serverSandboxReducer } from '../src/components/sandbox/sandboxState.js';
import { deriveProtectionState } from '../src/components/sandbox/server/core-protection-state.mjs';
const serverReduce = (state, type, args = {}) => serverSandboxReducer(state, { type, ...args });
const policyMutation = (state, mutation) => serverReduce(state, 'SERVER_POLICY_MUTATE', { mutation });

test('Server baseline has three servers, nine functional engines, incidents, responses, and active protection', () => {
  const state = createInitialServerState();
  assert.equal(state.server.servers.length, 3);
  assert.deepEqual(state.server.sensors.map(row => row.sensor), ['guard', 'hostsensor', 'inventory', 'fim', 'sca', 'yarax', 'crowdsec', 'falco', 'suricata']);
  assert.ok(state.server.sensors.every(row => row.state === 'HEALTHY' && row.details.functional_state === 'FUNCTIONAL'));
  assert.equal(state.server.incidents.length, 3);
  assert.equal(state.server.responses[0].status, 'APPLIED');
  assert.deepEqual(state.server.responses[0].ports, [22, 6443]);
  assert.equal(deriveProtectionState(state.server.sensors, state.server.provisioning, state.server.now).protection, 'ACTIVE');
  assert.equal(state.server.inventory.length, 6);
  assert.ok(state.server.postureChecks.some(row => row.status === 'failed'));
});

test('Server attack adds a correlated incident, protected-port response, telemetry, and toast without mutating fixtures', () => {
  const initial = createInitialServerState();
  const state = serverReduce(initial, 'ATTACK');
  assert.equal(state.server.incidents.length, initial.server.incidents.length + 1);
  assert.equal(state.server.responses.length, initial.server.responses.length + 1);
  assert.equal(state.server.events.length, initial.server.events.length + 1);
  assert.equal(state.server.incidents[0].summary, 'crowdsecurity/ssh-bf');
  assert.equal(state.server.incidents[0].sourceIP, '198.51.100.42');
  assert.equal(state.server.responses[0].action, 'deny_source_ip_protected_ports');
  assert.equal(state.server.responses[0].status, 'APPLIED');
  assert.equal(Date.parse(state.server.responses[0].expiresAt) - state.server.now, 900000);
  assert.equal(state.server.events[0].incidentId, state.server.incidents[0].id);
  assert.match(state.toast.title, /CrowdSec auto-blocked 198\.51\.100\.42/);
  assert.deepEqual(initial, createInitialServerState());
});

test('Server policy validates modes and CIDR conflicts, and moves trusted sources atomically', () => {
  const initial = createInitialServerState();
  let state = policyMutation(initial, { action: 'set_mode', mode: 'shadow' });
  assert.equal(state.server.policy.policy.response.mode, 'shadow');
  state = policyMutation(state, { action: 'add_trusted', cidr: '172.16.0.0/16', description: 'Operations' });
  assert.ok(state.server.policy.trusted_ips.some(row => row.cidr === '172.16.0.0/16'));
  state = policyMutation(state, { action: 'move_trusted_to_block', cidr: '172.16.0.0/16', reason: 'Compromised network' });
  assert.ok(!state.server.policy.trusted_ips.some(row => row.cidr === '172.16.0.0/16'));
  assert.ok(state.server.policy.explicit_blocks.some(row => row.cidr === '172.16.0.0/16'));
  for (const mutation of [
    { action: 'add_block', cidr: '10.12.0.0/16', reason: 'Conflicting' },
    { action: 'add_trusted', cidr: '999.1.2.3' },
    { action: 'set_mode', mode: 'invalid' },
    { action: 'move_trusted_to_block', cidr: '10.0.0.0/8', reason: '' },
  ]) {
    const invalid = policyMutation(state, mutation);
    assert.deepEqual(invalid.server, state.server);
    assert.equal(invalid.toast.type, 'critical');
  }
  assert.deepEqual(initial, createInitialServerState());
});

test('Incident actions, all policy controls, server switching, and token expiry persist locally', () => {
  let state = serverReduce(createInitialServerState(), 'SERVER_INCIDENT_STATUS', { id: 'inc-01', status: 'RESOLVED' });
  assert.equal(state.server.incidents[0].status, 'RESOLVED');
  state = policyMutation(state, { action: 'set_sensor', sensor: 'falco', enabled: false });
  assert.equal(state.server.sensors.find(row => row.sensor === 'falco').state, 'DISABLED');
  state = policyMutation(state, { action: 'set_suricata_interface', interface: 'ens4' });
  assert.equal(state.server.policy.policy.suricata.interface, 'ens4');
  state = policyMutation(state, { action: 'add_block', cidr: '198.51.100.99/32', reason: 'Manual' });
  state = policyMutation(state, { action: 'remove_block', cidr: '198.51.100.99/32' });
  assert.ok(!state.server.policy.explicit_blocks.some(row => row.cidr === '198.51.100.99/32'));
  state = policyMutation(state, { action: 'remove_trusted', cidr: '192.168.1.0/24' });
  assert.equal(state.server.policy.trusted_ips.length, 1);
  state = serverReduce(state, 'SERVER_SELECT_AGENT', { id: 'srv-worker' });
  assert.equal(state.server.incidents[0].status, 'OPEN');
  assert.equal(state.server.policy.trusted_ips.length, 2);
  state = serverReduce(state, 'SERVER_SELECT_AGENT', { id: 'srv-api' });
  assert.equal(state.server.incidents[0].status, 'RESOLVED');
  assert.equal(state.server.policy.trusted_ips.length, 1);
  assert.equal(state.server.sensors.find(row => row.sensor === 'falco').state, 'DISABLED');
  state = serverReduce(state, 'SERVER_GENERATE_TOKEN', { id: 'srv-db', purpose: 'INITIAL', token: 'demo-secret' });
  const first = state.server.enrollmentLocators['srv-db'];
  assert.equal(Date.parse(first.expires_at) - state.server.now, 600000);
  assert.equal(first.single_use, true);
  state = serverReduce(state, 'SERVER_GENERATE_TOKEN', { id: 'srv-db', purpose: 'INITIAL', token: 'replacement-secret' });
  assert.notEqual(state.server.enrollmentLocators['srv-db'].locator, first.locator);
  state = serverReduce(state, 'SERVER_GENERATE_TOKEN', { id: 'srv-api', purpose: 'REENROLL' });
  assert.equal(state.server.enrollmentLocators['srv-api'].purpose, 'REENROLL');
  state = serverReduce(state, 'SERVER_HEARTBEAT', { now: state.server.now + 1000000 });
  assert.ok(state.server.responses.every(row => row.status === 'COMPLETE'));
});

test('Server reset restores pristine state and sequence while incrementing the stage remount version', () => {
  let state = createInitialServerState();
  state = serverReduce(state, 'ATTACK');
  state = policyMutation(state, { action: 'set_mode', mode: 'observe' });
  state = serverReduce(state, 'SERVER_SET_VIEW', { view: 'fleet' });
  state = serverReduce(state, 'SERVER_GENERATE_TOKEN', { id: 'srv-db', purpose: 'INITIAL' });
  state = serverReduce(state, 'RESET');
  assert.deepEqual(state, { ...createInitialServerState(), resetVersion: 1 });
  assert.equal(state.server.sequence, 0);
});

test('Server state and mutations remain isolated from Email and WebSOC state', () => {
  const email = createInitialEmailState();
  const web = createInitialWebState();
  let server = createInitialServerState();
  assert.ok(!('emails' in server) && !('websoc' in server));
  assert.ok(!('server' in email) && !('server' in web));
  for (const action of [ { type: 'SERVER_SET_TAB', tab: 'policy' }, { type: 'SERVER_POLICY_MUTATE', mutation: { action: 'set_mode', mode: 'observe' } } ]) {
    assert.deepEqual(emailSandboxReducer(email, action), email);
    assert.equal(webSandboxReducer(web, action), web);
  }
  assert.equal(serverSandboxReducer(server, { type: 'WEBSOC_TOPUP', amount: 10 }), server);
  assert.equal(serverSandboxReducer(server, { type: 'MODE', mode: 'webmail' }), server);
  server = serverReduce(server, 'ATTACK');
  assert.deepEqual(email, createInitialEmailState());
  assert.deepEqual(web, createInitialWebState());
  assert.equal(server.server.incidents.length, 4);
});
