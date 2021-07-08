const {model,Schema}  = require('mongoose');




const UserSchema = new Schema({
   email:{
      type: 'string',
      required: true
   }
   ,
   password:{
      type: 'string',
      required: true
   },
   subscription:{
      type:'object',
      default:{type:"Developer"}
   },
   usage:{
      type:"object"
   },
   apiKey:{
      type:"string"
   }

})

const User = model("User",UserSchema);

module.exports = User;