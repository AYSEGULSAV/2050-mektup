const express=require('express');
const app =express();
const userRouter=require('./Routers/userRouters');
const path = require("path"); 

 const cors = require("cors");
 
app.use(cors({
  origin: "http://127.0.0.1:5500", // Frontend'in çalıştığı URL
  methods: ["GET", "POST", "PUT", "DELETE"], // İzin verilen HTTP metodları
  credentials: true, // Kimlik bilgilerini (çerezler, oturumlar) göndermek için
}));


app.use(express.json());

app.use(express.static(path.join(__dirname, "./View"))); 
app.use(express.urlencoded({ extended: true })); // Form verisini almayı sağlar
app.use('/api/v1/users',userRouter);
app.use("/api/v1/auth",userRouter);
app.use('/api/v1/questions',userRouter);
app.use('/api/v1/letter',userRouter);


module.exports=app;


