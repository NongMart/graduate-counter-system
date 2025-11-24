// src/store/memoryStore.js

// state ทั้งหมดเก็บใน RAM (ไว้ demo / dev)
// ถ้าเปลี่ยนไปใช้ DB ทีหลัง ให้ย้าย logic พวกนี้ไป query DB แทน
const state = {
  totalGraduates: 0,       // จำนวนบัณฑิตทั้งหมด (ตั้งค่าจาก frontend)
  currentCount: 0,         // จำนวนที่รับปริญญาแล้ว
  events: [],              // log การนับทุกครั้ง
  systemStatus: 'STOPPED', // 'RUNNING' | 'STOPPED'
  startedAt: null,         // เวลาเริ่มนับ (ms)
  stoppedAt: null          // เวลาหยุดล่าสุด (ms)
};

// ---------- ส่วนของ event / count ----------

function addEvent(event) {
  const ts = event.timestamp || Date.now();

  if (event.direction === 'IN') {
    state.currentCount += 1;
  } else if (event.direction === 'OUT') {
    state.currentCount = Math.max(0, state.currentCount - 1);
  }

  const stored = {
    id: state.events.length + 1,
    ...event,
    timestamp: ts,
    currentCountAfterEvent: state.currentCount
  };

  state.events.push(stored);
  return stored;
}

function getCurrentCount() {
  return state.currentCount;
}

function getEvents({ from, to } = {}) {
  return state.events.filter((ev) => {
    if (from && ev.timestamp < from) return false;
    if (to && ev.timestamp > to) return false;
    return true;
  });
}

// ---------- ส่วนของ config / system ----------

function setTotalGraduates(total) {
  state.totalGraduates = total;
}

function getTotalGraduates() {
  return state.totalGraduates;
}

function setSystemStatus(status) {
  const now = Date.now();

  if (status === 'RUNNING') {
    if (!state.startedAt) {
      state.startedAt = now;
    }
    state.systemStatus = 'RUNNING';
  } else if (status === 'STOPPED') {
    state.systemStatus = 'STOPPED';
    state.stoppedAt = now;
  }
}

function getSystemStatus() {
  return state.systemStatus;
}

function getStartedAt() {
  return state.startedAt;
}

function getStoppedAt() {
  return state.stoppedAt;
}

// เวลาที่ผ่านไปแล้ว (วินาที)
function getElapsedSeconds() {
  if (!state.startedAt) return 0;

  const now = Date.now();
  let end = now;

  if (state.systemStatus === 'STOPPED' && state.stoppedAt) {
    end = state.stoppedAt;
  }

  const diffMs = end - state.startedAt;
  if (diffMs <= 0) return 0;
  return Math.floor(diffMs / 1000);
}

module.exports = {
  // events / count
  addEvent,
  getCurrentCount,
  getEvents,

  // config / system
  setTotalGraduates,
  getTotalGraduates,
  setSystemStatus,
  getSystemStatus,
  getStartedAt,
  getStoppedAt,
  getElapsedSeconds
};
