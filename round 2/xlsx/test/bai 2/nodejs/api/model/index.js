const  Mongoose  = require("mongoose");

const todoSchema = Mongoose.Schema({
    name:String,
    age:String
})
const todoModel = Mongoose.model('todoExcel',todoSchema)

module.exports = todoModel