const { paginationData, addExcel, addData, updateData, deleteData } = require("../controller")

const Router = (app)=>{
    app.get('/',paginationData)
    app.post('/excel',addExcel)
    app.post('/',addData)
    app.put('/:id',updateData)
    app.delete('/:id',deleteData)
}

module.exports = Router