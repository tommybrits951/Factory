const mongoose = require("mongoose")


const machineSchema = new mongoose.Schema({
    number: {
        type: Number,
        required: true
    },
    priority: {
        type: Number,
        default: 10
    },
    job: {
        type: String,
        default: "No Job"
    },
    partName: {
        type: String,
    },
    partNumber: Number,
    lot: String,
    material: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Material",
        required: false
    },
    amount: Number,
    time: Number,
    status: {
        type: String,
        default: "No Job"
    } 
})



module.exports = mongoose.model("Machine", machineSchema)