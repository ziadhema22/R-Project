const { Client, Collection } = require('discord.js');
const db = require("quick.db")
const { TOKEN } = require('./JSON/config.json');
const fs = require('fs');
const express = require('express');
const app = express();

app.get("/", (req,res) => {
  res.send(`<h1>R-Project</h1>`)
})

const client = new Client({
    intents: [
        'Guilds'
    ]
});


client.on("ready", () => {
    console.log(`[NAME] ${client.user.tag}`)
    console.log(`[ID] ${client.user.id}`)
    console.log(`[GUILDS] ${client.guilds.cache.size}`)
    console.log(`[PING] ${client.ws.ping}`)
    client.user.setActivity(`乄FØRCE`, {type: "PLAYING"})
    });


client.slashs = new Collection();
const handlers = fs.readdirSync('./handlers').filter(file => file.endsWith('.js'));
const slashsFolders = fs.readdirSync('./commands');
for (file of handlers) {
    require(`./handlers/${file}`)(client);
}
client.slashCommands(slashsFolders, './commands');

client.login(TOKEN);
