const Job = require("../models/Job")
const Parts = require("../models/Parts")
const Material = require("../models/Job")


async function insertJob(req, res) {
    try {
        const {part_id, amount, material_id, lot} = req.body;
        const part

    } catch (err) {
        res.status(500).json({message: "Something's wrong!"})
    }
}