const { getHS, addHS, getGV, addGV, getlop, deleteAll, deleteGV, getAll, deleteHS, deleteOneGVOfHS, deleteOneHSOfGV, updateHS, updateGV } = require("../controller/1-n_Controller")
// const { addnn, addnnName, addnGV_nidHS, addnHS_nidGV, updateNew_nGV_nidHS, updateNew_nHS_nidGV, updatePost_nGV_nHS, deleteLink, deletenGV_nHS, deleteAllLink } = require("../controller/n-n_Contrller")

const Router = (app)=>{
    // 1-n
    app.post('/hs',addHS)
    app.put('/hs/:id',updateHS)
    app.delete('/hs/:id',deleteHS)
    app.delete('/hs/:id_HS/:id_GV',deleteOneGVOfHS)

    
    app.post('/gv',addGV)
    app.put('/gv/:id',updateGV)
    app.delete('/gv/:id',deleteGV)
    app.delete('/gv/:id_GV/:id_HS',deleteOneHSOfGV)



    // app.get('/',getAll)



    // n-n GV
    // app.post('/nn',addnnName)
    // app.put('/nn',updatePost_nGV_nHS)
    // app.delete('/nnlink',deleteLink)
    // app.delete('/nn',deletenGV_nHS)
    // app.delete('/nnalllink',deleteAllLink)
    // // GV
    // app.post('/ngvnidhs',addnGV_nidHS)
    // app.put('/ngvnidhs',updateNew_nGV_nidHS)
    // // HS
    // app.post('/nhsnidgv',addnHS_nidGV)
    // app.put('/nhsnidgv',updateNew_nHS_nidGV)
}
module.exports = Router