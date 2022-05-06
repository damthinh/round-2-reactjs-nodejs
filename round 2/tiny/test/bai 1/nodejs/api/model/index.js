const  mongoose  = require("mongoose");

const todoSchema = mongoose.Schema({
    content :String,
    img: Array
})

const todoModel = mongoose.model("todoModel",todoSchema)

module.exports = todoModel
