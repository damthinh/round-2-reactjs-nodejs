const  {verify,authorization}  = require("../../middleware/jwt")
const { getData, addData, updateData, deleteData, registerUser, deleteUser, loginUser } = require("../controller")
const Router = (app)=>{
    app.get('/',verify,getData)
    app.post('/',authorization,addData)
    app.put('/:id',authorization,updateData)
    app.delete('/:id',authorization,deleteData)
    app.post('/register',registerUser)
    app.delete('/user/:id',deleteUser)
    app.post('/login',loginUser)
}
module.exports = Router