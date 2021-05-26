var Discord = require('discord.js');
var logger = require('winston');
var auth = require('./auth.json');
var fetch = require('node-fetch');

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
  colorize: true
});
logger.level = 'debug';

var tempChannels = [];

// Init bot
var client = new Discord.Client();
client.once('ready', () => {
  logger.info('Connected');
});
client.login(auth.token);

// Listen to messages
client.on('message', async message => {
  if (message.mentions.roles) {
    var rankat = message.mentions.roles.find(x => x.name.toLowerCase() == 'rankat');
    if (rankat) {
      handleRankat(message, rankat);
    }
  }
  
  if (message.content.toLowerCase().includes('aram') && message.mentions.everyone) {
    var url = `https://g.tenor.com/v1/gifs?ids=18584658&key=${auth.tenor_key}`;
    let response = await fetch(url);
    let json = await response.json();
    message.channel.send(`${json.results[0].url}`);
  }
});

// Listen to status changes, like games started etc
client.on('presenceUpdate', (oldMember, newMember) => {
  if (newMember.activities.length && newMember.activities[0].name.toLowerCase().includes('beat saber')) {
    handleBeatSaber(newMember);
  }
});

function handleBeatSaber(newMember) {
  let existingChannel = client.channels.cache.find(x => x.name.toLowerCase() === 'beat saber');
  if (existingChannel) {
    newMember.member.voice.setChannel(existingChannel);
  } else {
    newMember.guild.channels.create('Beat Saber', { type: 'voice' }).then(ch => {
      if (newMember.member.voice) {
        newMember.member.voice.setChannel(ch);
      }
    });
  }
}

function handleRankat(message, role) {
  let existingChannel = client.channels.cache.find(x => x.name.toLowerCase() === 'testo');
  if (existingChannel) {
    role.members.forEach(member => {
      if (member.voice) {
        member.voice.setChannel(existingChannel);
      }
    })
  } else {
    message.guild.channels.create('Testo', { type: 'voice' }).then(ch => {
      role.members.forEach(member => {
        if (member.voice) {
          member.voice.setChannel(ch);
        }
      })
    })
  }
}

function createTempChannel(message, name) {
  return message.guild.channels.create(name || 'Testo', { type: 'voice' }).then(ch => {
    tempChannels.push(ch);
    return ch;
  })
}