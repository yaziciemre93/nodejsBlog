const express = require("express")
const router = express.Router()
const blogController = require("../controllers/blogController")


router.get("/", blogController.blog_get)

router.get("/:id", blogController.blog_getOne)

module.exports = router