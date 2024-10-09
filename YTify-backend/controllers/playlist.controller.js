const fetchPlaylistItems = require("../utils/fetchPLaylistData");

exports.convert = async (req, res, next) => {
  const { url } = req.body;
  if (!url) next(errorHandler(411, "URL IS Required"));
  try {
    const vids = await fetchPlaylistItems(url);
    console.log(vids);
  } catch (error) {
    next(error);
  }
};
