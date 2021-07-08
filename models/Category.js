const {model,Schema}  = require('mongoose');


const CategorySchema = new Schema({
  name:{
   type: 'string',
   required:true,
  },
  

},{ versionKey: false })


const Category = model("categories",CategorySchema);

module.exports = Category;