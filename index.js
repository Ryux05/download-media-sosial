const express = require("express");
const app = express();
const {
  tiktokDownloader,
  tiktokInfo,
} = require("./function/tiktokdl.js");

const {
  youtubeInfo,
  youtubeDownloader,
} = require("./function/youtubedl.js");

const axios = require("axios");
const twitterDownloader = require("./function/twitterdl.js");
const instagramDownloader = require("./function/instagramdl.js");
const spotifyDownloader = require("./function/spotifydl.js");
const PUBLIC_IP = "localhost";
const PORT = 8080;

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    data: [
      "/api/info-youtube",
      "/api/info-tiktok",
      "/api/download-tiktok",
      "/api/download-spotify",
      "/api/download-instagram",
      
    ],
  });
});
app.get("/api/download-spotify", async (req, res) => {
  const url = req.query.url;

  if (!url) {
    return res
      .status(400)
      .json({ error: "Missing 'url' query parameter" });
  }

  const urlAudio = await spotifyDownloader(url);
  try {
    const response = await axios.get(urlAudio.audioUrl, {
      responseType: "stream",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36",
        // You can add more headers if necessary
      },
    });

    res.set({
      "Content-Type": "audio/mp3",
      "Content-Disposition": `attachment; filename=${urlAudio.title}.mp3`, // Name of the downloaded file
    });

    response.data.pipe(res);
  } catch (error) {
    console.error("Error downloading the video:", error);
    res.status(500).send("Failed to download the video");
  }
});

app.get("/api/download-instagram", async (req, res) => {
  const url = req.query.url;

  if (!url) {
    return res
      .status(400)
      .json({ error: "Missing 'url' query parameter" });
  }

  const urlVideo = await instagramDownloader(url);
  try {
    const response = await axios.get(urlVideo, {
      responseType: "stream",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36",
        // You can add more headers if necessary
      },
    });

    res.set({
      "Content-Type": "video/mp4",
      "Content-Disposition":
        'attachment; filename="video.mp4"', // Name of the downloaded file
    });

    response.data.pipe(res);
  } catch (error) {
    console.error("Error downloading the video:", error);
    res.status(500).send("Failed to download the video");
  }
});

app.get("/api/download-twitter", async (req, res) => {
  const url = req.query.url;

  if (!url) {
    return res
      .status(400)
      .json({ error: "Missing 'url' query parameter" });
  }

  const urlVideo = await twitterDownloader(url);

  try {
    const response = await axios.get(urlVideo, {
      responseType: "stream",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36",
        // You can add more headers if necessary
      },
    });

    res.set({
      "Content-Type": "video/mp4",
      "Content-Disposition":
        'attachment; filename="video.mp4"', // Name of the downloaded file
    });

    response.data.pipe(res);
  } catch (error) {
    console.error("Error downloading the video:", error);
    res.status(500).send("Failed to download the video");
  }
});

app.get("/api/info-youtube", async (req, res) => {
  const url = req.query.url;

  if (!url) {
    return res
      .status(400)
      .json({ error: "Missing 'url' query parameter" });
  }

  const info = await youtubeInfo(url);

  res.json(info);
});

app.get("/api/info-tiktok", async (req, res) => {
  const url = req.query.url;

  if (!url) {
    return res.status(400).json({
      error: `isikan url | contoh http://domain/api/info-tiktok?url=....`,
    });
  }

  try {
    const info = await tiktokInfo(url);
    res.json(info);
  } catch (err) {
    console.log(err);
    res.status(500).send("Failed to retrieve tikok info");
  }
});

app.get("/api/download-tiktok", async (req, res) => {
  const url = req.query.u; // Check if this is undefined

  if (!url) {
    return res
      .status(400)
      .json({ error: "Missing 'url' query parameter" });
  }

  try {
    const info = await tiktokDownloader(url);

    res.redirect(info);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Failed to retrieve tikok video" });
  }
});

app.listen(PORT, PUBLIC_IP, () => {
  console.log(
    `Server is running at http://${PUBLIC_IP}:${PORT}`
  );
});
