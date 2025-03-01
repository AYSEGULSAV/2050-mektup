const authUser = require("./../Models/loginUser");
const bcrypt = require("bcryptjs");

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        console.log("Gelen email:", email);
        console.log("Gelen şifre:", password);

        // Kullanıcıyı email ile `authuser` koleksiyonunda bul
        const user = await authUser.findOne({ email: email.toLowerCase() });

        console.log("Veritabanından gelen kullanıcı:", user);

        if (!user) {
            console.log("Kullanıcı bulunamadı!");
            return res.status(400).json({ message: "Email veya şifre hatalı." });
        }

        console.log("Veritabanındaki şifre:", user.password);

        // Şifreyi doğrula
        const isMatch = await bcrypt.compare(password, user.password);
        console.log("Şifre karşılaştırma sonucu:", isMatch);

        if (!isMatch) {
            console.log("Şifre eşleşmiyor!");
            return res.status(400).json({ message: "Email veya şifre hatalı." });
        }

        console.log("Giriş başarılı!");
        res.status(200).json({ message: "Giriş başarılı!", user });

    } catch (error) {
        console.error("Sunucu hatası:", error);
        res.status(500).json({ message: "Sunucu hatası." });
    }
};
