var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');

const actions = require('./bot-actions')

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot

logger.info(process.env.authtoken);

var bot = new Discord.Client({
    token: process.env.authtoken,
    autorun: true
});


bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});
bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    try {
        if (message.includes("surub"))
                actions.surubao(bot, user, userID, channelID, message, evt)

        if (message.substring(0, 1) == '!') {
            var args = message.substring(1).split(' ');
            var cmd = args[0];

            args = args.splice(1);
            switch(cmd) {
                // !ping
                case 'ping':
                    bot.sendMessage({
                        to: channelID,
                        message: 'Pong!'
                    });
                    break;
                case "lol":
                    actions.lolBack(bot, user, userID, channelID, message, evt)
                    break;
                case "email":
                    actions.emailBack(bot, user, userID, channelID, message, evt)
                    break;
                case "spam":
                    actions.spam(bot, user, userID, channelID, message, evt)
                    break;
                case "8ball":
                    actions.bolaCommand(bot, user, userID, channelID, message, evt)
                    break;
                case "8":
                    actions.bolaCommand(bot, user, userID, channelID, message, evt)
                    break;
                case "perola":
                    actions.perolaCommand(bot, user, userID, channelID, message, evt)
                    break;
                case "help":
                    actions.help(bot, user, userID, channelID, message, evt)
                    break;
                case "g":
                    actions.gSearch(bot, user, userID, channelID, message, evt)
                    break;
                case "y":
                    actions.ySearch(bot, user, userID, channelID, message, evt)
                    break;
                case "w":
                    actions.wSearch(bot, user, userID, channelID, message, evt)
                // Just add any case commands if you want to..
            }
        }
    } catch (e) {
        actions.logMessage(bot, "buguei: - " + e.toString())
    }
});