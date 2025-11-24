// src/controllers/stats.controller.js
const counterService = require('../services/counter.service');

async function getCurrent(req, res, next) {
  try {
    const summary = counterService.getCurrentSummary();
    res.json(summary);
  } catch (err) {
    next(err);
  }
}

/**
 * GET /api/stats/timeline?from=...&to=...
 * from, to เป็น ms since epoch (Number)
 */
async function getTimeline(req, res, next) {
  try {
    const from = req.query.from ? Number(req.query.from) : undefined;
    const to = req.query.to ? Number(req.query.to) : undefined;

    const timeline = counterService.getTimeline({ from, to });
    res.json({ events: timeline });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getCurrent,
  getTimeline
};
