const mongoose = require("mongoose");

const subtaskSchema = new mongoose.Schema({
  task_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "task",
    required: true,
  },
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: {
    type: String,
    enum: ["pending", "in_progress", "completed"],
    default: "pending",
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    deafault: null,
  },
});

module.exports = mongoose.model("subtask", subtaskSchema);
