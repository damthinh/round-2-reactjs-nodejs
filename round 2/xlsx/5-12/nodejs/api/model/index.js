const  mongoose  = require("mongoose");

const todoSchema = mongoose.Schema({
    name:String,
    age:String
})
const todoModel = mongoose.model('todoExcel',todoSchema)

module.exports = todoModel