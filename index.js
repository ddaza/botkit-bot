'use strict';
import Bot from './src/botkit';

const tokenId = process.env.TOKEN_ID;

if (tokenId) {
  const myBot = new Bot(tokenId);
  myBot.connect();


} else {
  throw new Error('Token Id is not defined in the env vars!');
}
