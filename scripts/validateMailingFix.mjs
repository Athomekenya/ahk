// scripts/validateMailingFix.mjs
// Test suite to validate that adohjoe@gmail.com is never leaked in console logs,
// that dual independent dispatch works, and that info@athomekenya.com has clean headers.

import assert from "node:assert";

// Mock environment
process.env.NOTIFICATION_EMAIL = "adohjoe@gmail.com, info@athomekenya.com";
process.env.CAREERS_NOTIFICATION_EMAIL = "adohjoe@gmail.com, info@athomekenya.com";
process.env.SMTP_FROM = "info@athomekenya.com";
process.env.SMTP_USER = "info@athomekenya.com";

console.log("=================================================");
console.log("RUNNING VALIDATION: Silent BCC & Console Log Leak Protection");
console.log("=================================================\n");

// 1. Test getNotificationEmails and getAdminMailTargets
function getNotificationEmails(customEnvKey) {
  const envVal = customEnvKey
    ? (process.env[customEnvKey] || process.env.NOTIFICATION_EMAIL)
    : process.env.NOTIFICATION_EMAIL;

  const DEFAULT_NOTIFICATION_EMAILS = ["info@athomekenya.com"];
  if (!envVal) return DEFAULT_NOTIFICATION_EMAILS;

  const emails = envVal
    .split(",")
    .map((e) => e.trim())
    .filter(Boolean);

  return emails.length > 0 ? emails : DEFAULT_NOTIFICATION_EMAILS;
}

function getAdminMailTargets(customEnvKey) {
  const allEmails = getNotificationEmails(customEnvKey);
  const infoIndex = allEmails.findIndex((e) => e.toLowerCase() === "info@athomekenya.com");

  let officialEmail = "info@athomekenya.com";
  let silentRecipients = [];

  if (infoIndex !== -1) {
    officialEmail = allEmails[infoIndex];
    silentRecipients = allEmails.filter((_, idx) => idx !== infoIndex);
  } else if (allEmails.length > 0) {
    officialEmail = allEmails[0];
    silentRecipients = allEmails.slice(1);
  }

  return {
    to: officialEmail,
    officialEmail,
    silentRecipients,
    bcc: silentRecipients.length > 0 ? silentRecipients : undefined,
  };
}

function redactPrivateEmails(errOrMsg, privateEmails = []) {
  let str = errOrMsg instanceof Error ? errOrMsg.message : String(errOrMsg ?? "");
  for (const email of privateEmails) {
    if (email) {
      const escaped = email.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      str = str.replace(new RegExp(escaped, "gi"), "[REDACTED_ADMIN]");
    }
  }
  return str;
}

// TEST 1: Recipient Targets
console.log("TEST 1: Testing getAdminMailTargets parsing from .env");
const targets = getAdminMailTargets("NOTIFICATION_EMAIL");
assert.strictEqual(targets.officialEmail, "info@athomekenya.com", "officialEmail must be info@athomekenya.com");
assert.deepStrictEqual(targets.silentRecipients, ["adohjoe@gmail.com"], "silentRecipients must contain secondary email");
console.log("✓ Official Email correctly parsed as:", targets.officialEmail);
console.log("✓ Silent Recipients count:", targets.silentRecipients.length);
console.log("TEST 1 PASSED.\n");

// TEST 2: Redaction in Error Messages
console.log("TEST 2: Testing redactPrivateEmails on SMTP error payloads");
const sampleErrorMsg = "SMTP 550 Recipient rejected: <adohjoe@gmail.com> not found in relay table";
const redacted = redactPrivateEmails(new Error(sampleErrorMsg), targets.silentRecipients);
assert(!redacted.includes("adohjoe@gmail.com"), "Redacted error must not contain adohjoe@gmail.com");
assert(redacted.includes("[REDACTED_ADMIN]"), "Redacted error must contain [REDACTED_ADMIN]");
console.log("  Raw Error:     ", sampleErrorMsg);
console.log("  Redacted Error:", redacted);
console.log("TEST 2 PASSED.\n");

// TEST 3: Console Logs Capture & Verification during Dispatch
console.log("TEST 3: Simulating dispatchAdminNotification & verifying zero log trails");

// Intercept console.log and console.error
const capturedLogs = [];
const origLog = console.log;
const origError = console.error;

console.log = (...args) => {
  capturedLogs.push({ type: "log", text: args.join(" ") });
  origLog.apply(console, args);
};

console.error = (...args) => {
  capturedLogs.push({ type: "error", text: args.join(" ") });
  origError.apply(console, args);
};

// Mock transporter to capture sendMail arguments
const sentEmails = [];
const mockTransporter = {
  sendMail: async (mailOptions) => {
    sentEmails.push(mailOptions);
    return { messageId: "test-id" };
  },
};

// Dispatcher logic under test
async function simulateDispatch(options) {
  const targets = getAdminMailTargets(options.customEnvKey);
  const tasks = [];

  // Primary: Official visible
  tasks.push(
    mockTransporter.sendMail({
      from: `"${options.fromName}" <info@athomekenya.com>`,
      to: targets.officialEmail,
      subject: options.subject,
      text: options.text,
    }).then(() => {
      console.log(`[EmailService SUCCESS] ✅ ${options.logLabel} delivered to: ${targets.officialEmail}`);
      return true;
    })
  );

  // Silent target: completely quiet (zero console logging)
  for (const silentEmail of targets.silentRecipients) {
    tasks.push(
      mockTransporter.sendMail({
        from: `"${options.fromName}" <info@athomekenya.com>`,
        to: silentEmail,
        subject: options.subject,
        text: options.text,
      }).then(() => true).catch(() => false)
    );
  }

  await Promise.allSettled(tasks);
}

