const User = require('./../Models/userModel');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const session = require('express-session');

const EMAIL = "letterto50@gmail.com";
const EMAIL_PASS = "ieru yjoz hjje djqs";


// Kullanıcıya giriş şifresi gönder (her girişte değişiyor)
exports.sendPassword = async (req, res) => {
    const { email } = req.body;
    if (!email) return res.send("E-posta adresi gereklidir.");

    let user = await User.findOne({ email });

    const password = crypto.randomBytes(4).toString('hex'); // Yeni şifre oluştur
    const hashedPassword = await bcrypt.hash(password, 10); // Şifreyi hash'le

    if (user) {
        user.password = hashedPassword; // Mevcut kullanıcıya yeni şifre ata
    } else {
        user = new User({ email, password: hashedPassword }); // Yeni kullanıcı oluştur
    }
    await user.save();

    // E-posta gönder
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: { user: EMAIL, pass: EMAIL_PASS }
    });

    await transporter.sendMail({
        from: EMAIL,
        to: email,
        subject: 'Your Login Password',
        text: `Your new password: ${password}` // Kullanıcıya yeni şifreyi gönder
    });

    // Eğer oturumda kullanıcı bilgisi yoksa, kaydediyoruz
    if (!req.session.email) {
        req.session.email = email;
        console.log("Session Email:", req.session.email);
    }

    // Session kaydetme işlemi
    req.session.save((err) => {
        if (err) {
            console.error('Session save error:', err);
            return res.status(500).send('Session save failed.');
        }
        console.log("Session Email saved:", req.session.email);
        res.send('New password sent to your email!'); // Bu kısım sadece session kaydedildikten sonra çağrılır
    });
};


// Kullanıcı giriş yaparken şifreyi doğrula
exports.verifyPassword = async (req, res) => {
    const { password } = req.body;
    const email = req.session.email;

    if (!email) return res.send("Session expired. Please request a new password.");

    const user = await User.findOne({ email });

    if (!user) return res.send("User not found!");

    // Hash'lenmiş şifreyi karşılaştır
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.send("Incorrect Password!");

    // Başarılı giriş, oturumda kullanıcı bilgisi saklanabilir (otomatik olarak yapılmış olmalı)
    req.session.user = user; // İstenirse oturuma user bilgisi kaydedilebilir.
    res.send("Login successful!");
};
