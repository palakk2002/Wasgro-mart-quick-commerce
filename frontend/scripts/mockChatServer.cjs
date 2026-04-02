import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

const PORT = 5001;

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('join_room', (sellerId) => {
    console.log(`User joined room: ${sellerId}`);
    socket.join(sellerId);
  });

  socket.on('send_message', (data) => {
    console.log('Message received:', data);
    // Broadcast back to the same room (sellerId)
    io.to(data.sellerId).emit('receive_message', data);
    console.log(`Relayed message to room: ${data.sellerId}`);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(PORT, () => {
  console.log(`Mock Chat Server running on http://localhost:${PORT}`);
});
