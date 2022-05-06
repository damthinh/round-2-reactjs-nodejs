const  mongoose  = require("mongoose");

const todoSchema = mongoose.Schema({
    title :String,
    img: Array
})

const todoModel = mongoose.model("todoModel",todoSchema)

module.exports = todoModel

// {
//     "img": [
//       "http://localhost:3002/1640533997470-702851131-1.jpg",
    // "http://localhost:3002/1640533997471-982042634-anh3.jfif",
    // "http://localhost:3002/1640533997471-62537115-anh5.jfif",
    // "http://localhost:3002/1640533997472-944879544-3.jpg"
//     ],
//     "_id": "61c88d74caaf63117c65d8c9",
//     "title": "new1",
//     "__v": 0
//   },61c890ac2409c61e90309d3c
// {
//     "img": [
//       "http://localhost:3002/1640534209100-769535886-1.jpg",
//       "http://localhost:3002/1640534209102-800451803-2.jpg",
//       "http://localhost:3002/1640534209104-965489149-3.jpg",
//       "http://localhost:3002/1640534209106-287131720-anh1.jfif"
//     ],
//     "_id": "61c890c12409c61e90309d3e",
//     "title": "new1",
//     "__v": 0
//   }