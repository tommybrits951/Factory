const router = require("express").Router()
const controller = require("../controllers/machineController")


router.route("/")
.get(controller.getMachines)
.post(controller.insertMachine)
.patch(controller.updateMachine)


module.exports = router