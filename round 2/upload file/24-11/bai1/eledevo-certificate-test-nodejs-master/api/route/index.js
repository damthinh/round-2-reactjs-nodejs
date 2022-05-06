const { searchData, addData, updateData, deleteData, deleteOneImgData } = require("../controller")

const Router = (app)=>{
    app.get('/',searchData)
    app.post('/',addData)
    app.put('/:id',updateData)
    app.delete('/:id',deleteData)
    
    app.delete('/img/:id',deleteOneImgData)
}
module.exports = Router
