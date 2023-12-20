require('dotenv').config();
const express = require('express');
const app=express();
const mongoose=require('mongoose');
const port=process.env.PORT || 5000;
const user_router=require('./routes/userRoute');
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','*');
    res.setHeader('Access-Control-Allow-Headers','*');
    next();
})
app.use('/api/user',user_router)
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    app.listen(port,()=>{
        console.log(`server is running on port ${port}`)
    })
})
.catch((err)=>console.log(err))