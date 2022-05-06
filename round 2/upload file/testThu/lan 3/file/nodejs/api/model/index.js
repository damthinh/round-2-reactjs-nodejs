const mongoose = require ('mongoose')

const todoSchema = mongoose.Schema({
    title : String,
    img:Array
})

const todoModel = mongoose.model("todo",todoSchema)

module.exports = todoModel