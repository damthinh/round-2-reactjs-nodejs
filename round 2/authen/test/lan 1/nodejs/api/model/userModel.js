const Mongoose = require("mongoose");

const todoSchema = Mongoose.Schema({
    userName: String,
    passWord: String,
    role: {
        type: String,
        default: '2'
    }

}, {
    versionKey: false
})
const userModel = Mongoose.model('userModel', todoSchema)

module.exports = userModel