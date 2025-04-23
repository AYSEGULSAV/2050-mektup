const mongoose = require("mongoose");

const SustainabilitySchema = new mongoose.Schema({
    userEmail: { type: String, required: true }, // Kullanıcının mail adresi
     RecycledWaste: { type: Number, required: true },
     FuelConsumption: { type: Number, required: true },
     ElectricityConsumption: { type: Number, required: true },
     ShowerTime: { type: Number, required: true },
     MeatConsumption: { type: Number, required: true },
     ClothesPurchasing: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Sustainability", SustainabilitySchema);
