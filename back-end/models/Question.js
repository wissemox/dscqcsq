const mongoose = require('mongoose')
//Require schema from mongoose 
const Schema = mongoose.Schema 
//Ceat the user shema 
const QuestionSchema = new Schema({
    Question:{
        type:String,
        required: true
    },
    Catgory:{
        type:String,
        required: true
    },
}); 

module.exports=Question= mongoose.model('Question',QuestionSchema)