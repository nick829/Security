require("dotenv").config();
require("./database");
require("./dashboard");

const { Client, GatewayIntentBits } = require("discord.js");
const security = require("./security");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers
    ]
});

client.once("ready", () => {
    console.log(`${client.user.tag} is online`);
});

client.on("guildMemberAdd", member => {
    security.antiRaid(member);
});

client.login(process.env.TOKEN);