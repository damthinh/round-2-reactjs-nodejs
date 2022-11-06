const {  addData, addProductVsidDistributor, addDistributorVsidProduct, updateProduct, updateDistributor, deleteData, getAll, addUser } = require("../controller")

const Router = (app) =>{
    app.get('/',getAll)
    app.post('/',addData)
    app.post('/productvsid',addProductVsidDistributor)
    app.post('/distributorvsid',addDistributorVsidProduct)

    
    app.post('/user',addUser)

    app.put('/product',updateProduct)
    app.put('/distributor',updateDistributor)

    app.delete('/',deleteData)
}

module.exports=Router