/**
 * Stubbed SMS sender. Swap in a real provider (Twilio, Vonage) here.
 */
async function sendSms({ to, message }) {
  console.log(`[smsService] to=${to} message="${message}"`);
  return { delivered: true };
}

module.exports = { sendSms };
