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

  addScore(score) {
    this.players = this.players.map((player) => {
      if (player.socketId === score.socketId) {
        player.setScore(score);
      }
      return player;
    });
  }

  removePlayer(socketId) {
    this.players = this.players.filter(player => player.socketId !== socketId);
  }

  isFull() {
    return this.getPlayerCount() >= 2;
  }

  isFinished() {
    return this.getScoreCount() === this.getPlayerCount();
  }

  getPlayerCount() {
    return this.players.length;
  }

  getScoreCount() {
    return this.players
      .filter(player => Object.keys(player.score).length)
      .length;
  }
};
