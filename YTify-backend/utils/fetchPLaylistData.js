const yt = require("youtube-sr");
const cleanTitles = require("./cleanTitles");

async function fetchPlaylistItems(playlistUrl, accessToken) {
  try {
    const playlist = await yt.default.getPlaylist(playlistUrl);
    const titles = playlist.videos.map((x) => x.title);

    const cleanedTitles = await cleanTitles(titles);

    const urls = await Promise.all(
      cleanedTitles.map(async (item) => {
        const { songName, artistName } = item;

        const response = await fetch(
          `https://api.spotify.com/v1/search?q=remaster%2520${encodeURIComponent(
            songName
          )}%20${encodeURIComponent(artistName)}&type=track`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();
        if (data.tracks && data.tracks.items.length > 0) {
          const sortedTracks = data.tracks.items.sort(
            (a, b) => b.popularity - a.popularity
          );
          return sortedTracks[0].uri;
        }
        return null;
      })
    );

    return urls.filter((uri) => uri !== null);
  } catch (error) {
    console.error("Error fetching playlist items:", error.message);
    return [];
  }
}

module.exports = fetchPlaylistItems;
