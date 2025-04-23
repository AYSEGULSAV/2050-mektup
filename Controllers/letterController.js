const Letter= require('./../Models/letter');
const nodemailer = require('nodemailer');

const EMAIL = "letterto50@gmail.com";
const EMAIL_PASS = "ieru yjoz hjje djqs";



exports.createLetter = async (req, res) => {
  try {
    const { message, email, visibility, deliveryTime } = req.body;


    const deliveryDate = new Date(deliveryTime);

    if (isNaN(deliveryDate.getTime())) {
      return res.status(400).json({ success: false, message: "Geçersiz tarih formatı." });
    }

    const newLetter = new Letter({
      message,
      email,
      visibility,
      deliveryTime: deliveryDate,
      status: 'pending',
      createdAt: new Date(),
    });

    await newLetter.save();

    res.status(201).json({ success: true, message: "Mektup başarıyla kaydedildi!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Bir hata oluştu." });
  }
};




exports.checkSession = (req, res) => {
  try {

    if (!req.session || !req.session.userId) {
      return res.status(401).json({ success: false, message: 'Oturum geçersiz veya açık değil.' });
    }

  
    return res.status(200).json({ 
      success: true, 
      message: 'Oturum geçerli.', 
      user: req.session.userId 
    });
  } catch (error) {
    console.error('Session check error:', error);
    return res.status(500).json({ success: false, message: 'Bir hata oluştu.' });
  }
};
