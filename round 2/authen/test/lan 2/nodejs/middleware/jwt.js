
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()
const verify = (req,res,next)=>{
    let authenHearder = req.headers['authorization']
    const token = authenHearder.split(' ')[1]
    if (!token) {
        return res.send({errorMessage:'ko co token'})
    } 
    jwt.verify(token,process.env.KEY_TOKEN,(error,data)=>{
        if (error) {
            return res.send({errorMessage:'token sai'})
        }
        if (data) {
            next()
        }
    })
}
const verifyAuthor = (req,res,next)=>{
    let authorHearder = req.headers['authorization']
    const token = authorHearder.split(' ')[1]
    if (!token) {
        return res.send({errorMessage:'ko co token'})
    } 
    jwt.verify(token,process.env.KEY_TOKEN,(error,data)=>{
        if (error) {
            return res.send({errorMessage:'token sai'})
        }
        if (data) {
            if (data.getUser.role == '1') {
                next()
            } else {
                return res.send({errorMessage:'ko phai admin'})
            }
        }
    })
}
module.exports = {verify,verifyAuthor}