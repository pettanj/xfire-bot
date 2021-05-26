import {moveUsersToChannel } from '../utils.js';

const wordList = ['lol', 'okej', 'eyy'];

export default function handleKojken(message, client) {
  if (wordList.includes(message.content.toLowerCase())) {
    setTimeout(() => {
      moveUsersToChannel('Kojkens hörna', [message.member], client, message);
    }, 12000);
  }
}