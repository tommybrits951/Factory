const mongoose = require("mongoose")


const partsSchema = new mongoose.Schema({
    partName: {
        type: String,
        required: true
    },
    partNo: {
        type: Number,
        required: true
    },
    cycle: {
        type: Number,
        required: true
    },
    cavities: {
        type: Number,
        required: true
    },
    shotWeight: {
        type: Number,
        required: true
    },
    partWeight: {
        type: Number,
        required: true
    },
    material: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Materials"
    },
    stock: [{
        location: {
            type: String,
            required: true
        },
        amount: {
            type: Number,
            required: true
        },
        lot: {
            type: String,
            required: true
        },
        dateMade: {
            type: Date,
            required: true
        }
    }]
})

module.exports = mongoose.model("Parts", partsSchema)