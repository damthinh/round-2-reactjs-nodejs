const totdoModel = require("../model")
const fs = require('fs').promises

exports.searchData= async(req,res)=>{
    try {
        let textSearch = req.query.q
        let listItem = await totdoModel.find({title:{$regex :textSearch,$options:'i'}})
        res.send(listItem)
    } catch (error) {
        res.json({message:error.message})
    }
}
exports.addData = async(req,res)=>{
    try {
        let file = req.files
        let {title} = req.body
        var arrImg =[]
        for(let i=0;i<file.length;i++){
            var url =`http://localhost:3002/${file[i].filename}`
            arrImg.push(url)
        }
        const addData = await totdoModel.create({title:title,img:arrImg})
        res.send(addData)
    } catch (error) {
        res.json({message:error.message})
    }
}
exports.updateData = async(req,res)=>{
    try {
        let id = req.params.id
        let file = req.files
        let {title} = req.body
        let getId = await totdoModel.findById(id)
        var arrImg =getId.img
        for(let i=0;i<arrImg.length;i++){
            fs.unlink(`img/${arrImg[i].slice(22)}`)
        }
        var arrImgUpdate=[]
        for(let i=0;i<file.length;i++){
            var url =`http://localhost:3002/${file[i].filename}`
            arrImgUpdate.push(url)
        }
        const updateData = await totdoModel.findByIdAndUpdate(id,{title:title,img:arrImgUpdate},{new:true})
        res.send(updateData)
    } catch (error) {
        res.json({message:error.message})
    }
}
exports.deleteData = async(req,res)=>{
    try {
        let id = req.params.id
        let deleteData = await totdoModel.findByIdAndDelete(id)
        var arrImg =deleteData.img
        for(let i=0;i<arrImg.length;i++){
            fs.unlink(`img/${arrImg[i].slice(22)}`)
        }
        res.send(deleteData)
    } catch (error) {
        res.json({message:error.message})
    }
}
exports.deleteOneImgData = async(req,res)=>{
    try {
        let id = req.params.id
        let nameImg = req.query.img
        let getId = await totdoModel.findById(id)
        fs.unlink(`img/${nameImg}`)
        var arrImgUpdate=getId.img.filter(function (valure) {
            return valure !== `http://localhost:3002/${nameImg}`
        })
        const updateData = await totdoModel.findByIdAndUpdate(id,{img:arrImgUpdate},{new:true})
        res.send(updateData)
    } catch (error) {
        res.json({message:error.message})
    }
}