const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");


const UserSchema = new mongoose.Schema({
    email: {
        type: String, 
        required: true, 
        unique: true, 
        lowercase: true  
    },
    password: {
        type: String, 
        required: true
    }
});

UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();  
    this.password = await bcrypt.hash(this.password, 10);  
    next();  // Devam et
});



const authUser = mongoose.model("authusers", UserSchema, "authusers");

module.exports = authUser;
