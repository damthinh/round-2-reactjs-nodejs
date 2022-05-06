const  Mongoose  = require("mongoose");

const todoSchema = Mongoose.Schema({
    name:String,
    date_of_birth:Date,
    country:String,
    id_Books:[{
        type:Mongoose.Types.ObjectId,
        ref:"modelBooks"
    }]
},{versionKey:false})
const modelAuthor = Mongoose.model("modelAuthor",todoSchema)

module.exports = modelAuthor