const todoModel = require("../model")
const bcrtypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const userModel = require("../model/userModel")
dotenv.config()
exports.getData = async(req,res)=>{
    try {
        let getData = await todoModel.find()
        res.send(getData) 
    } catch (error) {
        res.send({errorMessage:error.message})
    }
}
exports.addData = async(req,res)=>{
    try {
        let name = req.body.name
        let addData = await todoModel.create({name})
        res.send(addData)
    } catch (error) {
        res.send({errorMessage:error.message})
    }
}
exports.updateData = async(req,res)=>{
    try {
        let id = req.params.id
        let name = req.body.name
        let updateData = await todoModel.findByIdAndUpdate(id,{name},{new:true})
        res.send(updateData)
    } catch (error) {
        res.send({errorMessage:error.message})
    }
}
exports.deleteData = async(req,res)=>{
    try {
        let id = req.params.id
        let deleteData = await todoModel.findByIdAndDelete(id)
        res.send(deleteData)
    } catch (error) {
        res.send({errorMessage:error.message})
    }
}

exports.registerUser = async(req,res)=>{
    try {
        let {userName,passWord}=req.body
        let checkName =  await userModel.findOne({userName})
        if (checkName) {
            return res.send({errorMessage:'TK ton tai'})
        } else {
            let encryptedPassWord = await bcrtypt.hash(passWord,10)
            await userModel.create({userName,passWord:encryptedPassWord})
            let getUser =  await userModel.findOne({userName}).select('-passWord')
            const token = jwt.sign({getUser},process.env.KEY_TOKEN,{expiresIn:'1h'})
            res.send({getUser,token})
        }
    } catch (error) {
        res.send({errorMessage:error.message})
    }
}

exports.loginUser = async(req,res)=>{
    try {
        let {userName,passWord}=req.body
        let checkName =  await userModel.findOne({userName})
        if (checkName) {
           let checkPassWord =  await bcrtypt.compare(passWord,checkName.passWord)
           if (checkPassWord) {
            let getUser =  await userModel.findOne({userName}).select('-passWord')
            const token = jwt.sign({getUser},process.env.KEY_TOKEN,{expiresIn:'1h'})
            res.send({getUser,token})
           } else {
            return res.send({errorMessage:'pass sai'})
           }
        } else {
            return res.send({errorMessage:'TK ko ton tai'})
        }
    } catch (error) {
        res.send({errorMessage:error.message})
    }
}