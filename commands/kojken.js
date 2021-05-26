import {moveUsersToChannel } from '../utils.js';

const wordList = ['lol', 'okej', 'eyy'];
const nickNames = ['Elias Revis', 'Korken', 'K0jk3n']

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