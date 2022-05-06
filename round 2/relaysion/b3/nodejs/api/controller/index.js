const modelAuthor = require("../model/modelAuthor")
const modelBooks = require("../model/modelBooks")

exports.addnBooks_nAuthor = async (req, res) => {
    try {
        console.log("vao add");
        let { nameAuthor, date_of_birth, country, price, description, type } = req.body

        for (let i in nameAuthor) {
            await modelAuthor.create({ name: nameAuthor[i], date_of_birth: date_of_birth[i], country: country[i] })
        }
        for (let i in price) {
            await modelBooks.create({ price: price[i], description: description[i], type: type[i] })
        }
        res.send("add ok")
    } catch (error) {
        res.send({ errorMessage: error.message })
    }
}

exports.getData = async (req, res) => {
    try {
        console.log("vao add");
        let getAuthor = await modelAuthor.find().populate({
            path: "id_Books",
            select: "-id_Author"
        })

        let getBooks = await modelBooks.find().populate({
            path: "id_Author",
            select: "-id_Books"
        })
        res.send({ getAuthor, getBooks })
    } catch (error) {
        res.send({ errorMessage: error.message })
    }
}
exports.addnBooksVsnidAuthor = async (req, res) => {
    try {
        let { id_Author, price, description, type } = req.body
        let id_Books = []

        for (let i in price) {
            let addBooks = await modelBooks.create({ price: price[i], description: description[i], type: type[i], id_Author: id_Author })
            id_Books.push(addBooks._id)
        }
        for (let i in id_Author) {
            await modelAuthor.findByIdAndUpdate(id_Author[i], { $push: { id_Books: { $each: id_Books } } })
        }
        res.send("add ok")
    } catch (error) {
        res.send({ errorMessage: error.message })
    }
}

exports.addnAuthorVsnidBooks = async (req, res) => {
    try {
        let { nameAuthor, date_of_birth, country, id_Books } = req.body
        let id_Author = []
        for (let i in nameAuthor) {
            let addAuthor = await modelAuthor.create({ name: nameAuthor[i], date_of_birth: date_of_birth[i], country: country[i], id_Books: id_Books })
            id_Author.push(addAuthor._id)
        }
        for (let i in id_Books) {
            await modelBooks.findByIdAndUpdate(id_Books[i], { $push: { id_Author: { $each: id_Author } } })
        }
        res.send("add ok")
    } catch (error) {
        res.send({ errorMessage: error.message })
    }
}
exports.addnBooks_nAuthorAndConnect = async (req, res) => {
    try {
        let { nameAuthor, date_of_birth, country, price, description, type } = req.body
        console.log("vao day");
        let id_Author = []
        let id_Books = []
        for (let i in nameAuthor) {
            let addAuthor = await modelAuthor.create({ name: nameAuthor[i], date_of_birth: date_of_birth[i], country: country[i] })
            id_Author.push(addAuthor._id)
        }
        for (let i in price) {
            let addBooks = await modelBooks.create({ price: price[i], description: description[i], type: type[i], id_Author: id_Author })
            id_Books.push(addBooks._id)
        }
        for (let i in id_Author) {
            await modelAuthor.findByIdAndUpdate(id_Author[i], { id_Books })
        }
        res.send("add ok")
    } catch (error) {
        res.send({ errorMessage: error.message })
    }
}

exports.updateConnectnAuthor = async (req, res) => {
    try {
        let { id_Author, id_Books } = req.body
        for (let i in id_Author) {
            let updateAuthor = await modelAuthor.findByIdAndUpdate(id_Author[i], { $addToSet: { id_Books: id_Books } }, { new: false })
            for (let j in updateAuthor.id_Books) {
                if (!id_Books.includes(`${updateAuthor.id_Books[j]}`)) {
                    await modelAuthor.findByIdAndUpdate(id_Author[i], { $pull: { id_Books: updateAuthor.id_Books[j] } })
                    await modelBooks.findByIdAndUpdate(updateAuthor.id_Books[j], { $pull: { id_Author: { $in: id_Author } } })
                }
            }
        }
        for(let i in id_Books){
            await modelBooks.findByIdAndUpdate(id_Books[i],{$addToSet:{id_Author:id_Author}})
        }
        
        res.send("ok")
    } catch (error) {
        res.send({ errorMessage: error.message })
    }
}

exports.updateConnectnBook = async (req, res) => {
    try {
        let { id_Author, id_Books } = req.body
        for (let i in id_Books) {
            let updateBooks = await modelBooks.findByIdAndUpdate(id_Books[i], { $addToSet: { id_Author: id_Author } }, { new: false })
            console.log("den day");
            for (let j in updateBooks.id_Author) {
                if (!id_Author.includes(`${updateBooks.id_Author[j]}`)) {
                    await modelBooks.findByIdAndUpdate(id_Books[i], { $pull: { id_Author: updateBooks.id_Author[j] } })
                    await modelAuthor.findByIdAndUpdate(updateBooks.id_Author[j], { $pull: { id_Books: { $in: id_Books } } })
                }
            }
        }
        for(let i in id_Author){
            await modelAuthor.findByIdAndUpdate(id_Author[i],{$addToSet:{id_Books:id_Books}})
        }
        res.send("ok")
    } catch (error) {
        res.send({ errorMessage: error.message })
    }
}
exports.deletenAuthor_nBooks = async (req, res) => {
    try {
        let { id_Author, id_Books } = req.body
        await modelAuthor.updateMany({$pull:{id_Books:{$in:id_Books}}})
        await modelBooks.updateMany({$pull:{id_Author:{$in:id_Author}}})
        for(i in id_Author){
            await modelAuthor.findByIdAndDelete(id_Author[i])
        }
        for(let i in id_Books){
            await modelBooks.findByIdAndDelete(id_Books[i])
        }
        res.send("ok")
    } catch (error) {
        res.send({ errorMessage: error.message })
    }
}