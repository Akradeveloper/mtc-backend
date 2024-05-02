const axios = require("axios");
const { CLIENT_ID } = require("./authApi");

const checkUserisSub = async (accessToken, user_id) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_TWITCH_API_URL}+/subscriptions/user?broadcaster_id=50511150&user_id=${user_id}`,
      {
        headers: {
          "Client-ID": CLIENT_ID,
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const userCode = response.status;

    return userCode === 200 ? true : false;
  } catch (error) {
    console.error("Error al verificar si el usuario es suscriptor:", error);
    return false;
  }
};

module.exports = {
  checkUserisSub,
};
