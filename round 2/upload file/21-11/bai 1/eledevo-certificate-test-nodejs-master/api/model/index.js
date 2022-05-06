const  mongoose  = require("mongoose");

const todoShema = mongoose.Schema({
    title :{
        type : String
    },
    img :{
        type:Array
    }
})
const todoModel = mongoose.model("model",todoShema)

module.exports = todoModel