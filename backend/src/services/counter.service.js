// src/services/counter.service.js
const store = require('../store/memoryStore');

let ioInstance = null;

function setSocketIO(io) {
  ioInstance = io;
}

// ---------- จัดการ event จาก AI ----------

function registerEvent({ source, cameraId, direction, timestamp }) {
  const saved = store.addEvent({ source, cameraId, direction, timestamp });

  // ทุกครั้งที่มี event ใหม่ ให้ broadcast summary ล่าสุด
  emitSummaryUpdated();

  return saved;
}

// ---------- จัดการ config / system ----------

function updateTotalGraduates(total) {
  store.setTotalGraduates(total);
  // broadcast ด้วย
  emitSummaryUpdated();
  return store.getTotalGraduates();
}

function startSystem() {
  store.setSystemStatus('RUNNING');
  emitSummaryUpdated();
  return {
    systemStatus: store.getSystemStatus(),
    startedAt: store.getStartedAt()
  };
}

function stopSystem() {
  store.setSystemStatus('STOPPED');
  emitSummaryUpdated();
  return {
    systemStatus: store.getSystemStatus(),
    stoppedAt: store.getStoppedAt()
  };
}

// ---------- สร้าง summary สำหรับหน้า dashboard ----------

function getDashboardSummary() {
  const totalGraduates = store.getTotalGraduates();
  const currentCount = store.getCurrentCount();
  const remainingCount = totalGraduates > 0
    ? Math.max(totalGraduates - currentCount, 0)
    : 0;

  const percentDone =
    totalGraduates > 0 ? (currentCount / totalGraduates) * 100 : 0;
  const percentRemaining = 100 - percentDone;

  const elapsedSeconds = store.getElapsedSeconds();

  let avgPerMinute = 0;
  let estimatedRemainingSeconds = 0;

  if (elapsedSeconds > 0 && currentCount > 0) {
    const avgPerSecond = currentCount / elapsedSeconds;
    avgPerMinute = avgPerSecond * 60;

    if (avgPerSecond > 0 && remainingCount > 0) {
      estimatedRemainingSeconds = Math.round(remainingCount / avgPerSecond);
    }
  }

  const summary = {
    totalGraduates,
    currentCount,
    remainingCount,
    percentDone: Number(percentDone.toFixed(2)),
    percentRemaining: Number(percentRemaining.toFixed(2)),
    elapsedSeconds,
    estimatedRemainingSeconds,
    avgPerMinute: Number(avgPerMinute.toFixed(2)),
    systemStatus: store.getSystemStatus(),
    startedAt: store.getStartedAt(),
    stoppedAt: store.getStoppedAt(),
    lastUpdated: new Date().toISOString()
  };

  return summary;
}

// ---------- Helper สำหรับ Socket.IO ----------

function emitSummaryUpdated() {
  if (!ioInstance) return;
  const summary = getDashboardSummary();
  ioInstance.emit('summaryUpdated', summary);
}

module.exports = {
  setSocketIO,
  registerEvent,
  updateTotalGraduates,
  startSystem,
  stopSystem,
  getDashboardSummary
};
