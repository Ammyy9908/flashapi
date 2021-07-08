const {model,Schema}  = require('mongoose');


const SourceSchema = new Schema({
  name:{
   type: 'string',
   required:true,
  },
  slug:{
     type: 'string',
     required:true,
  },
  description:{
     type: 'string',
     required:true
  },
  url:{
     type: 'string',
     required:true
  },
  category:{
     type: 'string',
     required:true
  },
  language:{
     type: 'string',
     required:true
  },
  country:{
     type: 'string',
     required:true
  }

},{ versionKey: false })





const Source = model("source",SourceSchema);

module.exports = Source;