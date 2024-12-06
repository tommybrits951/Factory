const router = require("express").Router()
const controller = require("../controllers/partsController")
const {checkInv, verifyToken} = require("../middleware/jwtAuth")

router.route("/")
.get(controller.getAllParts)
.post(controller.insertPart)
.patch(controller.updatePart)
.delete()

module.exports = router