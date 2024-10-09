const generateRandomString = require("../utils/generateRandomString");
const querystring = require("querystring");

var client_id = process.env.client_id;
var client_secret = process.env.client_secret;
var redirect_uri = process.env.REDIRECT_URI;

exports.login = async (req, res) => {
  var state = `${req.sessionID}-${generateRandomString(8)}`;
  var scope =
    "playlist-modify-public playlist-modify-private user-read-email user-library-read playlist-read-private playlist-read-collaborative";

  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        response_type: "code",
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state,
        show_dialog: true,
      })
  );
};

exports.callback = async (req, res, next) => {
  const { code, state } = req.query;

  if (state === null) {
    return res.redirect(
      "/#" + querystring.stringify({ error: "state_mismatch" })
    );
  }

  const tokenResponse = await requestAccessToken(code);
  if (tokenResponse.error) {
    return res.redirect(
      "/#" + querystring.stringify({ error: tokenResponse.error })
    );
  }

  const accessToken = tokenResponse.access_token;
  const refreshToken = tokenResponse.refresh_token;

  const resp = await fetch("https://api.spotify.com/v1/me", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const data = await resp.json();
  res.cookie("access_token", accessToken, { httpOnly: true });
  res.cookie("refresh_token", refreshToken, { httpOnly: true });
  res.cookie("user_id", data.id, { httpOnly: true });

  return res.redirect("http://localhost:5173/profile");
};

async function requestAccessToken(code) {
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " +
        Buffer.from(`${client_id}:${client_secret}`).toString("base64"),
    },
    body: querystring.stringify({
      grant_type: "authorization_code",
      code: code,
      redirect_uri: redirect_uri,
    }),
  });

  return await response.json();
}
