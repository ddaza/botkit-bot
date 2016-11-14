'use strict';
import botkit from 'botkit';
import Convo from './convo';
import colors from 'colors/safe';
import sayHi from './conversations/hi';
import txtMe from './conversations/text';
import bestPizza from './conversations/pizza';

const controller = botkit.slackbot({stats_optout: true}); // botkit controller

export default class Bot {
  constructor(token) {
    this.token = token; // secret token id
    this.bot = null; // instance of my bot
    this.payload = null; // info about the slack team I just connected to
  }

  async connect() {
    try {
      this.bot = await controller.spawn({
        token: this.token
      });

      this.payload = await this.startRTM();

      console.log(colors.green('Bot connected:'), this.payload.ok); // eslint-disable-line no-console
      console.log(colors.green('Bot Name:'), this.payload.self.name); // eslint-disable-line no-console
    } catch(err) {
      throw new Error(err);
    }
  }

  startRTM() {
    return new Promise((resolve, reject) => {
      this.bot.startRTM(function(err, bot, payload) {
        if (err) {
          reject(err);
          return;
        }
        resolve(payload);
      });
    });
  }


  async disconnect() {
    if (!this.bot) {
      throw new Error('bot hasn\'t been initiallized yet');
    } else {
      await this.bot.closeRTM();
      console.log(colors.red('Bot Disconected!')); // eslint-disable-line no-console
      process.exit(0);
    }
  }

  wakeUp() {
    const conversations = new Convo(controller);
    conversations.setConvo(['hi', 'hello', 'hey'], sayHi);
    conversations.setConvo(['txt', 'sms'], txtMe);
    conversations.setConvo(['pizza'], bestPizza);
  }
}

