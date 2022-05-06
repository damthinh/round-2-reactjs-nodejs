const { verify, authorHeader } = require("../../middleware/jwt")
const { getData, addData, updateData, deleteData, loginData, registerData } = require("../controller")

const Router = (app)=>{
    app.get('/',verify,getData)
    app.post('/',authorHeader,addData)
    app.put('/:id',authorHeader,updateData)
    app.delete('/:id',authorHeader,deleteData)

    
    app.post('/login',loginData)
    app.post('/register',registerData)
    
    app.get('/checkToken',verify)
}
module.exports = Router