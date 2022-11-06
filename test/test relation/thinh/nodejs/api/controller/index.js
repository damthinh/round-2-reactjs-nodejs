const modelDistributor = require("../model/modelDistributor")
const modelProduct = require("../model/modelProduct")


exports.getAll = async (req, res) => {
    try {
        console.log("vao get");
        let getDistributor = await modelDistributor.find().populate({
            path: "id_Product",
            select: '-id_Distributor'
        })
        let getProduct = await modelProduct.find().populate({
            path: 'id_Distributor',
            select: '-id_Product'
        })
        res.send({ getDistributor, getProduct })
    } catch (error) {
        res.send({ errorMessage: error.message })
    }
}

exports.addUser = async (req, res) => {
    try {
        let { name, address } = req.body
        if (!name||!address) {
            return res.send("nhap day du")
        }
        let checkName = name.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
        if (checkName) {
            let checkPass = address.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
            if (checkPass) {
                let checkMail = await modelDistributor.findOne({name:name})
                if (checkMail) {
                    return res.send({errorMessage:"mail ton tai"})
                } else {
                   let addData= await modelDistributor.create({name:name,address:address})
                    res.send(addData)
                }
            }
            else {
                return res.send({ errorMessage: " pass sai" })
            }
            // res.send(checkPass)
        } else {
            return res.send({ errorMessage: "mail sai" })
        }
        // if(name){
        //     if (address) {
        //        let a= name.match(email.match(
        //             /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        //           ))
        //         // let checkMail = await modelDistributor.findOne(name)
        //         // if (checkMail) {
        //         //     return res.send({errorMessage:"mail ton tai"})
        //         // } else {

        //         // }
        //     }else{
        //         return res.send({errorMessage:"nhap pass"})
        //     }
        // }else{
        //     return res.send({errorMessage:"nhap mail"})
        // }
        // res.send(a)
    } catch (error) {
        res.send({ errorMessage: error.message })
    }
}

exports.addData = async (req, res) => {
    try {
        let { name, address, price, EXP } = req.body

        if (name.length === address.length) {
            for (let i in name) {
                if (name[i] && address[i]) {
                    await modelDistributor.create({ name: name[i], address: address[i] })
                }
                else {
                    return res.send({ errorMessage: "nhap thieu" })
                }
            }
        }
        else {
            return res.send({ errorMessage: "nhap thieu" })
        }
        // for (let i in price) {
        //     await modelProduct.create({ price: price[i], EXP: EXP[i] })
        // }
        res.send("add ok")
    } catch (error) {
        res.send({ errorMessage: error.message })
    }
}

exports.addProductVsidDistributor = async (req, res) => {
    try {
        let { id_Distributor, price, EXP } = req.body
        let id_Product = []
        for (let i in price) {
            let addProduct = await modelProduct.create({ price: price[i], EXP: EXP[i], id_Distributor })
            id_Product.push(addProduct._id)
        }
        for (let i in id_Distributor) {
            await modelDistributor.findByIdAndUpdate(id_Distributor[i], { $push: { id_Product: { $each: id_Product } } })
        }
        res.send("add ok")
    } catch (error) {
        res.send({ errorMessage: error.message })
    }
}
exports.addDistributorVsidProduct = async (req, res) => {
    try {
        let { name, address, id_Product } = req.body
        let id_Distributor = []
        for (let i in name) {
            let addDistributor = await modelDistributor.create({ name: name[i], address: address[i], id_Product })
            id_Distributor.push(addDistributor._id)
        }
        for (let i in id_Product) {
            await modelProduct.findByIdAndUpdate(id_Product[i], { $push: { id_Distributor: { $each: id_Distributor } } })
        }

        res.send("add ok")
    } catch (error) {
        res.send({ errorMessage: error.message })
    }
}
// update
exports.updateDistributor = async (req, res) => {
    try {
        let { id_Distributor, id_Product } = req.body

        for (let i in id_Distributor) {
            let updateDistributor = await modelDistributor.findByIdAndUpdate(id_Distributor[i], { $addToSet: { id_Product: { $each: id_Product } } }, { new: false })
            for (let j in updateDistributor.id_Product) {
                if (!id_Product.includes(`${updateDistributor.id_Product[j]}`)) {
                    await modelDistributor.findByIdAndUpdate(id_Distributor[i], { $pull: { id_Product: updateDistributor.id_Product[j] } })
                    await modelProduct.findByIdAndUpdate(updateDistributor.id_Product[j], { $pull: { id_Distributor: { $in: id_Distributor } } })
                }
            }
        }
        for (let i in id_Product) {
            await modelProduct.findByIdAndUpdate(id_Product[i], { $addToSet: { id_Distributor: { $each: id_Distributor } } })
        }
        res.send("update ok")
    } catch (error) {
        res.send({ errorMessage: error.message })
    }
}

exports.updateProduct = async (req, res) => {
    try {
        let { id_Product, id_Distributor } = req.body
        for (let i in id_Product) {
            let updateProduct = await modelProduct.findByIdAndUpdate(id_Product[i], { $addToSet: { id_Distributor: { $each: id_Distributor } } }, { new: false })
            for (let j in updateProduct.id_Distributor) {
                if (!id_Distributor.includes(`${updateProduct.id_Distributor[j]}`)) {
                    await modelProduct.findByIdAndUpdate(id_Product[i], { $pull: { id_Distributor: updateProduct.id_Distributor[j] } })
                    await modelDistributor.findByIdAndUpdate(updateProduct.id_Distributor[j], { $pull: { id_Product: { $in: id_Product } } })
                }
            }
        }
        for (let i in id_Distributor) {
            await modelDistributor.findByIdAndUpdate(id_Distributor[i], { $addToSet: { id_Product: { $each: id_Product } } })
        }
        res.send("update ok")
    } catch (error) {
        res.send({ errorMessage: error.message })
    }
}
// delete
exports.deleteData = async (req, res) => {
    try {
        let { id_Product, id_Distributor } = req.body
        await modelDistributor.updateMany({ $pull: { id_Product: { $in: id_Product } } })
        await modelProduct.updateMany({ $pull: { id_Distributor: { $in: id_Distributor } } })

        for (let i in id_Product) {
            if (id_Product[i]) {
                await modelProduct.findByIdAndDelete(id_Product[i])
            }
        }
        for (let i in id_Distributor) {
            if (id_Distributor[i]) {
                await modelDistributor.findByIdAndDelete(id_Distributor[i])
            }
        }
        res.send("delete ok")
    } catch (error) {
        res.send({ errorMessage: error.message })
    }
}