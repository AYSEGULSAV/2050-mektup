const Letter= require('./../Models/letter');


// Yeni mektup kaydetme fonksiyonu
exports.createLetter=async(req,res)=>{
  try{
     const { message,email,visibility,deliveryTime}=req.body;
  
  // Mektubu kaydet
  const newLetter=new Letter({
    message,
    email,
    visibility,
    deliveryTime:new Date(deliveryTime),

  });
   await newLetter.save();
   res.status(201).json({ success: true, message: "Mektup başarıyla kaydedildi!" });
}catch (error) {
    res.status(500).json({ success: false, message: "Bir hata oluştu." });
  }
};