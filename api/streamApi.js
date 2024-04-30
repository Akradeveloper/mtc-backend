const axios = require("axios");
const { CLIENT_ID } = require("./authApi");

exports.checkUserisLive = async (accessToken) => {
  try {
    const response = await axios.get(
      `https://api.twitch.tv/helix/streams?user_login=${STREAM}`,
      {
        headers: {
          "Client-ID": CLIENT_ID,
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const streamStatus = response.data.data[0];

    if (streamStatus.type === "live") {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error al verificar si el usuario está en vivo:", error);
    return false;
  }
};
