const Mongoose = require("mongoose");

const todoChema = Mongoose.Schema({
    name: String,
    id_GV: [{
        type: Mongoose.Schema.Types.ObjectId,
        ref:'modelGV'
    }]
},{
    versionKey :false
})
const modelHS = Mongoose.model('modelHS', todoChema)

module.exports = modelHS