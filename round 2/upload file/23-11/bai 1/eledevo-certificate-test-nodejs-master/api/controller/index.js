const todoModel = require("../model")
const fs = require('fs').promises
const path = require('path')
exports.getData = async(req,res)=>{
    try {
        const textSearch = req.query.q
        const listItem = await todoModel.find({title : {$regex :textSearch,$options:'i'}})
        res.send({listItem})
    } catch (error) {
        res.json({message: error.message})
    }
}

exports.postData = async(req,res)=>{
    try {
        const file = req.files
        const {title} =req.body
        var arrImg = []
        for(let i = 0; i<file.length;i++){
            var url = `http://localhost:3002/${file[i].filename}`
            arrImg.push(url)
        }
        const postData = await todoModel.create({title:title,img:arrImg})
        res.send(postData)
    } catch (error) {
        res.json({message: error.message})
    }
}

exports.deleteData = async(req,res)=>{
    try {
        const id = req.params.id
        const deleteData = await todoModel.findByIdAndDelete(id)
        var arrImg = deleteData.img
        for (let i =0 ;i<arrImg.length;i++){
            fs.unlink(`img/${arrImg[i].slice(22)}`)
        }
        res.send({deleteData})
    } catch (error) {
        res.json({message: error.message})
    }
}

exports.putData = async(req,res)=>{
    try {
        const file = req.files
        const id = req.params.id
        const getData = await todoModel.findById(id)
        var arrImg = getData.img
        for (let i =0 ;i<arrImg.length;i++){
            fs.unlink(path.join(`img/${arrImg[i].slice(22)}`),()=>{})
        }
        const {title} =req.body
        var arrImgUpdate = []
        for(let i = 0; i<file.length;i++){
            var url = `http://localhost:3002/${file[i].filename}`
            arrImgUpdate.push(url)
        }
        const putData = await todoModel.findByIdAndUpdate(id,{title:title,img:arrImgUpdate},{new:true})
        res.send(putData)
    } catch (error) {
        res.json({message: error.message})
    }
}
exports.deleteOneImgData = async(req,res)=>{
    try {
        const img = req.query.img
        const id = req.params.id
        
        fs.unlink(path.join(`img/${img}`), () => {})
        const getData = await todoModel.findById(id)
        var arrImg = getData.img
        var arrImgUpdate = arrImg.filter(function (value) {
            return value !== `http://localhost:3002/${img}`
        })
        const putData = await todoModel.findByIdAndUpdate(id,{img:arrImgUpdate},{new:true})
        res.send(putData)
    } catch (error) {
        res.json({message: error.message})
    }
}