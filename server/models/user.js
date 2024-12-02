const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    avatar: { type: String, default: "" },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["leader", "member", "admin"],
      default: "member",
    },
    status: {
      currentStatus: {
        type: String,
        enum: ["working", "patient", "penalty"],
        default: "working",
      },
      currentEarning: { type: String, default: 0 },
      expectedEarning: { type: String, default: 0 },
    },
    // groupId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "group",
    //   default: null,
    // },
    allowed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", userSchema);
