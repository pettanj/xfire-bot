const tempChannels = [];

function createTempChannel(message, name) {
  return message.guild.channels.create(name || 'Testo', { type: 'voice' }).then(ch => {
    tempChannels.push(ch);
    return ch;
  })
}

export default {createTempChannel}