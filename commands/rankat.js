export default function handleRankat(message, role, client) {
  let existingChannel = client.channels.cache.find(x => x.name.toLowerCase() === 'testo');
  if (existingChannel) {
    moveToChannel(existingChannel);
  } else {
    message.guild.channels.create('Testo', { type: 'voice' }).then(ch => {
      moveToChannel(ch);
    })
  }

  function moveToChannel(channel) {
    role.members.forEach(member => {
      if (member.voice.channel) {
        member.voice.setChannel(channel);
      }
    });
  }
}