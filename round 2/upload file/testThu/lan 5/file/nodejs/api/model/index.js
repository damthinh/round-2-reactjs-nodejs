const mongoose = require ('mongoose')

const todoSchma = mongoose.Schema({
    title : String,
    img:Array
})
const todoModel = mongoose.model('todoImg',todoSchma)

module.exports = todoModel