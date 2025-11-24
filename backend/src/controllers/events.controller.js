// src/controllers/events.controller.js
const counterService = require('../services/counter.service');

/**
 * POST /api/events/entry
 * body:
 * {
 *   "source": "camera",
 *   "cameraId": "CAM1",
 *   "direction": "IN" | "OUT",
 *   "timestamp": 1732439712345 (optional)
 * }
 */
async function createEvent(req, res, next) {
  try {
    const { source, cameraId, direction, timestamp } = req.body;

    if (!direction || !['IN', 'OUT'].includes(direction)) {
      return res.status(400).json({ message: 'direction ต้องเป็น IN หรือ OUT' });
    }

    const saved = counterService.registerEvent({
      source: source || 'unknown',
      cameraId,
      direction,
      timestamp
    });

    res.status(201).json({
      message: 'Event recorded',
      data: saved
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createEvent
};
