const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["leader", "member"], default: "member" },
    status: {
      currentStatus: {
        type: String,
        enum: ["working", "patient", "penalty"],
        default: "working",
      },
      currentEarning: { type: Number, default: 0 },
      expectedEarning: { type: Number, default: 0 },
    },
    groupId: { type: mongoose.Schema.Types.ObjectId, ref: "Group" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
