'use strict';
import client from 'twilio';

export default class Twilio {
  constructor(accountSid, apiKey, apiSecret) {
    const myClient = client(apiKey, apiSecret);
    this.account = myClient.account(accountSid);
  }

  txtMessage(to, from, body) {
    return new Promise((resolve, reject) => {
      this.account.messages.create({ to, from, body }, (err, messageData) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(messageData);
      });
    });
  }
}



