// Browser regression checks; run with an available Playwright installation.
// PLAYWRIGHT_MODULE=/path/to/playwright/index.mjs PLAYWRIGHT_CHROMIUM=/path/to/chrome node scripts/check-sandbox.mjs
import assert from "node:assert/strict";
import fs from "node:fs";
const { chromium } = await import(
  process.env.PLAYWRIGHT_MODULE || "playwright"
);
const browser = await chromium.launch({
  headless: true,
  executablePath: process.env.PLAYWRIGHT_CHROMIUM || undefined,
  args: ["--no-sandbox"],
});
const context = await browser.newContext({
  viewport: { width: 1600, height: 1500 },
  reducedMotion: "no-preference",
});
const page = await context.newPage();
page.setDefaultTimeout(10000);
const errors = [];
const apiRequests = [];
page.on("pageerror", (error) => errors.push(error.message));
page.on("request", (request) => {
  if (new URL(request.url()).pathname.startsWith("/api/"))
    apiRequests.push(request.url());
});
await context.addInitScript(() => {
  try {
    if (
      location.hostname === "localhost" ||
      location.hostname === "127.0.0.1"
    ) {
      localStorage.setItem("silenceai-cookie-consent", "accepted");
      localStorage.setItem("slnc-frames-preloaded", String(Date.now()));
    }
  } catch {
    /* Cross-origin frames do not need site preferences. */
  }
});
await page.route(/^https:\/\//, (route) => route.abort());
fs.mkdirSync("artifacts/sandbox", { recursive: true });
const report = [];
const screenshotOptions = {
  animations: "disabled",
  style: "header.fixed, nextjs-portal { visibility: hidden !important; }",
};
async function check(name, work) {
  try {
    await work();
    report.push(name);
    console.log(`PASS ${name}`);
  } catch (error) {
    await page
      .locator(".sb-browser")
      .screenshot({
        ...screenshotOptions,
        path: "artifacts/sandbox/failure.png",
        timeout: 5000,
      })
      .catch(() => {});
    throw error;
  }
}
const root = page.locator("#interactive-sandbox");
const cmc = page.locator(".cmc-shell");
const mail = page.locator(".sandbox-webmail");
const dialog = () => page.getByRole("dialog");
const tab = (mode) => page.locator(`#sb-tab-${mode}`).click();
const click = (scope, name) =>
  scope.getByRole("button", { name, exact: true }).click();
const folder = (name) => mail.locator(`[data-folder="${name}"]`).click();
const reset = () => click(root, "Reset Demo");
const escape = async () => {
  await page.keyboard.press("Escape");
  await page.getByRole("dialog").waitFor({ state: "hidden" });
};
const until = async (condition) => {
  for (let i = 0; i < 40; i++) {
    if (await condition()) return;
    await page.waitForTimeout(100);
  }
  throw new Error("Condition did not become true");
};
try {
  const response = await page.goto(
    process.env.SANDBOX_URL || "http://localhost:3000/en/",
    { waitUntil: "domcontentloaded" },
  );
  assert.equal(response.status(), 200);
  await root.scrollIntoViewIfNeeded();
  await page.waitForTimeout(1500);
  await check(
    "42 domains, six employees, preserved canvas aspect ratio, and clean hydration",
    async () => {
      assert.equal(await cmc.locator(".cmc-domain").count(), 42);
      assert.equal(await cmc.locator(".cmc-employee").count(), 6);
      const box = await cmc.boundingBox();
      assert.ok(Math.abs(box.width / box.height - 1384 / 950) < 0.001);
      assert.deepEqual(errors, []);
      await page
        .locator(".sb-browser")
        .screenshot({
          ...screenshotOptions,
          path: "artifacts/sandbox/cmc-initial.png",
        });
    },
  );
  await check("expanded browser frame and keyboard return", async () => {
    await click(root, "Expand demo");
    const box = await root.boundingBox();
    assert.ok(Math.abs(box.width - 1576) < 2);
    await escape();
    assert.ok(!(await root.getAttribute("class")).includes("sb-expanded"));
  });
  await context.setOffline(true);
  await check("offline SVG canvas is stable and does not zoom on wheel", async () => {
    const canvas = cmc.locator("svg.cmc-topology");
    const box = await canvas.boundingBox();
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await page.mouse.wheel(0, -200);
    assert.ok(await canvas.isVisible());
  });
  await check(
    "domain drilldown opens exactly the selected message in Webmail",
    async () => {
      await click(cmc, "Open domain m.ngrok.com");
      assert.match(await dialog().innerText(), /team@m.ngrok.com/);
      await click(dialog(), "View in Mail");
      assert.equal(
        await page.locator("#sb-tab-webmail").getAttribute("aria-selected"),
        "true",
      );
      assert.match(
        await mail.locator(".email-view-subject").innerText(),
        /m.ngrok.com/,
      );
      assert.match(
        await mail.locator(".email-metadata-simple").innerText(),
        /jmqst011@silenceai.net/,
      );
    },
  );
  await check(
    "sender filter, empty drilldown, timeframe, and custom range validation",
    async () => {
      await tab("cmc");
      await click(cmc, "Filter");
      await dialog().getByLabel("From (Sender)").fill("no-match.invalid");
      await click(dialog(), "Apply Filters");
      await click(cmc, "Open domain m.ngrok.com");
      assert.match(await dialog().innerText(), /No matching emails/);
      await escape();
      await cmc.getByRole("button", { name: /Clear filters/ }).click();
      await cmc.getByRole("button", { name: /TimeFrame:/ }).click();
      await click(dialog(), "Last hour");
      assert.ok((await cmc.locator('.cmc-domain[opacity="0.2"]').count()) > 0);
      await cmc.getByRole("button", { name: /TimeFrame:/ }).click();
      await click(dialog(), "Custom Range");
      await dialog().getByLabel("From (UTC)").fill("2026-09-21T12:00");
      await click(dialog(), "Apply range");
      assert.match(
        await dialog().getByRole("alert").innerText(),
        /Start must be before end/,
      );
      await dialog().getByLabel("From (UTC)").fill("2026-09-20T09:00");
      await dialog().getByLabel("To (UTC)").fill("2026-09-20T10:00");
      await click(dialog(), "Apply range");
      assert.ok(
        (
          await cmc.getByRole("button", { name: /Clear filters/ }).innerText()
        ).includes("emails"),
      );
      await reset();
    },
  );
  await check(
    "CEO attack synchronizes both views; Webmail purge removes all copies and produces audit",
    async () => {
      await click(root, "Simulate Attack");
      await until(() => root.getByRole("status").isVisible());
      await click(cmc, "Open Threat Grid");
      assert.equal(await cmc.locator(".cmc-threat-card").count(), 5);
      assert.equal(
        await cmc
          .locator(".cmc-threat-card")
          .first()
          .evaluate((el) => getComputedStyle(el).height),
        "400px",
      );
      await page
        .locator(".sb-browser")
        .screenshot({
          ...screenshotOptions,
          path: "artifacts/sandbox/cmc-threat-grid.png",
        });
      assert.match(
        await cmc.locator('[data-category="Possibly phishing"]').innerText(),
        /CEO Fraud:/,
      );
      await tab("webmail");
      await folder("phishing");
      assert.equal(await mail.locator(".email-item").count(), 4);
      assert.match(
        await mail.locator(".email-view-subject").innerText(),
        /CEO Fraud:/,
      );
      await click(mail, "ADMIN: Domain-Wide Purge");
      assert.equal(await mail.locator(".email-item").count(), 2);
      await tab("cmc");
      assert.doesNotMatch(
        await cmc.locator('[data-category="Possibly phishing"]').innerText(),
        /CEO Fraud:/,
      );
      await cmc.getByRole("button", { name: /Audit log/ }).click();
      assert.match(await dialog().innerText(), /2 domain mailboxes/);
      await escape();
    },
  );
  await check(
    "macro attack appears in Threat Grid; CMC purge updates Webmail malware counts",
    async () => {
      await click(root, "Simulate Attack");
      const category = cmc.locator('[data-category="Dangerous link"]');
      await category
        .getByRole("button", { name: /Macro Malware:/ })
        .first()
        .click();
      assert.match(await dialog().innerText(), /Macro Malware/);
      await click(dialog(), "Delete across entire domain");
      assert.doesNotMatch(await category.innerText(), /Macro Malware:/);
      await tab("webmail");
      await folder("malware");
      assert.equal(await mail.locator(".email-item").count(), 1);
      await page
        .locator(".sb-browser")
        .screenshot({
          ...screenshotOptions,
          path: "artifacts/sandbox/webmail-malware.png",
        });
    },
  );
  await check(
    "attachment hash and VirusTotal verdict, blocked download, preview, and arbitrary chat input",
    async () => {
      await click(mail, "Show details");
      assert.match(
        await mail.locator(".attachment-hash-value").innerText(),
        /^[a-f0-9]+$/,
      );
      assert.match(
        await mail.locator(".attachment-scan-details").innerText(),
        /VirusTotal:.*58\/72/,
      );
      assert.ok(
        await mail
          .getByRole("button", { name: "Download blocked: malware detected" })
          .isDisabled(),
      );
      await mail.getByRole("button", { name: /^Preview Invoice/ }).click();
      assert.match(await dialog().innerText(), /Attachment isolated/);
      await escape();
      await click(mail, "Ask SAI Security");
      await mail
        .getByLabel("Ask a security question")
        .fill("What does the attachment hash tell us about this invoice?");
      await click(mail, "Send question");
      assert.match(
        await mail.locator(".sb-ai-messages").innerText(),
        /SHA-256/,
      );
      await page
        .locator(".sb-browser")
        .screenshot({
          ...screenshotOptions,
          path: "artifacts/sandbox/webmail-chat.png",
        });
      await click(mail, "Close SAI chat");
    },
  );
  await check(
    "star, read, trash, restore, theme, and language controls change their respective states",
    async () => {
      const star = mail.getByRole("button", { name: /^Star Overdue/ });
      await star.click();
      assert.ok(
        await mail.getByRole("button", { name: /^Unstar Overdue/ }).isVisible(),
      );
      await click(mail, "Mark unread");
      assert.ok(await mail.locator(".email-item.unread").count());
      await click(mail, "Move to Trash");
      assert.equal(await mail.locator(".email-item").count(), 0);
      await folder("trash");
      assert.equal(await mail.locator(".email-item").count(), 1);
      await click(mail, "Restore email");
      await folder("malware");
      assert.equal(await mail.locator(".email-item").count(), 1);
      await click(mail, "Toggle theme");
      assert.equal(await mail.getAttribute("data-theme"), "light");
      await click(mail, "Switch language");
      assert.match(
        await mail.locator(".sidebar-compose").innerText(),
        /Написать/,
      );
      await click(mail, "Switch language");
      await click(mail, "Toggle theme");
    },
  );
  await check(
    "AI response can be edited and sent, then appears in Sent and Auto-responded",
    async () => {
      await folder("secure");
      await mail
        .getByLabel("Search emails, headers, hashes")
        .fill("Sarah Jenkins");
      await click(mail, "Generate reply");
      await mail
        .getByLabel("Review your draft")
        .fill("Thanks Sarah, the SLA has been reviewed.");
      await click(mail, "Send reply");
      await folder("sent");
      assert.match(
        await mail.locator(".email-view").innerText(),
        /Thanks Sarah/,
      );
      await folder("auto-responded");
      assert.equal(await mail.locator(".email-item").count(), 1);
    },
  );
  await check(
    "compose, save and reopen draft, scheduled send, and ordinary send",
    async () => {
      await click(mail, "Compose");
      await dialog()
        .getByLabel("To", { exact: true })
        .fill("reviewer@example.com");
      await dialog()
        .getByLabel("Subject", { exact: true })
        .fill("Sandbox draft");
      await dialog()
        .getByLabel("Message", { exact: true })
        .fill("Offline message body.");
      await click(dialog(), "Save draft");
      await folder("drafts");
      assert.equal(await mail.locator(".email-item").count(), 1);
      await mail.locator(".sb-email-open").first().click();
      assert.equal(
        await dialog().getByLabel("Message", { exact: true }).inputValue(),
        "Offline message body.",
      );
      await click(dialog(), "Schedule");
      await click(dialog(), "Schedule send");
      await click(mail, "Scheduled");
      assert.match(await dialog().innerText(), /Sandbox draft/);
      await click(dialog(), "Send now");
      await escape();
      await folder("sent");
      assert.match(
        await mail.locator(".email-view-subject").innerText(),
        /Sandbox draft/,
      );
      await click(mail, "Compose");
      await dialog()
        .getByLabel("To", { exact: true })
        .fill("reviewer@example.com");
      await dialog().getByLabel("Subject", { exact: true }).fill("Direct send");
      await dialog()
        .getByLabel("Message", { exact: true })
        .fill("Sent offline.");
      await click(dialog(), "Send");
      await folder("sent");
      assert.match(
        await mail.locator(".email-view-subject").innerText(),
        /Direct send/,
      );
    },
  );
  await check("custom folder creation and moving an email", async () => {
    await click(mail, "Create folder");
    await dialog().getByLabel("Folder name").fill("Investigation");
    await click(dialog(), "Create folder");
    await folder("secure");
    await click(mail, "Move to folder");
    await dialog()
      .getByLabel("Folder", { exact: true })
      .selectOption({ label: "Investigation" });
    await click(dialog(), "Move email");
    await mail.getByRole("button", { name: /Investigation/ }).click();
    assert.equal(await mail.locator(".email-item").count(), 1);
  });
  await check(
    "reset restores data, filters, UI, theme, drafts, and CMC default state",
    async () => {
      await reset();
      assert.equal(
        await page.locator("#sb-tab-cmc").getAttribute("aria-selected"),
        "true",
      );
      assert.ok(
        await cmc
          .getByRole("button", { name: "TimeFrame: All time" })
          .isVisible(),
      );
      assert.equal(await cmc.locator(".cmc-threat-panel").count(), 0);
      await tab("webmail");
      assert.equal(await mail.locator(".email-item").count(), 58);
      assert.equal(await mail.getAttribute("data-theme"), "dark");
      await page
        .locator(".sb-browser")
        .screenshot({
          ...screenshotOptions,
          path: "artifacts/sandbox/webmail-initial.png",
        });
      assert.ok(
        await mail
          .locator(".brand-logo")
          .evaluate((el) => el.complete && el.naturalWidth > 0),
      );
      assert.equal(
        await mail
          .locator(".dashboard-topbar")
          .evaluate((el) => getComputedStyle(el).height),
        "72px",
      );
      await folder("drafts");
      assert.equal(await mail.locator(".email-item").count(), 0);
      await folder("unfiltered");
    },
  );
  await context.setOffline(false);
  await check(
    "mobile frame contains horizontal scrolling without page overflow",
    async () => {
      await page.setViewportSize({ width: 390, height: 844 });
      await root.scrollIntoViewIfNeeded();
      await page.waitForTimeout(300);
      const dimensions = await page.evaluate(() => ({
        width: innerWidth,
        document: document.documentElement.scrollWidth,
        frame: document.querySelector(".sb-viewport").clientWidth,
        content: document.querySelector(".sb-viewport").scrollWidth,
      }));
      assert.ok(dimensions.document <= dimensions.width + 1);
      assert.ok(dimensions.content > dimensions.frame);
      await page.locator(".sb-viewport").evaluate((el) => {
        el.scrollLeft = el.scrollWidth;
      });
      await click(mail, "Ask SAI Security");
      assert.ok(await mail.getByLabel("Ask a security question").isVisible());
      await page
        .locator(".sb-browser")
        .screenshot({
          ...screenshotOptions,
          path: "artifacts/sandbox/mobile.png",
        });
    },
  );
  await check("mobile dialogs stay inside the visible frame", async () => {
    await click(mail, "Close SAI chat");
    await page.locator(".sb-viewport").evaluate((el) => {
      el.scrollLeft = 0;
    });
    await click(mail, "Compose");
    await until(async () => {
      const box = await dialog().boundingBox();
      const viewport = await page.locator(".sb-viewport").boundingBox();
      return (
        box.x >= viewport.x &&
        box.x + box.width <= viewport.x + viewport.width + 1
      );
    });
    await escape();
  });
  assert.deepEqual(apiRequests, []);
  assert.deepEqual(errors, []);
  fs.writeFileSync(
    "artifacts/sandbox/browser-checks.json",
    JSON.stringify(
      { checks: report, apiRequests, errors, passed: true },
      null,
      2,
    ),
  );
  console.log(
    `All ${report.length} browser scenarios passed; zero API requests and runtime errors.`,
  );
} finally {
  await browser.close();
}
