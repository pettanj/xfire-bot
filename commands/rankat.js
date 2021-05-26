export default function handleRankat(message, role, client) {
  let existingChannel = client.channels.cache.find(x => x.name.toLowerCase() === 'testo');
  if (existingChannel) {
    role.members.forEach(member => {
      if (member.voice) {
        try {
         member.voice.setChannel(existingChannel);
        } catch (error) {
        }
      }
    })
  } else {
    message.guild.channels.create('Testo', { type: 'voice' }).then(ch => {
      role.members.forEach(member => {
        if (member.voice) {
          try {
            member.voice.setChannel(ch);
          } catch (error) {
          }
        }
      })
    })
  }
}