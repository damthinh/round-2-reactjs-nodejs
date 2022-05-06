const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
    name:{
        type : String
    }
})

const TodoModel = mongoose.model("toto",TodoSchema)

module.exports = TodoModel