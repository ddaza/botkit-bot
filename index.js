'use strict';
import Bot from './src/botkit';

const slackTokenId = process.env.SLACK_TOKEN_ID;

if (slackTokenId) {
  const myBot = new Bot(slackTokenId);
  myBot.connect();
  myBot.wakeUp();

} else {
  throw new Error('Token Id is not defined in the env vars!');
}
