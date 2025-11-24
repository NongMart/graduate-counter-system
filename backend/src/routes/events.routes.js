// src/routes/events.routes.js
const express = require('express');
const router = express.Router();
const eventsController = require('../controllers/events.controller');

// AI/กล้อง หรือระบบอื่นจะเรียก endpoint นี้
router.post('/entry', eventsController.createEvent);

module.exports = router;