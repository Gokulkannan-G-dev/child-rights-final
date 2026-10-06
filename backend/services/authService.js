const bcrypt = require("bcryptjs");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");
const { sendEmail } = require("./emailService");

async function registerUser({ name, email, password }) {
  const existing = await User.findOne({ email });
  if (existing) {
    const err = new Error("An account with that email already exists.");
    err.status = 409;
    throw err;
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

  const user = await User.create({ name, email, passwordHash, verificationCode });

  await sendEmail({
    to: email,
    subject: "Verify your account",
    body: `Your verification code is ${verificationCode}`
  });

  return user;
}

async function authenticate(email, password) {
  const user = await User.findOne({ email });
  if (!user) {
    const err = new Error("Invalid email or password.");
    err.status = 401;
    throw err;
  }

  const matches = await bcrypt.compare(password, user.passwordHash);
  if (!matches) {
    const err = new Error("Invalid email or password.");
    err.status = 401;
    throw err;
  }

  const token = generateToken(user);
  return { token, user };
}

module.exports = { registerUser, authenticate };
