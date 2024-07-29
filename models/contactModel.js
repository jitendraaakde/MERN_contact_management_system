const mongooose = require('mongoose')
const contactSchema = mongooose.Schema({
    name:{
        type:String,
        required:true,
    }, email :{
        type:String,
        required:true,
    }, phone:{
        type:Number,
        required:true,  
    }
},
{
    Timestamp:true
})