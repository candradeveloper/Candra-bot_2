const { Client, GatewayIntentBits } = require('discord.js');
const config = require('./config.json');
const tvChannels = require('./tvChannels.json');

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

client.once('ready', () => {
  console.log(`Bot ready! Logged in as ${client.user.tag}`);
});

client.on('messageCreate', message => {
  if (message.author.bot || !message.content.startsWith(config.prefix)) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/);
  const channelName = args[0]?.toUpperCase();

  if (!channelName || !tvChannels[channelName]) {
    return message.reply("Channel tidak ditemukan. Coba: SCTV, RCTI, TRANS7.");
  }

  const embedLink = tvChannels[channelName];
  message.reply(`Nonton **${channelName}** di sini: ${embedLink}`);
});

client.login(config.token);
