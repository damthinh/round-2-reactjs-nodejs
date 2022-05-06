const todoModel = require("../model")
const userModel = require("../model/userModel")
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
require('dotenv').config()
exports.getData = async(req,res)=>{
    try {
        let getData = await todoModel.find()
        res.send(getData) 
    } catch (error) {
        res.send({message:error.message})
    }
}
exports.addData = async(req,res)=>{
    try {
        let name = req.body.name
        let addData = await todoModel.create({name})
        res.send(addData)
    } catch (error) {
        res.send({message:error.message})
    }
}
exports.updateData = async(req,res)=>{
    try {
        let id = req.params.id
        let name = req.body.name
        let updateData = await todoModel.findByIdAndUpdate(id,{name},{new:true})
        res.send(updateData)
    } catch (error) {
        res.send({message:error.message})
    }
}
exports.deleteData = async(req,res)=>{
    try {
        let id = req.params.id
        let deleteData = await todoModel.findByIdAndDelete(id)
        res.send(deleteData)
    } catch (error) {
        res.send({message:error.message})
    }
}
exports.deleteData = async(req,res)=>{
    try {
        let {userName,passWord}= req.body
        let checkName = await userModel.findOne({userName})
        if (checkName) {
            let encryptedPassWord = await bcrypt.hash(passWord,10)
            await userModel.create({userName,passWord:encryptedPassWord})
            let getUser = await userModel.findOne({userName}).select('-passWord')
            const token = jwt.sign({getUser},process.env.TOKEN_KEY,)
        } else {
            
        }
    } catch (error) {
        res.send({message:error.message})
    }
}
exports.deleteData = async(req,res)=>{
    try {
    } catch (error) {
        res.send({message:error.message})
    }
}