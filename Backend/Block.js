const crypto = require("crypto");

class Block {
    constructor(timestamp, transactions, previousHash = "", index, hash) {
      this.previousHash = previousHash;
      this.index = index
      this.epoch_timestamp = timestamp;
      this.data = transactions;
      this.hash = hash || this.calculateHash();
    }
  
    calculateHash() {
      return crypto
        .createHash("sha256")
        .update(this.previousHash + this.epoch_timestamp + JSON.stringify(this.data))
        .digest("hex");
    }
  }

  module.exports = Block;