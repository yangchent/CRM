const express = require("express");
const protect= require("../protection")
const router= express.Router();
const contactController= require('../controllers/contactController')


router.post("/", protect,contactController.contactAdd)
router.get("/", protect,contactController.contactGet)
router.put("/:id", protect,contactController.contactEdit)
router.delete("/:id",protect, contactController.contactDelete)
router.get("/cat", contactController.catergoryId)
module.exports= router;