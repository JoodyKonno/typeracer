module.exports = class PlayerScore {
  constructor({ socketId, charsPerSecond }) {
    this.socketId = socketId;
    this.charsPerSecond = charsPerSecond;
  }
};
