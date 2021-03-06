import handleRankat from './commands/rankat.js';
import handleAram from './commands/aram.js';
import handleKojken from './commands/kojken.js';

export default function(message, client) {
  if (message.mentions.roles) {
    var rankat = message.mentions.roles.find(x => x.name.toLowerCase() == 'rankat');
    if (rankat) {
      handleRankat(message, rankat, client);
    }
  }
  
  if (message.content.toLowerCase().includes('aram') && message.mentions.everyone) {
    handleAram(message);
  }
  if (message.member.user.username.toLowerCase() === 'kojken') {
    handleKojken(message, client);
  }
}