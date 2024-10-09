const { Router } = require("express");
const spotAuthController = require("../controllers/spot-auth.controller.js");

const router = Router();

router.get("/register", spotAuthController.login);

module.exports = router;
