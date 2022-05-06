const { searchData, addData, updateData, deleteData, deleteOneImgData, addImgData } = require("../controller")


const Router = (app)=>{
    app.get('/',searchData)
    app.post('/',addData)
    app.post('/img',addImgData)
    app.put('/:id',updateData)
    app.delete('/:id',deleteData)
    app.delete('/img/:id',deleteOneImgData)
}
module.exports = Router