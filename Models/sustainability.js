const mongoose = require("mongoose");

const SustainabilitySchema = new mongoose.Schema({
    userEmail: { type: String, required: true }, // Kullanıcının mail adresi
    carbonFootprint: { type: Number, required: true },
    electricityUsage: { type: Number, required: true },
    waterUsage: { type: Number, required: true },
    recyclingRate: { type: Number, required: true },
    renewableEnergyUsage: { type: Number, required: true },
    foodWaste: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Sustainability", SustainabilitySchema);
