const express = require("express");
const { getTwitchAuthUrl, handleTwitchCallback } = require("../api/authApi");
const { getTwitchUserInfo, getTwitchUserFollow } = require("../api/userApi");
const { checkUserisSub } = require("../api/subscriptionApi");
const { checkUserisLive, getAllStreams } = require("../api/streamApi");
const router = express.Router();

// Ruta para obtener la URL de autenticación de Twitch
router.get("/auth/url", (req, res) => {
  const authUrl = getTwitchAuthUrl();
  res.json({ authUrl });
});

// Ruta para manejar el callback de autenticación de Twitch
router.post("/auth/callback", async (req, res) => {
  const { code } = req.body;
  try {
    const accessToken = await handleTwitchCallback(code);
    res.json({ accessToken });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/user/info", async (req, res) => {
  const { accessToken } = req.query;
  try {
    const userInfo = await getTwitchUserInfo(accessToken);
    res.json({ userInfo });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/user/follow", async (req, res) => {
  const { accessToken, user_id } = req.query;
  try {
    const follower = await getTwitchUserFollow(accessToken, user_id);
    res.json({ follower });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/user/sub", async (req, res) => {
  const { accessToken, user_id } = req.query;
  try {
    const subscriber = await checkUserisSub(accessToken, user_id);
    res.json({ subscriber });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("stream/oldStreams", async (req, res) => {
  const { accessToken } = req.query;
  try {
    const oldStreams = await getAllStreams(accessToken);
    res.json({ oldStreams });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/stream/live", async (req, res) => {
  const { accessToken } = req.query;
  try {
    const isLive = await checkUserisLive(accessToken);
    res.json({ isLive });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/stream/followed", async (req, res) => {
  const { accessToken, user_id } = req.query;
  try {
    const followedStreams = await getStreamsFollowedLive(accessToken, user_id);
    res.json({ followedStreams });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
