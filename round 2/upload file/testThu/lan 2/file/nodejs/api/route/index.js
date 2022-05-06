const { searchData, addData, deleteData, updateData, deleteOneImgData } = require("../controller")


const Router = (app) =>{
    app.get('/',searchData)
    app.post('/',addData)
    app.delete('/:id',deleteData)
    app.put('/:id',updateData)
    app.delete('/img/:id',deleteOneImgData)

}

module.exports = Router