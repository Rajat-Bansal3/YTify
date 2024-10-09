const fetchPlaylistItems = require("../utils/fetchPLaylistData");

exports.profile = async (req, res, next) => {
  const userId = req.cookies.user_id;
  const accessToken = req.cookies.access_token;

  try {
    const resp = await fetch(
      `https://api.spotify.com/v1/users/${userId}/playlists`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!resp.ok) {
      return res
        .status(resp.status)
        .json({ error: "Failed to fetch user profile" });
    }

    const user = await resp.json();
    res.json({ message: "Successfully fetched user profile", user });
  } catch (error) {
    next(error);
  }
};
exports.getPlaylistsbyId = async (req, res, next) => {
  const accessToken = req.cookies.access_token;
  const { id } = req.params;

  try {
    const response = await fetch(`https://api.spotify.com/v1/playlists/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      return res
        .status(response.status)
        .json({ error: errorResponse.error.message });
    }

    const playlist = await response.json();
    res.json(playlist);
  } catch (error) {
    console.error("Error fetching playlist by ID:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
    next(error);
  }
};

exports.getPlaylists = async (req, res, next) => {
  const userId = req.cookies.user_id;
  const accessToken = req.cookies.access_token;

  try {
    const playlistResp = await fetch(
      `https://api.spotify.com/v1/users/${userId}/playlists`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!playlistResp.ok) {
      return res
        .status(playlistResp.status)
        .json({ error: "Failed to fetch playlists" });
    }

    const playlists = await playlistResp.json();
    res.json({ message: "Playlists fetched successfully", playlists });
  } catch (error) {
    next(error);
  }
};

exports.createPlayList = async (req, res, next) => {
  const userId = req.cookies.user_id;
  const accessToken = req.cookies.access_token;
  const { name, public: isPublic, description, url } = req.body;

  try {
    const vids = await fetchPlaylistItems(url, accessToken);
    if (!vids || vids.length === 0) {
      return res
        .status(400)
        .json({ error: "No valid tracks found in the playlist." });
    }

    const createPlaylistResp = await fetch(
      `https://api.spotify.com/v1/users/${userId}/playlists`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          public: isPublic,
          description,
        }),
      }
    );

    if (!createPlaylistResp.ok) {
      const errorResponse = await createPlaylistResp.json();
      return res
        .status(createPlaylistResp.status)
        .json({ error: errorResponse.error.message });
    }

    const newPlaylist = await createPlaylistResp.json();

    const addTracksResp = await addTracks(newPlaylist.id, accessToken, vids);

    if (!addTracksResp) {
      return res
        .status(500)
        .json({ error: "Failed to add tracks to the playlist." });
    }

    res.json({
      message: "Playlist created and tracks added successfully",
      x: true,
    });
  } catch (error) {
    console.error("Error in createPlayList:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
    next(error);
  }
};

const addTracks = async (playlistId, accessToken, trackUris) => {
  try {
    const playlistTracksResp = await fetch(
      `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uris: trackUris,
          position: 0,
        }),
      }
    );

    if (!playlistTracksResp.ok) {
      const errorResponse = await playlistTracksResp.json();
      console.log(errorResponse);
      return false;
    }

    console.log("Tracks added successfully:", await playlistTracksResp.json());
    return true;
  } catch (error) {
    console.error("Error adding tracks:", error.message);
    return false;
  }
};
exports.getTrack = async (req, res, next) => {};
