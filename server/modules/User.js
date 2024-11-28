const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
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
});

module.exports = User = mongoose.model("users", UserSchema);
