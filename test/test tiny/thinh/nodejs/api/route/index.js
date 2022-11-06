const { getData, addImgData, addData, updateData, deleteData } = require("../controller")

const Router = (app)=>{
    app.get('/',getData)
    app.post('/img',addImgData)
    app.post('/',addData)
    app.put('/:id',updateData)
    app.delete('/:id',deleteData)
}
module.exports = Router
//1641262536601-489308322-1.jpg//1641262554113-935658642-anh1.jpg//1641262575587-473331744-anh2.jpg//61d3ae0c7caafd1dc0bcecea