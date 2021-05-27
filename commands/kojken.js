import {moveUsersToChannel } from '../utils.js';

const wordList = ['e', 'ee', 'eee', 'eo', 'eoo', 'eooo', 'eeo', 'eeeo', 'eeoo', 'eeooo', 'eeeooo', 'eeeoooo', 'eeeeooo', 'eeeeoooo', 'kmr', 'ej', 'wtf'];
const nickNames = ['Elias Revis', 'Korken', 'K0jk3n', 'Lillspyan', 'Dikken', 'Elias Flens', 'Gräddbollen', 'Gräddbullen'];

export default async function handleKojken(message, client) {
  if (wordList.includes(message.content.toLowerCase())) {
    try {
      await message.member.setNickname(nickNames[Math.floor((Math.random() * nickNames.length))]);
    } catch (error) {
      setTimeout(() => {
        moveUsersToChannel('Elias frågehörna', [message.member], client, message);
      }, 9000);
    }
  }
}