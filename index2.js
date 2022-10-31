const config = require ('./config.json');
const joinVoiceChannel = require ('@discordjs/voice');

const fs = require('fs');
const { Player } = require('discord-player');
const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildVoiceStates,
],
});

    
client.on('!uwu', message => {
    client.joinVoiceChannel();
});

client.login(config.token);