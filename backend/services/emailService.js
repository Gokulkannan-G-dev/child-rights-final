const { emailFrom } = require("../config/environment");

/**
 * Stubbed email sender. Swap in a real provider (SES, SendGrid, Nodemailer +
 * SMTP) here — every call site in this codebase already awaits this function.
 */
async function sendEmail({ to, subject, body }) {
  console.log(`[emailService] from=${emailFrom} to=${to} subject="${subject}"
${body}`);
  return { delivered: true };
}

module.exports = { sendEmail };
