const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// User şemasını oluşturuyoruz
const UserSchema = new mongoose.Schema({
    email: {
        type: String, 
        required: true, 
        unique: true, 
        lowercase: true  // Email'i küçük harflerle saklamak için
    },
    password: {
        type: String, 
        required: true
    }
});

// Şifreyi hashleme
UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();  // Eğer şifre değiştirilmemişse, hashleme işlemi yapılmaz
    this.password = await bcrypt.hash(this.password, 10);  // Şifreyi hashliyoruz
    next();  // Devam et
});



// Koleksiyon adı "authusers" olarak belirlenmeli
const authUser = mongoose.model("authusers", UserSchema, "authusers");
// Modeli dışarı aktarıyoruz
module.exports = authUser;
