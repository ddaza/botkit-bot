'use strict';
import botkit from 'botkit';
import colors from 'colors/safe';

export default class Bot {
  constructor(token) {
    this.token = token;
    this.controller = botkit.slackbot();
    this.bot = null;
    this.connecting_bot = null;
  }

  async connect() {
    this.bot = await this.controller.spawn({
      token: this.token
    });

    this.bot.startRTM(function(err, bot, payload) {
      if (err) {
        throw new Error(err);
      } else {
        console.log(colors.green('Bot connected:'), payload.ok);
        console.log('HELLO:', payload.self.name);
      }
    });
  }

  async disconnect() {
    if (!this.bot) {
      throw new Error('bot hasn\'t been initiallized yet');
    } else {
      await this.bot.closeRTM();
      console.log(colors.red('Bot Disconected!'));
      process.exit(0);
    }
  }
}
