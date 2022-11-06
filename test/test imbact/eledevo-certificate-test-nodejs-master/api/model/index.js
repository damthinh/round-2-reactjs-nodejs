const mongoose  = require("mongoose");

const todoSchema = mongoose.Schema({
    name:{type:String}
})

const totoModel = mongoose.model("todo",todoSchema)

module.exports = totoModel