
const SustainabilityData = require('./../Models/sustainability');

exports.saveOrUpdateSustainabilityData = async (req, res) => {
    if (!req.session.email) {
        return res.status(401).json({ message: "Unauthorized. Please log in." });
    }

    const userEmail = req.session.email;
    const { RecycledWaste, FuelConsumption, ElectricityConsumption, ShowerTime, MeatConsumption, ClothesPurchasing } = req.body;

    if (
        RecycledWaste === undefined || 
        FuelConsumption === undefined || 
        ElectricityConsumption === undefined || 
        ShowerTime === undefined || 
        MeatConsumption === undefined || 
        ClothesPurchasing === undefined
    ) {
        return res.status(400).json({ message: "All fields are required." });
    }

    try {
      
        const updatedData = await SustainabilityData.findOneAndUpdate(
            { userEmail }, 
            { 
                RecycledWaste,
                FuelConsumption,
                ElectricityConsumption,
                ShowerTime,
                MeatConsumption,
                ClothesPurchasing,
                createdAt: new Date() 
            },
            { new: true, upsert: true } 
        );

        res.status(200).json({ message: "Data saved successfully.", data: updatedData });
    } catch (error) {
        console.error("Error saving/updating sustainability data:", error);
        res.status(500).json({ message: "Error saving/updating sustainability data.", error });
    }
};




exports.getSustainabilityData = async (req, res) => {
    if (!req.session.email) {
        return res.status(401).json({ message: "Unauthorized. Please log in." });
    }

    const userEmail = req.session.email;

    try {
        const data = await SustainabilityData.find({ userEmail }).sort({ createdAt: -1 });

        if (!data || data.length === 0) {
            return res.status(200).json({ message: "No sustainability data found.", data: [] });
        }

        res.status(200).json({ message: "Sustainability data fetched successfully.", data });
    } catch (error) {
        console.error("Error fetching sustainability data:", error);
        res.status(500).json({ message: "Error fetching sustainability data.", error });
    }
};
