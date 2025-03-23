const nodemailer = require('nodemailer');

// Gmail ile SMTP bağlantısı oluşturma
const transporter = nodemailer.createTransport({
  service: 'gmail', // Gmail servisini kullanıyoruz
  auth: {
    user: 'letterto50@gmail.com',  // Gönderen e-posta adresiniz
    pass:'ieru yjoz hjje djqs'        // Gmail uygulama şifreniz
  }
});

// E-posta içeriği
const mailOptions = {
  from: 'letterto50@gmail.com',  // Gönderen e-posta adresi
  to: 'aysefat9@gmail.com',  // Alıcı e-posta adresi
  subject: 'Test E-postası',  // E-posta konusu
  text: 'Merhaba, bu bir test e-postasıdır.'  // E-posta içeriği
};

// E-posta gönderme
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.log('Hata:', error);
  } else {
    console.log('E-posta gönderildi:', info.response);
  }
});
