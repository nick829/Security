const axios = require("axios");

async function getAccessToken(code) {
    const params = new URLSearchParams();

    params.append("client_id", process.env.CLIENT_ID);
    params.append("client_secret", process.env.CLIENT_SECRET);
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", process.env.REDIRECT_URI);

    const response = await axios.post(
        "https://discord.com/api/oauth2/token",
        params,
        {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }
    );

    return response.data;
}

module.exports = { getAccessToken };