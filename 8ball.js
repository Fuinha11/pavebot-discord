
'use strict'

let fs = require('fs');
const _ = require('lodash');

let ballFile = "./files/8ball.txt"

function getRandomAnswer() {
    let answers = getFileContent(ballFile).split(";\n")
    let index = Math.round(Math.random() * (answers.length-1))
    return answers[index]
}

function getFileContent(srcPath) {
    return fs.readFileSync(srcPath, 'utf8')
}

function dump() {
    return getFileContent(ballFile)
}

function getLast() {
    let answers = getFileContent(ballFile).split(";\n")
    return _.last(answers)
}

function addAnswer(answer) {
    answer = ";\n" + answer
    console.log(answer)
    fs.appendFileSync(ballFile, answer);
    return getLast()
}

function help() {
    return "!8 ou !8ball (pergunta), responde sua pergunta com os poderes da bola 8" +
         "\n!8 add (responta), adiciona a sua resposta a lista" +
         "\n!8 dump, faz um dump de todas as respostas" +
         "\n!8 help, essa menssagem =B "
}

module.exports = {
    getRandomAnswer,
    addAnswer,
    dump,
    help
}