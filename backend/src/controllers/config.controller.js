// src/controllers/config.controller.js
const counterService = require('../services/counter.service');

/**
 * POST /api/config/total-graduates
 * body:
 * {
 *   "totalGraduates": 3941
 * }
 */
async function setTotalGraduates(req, res, next) {
  try {
    const { totalGraduates } = req.body;

    const total = Number(totalGraduates);
    if (!Number.isFinite(total) || total < 0) {
      return res.status(400).json({ message: 'totalGraduates ต้องเป็นตัวเลข >= 0' });
    }

    const updated = counterService.updateTotalGraduates(total);

    res.status(200).json({
      message: 'Total graduates updated',
      totalGraduates: updated
    });
  } catch (err) {
    next(err);
  }
}

/**
 * POST /api/config/start
 */
async function startSystem(req, res, next) {
  try {
    const result = counterService.startSystem();
    res.status(200).json({
      message: 'System started',
      ...result
    });
  } catch (err) {
    next(err);
  }
}

/**
 * POST /api/config/stop
 */
async function stopSystem(req, res, next) {
  try {
    const result = counterService.stopSystem();
    res.status(200).json({
      message: 'System stopped',
      ...result
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  setTotalGraduates,
  startSystem,
  stopSystem
};
