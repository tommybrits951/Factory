const router = require("express").Router()
const controller = require("../controllers/userController")
const verifyToken = require("../middleware/jwtAuth")
router.post("/", controller.register)
.get("/", controller.getAllUsers)


module.exports = router