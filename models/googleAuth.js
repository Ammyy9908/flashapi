const {model,Schema}  = require('mongoose');




const GoogleAuthSchema = new Schema({
   email:{
      type: 'string',
      required: true
   }
   ,
   subscription:{
      type:'object',
   }

})

const GoogleUser = model("GoogleUser",GoogleAuthSchema);

module.exports = GoogleUser;