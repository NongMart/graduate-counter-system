// src/app.js
const express = require('express');
const http = require('http');
const cors = require('cors');
const morgan = require('morgan');
const { Server } = require('socket.io');

const eventsRouter = require('./routes/events.routes');
const statsRouter = require('./routes/stats.routes');
const counterService = require('./services/counter.service');

function createApp() {
  const app = express();
  const server = http.createServer(app);

  // --- ตั้งค่า Socket.IO ---
  const io = new Server(server, {
    cors: {
      origin: '*', // ตอนต่อกับ React ค่อยจำกัด origin ทีหลังได้
      methods: ['GET', 'POST']
    }
  });

  // ส่ง io เข้าไปให้ service ใช้ emit event real-time
  counterService.setSocketIO(io);

  // --- Middleware ---
  app.use(cors());
  app.use(express.json());
  app.use(morgan('dev'));

  // health check ง่าย ๆ
  app.get('/', (req, res) => {
    res.json({ status: 'ok', service: 'graduate-counter-backend' });
  });

  // --- Routes ---
  app.use('/api/events', eventsRouter);
  app.use('/api/stats', statsRouter);

  // Error handler แบบง่าย
  app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.status || 500).json({
      message: err.message || 'Internal Server Error'
    });
  });

  // socket.io event เพิ่มเติมถ้าอยาก เช่นเชื่อมต่อ/ตัดการเชื่อมต่อ
  io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);
    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });

  return { app, server, io };
}

module.exports = createApp;
