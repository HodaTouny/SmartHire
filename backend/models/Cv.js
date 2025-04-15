const mongoose = require('mongoose');

const cvSchema = new mongoose.Schema({
  fileId: String,
  driveLink: String,
  score: Number,
  provider: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Cv', cvSchema);
