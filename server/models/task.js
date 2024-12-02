const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    // status: {
    //   type: String,
    //   enum: ["pending", "in_progress", "completed"],
    //   default: "pending",
    // },
    // completed_level: {
    //   type: Number,
    //   required: true,
    // }
  },
  { timestamps: true }
);

module.exports = mongoose.model("task", taskSchema);
