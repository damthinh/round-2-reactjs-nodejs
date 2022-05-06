const { searchData, addData, updateData, deleteData, deleteOneImgData } = require("../controller")

const Router = (app)=>{
    app.get('/',searchData)
    app.post('/',addData)
    app.put('/:id',updateData)
    app.delete('/:id',deleteData)
    app.delete('/img/:id',deleteOneImgData)
}
module.exports = Router

// {"addData": {
    // "img": [
    //     "http://localhost:3002/1640569757294-500499055-2.jpg",
    //     "http://localhost:3002/1640569757297-733994418-1.jpg",
    //     "http://localhost:3002/1640569757298-309051210-3.jpg",
    //     "http://localhost:3002/1640569757299-931493414-anh5.jfif"
    //   ],
    //   "_id": "61c91b9df8863b2f6ca9da5c",
    //   "title": "new1",
    //   "__v": 0
    // },