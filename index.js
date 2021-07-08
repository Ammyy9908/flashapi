const express = require('express')
const mongoose = require('mongoose');
const authRouter = require('./routes/auth');
const apiRouter = require('./routes/news');
const cors = require('cors')
const app = express()
app.use(cors())
app.use(express.json())
const port = process.env.PORT || 5000



//routes middlewares

app.use("/auth",authRouter)
app.use("/api",apiRouter)


app.listen(port,()=>{
   //make a db connection

   mongoose.connect('mongodb://127.0.0.1:27017/flashapi',{ useNewUrlParser: true ,useUnifiedTopology: true}).then(()=>{
      console.log(`Appliation started & connected to Database running on ${port}`);
   })
})