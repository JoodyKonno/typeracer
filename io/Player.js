module.exports = class Player {
  constructor({ socketId }) {
    this.socketId = socketId;
    this.score = {};
  }

  setScore(score) {
    this.score = score;
  }
};
