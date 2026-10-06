const User = require("../models/User");

async function getProfile(req, res) {
  res.json({ user: req.user });
}

async function updateProfile(req, res, next) {
  try {
    const updates = (({ name }) => ({ name }))(req.body);
    const user = await User.findByIdAndUpdate(req.user._id, updates, { new: true }).select("-passwordHash");
    res.json({ user });
  } catch (err) {
    next(err);
  }
}

module.exports = { getProfile, updateProfile };
