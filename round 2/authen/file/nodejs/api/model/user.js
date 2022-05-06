const  Mongoose  = require("mongoose");
const userSchema = Mongoose.Schema({
    userName:String,
    passWord:String,
    role:{
        type:String,
        default:'2'
    }
})
const userModel = Mongoose.model('userModel',userSchema)

module.exports = userModel