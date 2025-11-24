// src/server.js
const createApp = require('./app');

const PORT = process.env.PORT || 4000;

const { server } = createApp();

server.listen(PORT, () => {
  console.log(`Backend is running on port ${PORT}`);
});