export default function handleRankat(message, role, client) {
  const filter = m => m.content.startsWith('ja');
  message.channel.awaitMessages(filter, { min: 1, max: 4, time: 120000 })
    .then(collected => {
      let userList = [...collected].map(x => x[1].author.id)
        .filter((item, pos, self) =>self.indexOf(item) == pos)
        .map(id => message.channel.guild.members.cache.find(member => member.id === id));
        userList.push(message.member);
      moveUsersToChannel('Testo', userList);
    })
    .catch(collected => console.log(collected.size));

    function moveUsersToChannel (name, users) {
      let existingChannel = client.channels.cache.find(x => x.name.toLowerCase() === name.toLowerCase());
      if (existingChannel) {
        users.forEach(user => moveToChannel(user, existingChannel));
      } else {
        message.guild.channels.create(name, { type: 'voice' }).then(ch => {
          users.forEach(user => moveToChannel(user, ch));
        })
      }
    }
      
  function moveToChannel(member, channel) {
    if (member.voice.channel) {
      member.voice.setChannel(channel);
    }
  }
}