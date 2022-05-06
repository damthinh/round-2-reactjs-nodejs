const todoModel = require("../model")
const path = require('path')
const fs = require('fs');
exports.getData = async(req,res)=>{
    try {
        const listItem = await todoModel.find()
        res.json({listItem})
    } catch (error) {
        res.json({message:error.message})
    }
}
exports.addData = async(req,res)=>{
    try {
        const file = req.files
        console.log(file)
        const title = req.body.title
        var arrImg=[]
        for(let i =0;i<file.length;i++){
            var url =`http://localhost:3002/${file[i].originalname}`
            arrImg.push(url)
        }
        const add = await todoModel.create({title,img:arrImg});
        //const addData = await new todoModel({title:title,img:arrImg}).save()
        res.json(add)
    } catch (error) {
        res.send({message: error.message})
    }
}
exports.deleteData = async(req,res)=>{
    try {
        const id = req.params.id
        const deleteData = await todoModel.findByIdAndDelete(id)
        var arrImg=deleteData.img
        console.log(arrImg)
        for(var i =0;i<arrImg.length;i++){
            fs.unlink(path.join(`img/${arrImg[i].slice(22)}`), ()=>{
                console.log("deleete success nek")
            } )
        }
        res.json(deleteData)
    } catch (error) {
        res.json({message:error.message})
    }
}
exports.updateData = async(req,res)=>{
    try {
        const file = req.files
        const id = req.params.id
        var arrImg=[]
        const {title}= req.body
        for(let i =0;i<file.length;i++){
            var url =`http://localhost:3002/${file[i].originalname}`
            arrImg.push(url)
        }
        const update = await todoModel.findByIdAndUpdate(id,{title:title,img:arrImg})
        res.json(update)
    } catch (error) {
        res.send({message: error.message})
    }
}