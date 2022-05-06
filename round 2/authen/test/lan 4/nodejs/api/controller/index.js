const todoModel = require("../model")
const userModel = require("../model/userModel")
const bcrypt = require ('bcrypt')
const jwt = require ('jsonwebtoken')
require('dotenv').config()
 exports.getData = async(req,res)=>{
     try {
         let listItem = await todoModel.find()
         res.send(listItem)
     } catch (error) {
         res.send({errorMessage: error.message})
     }
 }
 exports.addData = async(req,res)=>{
    try {
        let name = req.body.name
        let addData = await todoModel.create({name})
        res.send(addData)
    } catch (error) {
        res.send({errorMessage: error.message})
    }
}
exports.updateData = async(req,res)=>{
    try {
        let id = req.params.id
        let name = req.body.name
        let updateData = await todoModel.findByIdAndUpdate(id,{name},{new:true})
        res.send(updateData)
    } catch (error) {
        res.send({errorMessage: error.message})
    }
}
exports.deleteData = async(req,res)=>{
    try {
        let id = req.params.id
        let deleteData = await todoModel.findByIdAndDelete(id)
        res.send(deleteData)
    } catch (error) {
        res.send({errorMessage: error.message})
    }
}
exports.registerUser = async(req,res)=>{
    try {
        let {userName,passWord}= req.body
        let checkUserName = await userModel.findOne({userName})
        if (checkUserName) {
            return res.send({errorMessage:'tk ton tai'})
        } else {
            let maPassWord= await bcrypt.hash(passWord,10)
            await userModel.create({userName,passWord:maPassWord})
            let getUser = await userModel.findOne({userName}).select('-passWord')
            const token = jwt.sign({getUser},process.env.KEY_TOKEN,{expiresIn:'1h'})
            res.send({token,getUser})
        }
    } catch (error) {
        res.send({errorMessage: error.message})
    }
}
exports.loginUser = async(req,res)=>{
    try {
        let {userName,passWord}= req.body
        let checkUserName = await userModel.findOne({userName})
        if (checkUserName) {
            let checkPassWord= await bcrypt.compare(passWord,checkUserName.passWord)
            if (checkPassWord) {
                let getUser = await userModel.findOne({userName}).select('-passWord')
                const token = jwt.sign({getUser},process.env.KEY_TOKEN,{expiresIn:'1h'})
                res.send({token,getUser})
            } else {
                return res.send({errorMessage:'pass sai'})
            }
        } else {
            return res.send({errorMessage:'tk ko ton tai'})
        }
    } catch (error) {
        res.send({errorMessage: error.message})
    }
}