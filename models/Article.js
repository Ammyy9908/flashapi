const {model,Schema}  = require('mongoose');




const ArticleSchema = new Schema({
   source:{
      type:"object",
      required:true
   },
   author:{
      type:"string",
      default:null
   },
   title:{
      type:"string",
      required:true
   },
   description:{
      type:"string",
      required:true
   },
   url:{
      type:"string",
      required:true
   },
   image:{
      type:"string",
      default:null
   },
   publishedAt:{
      type:"string",

   },
   content:{
      type:"string",
      required:true
   }
   
  

},{ versionKey: false })

const Article = model("articles",ArticleSchema);

module.exports = Article;