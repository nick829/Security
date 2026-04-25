require("dotenv").config();

const express = require("express");
const session = require("express-session");
const axios = require("axios");
const { getAccessToken } = require("./auth");

const app = express();

app.use(express.json());

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use(express.static(__dirname));

app.get("/login", (req, res) => {
    const url =
        `https://discord.com/oauth2/authorize` +
        `?client_id=${process.env.CLIENT_ID}` +
        `&response_type=code` +
        `&scope=identify guilds` +
        `&redirect_uri=${encodeURIComponent(process.env.REDIRECT_URI)}`;

    res.redirect(url);
});

app.get("/callback", async (req, res) => {
    try {
        const code = req.query.code;

        const tokenData = await getAccessToken(code);

        const user = await axios.get(
            "https://discord.com/api/users/@me",
            {
                headers: {
                    Authorization: `Bearer ${tokenData.access_token}`
                }
            }
        );

        req.session.user = user.data;

        res.redirect("/dashboard.html");
    } catch (err) {
        console.log(err.response?.data || err.message);
        res.send("Login failed.");
    }
});

app.get("/api/user", (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({
            error: "Not logged in"
        });
    }

    res.json(req.session.user);
});

app.listen(3000, () => {
    console.log("Dashboard running on port 3000");
});