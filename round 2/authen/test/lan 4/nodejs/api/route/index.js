const { verify, authorVerify } = require("../../middlewera/jwt")
const { getData, addData, updateData, deleteData, loginUser, registerUser } = require("../controller")

const Router = (app)=>{
    app.get('/',verify,getData)
    app.post('/',authorVerify,addData)
    app.put('/:id',authorVerify,updateData)
    app.delete('/:id',authorVerify,deleteData)

    app.post('/login',loginUser)
    app.post('/register',registerUser)
}
module.exports = Router