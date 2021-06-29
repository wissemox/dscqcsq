const mongoose = require('mongoose')
//Require schema from mongoose 
const Schema = mongoose.Schema 
//Ceat the user shema 
const VideSchema01 = new Schema({
    name:{
        type:String,
        required: true
    },
    email:{
        type:String , 
        required:true
    },
    Catgory:{
        type:String,
        required: true
    },
    vide:{
        type:String, 
        required:true
    }
}); 

module.exports=Vide01= mongoose.model('Vide01',VideSchema01)