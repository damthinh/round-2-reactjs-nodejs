const jwt = require('jsonwebtoken')
const dotenv = require ('dotenv')
dotenv.config()
const verify = (req, res, next) => {
    const authenHeader = req.headers['authorization']
    let token = authenHeader.split(' ')[1]
    if (!token) return res.send('wrong token');
    jwt.verify(token, process.env.ACCESS_KEY_TOKEN, (error, data) => {
        if (error) {
            return res.send({message:'token lỗi '})
        } if (data) {
            next()
        }
    })
}
const authorization = (req, res, next) => {
    const authenHeader = req.headers['authorization']
    let token = authenHeader.split(' ')[1]
    if (!token) return res.send('wrong token');
    jwt.verify(token, process.env.ACCESS_KEY_TOKEN, (error, data) => {
        if (error) {
            return res.send({message:'token lỗi '})
        }
        if (data.checkUserName.role == '1') {
            next()
        }
        else {
            return res.send({ status: 1, message: 'ban khong phai admin !' })
        }
    })
}
module.exports = { verify ,authorization}