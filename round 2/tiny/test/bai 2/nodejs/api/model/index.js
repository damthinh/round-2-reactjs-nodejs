const mongoose  = require("mongoose");

const todoSchema = mongoose.Schema({
    content:String,
    img:Array
})
const todoMode = mongoose.model('todoTiny',todoSchema)

module.exports = todoMode