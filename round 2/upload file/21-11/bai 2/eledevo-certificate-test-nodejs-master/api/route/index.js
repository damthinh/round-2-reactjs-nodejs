const { searchData, addData, putData, deleteData, deleteOneImgData } = require("../controller")

const Router = (app)=>{
    app.get('/',searchData)
    app.post('/',addData)
    app.put('/:id',putData)
    app.delete('/:id',deleteData)
    
    app.delete('/img/:id',deleteOneImgData)
}
module.exports = Router

// "img": [
//     "http://localhost:3002/1640156199019-687348911-1.jpg",
//     "http://localhost:3002/1640156199019-1687922-2.jpg",
//     "http://localhost:3002/1640156199022-460121614-3.jpg",
//     "http://localhost:3002/1640156199023-147617258-tét.jpg"
//   ],
//   "_id": "61c2cc271ce11a3a44a3cda4",
//   "title": "",
//   "__v": 0
// }
// ]