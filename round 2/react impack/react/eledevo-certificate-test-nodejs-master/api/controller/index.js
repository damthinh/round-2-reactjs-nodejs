const { json } = require("body-parser")
const todoMode = require("../model")

exports.pagiData = async(req,res)=>{
    try {
        const activePage = parseInt(req.query.page)
        const limit = parseInt(req.query.limit)
        const textSearch = req.query.q
        const skip = (activePage-1)*limit
        const lengthData = await todoMode.countDocuments({name : {$regex : textSearch,$options:'i'}})
        totalPage = Math.ceil(lengthData/limit)
        const listItem = await todoMode.find({name : {$regex : textSearch,$options:'i'}}).skip(skip).limit(limit)
        res.json({totalPage,listItem})
    } catch (error) {
        res.json({message:error.message})
    }
}

exports.addData = async(req,res)=>{
    try {
        let {name} = req.body
        const addData = await new todoMode({name:name}).save()
        let listItem =[addData]
        const limit = parseInt(req.query.limit)
        const textSearch = req.query.q
        const lengthData = await todoMode.countDocuments({name : {$regex : textSearch,$options:'i'}})
        totalPage = Math.ceil(lengthData/limit)
        res.json({totalPage,listItem})

    } catch (error) {
        res.json({message:error.message})
    }
}

exports.putData = async(req,res)=>{
    try {
        let {name} = req.body
        let id = req.params.id
        const putData = await todoMode.findByIdAndUpdate(id,{name:name},{new:true})
        let listItem = [putData]
        res.json({listItem})
    } catch (error) {
        res.json({message:error.message})
    }
}

exports.deleteData = async(req,res)=>{
    try {
        let id = req.params.id
        const deleteData = await todoMode.findByIdAndDelete(id)
        res.json(deleteData)
    } catch (error) {
        res.json({message:error.message})
    }
}