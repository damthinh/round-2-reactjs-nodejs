
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
// add
exports.addnBooks_nAuthor = async (req, res) => {
    try {
        let { nameAuthor, date_of_birth, country, price, type, description } = req.body
        for (let i in price) {
            await modelBooks.create({ price: price[i], type: type[i], description: description[i] })
        }
        for (let i in nameAuthor) {
            if (nameAuthor[i]) {
                await modelAuthor.create({ name: nameAuthor[i], date_of_birth: date_of_birth[i], country: country[i] })
            }
        }
        res.send({ message: 'add ok' })
    } catch (error) {
        res.send({ errorMessage: error })
    }
}
exports.addnBooks_nAuthorAndConnect = async (req, res) => {
    try {
        let { nameAuthor, date_of_birth, country, price, type, description } = req.body
        let id_Author = []
        let id_Books = []
        for (let i in nameAuthor) {
            if (nameAuthor[i]) {
                let addAuthor = await modelAuthor.create({ name: nameAuthor[i], date_of_birth: date_of_birth[i], country: country[i] })
                id_Author.push(addAuthor._id)
            }
        }
        for (let i in price) {
            if (price[i]) {
                let addBooks = await modelBooks.create({ price: price[i], type: type[i], description: description[i], id_Author })
                id_Books.push(addBooks._id)
            }

        }
        for (let i in id_Author) {
            if (id_Author[i]) {
                await modelAuthor.findByIdAndUpdate(id_Author[i], { id_Books })
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
                let addBooks = await modelBooks.create({ price: price[i], type: type[i], description: description[i], id_Author })
                id_Books.push(addBooks._id)
            }
        }
        for (let i in id_Author) {
            if (id_Author[i]) {
                await modelAuthor.findByIdAndUpdate(id_Author[i], { $push: { id_Books: { $each: id_Books } } })
            }
        }
        res.send({ message: 'add ok' })
    } catch (error) {
        res.send({ errorMessage: error })
    }
}

exports.addnAuthorVsnidBooks = async (req, res) => {
    try {
        let { id_Books, nameAuthor, date_of_birth, country } = req.body
        let id_Author = []
        for (let i in nameAuthor) {
            if (nameAuthor[i]) {
                addAuthor = await modelAuthor.create({ name: nameAuthor[i], date_of_birth: date_of_birth[i], country: country[i], id_Books })
                id_Author.push(addAuthor._id)
            }
        }
        for (let i in id_Books) {
            if (id_Books[i]) {
                await modelBooks.findByIdAndUpdate(id_Books[i], { $push: { id_Author: { $each: id_Author } } })
            }
        }
        res.send({ message: 'add ok' })
    } catch (error) {
        res.send({ errorMessage: error })
    }
}
// update
exports.updateAddConnect = async (req, res) => {
    try {
        let { id_Books, id_Author } = req.body
        for (let i in id_Books) {
            if (id_Books[i]) {
                await modelBooks.findByIdAndUpdate(id_Books[i], { $addToSet: { id_Author: { $each: id_Author } } })
            }
        } for (let i in id_Author) {
            if (id_Author[i]) {
                await modelAuthor.findByIdAndUpdate(id_Author[i], { $addToSet: { id_Books: { $each: id_Books } } })
            }
        }
        res.send({ message: "update Add Connect ok" })
    } catch (error) {
        res.send({ errorMessage: error })
    }
}
exports.updateAllConnect = async (req, res) => {
    try {
        let { id_Books, id_Author } = req.body
        await modelAuthor.updateMany({}, { $pull: { id_Books: { $in: id_Books } } })
        await modelBooks.updateMany({}, { $pull: { id_Author: { $in: id_Author } } })
        for (let i in id_Books) {
            if (id_Books[i]) {
                await modelBooks.findByIdAndUpdate(id_Books[i], { id_Author })
            }
        } for (let i in id_Author) {
            if (id_Author[i]) {
                await modelAuthor.findByIdAndUpdate(id_Author[i], { id_Books })
            }
        }
        res.send({ message: "update All Connect  ok" })
    } catch (error) {
        res.send({ errorMessage: error })
    }
}
exports.updatenAuthor_nBooks = async (req, res) => {
    try {
        let { nameAuthor, date_of_birth, country, id_Author, price, type, description, id_Books } = req.body
        for (let i in id_Author) {
            if (id_Author[i]) {
                for (let j in date_of_birth) {
                    if (date_of_birth[j]) {
                        await modelAuthor.findByIdAndUpdate(id_Author[i], { date_of_birth: date_of_birth[i], country: country[i], name: nameAuthor[i] })
                    }
                }
            }
        } for (let i in id_Books) {
            if (id_Books[i]) {
                for (let j in price) {
                    if (price[j]) {
                        await modelBooks.findByIdAndUpdate(id_Books[i], { price: price[i], type: type[i], description: description[i] })
                    }
                }
            }
        }
        res.send({ message: 'update nAuthor_nBooks ok' })
    } catch (error) {
        res.send({ errorMessage: error })
    }
}

