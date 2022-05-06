const  mongoose  = require("mongoose");

const todoSchema = mongoose.Schema({
    content:String,
    arrImg:Array
})

const todoModel = mongoose.model('todoTiny',todoSchema)

module.exports = todoModel

//1641258976798-190168564-1.jpg//1641258993490-409883760-anh1.jpg//1641259013244-732530861-anh3.jpg