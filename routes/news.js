const router = require('express').Router();
const verify = require('../verifyApi');
const Country = require('../models/Country')
const Article = require('../models/Article')
const Language = require('../models/Language')
const Source = require('../models/Source')
const Category = require('../models/Category')



router.get('/everything',verify,async (req, res) => {
   //first check is api is given in route or not

   if(!req.query.apiKey){
      return res.status(401).send({
         "status": "error",
         "code": "apiKeyRequired",
         "message": `Api Key Required`
       })
   }
   if(!req.query.q){
      return res.status(400).send({
         "status": "error",
         "code": "parametersMissing",
         "message": "Required parameters are missing, the scope of your search is too broad. Please set any of the following required parameters and try again: q, qInTitle, sources, domains."
       })
   }

  



})
.get("/sources",verify,async (req,res) => {
   const sources = await Source.find();
   res.status(200).send({status:"ok",sources:sources})
})
.post("/source/add",verify,async (req, res) => {
  
   const {slug,name,description,url,category,language,country} = req.body;

      if(!category){
         return res.status(400).send({status:"Missing Field",code:"MissingField","message":"Category Required"})
      }
      if(!language){
         return res.status(400).send({status:"Missing Field",code:"MissingField","message":"Language Required"})
      }
      if(!country){
         return res.status(400).send({status:"Missing Field",code:"MissingField","message":"Country Required"})
      }


      const cat = await Category.findOne({name:category},{name:1,_id:0});
      const lang = await Language.findOne({name:language},{name:1,_id:0});
      const cty = await Country.findOne({name:country},{name:1,_id:0});


      const newSource = new Source({
         name,
         slug,
         description,
         url,
         category:cat.name,
         language:lang.name,
         country:cty.name
      });

      newSource.save().then(() => {
         return res.status(200).send({message:"New Source Added successfully"});
      }).catch((e)=>{
         console.log(e);
      })


})
.delete("/source/:id",verify,async (req, res)=>{
   const {id} = req.params;

   Source.deleteOne({_id:id}).then(()=>{
      return res.status(200).send({message:"Source Deleted!"})
   })
})
.post("/country/add",verify,async (req, res) => {
   const {name} = req.body;
  // find this name in the country if already there return a error

  const country = await Country.findOne({name:name});
  if(country){
     return res.status(400).send({
        "status": "error",
        "code": "countryAvail",
        "message": "Country provided is already exist provide another one"
      })
  }

   // store it to db

   new Country({
      name:name
   }).save(()=>{
      return res.status(200).send({message:"Country Added"})
   })




})
.post("/language/add",verify,async (req, res) => {
   const {name} = req.body;
   console.log(req.body)
    // find this name in the language if already there return a error

    const language = await Language.findOne({name:name});
    if(language){
       return res.status(400).send({
          "status": "error",
          "code": "languageAvail",
          "message": "Language provided is already exist provide another one"
        })
    }


    // store it to db

   new Language({
      name:name
   }).save(()=>{
      return res.status(200).send({message:"Language Added"})
   })


})
.post("/category/add",verify,async (req, res) => {
   const {name} = req.body;

   // find this name in the category if already there return a error

   const category = await Category.findOne({name:name});
   if(category){
      return res.status(400).send({
         "status": "error",
         "code": "categoryAvail",
         "message": "Category provided is already exist provide another one"
       })
   }

   // store it to db

   new Category({
      name:name
   }).save((category)=>{
      return res.status(200).send({message:"Category Added"})
   })
})


module.exports = router;