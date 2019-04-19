const express = require('express');

const app = express();
const server = require('http').createServer(app);

const io = require('socket.io').listen(server);

const game = [];
io.on('connection', (socket) => {
  if (game.length < 2) {
    game.push(socket.id);

    console.log(`Player ${socket.id} has joined`);
    console.log(`This game has ${game.length} players`);

    socket.emit('player.joined');

    if (game.length === 2) {
      socket.emit('game.can.start');
    }
  } else {
    console.log('Game session is full');

    socket.emit('game.is.full');
  }

  socket.on('disconnect', () => {
    console.log(`Player ${socket.id} has diconnected`);
    console.log(`This game has ${game.length} players`);
  });
});

app.get('/', (req, res) => {
  res.send('There is a socket on this folder');
});

server.listen(3001, () => {
  console.log('listening on *:3001');
});

// export the server middleware
module.exports = {
  path: '/io',
  handler: app,
};
