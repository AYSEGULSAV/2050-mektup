const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { 
        type: String, 
        required: true, 
        unique: true, // Her e-posta benzersiz olmalı
        lowercase: true, // E-posta küçük harfe dönüştürülür
        trim: true // Başındaki ve sonundaki boşluklar temizlenir
    },
    password: { 
        type: String, 
        required: true 
    }
});

module.exports = mongoose.model('User', userSchema);
