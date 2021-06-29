const mongoose = require('mongoose')
//Require schema from mongoose 
const Schema = mongoose.Schema 
//Ceat the user shema 
const CatgorySchema = new Schema({
    Catgory:{
        type:String,
        required: true
    },
}); 

module.exports=Catgory= mongoose.model('Catgory',CatgorySchema)