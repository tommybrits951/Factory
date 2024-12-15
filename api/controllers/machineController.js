const Machine = require("../models/Machine")
const Material = require("../models/Materials")
async function getMachines(req, res) {
    try {
        const machines = await Machine.find().exec()
        res.status(200).json(machines)
    } catch (err) {
        res.status(500).json({message: err.message || "Something's wrong!"})
    }
}


async function insertMachine(req, res) {
    try {
        const {number, size, model, currentJob} = req.body;
        if (!number || !size || !model) {
            return res.status(400).json({message: "All fields required!"})
        }
        const machine = await Machine.create({number, size, model, currentJob})
        if (machine) {
            res.status(201).json({message: "Machine Added!"})
        }
    } catch (err) {
        res.status(500).json({message: err.message || "Something's wrong!"})
    }
}


async function updateMachine(req, res) {
    try {
        const {number, priority, job, partName, partNumber, lot, material, amount, time, status} = req.body
        if (!number || !priority || !job || !partName || !partNumber || !lot || !material || !amount || !time || !status) {
            res.status(400).json({message: "All fields required!"})
        }
        const mat = await Material.findById(material).exec()
        const results = await Machine.findOneAndUpdate({number}, {...req.body}).exec()
        const endResult = {...results._doc, material: mat}
        if (endResult) {
            res.status(201).json(endResult)
        }
    } catch (err) {
        res.status(500).json({message: err.message || "Something's wrong!"})
    }
}

async function getMachine(req, res) {
    try {
        const {number} = req.params;
        const machine = await Machine.findOne({number}).exec()
        if (!machine) {
            res.status(404).json({message: `Couldn't find machine ${number}`})
        }
    } catch (err) {
        res.status(500).json({message: err.message || "Something's wrong!"})
    }
}

module.exports = {
    updateMachine,
    insertMachine,
    getMachines,
    getMachine
}