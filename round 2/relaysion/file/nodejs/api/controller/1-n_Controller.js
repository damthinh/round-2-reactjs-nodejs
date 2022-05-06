const modelGV = require("../model/gv")
const modelHS = require("../model/hs")

// HS
exports.addHS = async (req, res) => {
    try {
        let data = req.body
        console.log(data);
        let addHS = await modelHS.create(data)
        if (data.id_GV.length > 0) {
            for (let i = 0; i < data.id_GV.length; i++) {
                let getGV = await modelGV.findById(data.id_GV[i])
                let id_HS = getGV.id_HS
                id_HS.push(addHS)
                await modelGV.findByIdAndUpdate(data.id_GV[i], { id_HS })
            }
        }
        res.send(addHS);
    } catch (error) {
        res.send({ errorMessage: error.message })
    }
}

exports.updateHS = async (req, res) => {
    try {
        let id = req.params.id
        let { id_GV, name } = req.body
        let getHS = await modelHS.findById(id)
        if (getHS.id_GV.length>0) {
            for (let i in getHS.id_GV) {
                let getGV = await modelGV.findById(getHS.id_GV[i])
                await getGV.id_HS.splice(getGV.id_HS.indexOf(id), 1)
                await modelGV.findByIdAndUpdate(getHS.id_GV[i], { id_HS: getGV.id_HS }, { new: true })
            }
        }
        if (id_GV.length>0) {
            for (let i in id_GV) {
                let getGV = await modelGV.findById(id_GV[i])
                getGV.id_HS.push(id)
                await modelGV.findByIdAndUpdate(id_GV[i], { id_HS: getGV.id_HS }, { new: true })
            }
        }
        let updateHS = await modelHS.findByIdAndUpdate(id, { name, id_GV }, { new: true })
        res.send(updateHS)
    } catch (error) {
        res.send({ errorMessage: error.message })
    }
}

exports.deleteHS = async (req, res) => {
    try {
        let id = req.params.id
        let deleteHS = await modelHS.findByIdAndDelete(id)
        if (deleteHS.id_GV.length>0) {
            for (let i in deleteHS.id_GV) {
                let getGV = await modelGV.findById(deleteHS.id_GV[i])
                await getGV.id_HS.splice(getGV.id_HS.indexOf(id), 1)
                await modelGV.findByIdAndUpdate(deleteHS.id_GV[i], { id_HS: getGV.id_HS }, { new: true })
            }
        }
        res.send(deleteHS)
    } catch (error) {
        res.send({ errorMessage: error.message })
    }
}

exports.deleteOneGVOfHS = async (req, res) => {
    try {
        console.log(req.params);
        let { id_HS, id_GV } = req.params
        let getHS = await modelHS.findById(id_HS)
        getHS.id_GV.splice(getHS.id_GV.indexOf(id_GV), 1)
        let updateHS = await modelHS.findByIdAndUpdate(id_HS, { id_GV: getHS.id_GV }, { new: true })
        let getGV = await modelGV.findById(id_GV)
        await getGV.id_HS.splice(getGV.id_HS.indexOf(id_HS), 1)
        let updateGV = await modelGV.findByIdAndUpdate(id_GV, { id_HS: getGV.id_HS }, { new: true })
        res.send({ updateHS, updateGV })
    } catch (error) {
        res.send({ errorMessage: error.message })
    }
}
// GV


exports.addGV = async (req, res) => {
    try {
        let data = req.body
        let addGV = await modelGV.create(data)
        if (data.id_HS.length > 0) {
            for (let i = 0; i < data.id_HS.length; i++) {
                let getHS = await modelHS.findById(data.id_HS[i])
                let id_GV = getHS.id_GV
                id_GV.push(addGV._id)
                await modelHS.findByIdAndUpdate(data.id_HS[i], { id_GV })
            }
        }
        res.send(addGV);
    } catch (error) {
        res.send({ errorMessage: error.message })
    }
}

exports.updateGV = async (req, res) => {
    try {
        let id = req.params.id
        let { id_HS, name } = req.body
        let getGV = await modelGV.findById(id)
        if (getGV.id_HS.length>0) {
            for(let i in getGV.id_HS){
                let getHS = await modelHS.findById(getGV.id_HS[i])
                await getHS.id_GV.splice(getHS.id_GV.indexOf(id),1)
                await modelHS.findByIdAndUpdate(getGV.id_HS[i],{id_GV:getHS.id_GV},{new:true})
            }
        }
        if (id_HS.length>0) {
            for(let i in id_HS){
                let getHS = await modelHS.findById(id_HS[i])
                getHS.id_GV.push(id)
                await modelHS.findByIdAndUpdate(id_HS[i],{id_GV:getHS.id_GV},{new:true})
            }
        }
        let updateGV = await modelGV.findByIdAndUpdate(id,{name,id_HS},{new:true})
        res.send(updateGV)
    } catch (error) {
        res.send({ errorMessage: error.message })
    }
}
exports.deleteGV = async (req, res) => {
    try {
        let id = req.params.id
        let deleteGV = await modelGV.findByIdAndDelete(id)
        if (deleteGV.id_HS.length>0) {
            for (let i in deleteGV.id_HS) {
                let getHS = await modelHS.findById(deleteGV.id_HS[i])
                await getHS.id_GV.splice(getHS.id_GV.indexOf(id), 1)
                await modelHS.findByIdAndUpdate(deleteGV.id_HS[i], { id_GV: getHS.id_GV }, { new: true })
            }
        }
        res.send(deleteGV);
    } catch (error) {
        res.send({ errorMessage: error.message })
    }
}

exports.deleteOneHSOfGV = async (req, res) => {
    try {
        let { id_GV, id_HS } = req.params
        console.log(req.params);
        let getGV = await modelGV.findById(id_GV)
        getGV.id_HS.splice(getGV.id_HS.indexOf(id_HS), 1)
        let updateGV = await modelGV.findByIdAndUpdate(id_GV, { id_HS:getGV.id_HS }, { new: true })
        let getHS = await modelHS.findById(id_HS)
        await getHS.id_GV.splice(getHS.id_GV.indexOf(id_GV), 1)
        let updateHS = await modelHS.findByIdAndUpdate(id_HS, { id_GV: getHS.id_GV }, { new: true })
        res.send({ updateGV, updateHS })
    } catch (error) {
        res.send({ errorMessage: error.message })
    }
}
exports.getAll = async (req, res) => {
    try {
        let listGV = await modelGV.find().populate({
            path: 'id_HS',
            select: "name",
        })
        let listHS = await modelHS.find().populate({
            path: 'id_GV',
            select: "name",
        })
        res.send({ listGV, listHS })
    } catch (error) {
        res.send({ errorMessage: error.message })
    }
}
