const todoModel = require("../model")
const fs = require('fs/promises')
const XLSX = require('xlsx')
const path = require('path');
exports.paginationData = async(req,res)=>{
    try {
        let activePage = parseInt(req.query.page)
        let limit = parseInt(req.query.limit)
        let skip = (activePage-1)*limit
        let listExcel = await todoModel.find()
        totalPage = Math.ceil(listExcel.length/limit)
        if (totalPage===0)totalPage=1
        let listPage = await todoModel.find().skip(skip).limit(limit)
        res.send({listPage,totalPage,listExcel})
    } catch (error) {
        res.send({message: error.message})
    }
}
exports.addExcel = async(req,res)=>{
    try {
        let file = req.files[0]
        let readFile = XLSX.readFile(file.path,{type:'buffer'})
        let list_sheet_name =  readFile.SheetNames
        let excelData = XLSX.utils.sheet_to_json(readFile.Sheets[list_sheet_name[0]])
        let addExcel = await todoModel.insertMany(excelData)
        console.log('path',file.path);
        res.send(addExcel)
        fs.unlink(`excel/${file.filename}`)
    } catch (error) {
        res.send({message: error.message})
    }
}
exports.addData = async(req,res)=>{
    try {
        let {name,age} = req.body
        let limit = parseInt(req.query.limit)
        let addData = await todoModel.create({name,age})
        let getData = await todoModel.find()
        totalPage = Math.ceil(getData.length/limit)
        res.send({addData,totalPage})
    } catch (error) {
        res.send({message: error.message})
    }
}
exports.updateData = async(req,res)=>{
    try {
        let id = req.params.id
        let {name,age} = req.body
        let updateData = await todoModel.findByIdAndUpdate(id,{name,age},{new:true})
        res.send(updateData)
    } catch (error) {
        res.send({message: error.message})
    }
}
exports.deleteData = async(req,res)=>{
    try {
        let id = req.params.id
        let deleteData = await todoModel.findByIdAndDelete(id)
        res.send(deleteData)
    } catch (error) {
        res.send({message: error.message})
    }
}