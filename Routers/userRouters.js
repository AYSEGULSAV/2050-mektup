const express=require('express');
const authController=require('./../Controllers/authController');
const questionController=require("./../Controllers/questionController");
const letterMapController=require("./../Controllers/letterMapController")
const letterController=require('./../Controllers/letterController');
const sustainabilityController=require('./../Controllers/sustainbilityController');
const { route } = require('../app');
const session = require('express-session');
const mongoose = require('mongoose');



const router=express.Router();




// E-posta ile şifre gönderme
router.post('/send-password', authController.sendPassword);
router.post('/verify-password', authController.verifyPassword);

router.post("/save-sustainability-data", (req, res) => {
  // Eğer session'da email yoksa, yetkilendirilmemiş hata döndür.
  if (!req.session.email) {
    
      return res.status(401).json({ message: "Unauthorized. Please log in." });
  }

  // Önce veritabanındaki veriyi alalım, eğer varsa
  SustainabilityData.find({ userEmail: req.session.email })
    .then(existingData => {
      if (existingData.length > 0) {
        // Eğer veriler zaten varsa, onları geri gönderelim
        return res.json(existingData);
      } else {
        // Eğer veriler yoksa, yeni veri kaydedelim
        sustainabilityController.saveSustainabilityData(req, res);
      }
    })
    .catch(err => res.status(500).json({ message: "Error retrieving data.", error: err }));
});


router.get("/get-sustainability-data", sustainabilityController.getSustainabilityData);



 router.post('/question/add-questions', questionController.addQuestions);
// Sürdürülebilirlik verilerini kaydet




 router.get('/question/quiz',questionController.getRandomQuestions);

 // Mektup kaydetme endpoint'i
router.post('/send-letter', letterController.createLetter); 
 router.get('/letterMap',letterMapController.getLetters);
                  

 module.exports =router;