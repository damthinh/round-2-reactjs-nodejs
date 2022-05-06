const modelAuthor = require("../model/modelAuthor");
const modelBooks = require("../model/modelBook");

exports.getData = async(req,res)=>{
    try {
        console.log("vo get populate");
        let getAuthor = await modelAuthor.find().populate({
            path:'id_Books',
            select: '-id_Author'
        })
        // let getAuthors = await modelAuthor.find()
        console.log("getAuthor",getAuthor);
        let getBooks = await modelBooks.find().populate({
            path:'id_Author',
            select: '-id_Books'
        })
        res.send({getAuthor,getBooks})
    } catch (error) {
        res.send({errorMessage: error.errorMessage})
    }
}
// exports.getData = async(req,res)=>{
//     try {
//     console.log("vo get");
//     let getAuthors = await modelAuthor.find()
//     res.send(getAuthors)
//     } catch (error) {
//         res.send({errorMessage: error.errorMessage})
//     }
// }
// exports.getData = async(req,res)=>{
//     try {
        
//     } catch (error) {
//         res.send({errorMessage: error.errorMessage})
//     }
// }
// exports.getData = async(req,res)=>{
//     try {
        
//     } catch (error) {
//         res.send({errorMessage: error.errorMessage})
//     }
// }
// exports.getData = async(req,res)=>{
//     try {
        
//     } catch (error) {
//         res.send({errorMessage: error.errorMessage})
//     }
// }
// exports.getData = async(req,res)=>{
//     try {
        
//     } catch (error) {
//         res.send({errorMessage: error.errorMessage})
//     }
// }