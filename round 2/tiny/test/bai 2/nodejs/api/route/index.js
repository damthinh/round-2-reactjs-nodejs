const { getData, addImgData, addData, updateData, deleteData } = require("../controller")

const Router = (app)=>{
    app.get('/',getData)
    app.post('/img',addImgData)
    app.post('/',addData)
    app.put('/:id',updateData)
    app.delete('/:id',deleteData)
}
module.exports = Router

// 1641122265144-715368935-anh4.jpg//1641122300359-889338987-anh5.jpg