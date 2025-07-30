const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  username: { type: String, required: [true, "User name is required! "], maxLength: [16, "Username name should be of maximum 16 digits"] },
  password: { type: String, minLength: 6, required: true },
});

exports.User = mongoose.model("User", userSchema);