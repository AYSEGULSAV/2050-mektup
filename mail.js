const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'letterto50@gmail.com',  
    pass:'ieru yjoz hjje djqs'        
  }
});

const mailOptions = {
  from: 'letterto50@gmail.com',  
  to: 'aysefat9@gmail.com',  
  subject: 'Test E-postası',  
  text: 'Merhaba, bu bir test e-postasıdır.'  
};


transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.log('Hata:', error);
  } else {
    console.log('E-posta gönderildi:', info.response);
  }
});
