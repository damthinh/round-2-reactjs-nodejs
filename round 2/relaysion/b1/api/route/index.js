const {  addnBooks_nAuthor, addnBooksVsnidAuthor, getData, deletenAuthor_nBooks, addnAuthorVsnidBooks, addnBooks_nAuthorAndConnect, updateAddConnectnBookVsnAuthor, updateAllConnectnBookVsnAuthor, updatenAuthor_nBooks, updateAllConnectnBook, updateAddConnect, updateAllConnect, updateAllConnectnAuthor, deletenConnect, updateConnectnBook, updateConnectnAuthor, updateConnect } = require("../controller")

const Router = (app)=>{
    app.get('/get',getData)


    app.post('/',addnBooks_nAuthor)
    app.post('/addAndConnect',addnBooks_nAuthorAndConnect)
    app.post('/nBooksVsnIdAuthor',addnBooksVsnidAuthor)
    app.post('/nAuthorVsnIdBooks',addnAuthorVsnidBooks)


    app.put('/updateConnectnBook',updateConnectnBook)
    app.put('/updateConnectnAuthor',updateConnectnAuthor)
    app.put('/',updatenAuthor_nBooks)


    // app.put('/updateAddConnect',updateAddConnect)
    // app.put('/updateAllConnect',updateAllConnect)
    // app.put('/updateConnectnBook',updateConnectnBook)
    // app.put('/updateConnectnAuthor',updateConnectnAuthor)


    app.delete('/',deletenAuthor_nBooks)
    app.delete('/deleteConnect',deletenConnect)
}
module.exports= Router