const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const verify = (req,res,next)=>{
    console.log('vo day');
    const authenHeader = req.headers['authorization']
    const token = authenHeader.split(' ')[1]
    if (!token) return res.send ({errorMessage:'không có token'})

    jwt.verify(token, process.env.ACCESS_KEY_GET,(error,data)=>{
        if (error) {
            return res.send({errorMessage:'token lỗi'})
        }if (data) {
            next()
        }
    })
}
const authorHeader = (req,res,next)=>{
    console.log(req.headers['authorization']);
    const authorHeader = req.headers['authorization']
    const token = authorHeader.split(' ')[1]
    if (!token) return res.send ({errorMessage:'không có token'})
    jwt.verify(token, process.env.ACCESS_KEY_GET,(error,data)=>{
        if (error) {
            return res.send({errorMessage:'token lỗi'})
        }if (data.getUserName.role == '1') {
            next()
        }else{
            return res.send({errorMessage:'ko phai admin'})
        }
    })
}

module.exports = {verify,authorHeader}