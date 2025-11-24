// src/store/memoryStore.js

// จำนวนบัณฑิตปัจจุบัน
let currentCount = 0;

// Log เหตุการณ์ที่นับ (ใช้ทำกราฟ/ตรวจสอบทีหลังได้)
const events = [];

/**
 * เพิ่ม event การนับคนใหม่
 * @param {Object} event
 * @param {string} event.source - 'camera' | 'manual' | อื่น ๆ
 * @param {string} [event.cameraId]
 * @param {string} [event.direction] - 'IN' | 'OUT'
 * @param {number} [event.timestamp]
 */
function addEvent(event) {
  const ts = event.timestamp || Date.now();

  // ปรับ count ตาม direction
  if (event.direction === 'IN') {
    currentCount += 1;
  } else if (event.direction === 'OUT') {
    currentCount = Math.max(0, currentCount - 1);
  }

  const stored = {
    id: events.length + 1,
    ...event,
    timestamp: ts,
    currentCountAfterEvent: currentCount
  };

  events.push(stored);
  return stored;
}

function getCurrentCount() {
  return currentCount;
}

function getEvents({ from, to } = {}) {
  return events.filter(ev => {
    if (from && ev.timestamp < from) return false;
    if (to && ev.timestamp > to) return false;
    return true;
  });
}

module.exports = {
  addEvent,
  getCurrentCount,
  getEvents
};
