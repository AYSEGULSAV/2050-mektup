const Letter = require('./../Models/letter');
const getCountryFromIP = require('./../utils/getCountry');

const createLetter = async (req, res) => {
  try {
    const {  content } = req.body;
    if ( !content) {
      return res.status(400).json({ message: "Başlık ve içerik zorunludur." });
    }

    // Kullanıcının IP adresini al
    const ip = req.headers['x-forwarded-for']?.split(',')[0] || req.socket.remoteAddress;
    console.log("Kullanıcının IP adresi:", ip); // 🔍 Bunu terminalde kontrol et!
    
    const country = await getCountryFromIP(ip);

    // Yeni mektubu oluştur
    const newLetter = new Letter({  content, country });
    await newLetter.save();

    res.status(201).json(newLetter);
  } catch (error) {
    console.error("Mektup kaydedilirken hata oluştu:", error);
    res.status(500).json({ message: "Mektup kaydedilemedi." });
  }
};

module.exports = createLetter ;
