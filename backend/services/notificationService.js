const Notification = require("../models/Notification");

async function notifyUser(userId, message) {
  return Notification.create({ user: userId, message });
}

async function listForUser(userId) {
  return Notification.find({ user: userId }).sort({ createdAt: -1 });
}

async function markRead(notificationId) {
  return Notification.findByIdAndUpdate(notificationId, { read: true }, { new: true });
}

module.exports = { notifyUser, listForUser, markRead };
