const express = require("express");
const router= express.Router();
const userController = require('../controllers/userController');

router.post("/register" , userController.register)
router.post("/login", userController.login)
router.post("/contact", userController.contactAdd)
router.get("/contact", userController.contactGet)
router.put("/contact", userController.contactEdit)
router.delete("/contact", userController.contactDelete)

module.exports= router;