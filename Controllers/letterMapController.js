const Letter=require('./../Models/letter')

exports.getLetters = async (req, res) => {
    try {
      const letters = await Letter.find();
      res.status(200).json(letters); 
    } catch (error) {
      console.error("Mektuplar alınırken hata oluştu:", error);
      res.status(500).json({ message: "Mektuplar alınamadı." });
    }
  };
  