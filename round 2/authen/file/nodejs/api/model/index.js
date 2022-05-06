const  Mongoose  = require("mongoose");

const todoSchema = Mongoose.Schema({
    name:String
})
const todoModel = Mongoose.model('todoCRUD',todoSchema)

module.exports = todoModel