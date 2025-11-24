// src/routes/config.routes.js
const express = require('express');
const router = express.Router();
const configController = require('../controllers/config.controller');

// ตั้งค่าจำนวนบัณฑิตทั้งหมด
router.post('/total-graduates', configController.setTotalGraduates);

// สั่งเริ่มระบบ (START)
router.post('/start', configController.startSystem);

// สั่งหยุดระบบ (STOP)
router.post('/stop', configController.stopSystem);

module.exports = router;
