const modelGV = require("../model/gv")
const modelHS = require("../model/hs")

// exports.addnnid = async(req,res)=>{
//     try {
        
//     } catch (error) {
//         res.send({ errorMessage: error.message })
//     }
// }
exports.addnnName = async (req, res) => {
    try {
        let { nameHS, nameGV } = req.body
        let id_GV = []
        let id_HS = []
        for (let i in nameGV) {
            if (nameGV[i]) {
                let addGV = await modelGV.create({ name: nameGV[i], id_HS: [] })
                id_GV.push(addGV._id)
            }
        }
        for (let i in nameHS) {
            if (nameHS[i]) {
                var addHS = await modelHS.create({ name: nameHS[i], id_GV })
                id_HS.push(addHS._id)
            }
        }
        for (let i in id_GV) {
            if (id_GV[i]) {
                var updateGV = await modelGV.findByIdAndUpdate(id_GV[i], { id_HS },{new:true})
            }
        }
        res.send({addHS, updateGV})
        
    } catch (error) {
        res.send({ errorMessage: error.message })
    }
}

exports.updatePost_nGV_nHS = async(req,res)=>{
    try {
        let { id_GV, id_HS } = req.body
        for(let i in id_GV){
            if (id_GV[i]) {
                let getGV= await modelGV.findById(id_GV[i])
                for(let j in id_HS){
                    if (!getGV.id_HS.includes(id_HS[j])) {
                       await getGV.id_HS.push(id_HS[j])
                    }
                }
                await modelGV.findByIdAndUpdate(id_GV[i],{id_HS:getGV.id_HS},{new:true})
            }
        }
        for(let i in id_HS){
            if (id_HS[i]) {
                let getHS = await modelHS.findById(id_HS[i])
                for(let j in id_GV){
                    if (!getHS.id_GV.includes(id_GV[j])) {
                        await getHS.id_GV.push(id_GV[j])
                    }
                }
                await modelHS.findByIdAndUpdate(id_HS[i],{id_GV:getHS.id_GV},{new:true})
            }
        }
        res.send({message:'update ok'})
    } catch (error) {
        res.send({ errorMessage: error.message })
    }
}

exports.deleteAllLink = async(req,res)=>{
    try {
        let { id_GV, id_HS } = req.body
        for(let i in id_GV){
            if (id_GV[i]) {
                let deleteGV = await modelGV.findByIdAndUpdate(id_GV[i],{id_HS:[]},{new:false})
                for(let j in deleteGV.id_HS){
                    if (deleteGV.id_HS[j]) {
                        let getHS = await modelHS.findById(deleteGV.id_HS[j])
                        if (getHS.id_GV.includes(id_GV[i])) {
                            await getHS.id_GV.splice(getHS.id_GV.indexOf(id_GV[i]),1)
                        }
                        await modelHS.findByIdAndUpdate(deleteGV.id_HS[j],{id_GV:getHS.id_GV})
                    }
                }
            }
        }
        for(let i in id_HS){
            if (id_HS[i]) {
                let deleteHS = await modelHS.findByIdAndUpdate(id_HS[i],{id_GV:[]},{new:false})
                for(let j in deleteHS.id_GV){
                    if (deleteHS.id_GV[j]) {
                        let getGV = await modelGV.findById(deleteHS.id_GV[j])
                        if (getGV.id_HS.includes(id_HS[i])) {
                            await getGV.id_HS.splice(getGV.id_HS.indexOf(id_HS[i]),1)
                        }
                        await modelGV.findByIdAndUpdate(deleteHS.id_GV[j],{id_HS:getGV.id_HS})
                    }
                }
            }
        }
        res.send({message:'delete ok'})
    } catch (error) {
        res.send({ errorMessage: error.message })
    }
}
exports.deletenGV_nHS = async(req,res)=>{
    try {
        let { id_GV, id_HS } = req.body
        for(let i in id_GV){
            if (id_GV[i]) {
                let deleteGV = await modelGV.findByIdAndDelete(id_GV[i])
                for(let j in deleteGV.id_HS){
                    if (deleteGV.id_HS[j]) {
                        let getHS = await modelHS.findById(deleteGV.id_HS[j])
                        if (getHS.id_GV.includes(id_GV[i])) {
                            await getHS.id_GV.splice(getHS.id_GV.indexOf(id_GV[i]),1)
                        }
                        await modelHS.findByIdAndUpdate(deleteGV.id_HS[j],{id_GV:getHS.id_GV})
                    }
                }
            }
        }
        for(let i in id_HS){
            if (id_HS[i]) {
                let deleteHS = await modelHS.findByIdAndDelete(id_HS[i])
                for(let j in deleteHS.id_GV){
                    if (deleteHS.id_GV[j]) {
                        let getGV = await modelGV.findById(deleteHS.id_GV[j])
                        if (getGV.id_HS.includes(id_HS[i])) {
                            await getGV.id_HS.splice(getGV.id_HS.indexOf(id_HS[i]),1)
                        }
                        await modelGV.findByIdAndUpdate(deleteHS.id_GV[j],{id_HS:getGV.id_HS})
                    }
                }
            }
        }
        res.send({message:'delete ok'})
    } catch (error) {
        res.send({ errorMessage: error.message })
    }
}
exports.deleteLink = async(req,res)=>{
    try {
        let { id_GV, id_HS } = req.body
        for(let i in id_GV){
            if (id_GV[i]) {
                let getGV= await modelGV.findById(id_GV[i])
                for(let j in id_HS){
                    if (getGV.id_HS.includes(id_HS[j])) {
                       await getGV.id_HS.splice(getGV.id_HS.indexOf(id_HS[j]),1)
                    }
                }
                await modelGV.findByIdAndUpdate(id_GV[i],{id_HS:getGV.id_HS},{new:true})
            }
        }
        for(let i in id_HS){
            if (id_HS[i]) {
                let getHS = await modelHS.findById(id_HS[i])
                for(let j in id_GV){
                    if (getHS.id_GV.includes(id_GV[j])) {
                        await getHS.id_GV.splice(getHS.id_GV.indexOf(id_GV[j]),1)
                    }
                }
                await modelHS.findByIdAndUpdate(id_HS[i],{id_GV:getHS.id_GV},{new:true})
            }
        }
        res.send({message:'delete link ok'})
    } catch (error) {
        res.send({ errorMessage: error.message })
    }
}

