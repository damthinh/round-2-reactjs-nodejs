const  mongoose  = require("mongoose");

const todoSchema = mongoose.Schema({
    name:{
        type:String
    }
})
const todoMode = mongoose.model('todo',todoSchema)

module.exports = todoMode