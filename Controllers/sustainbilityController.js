const { use } = require('../Routers/userRouters');
const SustainabilityData = require('./../Models/sustainability');

// Verileri kaydetme
exports.saveSustainabilityData = async (req, res) => {
    const { carbonFootprint, electricityUsage, waterUsage, recyclingRate, renewableEnergyUsage, foodWaste } = req.body;
    const userEmail = req.session.email;
    console.log('Sessionmail:',userEmail );

    if (!userEmail) {
        return res.status(401).send("Please log in first.");
    }

    const newSustainabilityData = new SustainabilityData({
        userEmail,
        carbonFootprint,
        electricityUsage,
        waterUsage,
        recyclingRate,
        renewableEnergyUsage,
        foodWaste,
    });

    try {
        await newSustainabilityData.save();
        res.status(201).send("Sustainability data saved!");
    } catch (error) {
        res.status(500).send("Error saving sustainability data.");
    }
};

// Kullanıcının verilerini alma
exports.getSustainabilityData = async (req, res) => {
    const userEmail = req.session.email;

    if (!userEmail) {
        return res.status(401).send("Please log in first.");
    }

    try {
        const data = await SustainabilityData.find({ userEmail }).sort({ createdAt: -1 });
        res.status(200).json(data);
    } catch (error) {
        res.status(500).send("Error fetching sustainability data.");
    }
};
