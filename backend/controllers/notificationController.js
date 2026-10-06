const notificationService = require("../services/notificationService");

async function list(req, res, next) {
  try {
    const notifications = await notificationService.listForUser(req.user._id);
    res.json({ notifications: notifications.map((n) => ({ id: n._id, message: n.message, read: n.read, createdAt: n.createdAt })) });
  } catch (err) {
    next(err);
  }
}

async function markRead(req, res, next) {
  try {
    const updated = await notificationService.markRead(req.params.id);
    res.json({ notification: updated });
  } catch (err) {
    next(err);
  }
}

module.exports = { list, markRead };
