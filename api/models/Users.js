const mongoose = require("mongoose")

const usersSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    roles: [{
        type: String,
        default: "employee"
    }],
    phone: {
        type: Number,
        required: true
    },
    active: {
        type: Boolean,
        default: true
    }
})


module.exports = mongoose.model("User", usersSchema)