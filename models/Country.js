const {model,Schema}  = require('mongoose');


const CountrySchema = new Schema({
  name:{
   type: 'string',
   required:true,
  },
  

},{ versionKey: false })


const Country = model("countries",CountrySchema);

module.exports = Country;