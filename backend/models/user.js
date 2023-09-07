const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const userSchema = new Schema({
  mail: { type: String, unique: true },
  username: { type: String },
  password: { type: String },
  friends: [{ type: Schema.Types.Object, ref: "User" }],
});

module.exports = model("User", userSchema);
