const mongoose = require('mongoose');

const emailIngestionConfigSchema = new mongoose.Schema({
  email: {type: String,required: true,unique: true,},
  type: {type: String,required: true,},
  host: {type: String},
  username: {type: String,required: true},
  password: {type: String,required: true},
  createdAt: {type: Date, default: Date.now},
});

const EmailConfig = mongoose.model('EmailConfig', emailIngestionConfigSchema);

module.exports = EmailConfig;
