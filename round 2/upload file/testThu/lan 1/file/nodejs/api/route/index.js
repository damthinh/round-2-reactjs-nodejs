const { searchData, addData, updateData, deleteData, deleteOneImgData } = require("../controller")


const Router = (app)=>{
    app.get('/',searchData)
    app.post('/',addData)
    app.put('/:id',updateData)
    app.delete('/:id',deleteData)
    app.delete('/img/:id',deleteOneImgData)
}
module.exports = Router

// {
//     "img": [
//       "http://localhost:3002/1640449810860-972593791-anh2.jfif",
//       "http://localhost:3002/1640449810863-282617583-1.jpg",
//       "http://localhost:3002/1640449810864-899124305-anh5.jfif",
//       "http://localhost:3002/1640449810867-591822294-anh3.jfif",
//       "http://localhost:3002/1640449810868-986749834-anh4.jfif"
//     ],
//     "_id": "61c74712ec982809b48fcdfa",
//     "title": "new122",
//     "__v": 0
//   }