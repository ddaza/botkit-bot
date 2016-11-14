'use strict';
import client from 'twilio';

// Get env variables
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const apiKey = process.env.TWILIO_API_KEY;
const apiSecret = process.env.TWILIO_API_SECRET;
const toNum = process.env.TO_NUMBER;
const fromNum = process.env.FROM_NUMBER;

export default class Twilio {
  constructor() {
    // set the tokens
    this.account = client(apiKey, apiSecret).accounts(accountSid);
  }

  txtMessage(body, to=toNum, from=fromNum) {
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



