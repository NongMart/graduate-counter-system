// src/app.js
const express = require('express');
const http = require('http');
const cors = require('cors');
const morgan = require('morgan');
const { Server } = require('socket.io');

const eventsRouter = require('./routes/events.routes');
const configRouter = require('./routes/config.routes');
const dashboardRouter = require('./routes/dashboard.routes');

const counterService = require('./services/counter.service');

function createApp() {
  const app = express();
  const server = http.createServer(app);

  // ตั้งค่า Socket.IO
  const io = new Server(server, {
    cors: {
      origin: '*', // ตอนขึ้น production ค่อยจำกัด origin ให้ตรงกับ frontend
      methods: ['GET', 'POST']
    }
  });

  // ให้ service รู้จัก io เพื่อใช้ emit real-time
  counterService.setSocketIO(io);

  // Middleware พื้นฐาน
  app.use(cors());
  app.use(express.json());
  app.use(morgan('dev'));

  // health check
  app.get('/', (req, res) => {
    res.json({ status: 'ok', service: 'graduate-counter-backend' });
  });

  // Routes
  app.use('/api/events', eventsRouter);
  app.use('/api/config', configRouter);
  app.use('/api/dashboard', dashboardRouter);

  // Error handler
  app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.status || 500).json({
      message: err.message || 'Internal Server Error'
    });
  });

  // Log เมื่อมี client ต่อ socket เข้ามา
  io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);
    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });

  return { app, server, io };
}

module.exports = createApp;
