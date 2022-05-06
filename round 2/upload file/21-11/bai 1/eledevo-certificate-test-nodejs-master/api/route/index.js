const { getData, addData, deleteData, updateData } = require("../controller")

const Router = (app)=>{
    app.get('/',getData)
    app.post('/',addData)
    app.delete('/:id',deleteData)
    app.put('/:id',updateData)
}
module.exports = Router