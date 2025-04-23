const Letter= require('./../Models/letter');



exports.getPublicLetters = async (req, res) => {
    try {
      const publicLetters = await Letter.find({ visibility: "public_anonymous" });
  
      res.status(200).json({
        success: true,
        letters: publicLetters
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Public mektuplar alınırken bir hata oluştu."
      });
    }
  };
  