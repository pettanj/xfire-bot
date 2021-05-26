import fetch from 'node-fetch';
import fs from 'fs';
const auth = JSON.parse(fs.readFileSync('auth.json', 'utf-8'));

export default async function handleAram(message) {
  var url = `https://g.tenor.com/v1/gifs?ids=18584658&key=${auth.tenor_key}`;
  let response = await fetch(url);
  let json = await response.json();
  message.channel.send(`${json.results[0].url}`);
}