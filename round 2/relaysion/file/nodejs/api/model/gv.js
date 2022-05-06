const  Mongoose  = require("mongoose");

const todoChema = Mongoose.Schema({
    name:String,
    id_HS:[{
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'modelHS'
    }]
},{
    versionKey :false
})
const modelGV = Mongoose.model('modelGV',todoChema)

module.exports = modelGV