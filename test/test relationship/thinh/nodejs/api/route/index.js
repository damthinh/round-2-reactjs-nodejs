const { getAll, addnBooks_nAuthor, addnBooksVsnidAuthor, getData, updatenBookVsnAuthor, updatenAuthor, deletenAuthor_nBooks } = require("../controller")

const Router = (app)=>{
    app.get('/get',getData)
    app.post('/',addnBooks_nAuthor)
    app.post('/nBooksVsnIdAuthor',addnBooksVsnidAuthor)
    app.put('/nidBooksVsnidAuthor',updatenBookVsnAuthor)
    app.put('/nAuthor',updatenAuthor)
    app.delete('/',deletenAuthor_nBooks)
}
module.exports= Router