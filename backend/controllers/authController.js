const User = require("../models/User");
const VerificationRequest = require("../models/VerificationRequest");
const authService = require("../services/authService");
const generateToken = require("../utils/generateToken");

async function register(req, res, next) {
  try {
    const { name, email, password } = req.body;
    const user = await authService.registerUser({ name, email, password });
    res.status(201).json({ message: "Account created. Please verify your email.", userId: user._id });
  } catch (err) {
    next(err);
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const { token, user } = await authService.authenticate(email, password);
    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });
  } catch (err) {
    next(err);
  }
}

async function me(req, res) {
  res.json({ user: { id: req.user._id, name: req.user.name, email: req.user.email, role: req.user.role } });
}

async function forgotPassword(req, res, next) {
  try {
    // Token generation + email dispatch would go here in a full implementation.
    res.json({ message: "If an account exists for that email, a reset link has been sent." });
  } catch (err) {
    next(err);
  }
}

async function verifyAccount(req, res, next) {
  try {
    const { code } = req.body;
    const user = await User.findOneAndUpdate(
      { verificationCode: code },
      { isVerified: true, verificationCode: null },
      { new: true }
    );
    if (!user) return res.status(400).json({ message: "Invalid or expired verification code." });
    res.json({ message: "Account verified." });
  } catch (err) {
    next(err);
  }
}

async function professionalVerification(req, res, next) {
  try {
    const { organization, role, fileName } = req.body;
    const request = await VerificationRequest.create({ user: req.user._id, organization, role, fileName });
    res.status(201).json({ message: "Verification request submitted.", requestId: request._id });
  } catch (err) {
    next(err);
  }
}

module.exports = { register, login, me, forgotPassword, verifyAccount, professionalVerification };
