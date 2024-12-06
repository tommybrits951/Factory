const Machine = require("../models/Machine")

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
        const {number, size, model, currentJob, _id} = req.body;
        if (!number && !size && !model && !currentJob) {
            return res.status(400).json({message: "Must make a change!"})
        }
        const machine = await Machine.findOneAndUpdate({_id}, {number, size, model, currentJob})
        if (machine) {
            return res.status(201).json({message: `Machine ${number} updated!`})
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