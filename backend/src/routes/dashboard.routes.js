// src/routes/dashboard.routes.js
const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboard.controller');

// สรุปข้อมูลทั้งหมดสำหรับหน้า Dashboard
router.get('/summary', dashboardController.getSummary);

module.exports = router;
