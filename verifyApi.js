const User = require('./models/User')
module.exports = async (req,res,next)=>{
   if(!req.query.apiKey){
      return res.status(401).send({
         "status": "error",
         "code": "apiKeyRequired",
         "message": `Api Key Required`
       })
   }
    // find the user with this api key if no user found return invalid api error
    const user = await User.findOne({apiKey:req.query.apiKey})
    if(!user) {
       return res.status(401).send({
          "status": "error",
          "code": "apikeyInvalid",
          "message": `Your API key is invalid or incorrect. Check your key by login to your flashapi or Create a new one by Regsitering`
        })
    }

    next()
}