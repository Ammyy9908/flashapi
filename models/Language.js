const {model,Schema}  = require('mongoose');


const LanguageSchema = new Schema({
  name:{
   type: 'string',
   required:true,
  },
  

},{ versionKey: false })




const Language = model("language",LanguageSchema);

module.exports = Language;