
const express = require('express');
// eslint-disable-next-line new-cap
const multer = require('multer')
const router = express.Router();
const inscraption = require('../models/inscraption')
const Question01 = require('../models/Question')
const Catgory01 = require('../models/Catgory')
const Vide01 =require('../models/Vide01')
// route /admin/users/
const storage=multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null , "../front-end/public")
    }, 
    filename:(req,file,callback)=>{
        callback(null , file.originalname)
    }
})
const upload = multer({storage:storage})

// Vide Upload
router.post('/VideTest',upload.single("articleImage"),async(req,res)=>{
    const name=req.body.name
    const email =req.body.email
    const Catgory =req.body.Catgory
    try{
      
        const VideProduct = new Vide01({name , email ,Catgory,vide:req.file.filename, 
        }); 
        await VideProduct.save();
        return res.json({msg:"Product add"}) 
    //  return console.log(req.file.filename)
     
       
 //    {console.log(req.file.originalname)}
       
 //    {console.log(Name)}
       
    
    }catch(error){
     console.log(error)
    }
   
   
 })

 router.get('/VideTest',async(req,res)=>{
  
    try{
      const VideGet =  await Vide01.find()
      return res.json({msg:"Get all data" , VideGet})
    //  return console.log(req.file.filename)
     
       
 //    {console.log(req.file.originalname)}
       
 //    {console.log(Name)}
       
    
    }catch(error){
     console.log(error)
    }
   
   
 })
// Inscraption
router.post('/ADD',async(req,res)=>{
    const{name,Pernom,email,telephone}=req.body; 

    try{
        if(!name || !Pernom || !email || !telephone ){
            return res.json({Error :'Plese enter all fild'})
            
    }
    if (email.indexOf('@') === -1) {
        return res.json({Error :'Plese enter all Realmail'})
    }
        const NewInscraption = new inscraption({name , Pernom , email , telephone}); 
        await NewInscraption.save();
        return res.json({msg:"done"})

    }catch(error){
      console.log(error)
    }
  
})

// Question

router.post('/Question',async(req,res)=>{
    const{Question,Catgory}=req.body; 

    try{
        if(!Question || !Catgory  ){
            return res.json({Error :'Plese enter all fild'})
            
    }
   
        const NewInscraption = new Question01({Question , Catgory }); 
        await NewInscraption.save();
        return res.json({msg:"done"})

    }catch(error){
      console.log(error)
    }
  
})

router.get('/Question',async(req,res)=>{
     

    try{
      
        const Questiond = await Question.find()
        return res.json({msg:"done" , Questiond})

    }catch(error){
      console.log(error)
    }
  
})
// Catogory
router.post('/Catgory',async(req,res)=>{
    const{Catgory}=req.body; 

    try{
        if(!Catgory){
            return res.json({Error :'Plese enter all fild'})
            
    }
   
        const NewCatgory = new Catgory01({Catgory }); 
        await NewCatgory.save();
        return res.json({msg:"done"})

    }catch(error){
      console.log(error)
    }
  
})
router.get('/Catgory',async(req,res)=>{
    const{Catgory}=req.body; 

    try{
       
        const AllCatgory = await Catgory01.find()
        return res.json({msg:"done" , AllCatgory})

    }catch(error){
      console.log(error)
    }
  
})
module.exports = router;
