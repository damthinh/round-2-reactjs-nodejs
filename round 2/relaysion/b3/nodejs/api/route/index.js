const { getData, addnBooks_nAuthor, addnBooks_nAuthorAndConnect, addnBooksVsnidAuthor, addnAuthorVsnidBooks, updateConnectnBook, updateConnectnAuthor, deletenAuthor_nBooks } = require("../controller")

const Router = (app)=>{
    app.get('/get',getData)
    app.post('/',addnBooks_nAuthor)
    
    app.post('/addAndConnect',addnBooks_nAuthorAndConnect)
    app.post('/nBooksVsnIdAuthor',addnBooksVsnidAuthor)
    app.post('/nAuthorVsnIdBooks',addnAuthorVsnidBooks)

    
    app.put('/updateConnectnBook',updateConnectnBook)
    app.put('/updateConnectnAuthor',updateConnectnAuthor)

    
    app.delete('/',deletenAuthor_nBooks)
}
module.exports=Router