require("dotenv").config()
const mongoose = require("mongoose")
const URI = process.env.DB_URI

async function connectDB() {
    mongoose.connect(URI)
}
module.exports = connectDB