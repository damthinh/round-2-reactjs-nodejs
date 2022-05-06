const  mongoose  = require("mongoose");

const todoSchema = mongoose.Schema({
    title :{type :String},
    img:{type :Array}
})
const todoModel = mongoose.model("model",todoSchema)
module.exports = todoModel