const  mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
    title:String,
    img:Array
})

const totdoModel = mongoose.model("todo",todoSchema)

module.exports = totdoModel