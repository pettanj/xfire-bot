import {moveUsersToChannel} from '../utils.js';

export default function handleRankat(message, role, client) {
  const filter = m => m.content.startsWith('ja');
  message.channel.awaitMessages(filter, { min: 1, max: 4, time: 120000 })
    .then(collected => {
      let userList = [...collected].map(x => x[1].author.id)
        .filter((item, pos, self) =>self.indexOf(item) == pos)
        .map(id => message.channel.guild.members.cache.find(member => member.id === id));
        userList.push(message.member);
      moveUsersToChannel('Testo', userList, client, message);
    })
    .catch(collected => console.log(collected.size));
}