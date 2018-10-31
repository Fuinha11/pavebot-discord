
'use strict'

let fs = require('fs');
const _ = require('lodash');

let perolasFile = "./files/perolas.txt"

function getRandomAnswer() {
    let answers = getFileContent(perolasFile).split(";\n")
    let index = Math.round(Math.random() * (answers.length-1))
    return answers[index]
}

function getFileContent(srcPath) {
    return fs.readFileSync(srcPath, 'utf8')
}

function dump() {
    return getFileContent(perolasFile)
}

function getLast() {
    let answers = getFileContent(perolasFile).split(";\n")
    return _.last(answers)
}

function addPerola(perola) {
    if (perola.includes("; "))
        throw "Perolas não podem ter ; jagunço"
    perola = ";\n" + perola
    console.log(perola)
    fs.appendFileSync(perolasFile, perola);
    return getLast()
}

function bulkAdd(perola) {
    perola = ";\n" + perola
    console.log(perola)
    fs.appendFileSync(perolasFile, perola);
    return dump()
}

function searchPerola(content) {
    let answers = getFileContent(perolasFile).split(";\n")
    let results = new Array()
    for (let i = 0; i < answers.length; i++) {
        if (answers[i].toLowerCase().includes(content.toLowerCase()))
        results.push(answers[i])
    }
    if (results.length === 0)
        return "Não achei nada =("
    else
        return results.join("\n")
}

function help() {
    return "!perola, solta uma pérola aleatória baseada na burrice coletiva" +
        "\n!perola add (Perola - Autor), adiciona a sua pérola à lista" +
        "\n!perola search (termo), busca as pérolas que tem esse termo (pode ser o autor tbem #fiqdik)" +
        "\n!perola dump, faz um dump de todas as pérolas" +
        "\n!perola last, mostra a última pérola criada" +
        "\n!perola help, essa menssagem jagunçola "
}

module.exports = {
    getRandomAnswer,
    addPerola,
    searchPerola,
    dump,
    bulkAdd,
    help,
    getLast
}