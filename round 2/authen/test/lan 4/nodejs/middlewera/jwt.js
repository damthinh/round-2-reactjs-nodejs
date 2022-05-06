
const jwt = require ('jsonwebtoken')

const verify = (req,res,next)=>{
    try {
        let authenheaders = req.headers['authorization']
        let token = authenheaders.split(' ')[1]
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
    } catch (error) {
        
    }
}


const authorVerify = (req,res,next)=>{
    try {
        let authorHeadel = req.headers['authorization']
        let token = authorHeadel.split(' ')[1]
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
    } catch (error) {
        
    }
}
module.exports = {verify,authorVerify}