// src/services/counter.service.js
const store = require('../store/memoryStore');

let ioInstance = null;

function setSocketIO(io) {
  ioInstance = io;
}

/**
 * รับ event ใหม่จากกล้อง/ระบบ แล้วอัปเดต count
 */
function registerEvent({ source, cameraId, direction, timestamp }) {
  const saved = store.addEvent({ source, cameraId, direction, timestamp });

  // ส่ง real-time ไปให้ client ที่ต่อ socket อยู่
  if (ioInstance) {
    ioInstance.emit('countUpdated', {
      currentCount: store.getCurrentCount(),
      lastEvent: saved
    });
  }

  return saved;
}

function getCurrentSummary() {
  return {
    currentCount: store.getCurrentCount(),
    lastEvents: store.getEvents().slice(-10).reverse() // 10 event ล่าสุด
  };
}

/**
 * ใช้ทำกราฟ timeline ตามช่วงเวลา
 */
function getTimeline({ from, to }) {
  const events = store.getEvents({ from, to });
  return events;
}

module.exports = {
  setSocketIO,
  registerEvent,
  getCurrentSummary,
  getTimeline
};
