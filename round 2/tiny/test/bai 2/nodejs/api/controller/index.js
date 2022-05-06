const todoMode = require("../model")
const fs = require('fs/promises')
exports.getData = async(req,res)=>{
    try {
        let listItem = await todoMode.find()
        res.send(listItem)
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
        let {content,arrNameImg} = req.body
        let arrImg = []
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
        let addData = await todoMode.create({content,img:arrImg})
        res.send(addData)
    } catch (error) {
        res.send({message: error.message})
    }
}
exports.updateData = async(req,res)=>{
    try {
        let id = req.params.id
        let {content,arrNameImg} = req.body
        let arrImgUpdate = []
        let getId = await todoMode.findById(id)
        let arrImg = getId.img
            for (let i = 0; i < arrImg.length; i++) {
                if (content.includes(arrImg[i])) {
                    arrImgUpdate.push(arrImg[i])
                    console.log("arrr i ",arrImg[i]);
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
        let updateData = await todoMode.findByIdAndUpdate(id,{content,img:arrImgUpdate},{new:true})
        res.send(updateData)
    } catch (error) {
        res.send({message: error.message})
    }
}
exports.deleteData = async(req,res)=>{
    try {
        let id = req.params.id
        let deleteData = await todoMode.findByIdAndDelete(id)
        let arrImg = deleteData.img
        console.log("arrrr",arrImg);
            for (let i = 0; i < arrImg.length; i++) {
                fs.unlink(`img/${arrImg[i]}`)
            }
        res.send(deleteData)
    } catch (error) {
        res.send({message: error.message})
    }
}