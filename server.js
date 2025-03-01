 const  app=require('./app');
 const mongoose = require('mongoose'); 
 const dotenv=require('dotenv');
 dotenv.config({path: './config.env'});

 mongoose.connect(process.env.CONN_STR,{
    useNewUrlParser: true,
   
 }).then(()=>{
 console.log('DB connection successful');
 }).catch((err)=>{
    console.log('DB connection error:',err);
 })

 app.get("/", (req, res) => {
   res.send("Server is running!");
 });
 
 app.post("/api/mektup", (req, res) => {
   res.json({ message: "Mektup başarıyla alındı!" });
 });
 


  const port= process.env.PORT || 8080;
   app.listen(port,()=>{
    console.log("server has started...");
   });