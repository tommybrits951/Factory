const router = require('express').Router()
const controller = require("../controllers/authController")
const {verifyToken} = require("../middleware/jwtAuth")
router.route("/")
.post(controller.login)
.get(verifyToken, controller.verifyRefresh)



module.exports = router