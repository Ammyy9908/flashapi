const router = require('express').Router();
const verify = require('../verify');
const User = require('../models/User');
const GoogleUser = require('../models/googleAuth');
const bcrypt = require('bcrypt')
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken')
const crypto = require('crypto');
router.get('/user',verify,async (req, res) => {

   console.log(req.user)
   const {_id} = req.user;

   // find the user from the db 

   const user = await User.findOne({_id: _id},{email:1,apiKey:1,subscription:1})

   res.status(200).send({message:"User authorized",user})
  
})
.post('/reg',[
   check("email","Please Provide Valid email address!").isEmail(),
   check("password","Please provide a password that has length of 6 character long!").isLength({
      min:6
   })

],async (req, res)=>{
   const {email,password,robot,role} = req.body;
   console.log(req.body)
   const errors = validationResult(req);
   if(!robot){
      
      return res.status(400).json({errors:"Please verify you are not robot"})
   }
   if(!errors.isEmpty()){
      return res.status(400).json({errors})
   }

   // verify the user existence inside db

   const user = await User.findOne({email: email});

   if(user){
      return res.status(400).json({error:"user already exist with this email address!"})
   }

   // make a hashed password
   const hashedPassword = await bcrypt.hash(password, 10);

   const key = crypto.randomBytes(16).toString('hex')
   // store it to the db
   new User({
      email,
      password:hashedPassword,
      apiKey:key,
      subscription:{type:role}
   }).save().then(() =>{
      return res.status(200).json({message:"Success"});
   })
  
   

})
.post("/reg/google",async (req, res)=>{
   const {email,avatar} = req.body;
})
.post("/login",[
   check("email","Please Provide Valid email address!").isEmail(),
   check("password","Please provide a password that has length of 6 character long!").isLength({
      min:6
   })
],async (req, res)=>{
   console.log("Login")
   console.log(req.body)
   const {email,password} = req.body;
   const errors = validationResult(req);

   if(!errors.isEmpty()){
      return res.status(400).json({errors})
   }


   // find a user with this email if user then compare its password

   const user = await User.findOne({email: email})

   if(!user){
      return res.status(200).json({error:"No user found with this email address"})
   }

   // compare password

   const isPasswordMatch = await bcrypt.compare(password, user.password);
   if(!isPasswordMatch){
      return res.status(400).send({error:"Invald username & password!"})
   }

   //success then generate a token & send this to the user

   const token = await jwt.sign({_id:user._id},"mySecret")

   res.status(200).send({message:"Logined successfully",token})



})
.post("/login/google",async (req, res)=>{
   const {uid,password} = req.body;
})
.put("/update/email/:id",async (req, res)=>{
   const {email} = req.body;
   const {id} = req.params;
   const user = await User.findOne({_id:id});
   const isUser = await User.findOne({email:email});
   if(!isUser){
      
      const isUpdated = await User.updateOne({_id:id},{email:email});

   if(isUpdated){
      return res.status(200).send({message:"email updated successfully"})
   }
   }
   if(isUser){
      return res.status(400).send({message:"User already exists with this email address"})
   }
   
  

   
})

module.exports = router;