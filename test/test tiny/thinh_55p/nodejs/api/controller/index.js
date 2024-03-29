const todoModel = require("../model")
const fs = require('fs/promises')
exports.getData = async(req,res)=>{
    try {
        let getData = await todoModel.find()
        res.send(getData)
    } catch (error) {
        res.send({message: error.message})
    }
}
exports.addImgData = async(req,res)=>{
    try {
        let file = req.files
        for (let i = 0; i < file.length; i++) {
            var url = `http://localhost:3002/${file[i].filename}`
            var nameImg = file[i].filename
        }
        res.send({url,nameImg})
    } catch (error) {
        res.send({message: error.message})
    }
}
exports.addData = async(req,res)=>{
    try {
        let {content,arrNameImg}= req.body
        let arrImg=[]
        if (arrNameImg) {
            if (Array.isArray(arrNameImg)) {
                for (let i = 0; i < arrNameImg.length; i++) {
                    if (content.includes(arrNameImg[i])) {
                        arrImg.push(arrNameImg[i])
                    } else {
                        fs.unlink(`img/${arrNameImg[i]}`)
                    }
                }
            } else {
                if (content.includes(arrNameImg)) {
                    arrImg.push(arrNameImg)
                } else {
                    fs.unlink(`img/${arrNameImg}`)
                }
            }
        }
        let addData = await todoModel.create({content,arrImg})
        res.send(addData)
    } catch (error) {
        res.send({message: error.message})
    }
}
exports.updateData = async(req,res)=>{
    try {
        let id = req.params.id
        let {content,arrNameImg}= req.body
        let arrImgUpdate=[]
        let getId = await todoModel.findById(id)
        let arrImg = getId.arrImg
        for (let i = 0; i < arrImg.length; i++) {
            if (content.includes(arrImg[i])) {
                arrImgUpdate.push(arrImg[i])
            } else {
                fs.unlink(`img/${arrImg[i]}`)
            }
        }
        if (arrNameImg) {
            if (Array.isArray(arrNameImg)) {
                for (let i = 0; i < arrNameImg.length; i++) {
                    if (content.includes(arrNameImg[i])) {
                        arrImgUpdate.push(arrNameImg[i])
                    } else {
                        fs.unlink(`img/${arrNameImg[i]}`)
                    }
                }
            } else {
                if (content.includes(arrNameImg)) {
                    arrImgUpdate.push(arrNameImg)
                } else {
                    fs.unlink(`img/${arrNameImg}`)
                }
            }
        }
        let updateData = await todoModel.findByIdAndUpdate(id,{content,arrImg:arrImgUpdate},{new:true})
        res.send(updateData)
    } catch (error) {
        res.send({message: error.message})
    }
}
exports.deleteData = async(req,res)=>{
    try {
        let id = req.params.id
        let deleteData = await todoModel.findByIdAndDelete(id)
        let arrImg = deleteData.arrImg
        for (let i = 0; i < arrImg.length; i++) {
            fs.unlink(`img/${arrImg[i]}`)
        }
        res.send(deleteData)
    } catch (error) {
        res.send({message: error.message})
    }
}