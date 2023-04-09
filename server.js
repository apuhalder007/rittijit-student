const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Serve static files from the public directory
app.use(express.static(__dirname));

io.on('connection', (socket) => {
  console.log(`User ${socket.id} connected`);

  socket.on('join-room', (roomId, userId) => {
    socket.join(roomId);

    socket.to(roomId).emit('user-connected', userId);

    // Get user ID from query parameter
    const userIdQuery = new URLSearchParams(socket.handshake.query).get('userId');
    if (userIdQuery) {
      userId = userIdQuery;
    }

    // Send existing users the new user's video stream
    socket.to(roomId).emit('user-connected-video', { userId, stream: null });

    // Send the new user existing users' video streams
    for (const [userId, stream] of io.of('/').sockets.get(roomId)) {
      if (userId !== socket.id) {
        socket.emit('user-connected-video', { userId, stream });
      }
    }

    socket.on('disconnect', () => {
      console.log(`User ${socket.id} disconnected`);

      socket.to(roomId).emit('user-disconnected', userId);
      socket.to(roomId).emit('user-disconnected-video', userId);
    });

    // Handle screen sharing
    socket.on('share-screen', () => {
      socket.to(roomId).emit('user-shared-screen', userId);
    });

    socket.on('stop-share-screen', () => {
      socket.to(roomId).emit('user-stopped-sharing-screen', userId);
    });

    // Handle video streams
    socket.on('stream', (stream, userId) => {
      socket.to(roomId).emit('user-connected-video', { userId, stream });
    });

    // Handle chat messages
    socket.on('chat-message', (message) => {
      socket.to(roomId).emit('chat-message', { userId, message });
    });
  });
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
