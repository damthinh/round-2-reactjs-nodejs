const todoModel = require("../model")
const bcrypt = require ('bcrypt')
const jwt = require("jsonwebtoken")
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
// login

exports.loginData = async(req,res)=>{
    try {
        let {userName,passWord} = req.body
        let checkUserName = await userModel.findOne({userName})
        if (checkUserName) {
            let checkPassWord = await bcrypt.compare(passWord,checkUserName.passWord)
            let getUserName = await userModel.findById(checkUserName._id).select('-passWord')
            if (checkPassWord) {
                const token = jwt.sign(
                    {getUserName},
                    process.env.ACCESS_KEY_GET,
                    {expiresIn:'1h'}
                )
                res.send({getUserName,token})
            } else {
                return res.send({errorMessage:'pass sai'})
            }
        } else {
            return res.send({errorMessage:'TK sai'})
        }
    } catch (error) {
        res.send({errorMessage:error.message})
    }
}

exports.registerData = async(req,res)=>{
    try {
        let {userName,passWord} = req.body
        let checkUserName = await userModel.findOne({userName})
        if (checkUserName) {
            return res.send({errorMessage:'TK tồn tại'})
        } else {
            let encryptedPassWord = await bcrypt.hash(passWord,10)
            await userModel.create({userName,passWord:encryptedPassWord})
            let getUserName = await userModel.findOne({userName}).select('-passWord')
                const token = jwt.sign(
                    {getUserName}, 
                    process.env.ACCESS_KEY_GET,
                    {expiresIn:'1h'}
                )
                res.send({getUserName,token})
        }
    } catch (error) {
        res.send({errorMessage:error.message})
    }
}