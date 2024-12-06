const mongoose = require("mongoose")


const machineSchema = new mongoose.Schema({
    number: {
        type: Number,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    model: {
        type: String, 
        required: true
    },
    currentJobNumber: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
        required: false
    }
})



module.exports = mongoose.model("Machine", machineSchema)