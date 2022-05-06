const { getData, addData, updateData, deleteData } = require("../controller")

const Router = (app)=>{
    app.get('/',getData)
    app.post('/',addData)
    app.put('/:id',updateData)
    app.delete('/:id',deleteData)
}
module.exports = Router