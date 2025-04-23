const express=require('express');
const app =express();
const userRouter=require('./Routers/userRouters');
const path = require("path");
const bodyParser = require('body-parser');
const cors = require("cors");
const session = require("express-session");
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const MongoStore = require('connect-mongo');
const cookieParser = require("cookie-parser");


app.use(express.static(path.join(__dirname, "./View"))); 
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized:true, 
  store: MongoStore.create({
    mongoUrl: process.env.CONN_STR, 
    collectionName: 'sessions', 

}),
  cookie: {
    maxAge: 1000 * 60 * 60, 
    httpOnly: true,
    secure: false, 
    sameSite: 'Lax', 
  
  }
}));

app.use(
  cors({
    origin: "http://127.0.0.1:5500",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.set('trust proxy', 1);

app.use('/api/v1',userRouter);

;
app.use((err, req, res, next) => {
  console.error(err.stack); 
  res.status(500).send('Bir şeyler yanlış gitti!'); 
});






module.exports=app;


