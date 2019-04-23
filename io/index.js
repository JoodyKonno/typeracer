const express = require('express');

const app = express();
const server = require('http').createServer(app);

const io = require('socket.io').listen(server);

const Game = require('./Game');
const Player = require('./Player');

const game = new Game();
io.on('connection', (socket) => {
  if (!game.isFull()) {
    game.addPlayer(new Player({
      socketId: socket.id,
    }));

    console.log(`Player ${socket.id} has joined`);
    console.log(`This game has ${game.getPlayerCount()} players`);

    socket.emit('player.joined');

    if (game.isFull()) {
      socket.emit('game.can.start');
    }
  } else {
    console.log('Game session is full');

    socket.emit('game.is.full');
  }

  socket.on('disconnect', () => {
    console.log(`Player ${socket.id} has diconnected`);

    game.removePlayer(socket.id);
    console.log(`This game has ${game.getPlayerCount()} players`);
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
