const { searchData, addData, deleteData, updateData, deleteOneImgData, addImgData } = require("../controller")


const Router = (app) =>{
    app.get('/',searchData)
    app.post('/',addData)
    app.post('/img',addImgData)
    app.delete('/:id',deleteData)
    app.put('/:id',updateData)
}

module.exports = Router