// GV
exports.addnGV_nidHS = async(req,res)=>{
    try {
        let { nameGV, id_HS } = req.body
        let id_GV=[]
        for(let i in nameGV){
            if (nameGV[i]) {
                let addGV = await modelGV.create({name:nameGV[i],id_HS})
                id_GV.push(addGV._id)
            }
        }
        for(let i in id_HS){
            if (id_HS[i]) {
                let getHS = await modelHS.findById(id_HS[i])
                for( let j in id_GV){
                    if (id_GV[j]) {
                       await getHS.id_GV.push(id_GV[j])
                    }
                }
                await modelHS.findByIdAndUpdate(id_HS[i],{id_GV:getHS.id_GV},{new:true})
            }
        }
        res.send({nameGV,id_HS,message:'add ok'})
    } catch (error) {
        res.send({ errorMessage: error.message })
    }
}

exports.updateNew_nGV_nidHS = async(req,res)=>{
    try {
        let { id_GV, id_HS } = req.body
        for(let i in id_GV ){
            if (id_GV[i]) {
                let getGV = await modelGV.findById(id_GV[i])
                for(let j in getGV.id_HS){
                    let getHS = await modelHS.findById(getGV.id_HS[j])
                    await getHS.id_GV.splice(getHS.id_GV.indexOf(id_GV[i]),1)
                    await modelHS.findByIdAndUpdate(getGV.id_HS[j],{id_GV:getHS.id_GV},{new:true})
                }
            }
        }
        for(let i in id_HS){
            if (id_HS[i]) {
                let getHS = await modelHS.findById(id_HS[i])
                for(let j in id_GV){
                    if (!getHS.id_GV.includes(id_GV[j])) {
                       await getHS.id_GV.push(id_GV[j])
                    }
                }
                await modelHS.findByIdAndUpdate(id_HS[i],{id_GV:getHS.id_GV},{new:true})
            }
        }
        for(let i in id_GV){
            if (id_GV[i]) {
                await modelGV.findByIdAndUpdate(id_GV[i],{id_HS},{new:true})
            }
        }
        res.send({id_GV, id_HS,message:'update ok'})
    } catch (error) {
        res.send({ errorMessage: error.message })
    }
}

// HS


exports.addnHS_nidGV = async(req,res)=>{
    try {
        let { nameHS, id_GV } = req.body
        let id_HS=[]
        for(let i in nameHS){
            if (nameHS[i]) {
                let addHS = await modelHS.create({name:nameHS[i],id_GV})
                id_HS.push(addHS._id)
            }
        }
        for(let i in id_GV){
            if (id_GV[i]) {
                let getGV = await modelGV.findById(id_GV[i])
                for( let j in id_HS){
                    if (id_HS) {
                       await getGV.id_HS.push(id_HS[j])
                    }
                }
                await modelGV.findByIdAndUpdate(id_GV[i],{id_HS:getGV.id_HS},{new:true})
            }
        }
        res.send({nameHS,id_GV,message:'add ok'})
    } catch (error) {
        res.send({ errorMessage: error.message })
    }
}

exports.updateNew_nHS_nidGV = async(req,res)=>{
    try {
        let { id_HS, id_GV } = req.body
        for(let i in id_HS ){
            if (id_HS[i]) {
                let getHS = await modelHS.findById(id_HS[i])
                for(let j in getHS.id_GV){
                    let getGV = await modelGV.findById(getHS.id_GV[j])
                    await getGV.id_HS.splice(getGV.id_HS.indexOf(id_HS[i]),1)
                    await modelGV.findByIdAndUpdate(getHS.id_GV[j],{id_HS:getGV.id_HS},{new:true})
                }
            }
        }
        for(let i in id_GV){
            if (id_GV[i]) {
                let getGV = await modelGV.findById(id_GV[i])
                for(let j in id_HS){
                    if (!getGV.id_HS.includes(id_HS[j])) {
                       await getGV.id_HS.push(id_HS[j])
                    }
                }
                await modelGV.findByIdAndUpdate(id_GV[i],{id_HS:getGV.id_HS},{new:true})
            }
        }
        for(let i in id_HS){
            if (id_HS[i]) {
                await modelHS.findByIdAndUpdate(id_HS[i],{id_GV},{new:true})
            }
        }
        res.send({id_HS, id_GV,message:'update ok'})
    } catch (error) {
        res.send({ errorMessage: error.message })
    }
}
// exports.addnnid = async(req,res)=>{
//     try {
        
//     } catch (error) {
//         res.send({ errorMessage: error.message })
//     }
// }
// exports.addnnid = async(req,res)=>{
//     try {
        
//     } catch (error) {
//         res.send({ errorMessage: error.message })
//     }
// }