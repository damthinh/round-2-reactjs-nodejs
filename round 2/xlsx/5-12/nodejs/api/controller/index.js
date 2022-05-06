const todoModel = require("../model")
const XLSX = require('xlsx')
const fs = require('fs/promises')
exports.getData = async (req, res) => {
    try {
        let listItem = await todoModel.find()
        res.send({ listItem})
    } catch (error) {
        res.send({ errorMessage: error.message })
    }
}
exports.addFileExcel = async (req, res) => {
    try {
        const file = req.files[0]
        var workbook = XLSX.readFile(file.path, { type: 'buffer' })
        var sheet_name_list = workbook.SheetNames
        var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]])
        let addFile = await todoModel.insertMany(xlData)
        res.send({addFile,workbook:xlData})
        fs.unlink(`excel/${file.filename}`)
    } catch (error) {
        res.send({ errorMessage: error.message })
    }
}
exports.addData = async (req, res) => {
    try {
        let { name, age } = req.body
        let addData = await todoModel.create({ name, age })
        res.send(addData)
    } catch (error) {
        res.send({ errorMessage: error.message })
    }
}
exports.updateData = async (req, res) => {
    try {
        let id = req.params.id
        let { name, age } = req.body
        let updateData = await todoModel.findByIdAndUpdate(id, { name, age }, { new: true })
        res.send(updateData)
    } catch (error) {
        res.send({ errorMessage: error.message })
    }
}
exports.deleteData = async (req, res) => {
    try {
        let id = req.params.id
        let deleteData = await todoModel.findByIdAndDelete(id)
        res.send(deleteData)
    } catch (error) {
        res.send({ errorMessage: error.message })
    }
}