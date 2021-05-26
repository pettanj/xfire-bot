import handleBeatSaber from './commands/beatSaber.js';

export default function (oldMember, newMember, client) {
  if (newMember.activities.length && newMember.activities[0].name.toLowerCase().includes('beat saber')) {
    handleBeatSaber(newMember, client);
  }
}