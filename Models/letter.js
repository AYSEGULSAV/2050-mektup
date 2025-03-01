const mongoose=require("mongoose");

const letterSchema=new mongoose.Schema({
 
    content:{type:String,require:true},
    createdAt: { type: Date, default: Date.now }, // Otomatik tarih
    country: { type: String } // Kullanıcının ülkesi (IP ile alınacak)
})
 const Letter= mongoose.model('Letter',letterSchema);
 module.exports=Letter;