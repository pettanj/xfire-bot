import {moveToChannel, getOrCreateChannel} from '../utils.js';

let rankedDudes = [];
let rankedStarter = null;
let currentMessage = null;
function getRankedDude(username) {
  let dude = rankedDudes.find((x) => x.username === username);
  rankedDudes = rankedDudes.filter(x => x.username !== username);
  return dude;

}

function startTimer(active) {
  setTimeout(() => {
    active = false;
  }, 120000);
}

export default function handleRankat(message, role, client) {
  currentMessage = message;
  rankedStarter = message.member;
  let active = true;
  startTimer(active);
  client.on('message', m => {
    if(active && (m.content.includes('ja') || m.content.includes('Ja'))) {
      getOrCreateChannel('Testo', client, message).then(channel => {
          if (!moveToChannel(m.member, channel)) {
            rankedDudes.push(m.member);
          } else if (rankedStarter !== null){
            addRankedStarter(channel);
          }
      });
    }
  });

  client.on('voiceStateUpdate', (oldMember, newMember) => {
    if (newMember.channelID && rankedDudes.length) {
      let user = getRankedDude(newMember.member.username);
      if (user) {
        getOrCreateChannel('Testo', client, currentMessage).then(channel => {
          moveToChannel(user, channel);
          if (rankedStarter !== null){
            addRankedStarter(channel);
          }
        });
      } 
    }
  })

  function addRankedStarter (channel) {
    if(!moveToChannel(rankedStarter, channel)) {
      rankedDudes.push(rankedStarter);
    }
    rankedStarter = null;
  }
}
