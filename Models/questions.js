const mongoose=require("mongoose");

const questionSchema=new mongoose.Schema({
    questionText:String,
    options:[String],
    correctAnswer:String
})
const question=mongoose.model("question",questionSchema)
 module.exports=question;