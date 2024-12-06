const mongoose = require("mongoose")


const materialSchema = new mongoose.Schema({
    materialName: {
        type: String,
        required: true
    },
    vendorPhone: Number,
    stock: [{
        location: {
            type: String,
            required: true
        },
        amount: {
            type: String,
            default: 2000
        },
        lot: {
            type: String,
            required: true
        }
    }]
})


module.exports = mongoose.model("Materials", materialSchema)