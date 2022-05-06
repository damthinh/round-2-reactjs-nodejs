const { searchData, addData, updateData, deleteData, deleteOneImg } = require("../controller")

const Router = (app)=>{
    app.get('/',searchData)
    app.post('/',addData)
    app.put('/:id',updateData)
    app.delete('/:id',deleteData)
    app.delete('/img/:id',deleteOneImg)
}

module.exports = Router