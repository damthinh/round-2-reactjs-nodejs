const  Mongoose  = require("mongoose");

const todoSchema = Mongoose.Schema({
    userName:String,
    passWord:String,
    email:String,
    role:{
        type:String,
        default:'2'
    }
})
const userModel = Mongoose.model('userModel',todoSchema)
module.exports = userModel