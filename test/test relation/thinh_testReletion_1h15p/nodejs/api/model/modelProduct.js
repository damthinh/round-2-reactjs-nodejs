const  Mongoose  = require("mongoose");

const todoSchema = Mongoose.Schema({
    price:String,
    EXP:Date,
    id_Distributor:[{
        type:Mongoose.Types.ObjectId,
        ref:"distributor"
    }]
},{versionKey:false})

const modelProduct = Mongoose.model("product",todoSchema)

module.exports = modelProduct