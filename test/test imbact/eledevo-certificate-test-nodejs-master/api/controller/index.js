const totoModel = require("../model")

exports.pagiData = async(req,res)=>{
    try {
        const activePage = parseInt(req.query.page)
        const limit = parseInt(req.query.limit)
        const textSearch = req.query.q
        const skip = (activePage-1)*limit
        const lengthData = await totoModel.countDocuments({name: {$regex:textSearch,$options :'i'}})
        totalPage = Math.ceil(lengthData/limit)
        const listItem = await totoModel.find({name: {$regex:textSearch,$options :'i'}}).skip(skip).limit(limit)
        res.json({totalPage,listItem})
    } catch (error) {
        res.json({message: error.message})
    }
}

exports.addData = async(req,res)=>{
    try {
        let {name} = req.body
        const addData = await new totoModel({name:name}).save()
        let listItem =[addData]
        const limit = parseInt(req.query.limit)
        const textSearch = req.query.q
        const lengthData = await totoModel.countDocuments({name: {$regex:textSearch,$options :'i'}})
        totalPage = Math.ceil(lengthData/limit)
        res.json({totalPage,listItem})
    } catch (error) {
        res.json({message: error.message})
    }
}

exports.putData = async(req,res)=>{
    try {
        let id = req.params.id
        let {name} = req.body
        const putData = await totoModel.findByIdAndUpdate(id,{name:name},{new:true})
        let listItem =[putData]
        res.json({listItem})
    } catch (error) {
        res.json({message: error.message})
    }
}

exports.deleteData = async(req,res)=>{
    try {
        let id = req.params.id
        const deleteData = await totoModel.findByIdAndDelete(id)
        res.json(deleteData)
    } catch (error) {
        res.json({message: error.message})
    }
}