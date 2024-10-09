require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

const authRouter = require("./routes/auth.routes.js");
const playlistRouter = require("./routes/playlist.routes.js");
const spotAuthRouter = require("./routes/spot-auth.routes.js");
const spotifyController = require("./routes/spotify.routes.js");

const spotAuthController = require("./controllers/spot-auth.controller.js");

mongoose
  .connect(process.env.MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((response) => {
    console.log("MongoDB Connection Succeeded.");
  })
  .catch((error) => {
    console.log("Error in DB connection: " + error);
  });

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

app.use("/auth", authRouter);
app.use("/spot-auth", spotAuthRouter);
app.use("/playlist", playlistRouter);
app.use("/yt-to-spot", spotifyController);
app.get("/callback", spotAuthController.callback);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    message: message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("App running in port: " + PORT);
});
