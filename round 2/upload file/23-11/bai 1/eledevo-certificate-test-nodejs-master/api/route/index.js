const { getData, postData, deleteData, putData, deleteOneImgData } = require("../controller")

const Router = (app)=>{
    app.get('/',getData)
    app.post('/',postData)
    app.delete('/:id',deleteData)
    app.put('/:id',putData)
    app.delete('/img/:id',deleteOneImgData)
}
module.exports = Router