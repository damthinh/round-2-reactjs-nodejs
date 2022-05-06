const res = require("express/lib/response")
const TodoModel = require("../model")

exports.pagiData = async( req,res)=>{
    try {
        const activePage = parseInt(req.query.page)
        const limit  = parseInt(req.query.limit)
        const skip = (activePage-1)*limit
        const textSearch = req.query.q
        let totalPage =0
        const getData = await TodoModel.find({name :{$regex : textSearch,$options:'i'}})
        totalPage = Math.ceil(getData.length/limit)
        const listItem = await TodoModel.find({name :{$regex : textSearch,$options:'i'}}).skip(skip).limit(limit)
        res.send({totalPage,listItem})
    } catch (error) {
        res.send({message: error.message})
    }
}
exports.addData =async(req,res)=>{
    try {
        const {name}= req.body
        const addData = await new TodoModel({name: name}).save()
        const limit  = parseInt(req.query.limit)
        let totalPage =0
        const getData = await TodoModel.find()
        totalPage = Math.ceil(getData.length/limit)
        res.send({totalPage,addData})
    } catch (error) {
        res.send({message: error.message})
    }
}

exports.putData =async(req,res)=>{
    try {
        const {name}= req.body
        const id = req.params.id
        const putData = await TodoModel.findByIdAndUpdate(id,{name:name},{new:true})
        res.send(putData)
    } catch (error) {
        res.send({message: error.message})
    }
}


exports.deleteData =async(req,res)=>{
    try {
        const id = req.params.id
        const deleteData = await TodoModel.findByIdAndDelete(id)
        res.send(deleteData)
    } catch (error) {
        res.send({message: error.message})
    }
}