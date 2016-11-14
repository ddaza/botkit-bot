'use strict';

export default function (message, convo, bot) {
  convo.say('Oh man, I whish I could eat pizza!');
  convo.ask('What do you think is the best style of pizza?', [
    {
      pattern: 'chicago',
      callback: convoRight
    },
    {
      pattern: 'chicago style',
      callback: convoRight
    },
    {
      pattern: 'deep dish',
      callback: convoRight
    },
    {
      pattern: bot.utterances.quit,
      callback: function (response, convo) {
        convo.stop();
      }
    },
    {
      default: true,
      callback: convoWrong
    }
  ]);


  convo.on('end', function(convo) {
    if (convo.status == 'completed') {
      bot.reply(message, 'You re doing it right! :pizza:');
    } else {
      bot.reply(message, 'OK, nevermind!');
    }
  });
}

function convoRight(response, convo) {
  convo.next();
}

function convoWrong(response, convo) {
  convo.sayFirst('wrong!');
  convo.repeat();
  convo.next();
}
