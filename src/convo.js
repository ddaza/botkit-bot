'use strict';

export default class Convo {
  constructor(controller) {
    this.controller = controller;
  }

  setConvo(hears, cb) {
    this.controller.hears(hears, ['direct_message', 'direct_mention', 'mention'], (bot, message) => {
      bot.startConversation(message, (err, convo) => {
        if (err) {
          throw new Error(err);
        }

        cb(message, convo, bot);
      });
    });
  }
}
