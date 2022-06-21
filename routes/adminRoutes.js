const express = require("express")
const router = express.Router()
const adminController = require("../controllers/adminController")



router.get("/", adminController.admin_index  )

router.get("/add", adminController.admin_addGET)

router.delete("/delete/:id", adminController.admin_delete)

router.post("/add", adminController.admin_addPOST)

module.exports = router