const router = require("express").Router()
const controller = require("../controllers/materialController")
const {verifyToken, checkInv} = require("../middleware/jwtAuth")


router.route("/")
.get(verifyToken, controller.getAllMaterials)
.post(controller.insertMaterial)
.patch(controller.updateMaterial)

router.get("/:id", controller.getMaterialById)


router.use((err, req, res, next) => {
    res.status(500).json({message: "Something's wrong with materials!"})
})

module.exports = router