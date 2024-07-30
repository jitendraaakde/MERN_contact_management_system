const mongoose = require('mongoose')
const contactSchema = mongoose.Schema({
    user_id:{
        type:String, 
        required:true,
    },
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

module.exports = mongoose.model("Contact", contactSchema);
