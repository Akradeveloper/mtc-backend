const axios = require("axios");
const { CLIENT_ID } = require("./authApi");

const getTwitchUserInfo = async (accessToken) => {
  try {
    const response = await axios.get(
      process.env.REACT_APP_TWITCH_API_URL + "/helix/users",
      {
        headers: {
          "Client-ID": CLIENT_ID,
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const userData = response.data.data[0];
    const userInfo = {
      id: userData.id,
      login: userData.login,
      name: userData.display_name,
      profilePicture: userData.profile_image_url,
      fullData: userData,
    };

    return userInfo;
  } catch (error) {
    console.error(
      "Error al obtener la información del usuario desde Twitch:",
      error
    );
    throw new Error(
      "Error al obtener la información del usuario desde Twitch:",
      error
    );
  }
};

const getTwitchUserFollow = async (accessToken, user_id) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_TWITCH_API_URL}/users/follows?from-id=${process.env.REACT_APP_ID}&to_id=${user_id}`,
      {
        headers: {
          "Client-ID": CLIENT_ID,
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const userCode = response.status;

    if (userCode === 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error(
      "Error al obtener la información del usuario desde Twitch:",
      error
    );
    return false;
  }
};

module.exports = {
  getTwitchUserInfo,
  getTwitchUserFollow,
};
