const Parts = require("../models/Parts")
const Materials = require("../models/Materials")


async function getAllParts(req, res, next) {
    try {
        const parts = await Parts.find().lean()
        if (!parts) {
            return res.status(500).json({message: "Couldn't get parts!"})
        }
        res.status(200).json(parts)
    } catch (err) {
        next(err)
    }
}

async function insertPart(req, res, next) {
    try {
        const {partName, cycle, cavities, shotWeight, partWeight, material, stock} = req.body;
        if (!partName || !cycle || !cavities || !shotWeight || !partWeight || !material || !stock) {
            return res.status(400).json({message: "All fields required!"})
        }
        const partsList = await Parts.find().lean()
        const partNo = Math.abs(partsList.length + 10001 + 1)
        const part = await Parts.create({...req.body, partNo})
        if (!part) {
            return res.status(500).json({message: "Something's wrong!"})
        }
        res.status(201).json({message: "New Part Added!"})
    } catch (err) {d
        next(err)
    }
}

async function updatePart(req, res, next) {
    try {
        const {location, amount, lot, _id} = req.body;
        if (!location || !amount || !lot || _id) {
            return res.status(400).json({message: "All fields required!"})
        }
        const part = await Parts.findOneById(_id).exec()
        let arr = []
        for (let i = 0; i < part.stock.length; i++) {
            if (part.stock[i].location === location) {
                arr[i] = {location, amount, lot}
            } else {
                arr.push(part.stock[i])
            }
        }
        const results = await Parts.findByIdAndUpdate(_id, {stock: arr})
        if (results) {
            res.status(201).json({message: "Part Updated!"})
        }

    } catch (err) {
        next(err)
    }
}


module.exports = {
    getAllParts,
    insertPart,
    updatePart
}