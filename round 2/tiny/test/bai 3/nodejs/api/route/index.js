const { getData, addImgData, addData, updateData, deleteData } = require("../controller")

const Router = (app)=>{
    app.get('/',getData)
    app.post('/img',addImgData)
    app.post('/',addData)
    app.put('/:id',updateData)
    app.delete('/:id',deleteData)
}
module.exports = Router