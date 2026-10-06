function success(res, data, status = 200) {
  return res.status(status).json(data);
}

function failure(res, message, status = 400, extra = {}) {
  return res.status(status).json({ message, ...extra });
}

module.exports = { success, failure };
