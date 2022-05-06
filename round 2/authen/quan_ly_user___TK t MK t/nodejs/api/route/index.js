const { verify, verifyAuthor } = require("../../middlewera/jwt")
const { getData, addData, updateData, deleteData, loginUser, registerUser, updateUser, getUser } = require("../controller")

const Router = (app)=>{
    app.get('/',verify,getData)
    app.post('/',verifyAuthor,addData)
    app.put('/:id',verifyAuthor,updateData)
    app.delete('/:id',verifyAuthor,deleteData)

    
    app.post('/register',registerUser)
    app.post('/login',loginUser)

    
    app.get('/user',verifyAuthor,getUser)
    app.put('/user/:id',verifyAuthor,updateUser)
}

module.exports = Router