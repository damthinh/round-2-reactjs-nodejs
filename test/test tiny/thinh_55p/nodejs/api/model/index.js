const mongoose  = require("mongoose");

const todoSchema = mongoose.Schema({
    content:String,
    arrImg:Array
})
const todoModel = mongoose.model('todoTiny',todoSchema)
module.exports = todoModel