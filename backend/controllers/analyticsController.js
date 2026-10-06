const analyticsService = require("../services/analyticsService");

async function summary(req, res, next) {
  try {
    const data = await analyticsService.getDashboardSummary();
    res.json(data);
  } catch (err) {
    next(err);
  }
}

async function caseTrends(req, res, next) {
  try {
    const trends = await analyticsService.getCaseTrends();
    res.json({ trends });
  } catch (err) {
    next(err);
  }
}

module.exports = { summary, caseTrends };
