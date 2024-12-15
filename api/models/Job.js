const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
    part_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Part"
    },
    amount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        default: "pending"
    },
    machineNumber: Number,
    start: Date,
    end: Date,
    lots: String
})

module.exports = mongoose.model("Job", jobSchema)