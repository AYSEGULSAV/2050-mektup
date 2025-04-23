const express=require('express');
const authController=require('./../Controllers/authController');
const questionController=require("./../Controllers/questionController");
const letterMapController=require("./../Controllers/letterMapController")
const letterController=require('./../Controllers/letterController');
const sustainabilityController=require('./../Controllers/sustainbilityController');
const adminController=require('./../Controllers/adminController');
const readController=require('./../Controllers/public lettersController');
const { route } = require('../app');
const session = require('express-session');
const mongoose = require('mongoose');
 const sustainabilityData=require("./../Models/sustainability");


const router=express.Router();




router.post('/send-password', authController.sendPassword);
router.post('/verify-password', authController.verifyPassword);
router.post("/save-sustainability-data",sustainabilityController.saveOrUpdateSustainabilityData )
  
router.get("/get-sustainability-data", sustainabilityController.getSustainabilityData);





 router.post('/question/add-questions', questionController.addQuestions);


router.get('/logout',authController.logout);



 router.get('/question/quiz',questionController.getRandomQuestions);


router.post('/send-letter', letterController.createLetter); 
router.get('/check-session',letterController.checkSession)
 router.get('/letterMap',letterMapController.getLetters);
     
        

 router.get('/admin/stats',adminController.getAdminStats);
 
 router.post('/admin/send-letter',adminController.sendLetterToUser);

 router.get('/public-letters',readController.getPublicLetters)
 


 module.exports =router;