const mongoose = require('mongoose')
//Require schema from mongoose 
const Schema = mongoose.Schema 
//Ceat the user shema 
const InscraptionSchema = new Schema({
    name:{
        type:String,
        required: true
    },
    Pernom:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true,
    },
    telephone:{
        type:Number,
        required: true
    },
}); 

module.exports=Inscraption= mongoose.model('Inscraption',InscraptionSchema)