exports.updateAllConnectnBook = async (req, res) => {
    try {
        let { id_Books, id_Author } = req.body
        await modelAuthor.updateMany({}, { $pull: { id_Books: { $in: id_Books } } })
        for (let i in id_Books) {
            if (id_Books[i]) {
                await modelBooks.findByIdAndUpdate(id_Books[i], { id_Author })
            }
        } for (let i in id_Author) {
            if (id_Author[i]) {
                await modelAuthor.findByIdAndUpdate(id_Author[i], { $addToSet: { id_Books: { $each: id_Books } } })
            }
        }
        res.send({ message: "update All Connect nBook ok" })
    } catch (error) {
        res.send({ errorMessage: error })
    }
}
exports.updateAllConnectnAuthor = async (req, res) => {
    try {
        let { id_Author, id_Books } = req.body
        await modelBooks.updateMany({}, { $pull: { id_Author: { $in: id_Author } } })
        for (let i in id_Author) {
            if (id_Author[i]) {
                await modelAuthor.findByIdAndUpdate(id_Author[i], { id_Books })
            }
        } for (let i in id_Books) {
            if (id_Books[i]) {
                await modelBooks.findByIdAndUpdate(id_Books[i], { $addToSet: { id_Author: { $each: id_Author } } })
            }
        }
        res.send({ message: "update All Connect nAuthor ok" })
    } catch (error) {
        res.send({ errorMessage: error })
    }
}
// delete
exports.deletenAuthor_nBooks = async (req, res) => {
    try {
        let { id_Books, id_Author } = req.body
        await modelAuthor.updateMany({}, { $pull: { id_Books: { $in: id_Books } } })
        await modelBooks.updateMany({}, { $pull: { id_Author: { $in: id_Author } } })
        for (let i in id_Books) {
            if (id_Books[i]) {
                await modelBooks.findByIdAndDelete(id_Books[i])
            }
        }
        for (let i in id_Author) {
            if (id_Author[i]) {
                await modelAuthor.findByIdAndDelete(id_Author[i])
            }
        }
        res.send({ message: 'delete ok ' })
    } catch (error) {
        res.send({ errorMessage: error })
    }
}
exports.deletenConnect = async (req, res) => {
    try {
        let { id_Books, id_Author } = req.body
        for (let i in id_Books) {
            if (id_Books[i]) {
                await modelBooks.findByIdAndUpdate(id_Books[i], { $pull: { id_Author: { $in: id_Author } } })
            }
        }
        for (let i in id_Author) {
            if (id_Author[i]) {
                await modelAuthor.findByIdAndUpdate(id_Author[i], { $pull: { id_Books: { $in: id_Books } } })
            }
        }
        res.send({ message: 'delete Connect ok ' })
    } catch (error) {
        res.send({ errorMessage: error })
    }
}