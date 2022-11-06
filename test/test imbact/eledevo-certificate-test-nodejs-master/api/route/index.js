const { pagiData, addData, putData, deleteData } = require("../controller")

const Router = (app)=>{
    app.get('/',pagiData)
    app.post('/',addData)
    app.put('/:id',putData)
    app.delete('/:id',deleteData)
}
module.exports = Router