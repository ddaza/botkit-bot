'use strict';
import botkit from 'botkit';
import colors from 'colors/safe';

export default class Bot {
  constructor(token) {
    this.token = token; // secret token id
    this.controller = botkit.slackbot(); // botkit controller
    this.bot = null; // instance of my bot
    this.payload = null; // info about the slack team I just connected to
  }

  async connect() {
    try {
      this.bot = await this.controller.spawn({
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
          return reject(err);
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
    // reply to any incoming message
    this.controller.on('message_received', function(bot, message) {
      if (message) {
        bot.reply(message, 'I heard... something!');
      }
    });

    // reply to a direct mention - @bot hello
    this.controller.on('direct_mention',function(bot,message) {
      // reply to _message_ by using the _bot_ object
      bot.reply(message,'I heard you mention me!');
    });

    // reply to a direct message
    this.controller.on('direct_message',function(bot,message) {
      // reply to _message_ by using the _bot_ object
      bot.reply(message,'You are talking directly to me');
    });
  }
}
