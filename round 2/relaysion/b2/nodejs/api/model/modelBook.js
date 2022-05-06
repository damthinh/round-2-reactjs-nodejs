const  Mongoose  = require("mongoose");

const todoSchema = Mongoose.Schema({
    price : String,
    type : String,
    description:String,
    id_Author :[{
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'modelAuthor'
    }]
},{
    versionKey:false
})

const modelBooks = Mongoose.model('modelBooks',todoSchema)
module.exports = modelBooks