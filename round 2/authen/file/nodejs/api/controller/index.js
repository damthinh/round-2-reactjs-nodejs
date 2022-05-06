const userModel = require("../model/user")
const todoModel = require("../model/index")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require ('dotenv')
dotenv.config()
exports.getData = async(req,res)=>{
    try {
        let listItem = await todoModel.find()
        res.send({listItem}) 
    } catch (error) {
        res.send({message:error.message})
    }
}
exports.registerUser = async(req,res)=>{
    try {
        let {passWord,userName} = req.body
        let checkUserName = await userModel.findOne({userName})
        if (checkUserName) {
           return res.send({message:'TK đã tồn tại '})
        } else {
            const encryptedPassWord = await bcrypt.hash(passWord,10)
            let addUser = await userModel.create({userName,passWord:encryptedPassWord})
            const token = jwt.sign(
                {addUser},
                process.env.ACCESS_KEY_TOKEN,
                {expiresIn:'1h'}
            )
            const dataUser = await userModel.findById(addUser._id).select('-passWord')
            res.send({dataUser,token})
        }
    } catch (error) {
        res.send({message:error.message})
    }
}
exports.loginUser = async(req,res)=>{
    try {
        let {passWord,userName} = req.body
        let checkUserName = await userModel.findOne({userName})
        if (checkUserName) {
            const checkPassWord = await bcrypt.compare(passWord,checkUserName.passWord)
            if (checkPassWord) {
                const token = jwt.sign(
                    {checkUserName},
                    process.env.ACCESS_KEY_TOKEN,
                    {expiresIn:"1h"}
                )
                const dataUser = await userModel.findById(checkUserName._id).select('-passWord')
                res.send({dataUser,token})
            } else {
               return res.send({message:'pass sai '})
            }
        } else {
            return res.send({message:'TK không tồn tại '})
        }
    } catch (error) {
        res.send({message:error.message})
    }
}
exports.deleteUser = async(req,res)=>{
    try {
        let id = req.params.id
        let deleteUser = await userModel.findByIdAndDelete(id)
        res.send(deleteUser)
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