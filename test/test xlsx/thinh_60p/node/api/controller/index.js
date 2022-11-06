const todoModel = require("../model")
const XLSX = require('xlsx')
exports.paginationData = async(req,res)=>{
    try {
        let activePage = parseInt(req.query.page)
        let limit = parseInt(req.query.limit)
        let skip = (activePage-1)*limit
        let listExcel = await todoModel.find()
        totalPage = Math.ceil(listExcel.length/limit)
        if (totalPage === 0) {
            totalPage=1
        }
        let listPage = await todoModel.find().skip(skip).limit(limit)
        res.send({totalPage,listExcel,listPage})
    } catch (error) {
        res.send({message:error.message})
    }
}
exports.addExcel = async(req,res)=>{
    try {
        let file = req.files[0]
        let readFile = XLSX.readFile(file.path)
        let list_name_sheet = readFile.SheetNames
        let dataExcel = XLSX.utils.sheet_to_json(readFile.Sheets[list_name_sheet[0]])
        let addExcel = await todoModel.insertMany(dataExcel)
        res.send(addExcel)
    } catch (error) {
        res.send({message:error.message})
    }
}
exports.addData = async(req,res)=>{
    try {
        let {name,age}= req.body
        let addData = await todoModel.create({name,age})
        res.send(addData)
    } catch (error) {
        res.send({message:error.message})
    }
}
exports.updateData = async(req,res)=>{
    try {
        let id = req.params.id
        let {name,age}= req.body
        let updateData = await todoModel.findByIdAndUpdate(id,{name,age},{new:true})
        res.send(updateData)
    } catch (error) {
        res.send({message:error.message})
    }
}
exports.deleteData = async(req,res)=>{
    try {
        let id = req.params.id
        let deleteData = await todoModel.findByIdAndDelete(id)
        res.send(deleteData)
    } catch (error) {
        res.send({message:error.message})
    }
}