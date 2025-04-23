const User = require('./../Models/userModel');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const session = require('express-session');

const EMAIL = "letterto50@gmail.com";
const EMAIL_PASS = "ieru yjoz hjje djqs";

exports.sendPassword = async (req, res) => {

    const { email } = req.body;
    if (!email) return res.send("E-posta adresi gereklidir.");

    let user = await User.findOne({ email });

    const password = crypto.randomBytes(4).toString('hex'); 
    const hashedPassword = await bcrypt.hash(password, 10); 

    if (user) {
        user.password = hashedPassword; 
    } else {
        user = new User({ email, password: hashedPassword }); 
    }
    await user.save();
 
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: { user: EMAIL, pass: EMAIL_PASS }
    });

    await transporter.sendMail({
        from: EMAIL,
        to: email,
        subject: 'Your Login Password',
        text: `Your new password: ${password}` 
    });


    if (!req.session.email) {
        req.session.email = email;
        console.log("Session Email:", req.session.email);
    }

 
    req.session.save((err) => {
        if (err) {
            console.error('Session save error:', err);
            return res.status(500).send('Session save failed.');
        }
        console.log("Session Email saved:", req.session.email);
        res.send('New password sent to your email!'); 
    });
}; 

exports.verifyPassword = async (req, res) => {
    const { password } = req.body;
    console.log("Checking Session Email:", req.session.email);
    const email = req.session.email;

    if (!email) return res.send("Session expired. Please request a new password.");

    const user = await User.findOne({ email });

    if (!user) return res.send("User not found!");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.send("Incorrect Password!");

    
    req.session.user = user; 
   



        req.session.email = email; 
        req.session.save((err) => {
            if (err) {
                console.error('Session save error:', err);
                return res.status(500).send('Session save failed.');
            }

            console.log("New session started for:", email);
            res.send("Login successful!");  
        });
    
};


exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Logout hatası:', err);
            return res.status(500).send('Oturum sonlandırılamadı.');
        }
        res.clearCookie('connect.sid');
        res.send('Çıkış başarılı');
    });
};

