const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
  text: { type: String, required: true },
  members: { type: mongoose.Schema.Types.ObjectId, ref: "user", require: true },
});

module.exports = mongoose.model("report", reportSchema);
