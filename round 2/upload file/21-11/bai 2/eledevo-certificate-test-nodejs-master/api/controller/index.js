const todoModel = require("../model")
const path = require('path')
const fs = require('fs');

exports.searchData = async (req, res) => {
    try {
        let textSearch = req.query.q
        const listItem = await todoModel.find({ title: { $regex: textSearch, $options: 'i' } })
        res.json(listItem)
    } catch (error) {
        res.json({ message: error.message })
    }
}
exports.deleteData = async (req, res) => {
    try {
        let id = req.params.id
        const deleteData = await todoModel.findByIdAndDelete(id)
        var arrImg = deleteData.img
        console.log(arrImg)
        for (let i = 0; i < arrImg.length; i++) {
            fs.unlink(path.join(`img/${arrImg[i].slice(22)}`), () => {})
        }
        res.json(deleteData)
    } catch (error) {
        res.json({ message: error.message })
    }
}
exports.addData = async (req, res) => {
    try {
        const file = req.files
        const { title } = req.body
        var arrImg = []
        for (let i = 0; i < file.length; i++) {
            var url = `http://localhost:3002/${file[i].filename}`
            arrImg.push(url)
        }
        const addData = await new todoModel({ title: title, img: arrImg }).save()
        res.json(addData)
    } catch (error) {
        res.json({ message: error.message })
    }
}
exports.putData = async (req, res) => {
    try {
        const file = req.files
        const { title } = req.body
        let id = req.params.id
        const getData = await todoModel.findById(id)
        var arrImg = getData.img
        console.log(arrImg)
        for (let i = 0; i < arrImg.length; i++) {
            fs.unlink(path.join(`img/${arrImg[i].slice(22)}`), () => {})
        }
        var arrImgUpdate = []
        for (let i = 0; i < file.length; i++) {
            var url = `http://localhost:3002/${file[i].filename}`
            arrImgUpdate.push(url)
        }
        const putData = await todoModel.findByIdAndUpdate(id, { title: title, img: arrImgUpdate }, { new: true })
        res.json(putData)
    } catch (error) {
        res.json({ message: error.message })
    }
}

exports.deleteOneImgData = async (req, res) => {
    try {

        let id = req.params.id
        let img = req.query.img
        fs.unlink(path.join(`img/${img}`), () => {})
        const getData = await todoModel.findById(id)
        var arrImg = getData.img
        var arrImgUpdate = arrImg.filter(function (value, index, arr) {
            return value !== `http://localhost:3002/${img}`;
        });
        const putData = await todoModel.findByIdAndUpdate(id, { img: arrImgUpdate }, { new: true })
        res.send({ putData })
    } catch (error) {
        res.json({ message: error.message })
    }
}