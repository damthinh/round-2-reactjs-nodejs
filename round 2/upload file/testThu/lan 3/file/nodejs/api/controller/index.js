const todoModel = require("../model")
const fs = require('fs/promises')
exports.searchData = async (req, res) => {
    try {
        let textSearch = req.query.q
        let listItem = await todoModel.find({ title: { $regex: textSearch, $options: 'i' } })
        res.send(listItem)
    } catch (error) {
        res.send({ message: error.message })
    }
}
exports.addData = async (req, res) => {
    try {
        let file = req.files
        let { title } = req.body
        var arrImg = []
        for (let i = 0; i < file.length; i++) {
            let url = `http://localhost:3002/${file[i].filename}`
            arrImg.push(url)
        }
        let addData = await todoModel.create({ title, img: arrImg })
        res.send({ addData })
    } catch (error) {
        res.send({ message: error.message })
    }
}
exports.updateData = async (req, res) => {
    try {
        let id = req.params.id
        let file = req.files
        let { title } = req.body
        let getId = await todoModel.findById(id)
        let arrImg = getId.img
        for (let i = 0; i < arrImg.length; i++) {
            fs.unlink(`img/${arrImg[i].slice(22)}`)

        }
        var arrImgUpdate = []
        for (let i = 0; i < file.length; i++) {
            let url = `http://localhost:3002/${file[i].filename}`
            arrImgUpdate.push(url)
        }
        let updateData = await todoModel.findByIdAndUpdate(id, { title, img: arrImgUpdate }, { new: true })
        res.send(updateData)
    } catch (error) {
        res.send({ message: error.message })
    }
}
exports.deleteData = async (req, res) => {
    try {
        let id = req.params.id
        let deleteData = await todoModel.findByIdAndDelete(id)
        arrImg = deleteData.img
        for (let i = 0; i < arrImg.length; i++) {
            fs.unlink(`img/${arrImg[i].slice(22)}`)

        }
        res.send(deleteData)
    } catch (error) {
        res.send({ message: error.message })
    }
}
exports.deleteOneImgData = async (req, res) => {
    try {
        let id = req.params.id
        let index = req.query.img
        let getId = await todoModel.findById(id)
        arrImg = getId.img
        let nameImg = arrImg[index]
        arrImg.splice(index, 1)
        fs.unlink(`img/${nameImg.slice(22)}`)
        let deleteOneImgData = await todoModel.findByIdAndUpdate(id, { img: arrImg }, { new: true })
        res.send(deleteOneImgData)
    } catch (error) {
        res.send({ message: error.message })
    }
}