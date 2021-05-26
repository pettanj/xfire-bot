import Discord from 'discord.js';
import fs from 'fs';

import messageHandler from './messageHandler.js';
import activityHandler from './activityHandler.js';

const auth = JSON.parse(fs.readFileSync('auth.json', 'utf-8'));

// Init bot
const client = new Discord.Client();
client.once('ready', () => {
  console.log('Connected');
});
client.login(auth.token);

// Listen to messages
client.on('message', message => {
  messageHandler(message, client);
});

// Listen to status changes, like games started etc
client.on('presenceUpdate', (oldMember, newMember) => {
  activityHandler(oldMember, newMember, client);
});
