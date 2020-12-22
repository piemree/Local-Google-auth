const mongoose=require('mongoose')
const schema=mongoose.Schema
 
const userSchema=new schema({
    username:{
        type:String,
        required:true
    },
    googleId:{
        type:String,
        required:true
    }
})

const User=mongoose.model('googleUser',userSchema);

module.exports=User