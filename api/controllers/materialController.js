const Material = require("../models/Materials")



async function getAllMaterials(req, res) {
    try {
        const materials = await Material.find()
        if (!materials) {
            return res.status(500).json({message: "Couldn't get materials!"})
        }
        res.status(200).json(materials)
    } catch (err) {
        console.log(err)
        return res.status(500).json({message: "Couldn't get materials!"})
    }
}

async function insertMaterial(req, res) {
    try {
        const {materialName, vendorPhone} = req.body;
        if (!materialName) {
            return res.status(400).json({message: "Material Name Required!"})
        }
        const duplicate = await Material.findOne({materialName: materialName})
        if (        duplicate) {
            return res.status(400).json({message: "Material is already in the system!"})
        }
        const result = await Material.create({materialName, vendorPhone, stock: []})
        if (result) {
            const matList = await Material.find().exec()
            return res.status(201).json({message: "Material added!", matList})
        }
    } catch (err) {
        res.status(500).json(err)
    }
}
async function updateMaterial(req, res, next) {
    try {
        const {materialName, stock, _id} = req.body;
        if (!materialName || !stock?.length) {
            return res.status(400).json({message: "Nothing to update!"})
        }
        const result = await Material.findByIdAndUpdate(_id, {...req.body})
        if (result) {
            return res.status(201).json({message: "Material updated!"})
        }
        
    } catch (err) {
        next(err)
    }
}


async function getMaterialById(req, res, next) {
    try {
        const {id} = req.params;
        
        if (!id) {
            return res.status(400).json({message: "Need material ID"})
        }
        const material = await Material.findById(id).exec()
        if (material) {
            return res.status(200).json(material)
        }
    } catch (err) {
        next(err)
    }
}

module.exports = {
    getAllMaterials,
    insertMaterial,
    updateMaterial,
    getMaterialById
}