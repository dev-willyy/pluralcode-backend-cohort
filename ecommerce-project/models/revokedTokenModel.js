const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const revokedTokenSchema = new Schema({
  token: {
    type: String,
    required: true,
    unique: true,
  },
});

const RevokedToken = model('RevokedToken', revokedTokenSchema);

module.exports = RevokedToken;
