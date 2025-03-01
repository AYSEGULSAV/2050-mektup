const express=require('express');
const userController=require('../Controllers/userController');
const loginController = require("./../Controllers/loginController");
const questionController=require("./../Controllers/questionController")
const createLetter  = require('./../Controllers/letterController');
const { route } = require('../app');
const router=express.Router();


router.route('/signup').post(userController.createUser);

router.route('/login').post(loginController.loginUser);


 router.post('/add-questions', questionController.addQuestions);
 // Mektup kaydetme endpoint'i
router.post('/write', createLetter);

 router.get('/quiz',questionController.getRandomQuestions);
                   
                  

 module.exports =router;