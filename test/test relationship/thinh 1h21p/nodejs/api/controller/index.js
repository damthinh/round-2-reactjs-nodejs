
const modelAuthor = require("../model/modelAuthor")
const modelBooks = require("../model/modelBook")


exports.getData = async (req, res) => {
    try {
        let getAuthor = await modelAuthor.find().populate({
            path: 'id_Books',
            select: '-id_Author'
        })
        let getBooks = await modelBooks.find().populate({
            path: 'id_Author',
            select: '-id_Books'
        })
        res.send({ getAuthor, getBooks })
    } catch (error) {
        res.send({ errorMessage: error })
    }
}
exports.addnBooks_nAuthor = async (req, res) => {
    try {
        let { nameAuthor, date_of_birth, country, price, type, description } = req.body
        let id_Books = []
        let id_Author = []
        for (let i in price) {
            if (price[i]) {
                let addBooks = await modelBooks.create({ price: price[i] })
                id_Books.push(addBooks._id)
            }
        }
        for (let i in id_Books) {
            if (id_Books[i]) {
                for (let j in type) {
                    if (type[j]) {
                        await modelBooks.findByIdAndUpdate(id_Books[i], { type: type[i] })
                    }
                }
                for (let j in description) {
                    if (description[j]) {
                        await modelBooks.findByIdAndUpdate(id_Books[i], { description: description[i] })
                    }
                }
            }
        }
        for (let i in nameAuthor) {
            if (nameAuthor[i]) {
                let addAuthor = await modelAuthor.create({ name: nameAuthor[i] })
                id_Author.push(addAuthor._id)
            }
        }
        for (let i in id_Author) {
            if (id_Author[i]) {
                for (let j in date_of_birth) {
                    if (date_of_birth[j]) {
                        await modelAuthor.findByIdAndUpdate(id_Author[i], { date_of_birth: date_of_birth[i] })
                    }
                }
                for (let j in country) {
                    if (country[j]) {
                        await modelAuthor.findByIdAndUpdate(id_Author[i], { country: country[i] })
                    }
                }
            }
        }
        res.send({ message: 'add ok' })
    } catch (error) {
        res.send({ errorMessage: error })
    }
}
exports.addnBooksVsnidAuthor = async (req, res) => {
    try {
        let { id_Author, price, type, description } = req.body
        let id_Books = []
        for (let i in price) {
            if (price[i]) {
                let addBooks = await modelBooks.create({ price: price[i], id_Author: id_Author })
                id_Books.push(addBooks._id)
            }
        }
        for (let i in id_Books) {
            if (id_Books[i]) {
                for (let j in type) {
                    if (type[j]) {
                        await modelBooks.findByIdAndUpdate(id_Books[i], { type: type[i] })
                    }
                }
                for (let j in description) {
                    if (description[j]) {
                        await modelBooks.findByIdAndUpdate(id_Books[i], { description: description[i] })
                    }
                }
            }
        }
        for (let i in id_Author) {
            if (id_Author[i]) {
                let getAuthor = await modelAuthor.findById(id_Author[i])
                for (let j in id_Books) {
                    if (id_Books[j]) {
                        await getAuthor.id_Books.push(id_Books[j])
                    }
                }
                await modelAuthor.findByIdAndUpdate(id_Author[i], { id_Books: getAuthor.id_Books })
            }
        }
        res.send({message:'add ok'})
    } catch (error) {
        res.send({ errorMessage: error })
    }
}
exports.updatenBookVsnAuthor = async (req, res) => {
    try {
        let {id_Books,id_Author} = req.body
        for(let i in id_Books){
            if (id_Books[i]) {
                let getBooks =await modelBooks.findById(id_Books[i])
                for(let j in id_Author){
                    if (!getBooks.id_Author.includes(id_Author[j])) {
                       await getBooks.id_Author.push(id_Author[j])
                    }
                }
                await modelBooks.findByIdAndUpdate(id_Books[i],{id_Author:getBooks.id_Author})
            }
        }for(let i in id_Author){
            if (id_Author[i]) {
                let getAuthor =await modelAuthor.findById(id_Author[i])
                for(let j in id_Books){
                    if (!getAuthor.id_Books.includes(id_Books[j])) {
                       await getAuthor.id_Books.push(id_Books[j])
                    }
                }
                await modelAuthor.findByIdAndUpdate(id_Author[i],{id_Books:getAuthor.id_Books})
            }
        }
        res.send({message:"update ok"})
    } catch (error) {
        res.send({ errorMessage: error })
    }
}
exports.updatenAuthor = async (req, res) => {
    try {
        let { nameAuthor, date_of_birth, country, id_Author } = req.body
        for (let i in id_Author) {
            if (id_Author[i]) {
                for (let j in date_of_birth) {
                    if (date_of_birth[j]) {
                        await modelAuthor.findByIdAndUpdate(id_Author[i], { date_of_birth: date_of_birth[i] })
                    }
                }
                for (let j in country) {
                    if (country[j]) {
                        await modelAuthor.findByIdAndUpdate(id_Author[i], { country: country[i] })
                    }
                }
                for (let j in nameAuthor) {
                    if (nameAuthor[j]) {
                        await modelAuthor.findByIdAndUpdate(id_Author[i],{ name: nameAuthor[i] })
                    }
                }
            }
        }
        res.send({ message: 'update ok' })
    } catch (error) {
        res.send({ errorMessage: error })
    }
}
exports.deletenAuthor_nBooks = async (req, res) => {
    try {
        let {id_Books,id_Author} = req.body
        for(let i in id_Books){
            if (id_Books[i]) {
                let getBooks =await modelBooks.findByIdAndDelete(id_Books[i])
                for(let j in getBooks.id_Author){
                    if (getBooks.id_Author[j]) {
                        let getAuthor = await modelAuthor.findById(getBooks.id_Author[j])
                        if (getAuthor.id_Books.includes(id_Books[i])) {
                           await getAuthor.id_Books.splice(getAuthor.id_Books.indexOf(id_Books[i]),1)
                        }
                        await modelAuthor.findByIdAndUpdate(getBooks.id_Author[j],{id_Books:getAuthor.id_Books})
                    }
                }
            }
        }
        for(let i in id_Author){
            if (id_Author[i]) {
                let getAuthor =await modelAuthor.findByIdAndDelete(id_Author[i])
                for(let j in getAuthor.id_Books){
                    if (getAuthor.id_Books[j]) {
                        let getBooks = await modelBooks.findById(getAuthor.id_Books[j])
                        if (getBooks.id_Author.includes(id_Author[i])) {
                           await getBooks.id_Author.splice(getBooks.id_Author.indexOf(id_Author[i]),1)
                        }
                        await modelBooks.findByIdAndUpdate(getAuthor.id_Books[j],{id_Author:getBooks.id_Author})
                    }
                }
            }
        }
        res.send({message:'delete ok '})
    } catch (error) {
        res.send({ errorMessage: error })
    }
}
// exports.getAll = async (req, res) => {
//     try {

//     } catch (error) {
//         res.send({ errorMessage: error })
//     }
// }