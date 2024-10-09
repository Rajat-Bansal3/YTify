const { Router } = require("express");
const authController = require("../controllers/auth.controller.js");

const router = Router();

router.post("/login", authController.login);

router.get("/register", authController.register);

module.exports = router;
