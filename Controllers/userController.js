const User = require("../Models/userModel");
const AuthUser = require("../Models/loginUser"); 

exports.createUser = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  try {
    // Kullanıcı zaten var mı diye kontrol ediyoruz
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Yeni bir kullanıcı oluşturuyoruz
    const user = await User.create({
      name,
      email,
      password,
      confirmPassword,  // Bu değer modelde yer alıyor ama kaydedilmeden doğrulama yapılacak
    });


    // AuthUser koleksiyonuna sadece email ve şifreyi kaydediyoruz
   const authUser = new AuthUser({
          email,
          password, // şifreyi hashlemiş şekilde kaydediyoruz
        });
        await authUser.save();  // authusers koleksiyonuna kaydediyoruz
    
        res.status(201).json({
      message: "User created successfully!",
      user: user,
    });


  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};
