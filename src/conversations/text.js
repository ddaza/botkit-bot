'use strict';
import Twilio from '../twilio';

const twilio = new Twilio();

export default function (message, convo, bot) {
  convo.say('I hear something about a text message');
  convo.ask('Do you want me to text you something?', [
    {
      pattern: 'yes',
      callback: convoTextMessage
    },
    {
      pattern: 'no',
      callback: function(response, convo) {
        convo.stop();
      }
    },
    {
      default: true,
      callback: function(response, convo) {
        convo.repeat();
        convo.next();
      }
    }
  ]);


  convo.on('end', function(convo) {
    if (convo.status == 'completed') {
      const message = convo.extractResponse('message');
      twilio.txtMessage(message);
    } else {
      bot.reply(message, 'OK, nevermind!');
    }
  });
}

function convoTextMessage(response, convo) {
  convo.ask('What would you want me to send?', function (response, convo) {
    convo.say(`Ok, I will send you this: \`${response.text}\``);
    convo.next();
  }, {'key': 'message'});

  convo.next();
}