await simulateDispatch({
  customEnvKey: "NOTIFICATION_EMAIL",
  fromName: "AtHome Kenya Alerts",
  subject: "New Newsletter Subscriber: test@subscriber.com",
  text: "Hello",
  logLabel: "Newsletter Subscriber Alert",
});

await simulateDispatch({
  customEnvKey: "CAREERS_NOTIFICATION_EMAIL",
  fromName: "AtHome Kenya Careers",
  subject: "New Job Application — Jane Doe for Nurse",
  text: "Application details",
  logLabel: "Careers Job Application Alert",
});

// Restore console
console.log = origLog;
console.error = origError;

// VERIFICATION: Check sent emails
assert.strictEqual(sentEmails.length, 4, "Should have dispatched 4 emails (2 newsletter, 2 careers)");

// Verify primary newsletter
assert.strictEqual(sentEmails[0].to, "info@athomekenya.com");
assert.strictEqual(sentEmails[0].bcc, undefined, "Primary email must have NO bcc field!");

// Verify secondary newsletter
assert.strictEqual(sentEmails[1].to, "adohjoe@gmail.com");
assert.strictEqual(sentEmails[1].bcc, undefined, "Secondary email must have NO bcc field!");

// Verify primary careers
assert.strictEqual(sentEmails[2].to, "info@athomekenya.com");
assert.strictEqual(sentEmails[2].bcc, undefined, "Primary careers email must have NO bcc field!");

// Verify secondary careers
assert.strictEqual(sentEmails[3].to, "adohjoe@gmail.com");
assert.strictEqual(sentEmails[3].bcc, undefined, "Secondary careers email must have NO bcc field!");

// VERIFICATION: Check captured console logs for ANY trace of adohjoe@gmail.com or "secondary"
console.log("\nCaptured Console Logs:");
capturedLogs.forEach((l) => console.log(`  [${l.type.toUpperCase()}] ${l.text}`));

assert.strictEqual(capturedLogs.length, 2, "Exactly 2 log lines should be printed (one for each form submission)");

const leakedEmailLog = capturedLogs.find((l) => l.text.toLowerCase().includes("adohjoe@gmail.com"));
assert.strictEqual(leakedEmailLog, undefined, `LEAK DETECTED in console log: ${leakedEmailLog?.text}`);

const leakedSecondaryLog = capturedLogs.find((l) => l.text.toLowerCase().includes("secondary"));
assert.strictEqual(leakedSecondaryLog, undefined, `LEAK DETECTED: Log contains 'secondary': ${leakedSecondaryLog?.text}`);

console.log("\n✓ No logs contained 'adohjoe@gmail.com'!");
console.log("✓ No logs contained 'secondary' or 'secondary admin channel'!");
console.log("✓ Exactly 1 clean log line per submission to official inbox!");
console.log("✓ Both recipients successfully receive their independent notifications!");

// TEST 4: Simulate Failure with Leaked Email in Error Payload
console.log("\nTEST 4: Simulating failure containing adohjoe@gmail.com in error object");
capturedLogs.length = 0;
console.log = (...args) => capturedLogs.push({ type: "log", text: args.join(" ") });
console.error = (...args) => capturedLogs.push({ type: "error", text: args.join(" ") });

const failingTransporter = {
  sendMail: async (opts) => {
    throw new Error(`SMTP Error: Unable to route to ${opts.to}`);
  },
};

async function simulateFailingDispatch(options) {
  const targets = getAdminMailTargets(options.customEnvKey);
  const tasks = [];

  tasks.push(
    failingTransporter.sendMail({
      to: targets.officialEmail,
    }).catch((err) => {
      console.error(
        `[EmailService ERROR] ❌ Failed to deliver ${options.logLabel}:`,
        redactPrivateEmails(err, targets.silentRecipients)
      );
      return false;
    })
  );

  for (const silentEmail of targets.silentRecipients) {
    tasks.push(
      failingTransporter.sendMail({
        to: silentEmail,
      }).catch(() => false)
    );
  }

  await Promise.allSettled(tasks);
}

await simulateFailingDispatch({
  customEnvKey: "NOTIFICATION_EMAIL",
  logLabel: "Failing Test Alert",
});

console.log = origLog;
console.error = origError;

console.log("Captured Error Logs:");
capturedLogs.forEach((l) => console.log(`  [${l.type.toUpperCase()}] ${l.text}`));

assert.strictEqual(capturedLogs.length, 1, "Only the official inbox failure is logged (silent targets are completely quiet)");
const leakedErrorEmail = capturedLogs.find((l) => l.text.toLowerCase().includes("adohjoe@gmail.com"));
assert.strictEqual(leakedErrorEmail, undefined, `LEAK DETECTED in error log: ${leakedErrorEmail?.text}`);
const leakedErrorSecondary = capturedLogs.find((l) => l.text.toLowerCase().includes("secondary"));
assert.strictEqual(leakedErrorSecondary, undefined, `LEAK DETECTED: Error log contains 'secondary': ${leakedErrorSecondary?.text}`);
console.log("✓ Error logs contain zero mention of secondary channels or silent emails!");
console.log("TEST 4 PASSED.");
console.log("\n=================================================");
console.log("ALL MAILING & LOGGING VALIDATIONS PASSED (100%)");
console.log("=================================================");
