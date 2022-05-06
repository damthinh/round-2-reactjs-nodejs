const { verify, verifyAuthor } = require("../../middleware/jwt")
const { getData, addData, updateData, deleteData, registerUser, loginUser } = require("../controller")

const Router = (app)=>{
    app.get('/',verify,getData)
    app.post('/',verifyAuthor,addData)
    app.put('/:id',verifyAuthor,updateData)
    app.delete('/:id',verifyAuthor,deleteData)
    app.post('/register',registerUser)
    app.post('/login',loginUser)
}
module.exports = Router