require("dotenv").config()
const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const fileUpload = require("express-fileupload")
const connectDB = require("./config/dbConfig")
const mongoose = require("mongoose")
const PORT = process.env.PORT || 9000

const app = express()
connectDB()
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use(express.json())
app.use(cookieParser())
app.use(fileUpload())
app.use("/users", require("./routes/usersRoute"))
app.use("/auth", require("./routes/authRoute"))
app.use("/mat", require("./routes/materialRoute")) 
app.use("/part", require("./routes/partsRoute")) 
app.use("/mach", require("./routes/machineRoute"))

mongoose.connection.once("open", () => {
    app.listen(PORT, () => {
        console.log(`Running on port ${PORT}`)
    })
})