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

app.use(express.static(path.join(__dirname, "./View"))); // Statik dosyalar
app.use(express.json()); // JSON verileri parse et
app.use(express.urlencoded({ extended: true }));
 // Form verilerini parse et
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false, 
  store: MongoStore.create({
    mongoUrl: process.env.CONN_STR, // MongoDB bağlantı URL
    collectionName: 'sessions', // Oturumlar için koleksiyon adı
    ttl: 1 * 24 * 60 * 60, // Oturumun yaşam süresi (14 gün)
}),
  cookie: {
    httpOnly: true,
    secure: false, // HTTPS kullanıyorsanız bunu true yapın
    sameSite: 'Lax', // CORS için cookie paylaşımına izin verir
  
  }
}));

app.use(
  cors({
    origin: "http://127.0.0.1:5500",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
// Proxy arkasında çalışıyorsak, istemcinin gerçek IP'sini doğru algıla
app.set('trust proxy', 1);

app.use('/api/v1',userRouter);
// Kullanıcı session'daki bilgileri almak için
;
app.use((err, req, res, next) => {
  console.error(err.stack); // Hata ayrıntılarını terminale yazdır
  res.status(500).send('Bir şeyler yanlış gitti!'); // Kullanıcıya genel hata mesajı gönder
});


// Oturum yönetimi




module.exports=app;


