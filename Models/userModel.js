const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "İsminizi giriniz"],
  },
  email: {
    type: String,
    required: [true, "emailinizi giriniz "],
    lowercase: true,
    unique: true,
    validate: [validator.isEmail, "Geçerli bir email giriniz"],
  },
  password: {
    type: String,
    required: [true, "Şifrenizi giriniz"],
    minlength: 6,
  },
  confirmPassword: {
    type: String,
    required: [true, "Şifrenizi doğrulayınız"],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "Passwords do not match",
    },
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  this.confirmPassword = undefined;
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
