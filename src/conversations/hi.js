'use strict';

export default function (message, convo, bot) {
  convo.say('I do not know your name yet!');
  convo.ask('What should I call you?', function(response, convo) {
    convo.ask('You want me to call you `' + response.text + '`?', [
      {
        pattern: 'yes',
        callback: function(response, convo) {
          // since no further messages are queued after this,
          // the conversation will end naturally with status == 'completed'
          convo.next();
        }
      },
      {
        pattern: 'no',
        callback: function(response, convo) {
          // stop the conversation. this will cause it to end with status == 'stopped'
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

    convo.next();

  }, {'key': 'nickname'}); // store the results in a field called nickname

  convo.on('end', function(convo) {
    if (convo.status == 'completed') {
      bot.reply(message, 'OK! I will update my dossier...');
      const name = convo.extractResponse('nickname');

      console.log('>>>>>', name);

    } else {
      // this happens if the conversation ended prematurely for some reason
      bot.reply(message, 'OK, nevermind!');
    }
  });
}
