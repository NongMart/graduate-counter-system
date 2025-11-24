// src/routes/stats.routes.js
const express = require('express');
const router = express.Router();
const statsController = require('../controllers/stats.controller');

// Dashboard ใช้ endpoint นี้
router.get('/current', statsController.getCurrent);
router.get('/timeline', statsController.getTimeline);

module.exports = router;
