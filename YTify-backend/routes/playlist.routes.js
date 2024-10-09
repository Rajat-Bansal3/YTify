const { Router } = require("express");
const playlistController = require("../controllers/playlist.controller.js");

const router = Router();

router.post("/convert", playlistController.convert);

module.exports = router;
