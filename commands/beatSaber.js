export default function handleBeatSaber(newMember, client) {
  let existingChannel = client.channels.cache.find(x => x.name.toLowerCase() === 'beat saber');
  if (existingChannel) {
    newMember.member.voice.setChannel(existingChannel);
  } else {
    newMember.guild.channels.create('Beat Saber', { type: 'voice' }).then(ch => {
      if (newMember.member.voice) {
        newMember.member.voice.setChannel(ch);
      }
    });
  }
}