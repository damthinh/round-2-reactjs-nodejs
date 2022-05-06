const { getData, addFileExcel, addData, deleteData, updateData } = require("../controller")

const Router = (app)=>{
    app.get('/',getData)
    app.post('/excel',addFileExcel)
    app.post('/',addData)
    app.delete('/:id',deleteData)
    app.put('/:id',updateData)
}
module.exports = Router