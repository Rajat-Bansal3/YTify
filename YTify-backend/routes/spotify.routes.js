const { Router } = require("express");
const spotifyController = require("../controllers/spotify.controller.js");

const router = Router();

router.get("/profile", spotifyController.profile);
router.get("/get-playlists", spotifyController.getPlaylists);
router.get("/get-playlists-by-id/:id", spotifyController.getPlaylistsbyId);
router.post("/create-playList", spotifyController.createPlayList);
router.post("/get-track", spotifyController.getTrack);

module.exports = router;
