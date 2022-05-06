const  mongoose  = require("mongoose");

const todoSchema = mongoose.Schema({
    title:String,
    img:Array
})

const todoModel = mongoose.model("model",todoSchema)

module.exports = todoModel