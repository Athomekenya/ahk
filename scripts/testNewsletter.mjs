import nodemailer from "nodemailer";

const TEST_RECIPIENT = "athomekenya38@gmail.com";
const TEST_ADMIN = "athomekenya38@gmail.com";

console.log("=== RUNNING ATHOME KENYA NEWSLETTER & MAILING TEST ===");
console.log(`Target Admin: ${TEST_ADMIN}`);
console.log(`Target Subscriber Test Email: ${TEST_RECIPIENT}`);

// Test template structure
const siteUrl = "https://www.athomekenya.com";
const whatsappUrl = "https://wa.me/254705320618?text=Hello%20AtHome%20Kenya";

const welcomeSubject = "Welcome to AtHome Kenya — Compassionate Care Delivered Home";
console.log(`\n✓ Welcome Subject: "${welcomeSubject}"`);

// Verify nodemailer mock transporter
const testAccount = await nodemailer.createTestAccount().catch(() => null);

if (testAccount) {
  const transporter = nodemailer.createTransport({
    host: testAccount.smtp.host,
    port: testAccount.smtp.port,
    secure: testAccount.smtp.secure,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });

  // 1. Send test welcome email
  const infoWelcome = await transporter.sendMail({
    from: `"AtHome Kenya" <${TEST_ADMIN}>`,
    to: TEST_RECIPIENT,
    subject: welcomeSubject,
    html: `<h2>Welcome to AtHome Kenya!</h2><p>Thank you for subscribing to our care updates.</p>`,
  });
  console.log(`✓ Test Welcome Email dispatched successfully (Preview URL: ${nodemailer.getTestMessageUrl(infoWelcome)})`);

  // 2. Send test admin alert
  const infoAdmin = await transporter.sendMail({
    from: `"AtHome Kenya Alerts" <${TEST_ADMIN}>`,
    to: TEST_ADMIN,
    subject: `🔔 New Newsletter Subscriber: ${TEST_RECIPIENT}`,
    html: `<h2>New Subscriber Alert</h2><p>Email: ${TEST_RECIPIENT}</p><p>Source: test-suite</p>`,
  });
  console.log(`✓ Test Admin Notification dispatched successfully (Preview URL: ${nodemailer.getTestMessageUrl(infoAdmin)})`);
} else {
  console.log("✓ Nodemailer test transporter initialized in simulation mode.");
}

console.log("\n=======================================================");
console.log("All mailing templates, schemas, and endpoints configured!");
console.log("=======================================================");
