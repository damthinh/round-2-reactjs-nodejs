const todoModel = require("../model")
const fs = require('fs').promises

exports.searchData = async (req, res) => {
    try {
        let textSearch = req.query.q
        let listItem = await todoModel.find({content : {$regex : textSearch,$options:'i'}})
        res.send(listItem)
    } catch (error) {
        res.send({ message: error.message })
    }
}

exports.addImgData = async (req, res) => {
    try {
        let file = req.files
        for (let i = 0; i < file.length; i++) {
            var url = `http://localhost:3002/${file[i].filename}`
            var nameImg = file[i].filename                                                                                                                      
        }
        res.send({ url, nameImg })
    } catch (error) {
        res.send({ message: error.message })
    }
}
exports.addData = async (req, res) => {
    try {
        // let file = req.files
        let { content, arrImg } = req.body
        let arrId = []
        console.log("conten",content);
        // console.log("file",file);
        if (Array.isArray(arrImg)) {
            for (let i = 0; i < arrImg.length; i++) {
                if (content.includes(arrImg[i])) {
                    arrId.push(arrImg[i])
                } else {
                    fs.unlink(`img/${arrImg[i]}`)
                }
            }
        } else {
            if (content.includes(arrImg)) {
                arrId.push(arrImg)
            } else {
                fs.unlink(`img/${arrImg}`)
            }
        }
        let addData = await todoModel.create({ content, img: arrId })
        res.send({ addData})
    } catch (error) {
        res.send({ message: error.message })
    }
}
exports.updateData = async (req, res) => {
    try {
        let { title, content, arrImg } = req.body
        let id = req.params.id
        let getId = await todoModel.findById(id)
        let arrImgId = getId.img
        let arrId = []
        for (let i = 0; i < arrImgId.length; i++) {
            if (content.includes(arrImgId[i])) {
                arrId.push(arrImgId[i])
            } else {
                fs.unlink(`img/${arrImgId[i]}`)
            }
        }
        if (arrImg !=='') {
            if (Array.isArray(arrImg)) {
                for (let i = 0; i < arrImg.length; i++) {
                    if (content.includes(arrImg[i])) {
                        arrId.push(arrImg[i])
                    } else {
                        fs.unlink(`img/${arrImg[i]}`)
                    }
                }
            } else {
                if (content.includes(arrImg)) {
                    arrId.push(arrImg)
                } else {
                    fs.unlink(`img/${arrImg}`)
                }
            }
        }
        let updateData = await todoModel.findByIdAndUpdate(id, { title, content, img: arrId }, { new: true })
        res.send({ updateData })
    } catch (error) {
        res.send({ message: error.message })
    }
}

exports.deleteData = async (req, res) => {
    try {
        let id = req.params.id
        let deleteData = await todoModel.findByIdAndDelete(id)
        var arrId = deleteData.img
        for (let i = 0; i < arrId.length; i++) {
            fs.unlink(`img/${arrId[i]}`)
        }
        res.send(deleteData)
    } catch (error) {
        res.send({ message: error.message })
    }
}

exports.deleteOneImgData = async (req, res) => {
    try {
        let id = req.params.id
        let nameImg = req.query.img
        let getId = await todoModel.findById(id)
        var arrImg = getId.img
        fs.unlink(`img/${nameImg}`)
        var arrImgUpdate = arrImg.filter(function (valure) {
            return valure !== `http://localhost:3002/${nameImg}`
        })
        let updateData = await todoModel.findByIdAndUpdate(id, { img: arrImgUpdate }, { new: true })
        res.send(updateData)
    } catch (error) {
        res.send({ message: error.message })
    }
}