const mongoose = require('mongoose')
require('dotenv').config();


const connectDb=async ()=>{
    try{
        const connect = await mongoose.connect(process.env.CONNECTION_STRING)
        console.log('database connected')
    }catch(err){
    console.log(err.message) 
    process.exit(1);   
    }
    
}
module.exports=connectDb;