const mongoose = require("mongoose");

const subtaskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "in_progress", "completed"],
      default: "pending",
    },
    taskId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
      required: true,
    }, // Reference to the Task
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Optional: if subtasks can be assigned to users
  },
  { timestamps: true }
);

module.exports = mongoose.model("Subtask", subtaskSchema);
