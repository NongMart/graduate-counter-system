// src/controllers/dashboard.controller.js
const counterService = require('../services/counter.service');

/**
 * GET /api/dashboard/summary
 * ใช้สำหรับโหลดข้อมูลไปแสดงบนหน้า React Dashboard
 */
async function getSummary(req, res, next) {
  try {
    const summary = counterService.getDashboardSummary();
    res.status(200).json(summary);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getSummary
};
