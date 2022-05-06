
const jwt = require('jsonwebtoken')
const verify = (req,res,next)=>{
    try {
        let authenHeader = req.headers['authorization']
        let token = authenHeader.split(' ')[1]
        if (!token) {
            return res.send({ errorMessage: 'khong co token' })
        }
        jwt.verify(token,process.env.KEY_TOKEN,(error,data)=>{
            if (error) {
                return res.send({ errorMessage: 'token sai' })
            }
            if (data) {
                next()
            }
        })
    } catch (error) {
        res.send({ errorMessage: error.message })
    }
}
const verifyAuthor = (req,res,next)=>{
    try {
        let authorHeader = req.headers['authorization']
        let token = authorHeader.split(' ')[1]
        if (!token) {
            return res.send({ errorMessage: 'khong co token' })
        }
        jwt.verify(token,process.env.KEY_TOKEN,(error,data)=>{
            if (error) {
                return res.send({ errorMessage: 'token sai' })
            }
            if (data.getUser.role == '1') {
                next()
            }
            else{
                return res.send({ errorMessage: 'ko phai admin' })
            }
        })
    } catch (error) {
        res.send({ errorMessage: error.message })
    }
}

module.exports = {verify,verifyAuthor}