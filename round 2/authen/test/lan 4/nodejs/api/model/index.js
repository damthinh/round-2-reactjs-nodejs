const Mongoose  = require("mongoose");

const todoSchema = Mongoose.Schema ({
    name:String
})
const todoModel = Mongoose.model('todocrud',todoSchema)

module.exports = todoModel