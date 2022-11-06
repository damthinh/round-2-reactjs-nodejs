const  Mongoose  = require("mongoose");

const todoSchema = Mongoose.Schema({
    name:String,
    address:String,
    id_Product:[{
        type:Mongoose.Types.ObjectId,
        ref:"product"
    }]
},{versionKey:false})

const modelDistributor = Mongoose.model("distributor",todoSchema)

module.exports = modelDistributor