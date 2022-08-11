const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const userSchema = new Schema({
  mail: { type: String, unique: true },
  username: { type: String },
  password: { type: String },
});

module.exports = model("user", userSchema);
