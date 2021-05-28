function moveUsersToChannel (name, users, client, message) {
  let existingChannel = client.channels.cache.find(x => x.name.toLowerCase() === name.toLowerCase());
  if (existingChannel) {
    users.forEach(user => moveToChannel(user, existingChannel));
  } else {
    message.guild.channels.create(name, { type: 'voice' }).then(ch => {
      users.forEach(user => moveToChannel(user, ch));
    })
  }
};

function getOrCreateChannel(name, client, message) {
  let existingChannel = client.channels.cache.find(x => x.name.toLowerCase() === name.toLowerCase());
  if (existingChannel) {
    return new Promise((resolve, reject) => resolve(existingChannel));
  } else {
    return message.guild.channels.create(name, { type: 'voice' });
  }
}

function moveToChannel(member, channel) {
  if (member.voice.channel) {
    member.voice.setChannel(channel);
    return true;
  }
  return false;
};

export {moveUsersToChannel, moveToChannel, getOrCreateChannel};
