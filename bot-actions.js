
'use strict'

const _ = require('lodash')
const bola = require('./8ball')
const perola = require('./perolas')
const gActions = require('./google-actions')
const deck = require('./deck')
const rpg = require('./rpg')
var logger = require('winston');

logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';

function lolBack(bot, user, userID, channelID, message, evt) {
    postMessage(bot, channelID, `lol back to you mofo`)
}

function emailBack(bot, user, userID, channelID, message, evt) {
    postMessage(bot, channelID, `O email oficial do Modo Pavêtivo é pavetivo@gmail.com a senha é epaveoupacume`)
}

function surubao(bot, user, userID, channelID, message, evt) {
    postRawMessage(bot, channelID, `:eyes: Eu ouvi surubão?`)
}

function mentions(bot, user, userID, channelID, message, evt) {
   postMessage(bot, channelID, `🤖 Beep boop: qq seis qué cmg carái?!`)
}

function spam(bot, user, userID, channelID, message, evt) {
    let words = splitRemoveCommand(message)
    let amount = parseInt(words[0])
    if (!amount || amount > 50)
        amount = 5
    else
        words = words.slice(1)
    let time = parseInt(words[0])
    if (!time || time > 60000 || time < 666)
        time = 666
    else
        words = words.slice(1)
    let spamMessage = words.join(" ")
    if (spamMessage === '')
        spamMessage = 'Spamming you :pave:'
    let i = 0
    let timer = setInterval(function () {
        i++
        if (i >= amount)
            clearInterval(timer)
        postRawMessage(bot, channelID, spamMessage)
    }, time)

}

function rollDice(bot, user, userID, channelID, message, evt) {
    let words = splitRemoveCommand(message)
    var response = rpg.rollDice(words)
    postMessage(bot, channelID, response.body, response.title)
}

function chtuluFicha(bot, user, userID, channelID, message, evt) {
    let response = rpg.chtuluFicha()
    postMessage(bot, channelID, response.body, response.title)
}

function drawCard(bot, user, userID, channelID, message, evt) {
    let words = splitRemoveCommand(message)
    let times = parseInt(words[0])
    if (!times || times > 15)
        times = 1

    postMessage(bot, channelID, deck.drawMultipleCards(times), "Comprando uma carta 🎴")
}

function bolaCommand(bot, user, userID, channelID, message, evt) {
    let msg = splitRemoveCommand(message)
    switch (msg[0]) {
        case "add":
            postMessage(bot, channelID, bola.addAnswer(msg.slice(1).join(" ")))
            logMessage(bot, bola.dump())
            break
        case "dump":
            postMessage(bot, channelID, bola.dump())
            break
        case "help":
            postMessage(bot, channelID, bola.help())
            break
        default:
            let finalMessage = msg.join(" ")
            finalMessage += "? \n"
            let answer = bola.getRandomAnswer()
            finalMessage += answer
            postMessage(bot, channelID, finalMessage)
            break
    }

}

function perolaCommand(bot, user, userID, channelID, message, evt) {
    let msg = splitRemoveCommand(message)
    switch (msg[0]) {
        case "search":
            postMessage(bot, channelID, perola.searchPerola(msg.slice(1).join(" ")))
            break
        case "add":
            postMessage(bot, channelID, perola.addPerola(msg.slice(1).join(" ")))
            logMessage(bot, perola.dump())
            break
        case "bulk":
            postMessage(bot, channelID, perola.bulkAdd(msg.slice(1).join(" ")))
            logMessage(bot, perola.dump())
            break
        case "dump":
            postMessage(bot, channelID, perola.dump())
            break
        case "help":
            postMessage(bot, channelID, perola.help())
            break
        case "last":
            postMessage(bot, channelID, perola.getLast())
            break
        default:
            postMessage(bot, channelID, perola.getRandomAnswer())
    }
}

function gSearch(bot, user, userID, channelID, message, evt) {
    let msg = splitRemoveCommand(message).join(" ")
    if (msg.startsWith("help"))
        postMessage(bot, channelID, gActions.help())
    else {
        postMessage(bot, channelID, '[Google] ' + msg)
        gActions.luckySearch(message, function (url) {
            gResponse(bot, channelID, message, url)
        })
    }
}

function ySearch(bot, user, userID, channelID, message, evt) {
    let msg = splitRemoveCommand(message).join(" ")
    postMessage(bot, channelID, '[YouTube] ' + msg)
    gActions.youtubeSearch(msg, function (url) {
        gResponse(bot, channelID, msg, url)
    })
}

function wSearch(bot, user, userID, channelID, message, evt) {
    let msg = splitRemoveCommand(message).join(" ")
    postMessage(bot, channelID, '[Wikipedia] ' + msg)
    gActions.wikiSearch(msg, function (url) {
        gResponse(bot, channelID, msg, url)
    })
}

function gResponse(bot, channel, message, url) {
    if (url.startsWith("http://ipv4.google.com/sorry/"))
        postMessage(bot, channel, "Sorry guys, o tio Google me bloqueou... T~T")
    else if (url.startsWith('http://') || url.startsWith('https://'))
        postRawMessage(bot, channel, "[ " + message + " ] " + url)
    else
        postMessage(bot, channel, "[ " + message + " ] Não achei nada ='(")
}

function help(bot, user, userID, channelID, message, evt) {

    let msg = ":8ball: Bola 8" + "```"  + bola.help() + "```" +
    "\n:face_palm::skin-tone-5: Perolas" + "```"  + perola.help() + "```" +
    "\n:mag: Google" + "```"  + gActions.help() + "```" +
    "\n🤖 PaveBot:" + "```" + botHelp() + "```" + 
    "\n:game_die: D20:" + "```" + rpg.diceHelp() + "```"
    
    postRawMessage(bot, channelID, msg)
}

function botHelp() {
    return "!lol, rí de você" +
        "\n!email, infos do email pavetivo" +
        "\n!spam, spama o FDP sem dó!" +
        "\n!help, esse super mega helper "
}

function postMessage(bot, channel, body, title) {
    title = title !== undefined ? title : ""
    bot.sendMessage({
        to: channel,
        message: title + "```" + body + "```"
    });
}

function postRawMessage(bot, channel, msg) {
    bot.sendMessage({
        to: channel,
        message: msg
    });
}

function logMessage(bot, msg) {
    bot.sendMessage({
        to: '507223107812065291', 
        message: msg
    });
}

function splitRemoveCommand(message) {
    let words = message.split(" ")
    return words.slice(1)
}


module.exports = {
    mentions,
    emailBack,
    surubao,
    lolBack,
    spam,
    bolaCommand,
    help,
    perolaCommand,
    logMessage,
    postRawMessage,
    gSearch,
    ySearch,
    wSearch,
    rollDice,
    drawCard,
    chtuluFicha
}