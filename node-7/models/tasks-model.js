const mongoose = require("mongoose");
const { Schema } = mongoose;

const taskSchema = new Schema({
  title: { type: String, required: true },
  status: { type: Boolean, required: true },
  date: { type: Date, default: Date.now, required: true },
});

exports.Task = mongoose.model("tasks", taskSchema);
