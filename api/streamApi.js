const axios = require("axios");
const { CLIENT_ID } = require("./authApi");

const checkUserisLive = async (accessToken) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_TWITCH_API_URL}/streams?user_login=${STREAM}`,
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
const getAllStreams = async (accessToken) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_TWITCH_API_URL}/streams`,
      {
        headers: {
          "Client-ID": CLIENT_ID,
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const AllStreams = response.data.data;

    return AllStreams;
  } catch (error) {
    console.error("Error al verificar si el usuario está en vivo:", error);
    return false;
  }
};

const getStreamsFollowedLive = async (accessToken, user_id) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_TWITCH_API_URL}/channels/followed?user_id=${user_id}`,
      {
        headers: {
          "Client-ID": CLIENT_ID,
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const StreamsLive = response.data;

    return StreamsLive;
  } catch (error) {
    console.error("Error al verificar si el usuario está en vivo:", error);
    return false;
  }
};

module.exports = {
  checkUserisLive,
  getAllStreams,
  getStreamsFollowedLive,
};
