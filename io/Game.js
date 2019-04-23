const { GameIsFullError } = require('./CustomErrors');

module.exports = class Game {
  constructor() {
    this.players = [];
    this.maxPlayers = 2;
  }

  addPlayer(player) {
    if (this.isFull()) {
      throw new GameIsFullError(`This game does not accept more than ${this.maxPlayers} players`);
    }

    this.players.push(player);
  }

  removePlayer(socketId) {
    this.players = this.players.filter(player => player.socketId !== socketId);
  }

  isFull() {
    return this.getPlayerCount() >= 2;
  }

  getPlayerCount() {
    return this.players.length;
  }
};
