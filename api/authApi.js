const axios = require("axios");

const CLIENT_ID = process.env.REACT_APP_TWITCH_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_TWITCH_SECRET_ID;
const REDIRECT_URI = process.env.REACT_APP_TWITCH_REDIRECT;

const getTwitchAuthUrl = () => {
  const scopes = ["user_read", "user_subscriptions", "user:read:follows"];
  const scopeString = scopes.join("+");
  return `https://id.twitch.tv/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=${scopeString}`;
};

const handleTwitchCallback = async (code) => {
  try {
    const response = await axios.post(
      "https://id.twitch.tv/oauth2/token",
      null,
      {
        params: {
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET,
          code: code,
          grant_type: "authorization_code",
          redirect_uri: REDIRECT_URI,
        },
      }
    );

    if (response.status === 200) {
      const accessToken = response.data.access_token;
      return accessToken;
    } else {
      throw new Error("Error en el callback de Twitch: Respuesta no válida");
    }
  } catch (error) {
    throw new Error("Error en el callback de Twitch:", error);
  }
};

const accessTokenTwitchAPP = async () => {
  try {
    const response = await axios.post(
      "https://id.twitch.tv/oauth2/token",
      null,
      {
        params: {
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET,
          grant_type: "client_credentials",
        },
      }
    );

    if (response.status === 200) {
      const accessToken = response.data.access_token;
      return accessToken;
    } else {
      throw new Error("Error en el callback de Twitch: Respuesta no válida");
    }
  } catch (error) {
    throw new Error("Error en el callback de Twitch:", error);
  }
};

module.exports = {
  getTwitchAuthUrl,
  handleTwitchCallback,
  accessTokenTwitchAPP,
  CLIENT_ID,
};
