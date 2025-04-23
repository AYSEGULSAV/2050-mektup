const mongoose = require("mongoose");

const LetterSchema = new mongoose.Schema({
  message: { type: String, required: true },
  email: { type: String, required: true },
  visibility: { type: String, enum: ["private", "public_anonymous"], required: true },
  deliveryTime: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
  status: { type: String, enum: ["pending", "sent"], default: "pending" },

});

module.exports = mongoose.model("Letter", LetterSchema);
