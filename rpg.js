
'use strict'

const _ = require('lodash')

function rollDice(words) {
    let title = ':d20: Rolando '
    let body = ""
    let sum = 0
    let dices = []
    let bonus = 0
    let needsTotal = false

    for (let j = 0; j < words.length; j++) {
        if (words[j].match('\\d+d\\d+'))
            dices.push(words[j])
        else if (words[j].match('\\+\\d+'))
            bonus += parseInt(words[j].split('+')[1])
    }

    if (dices.length === 0) {
        dices.push('1d20')
    }

    for (let j = 0; j < dices.length; j++) {
        if (j !== 0) {
            body += '----------\n\n'
            if (j !== dices.length -1)
                title += ', '
            else
                title += ' e '
        }
        title += dices[j]
        let times = parseInt(dices[j].split('d')[0])
        let size = parseInt(dices[j].split('d')[1])
        if (times > 1 || j > 0)
            needsTotal = true
        body += dices[j] + ':\n'
        for (let i = 0; i < times; i++){
            let number = Math.ceil(Math.random() * (size))
            body += '🎲 = ' + number + '\n'
            sum += number
        }
    }

    if (bonus !== 0) {
        title += ' +' + bonus
        body += '----------\n\n +' + bonus + '\n'
        sum += bonus
        needsTotal = true
    }

    if (needsTotal)
        body += '----------\n\nTotal = ' + sum

    return {body:body, title:title}
}

function chtuluFicha() {
    let title = 'Criando um investigador aleatório :mag:'

    let armas = ['Faca (1d4+BD)  ',
                 'Espada (1d6+BD)',
                 'Pistola (1d8)  ',
                 'Escopeta (4d6) ',
                 'Rifle (2d6+4)  ']

    let trecos = [ 'Bolinha        ',
                 'Amuleto dourado',
                 'Tocha          ',
                 'Espelho        ',
                 'Bandagens      ',
                 'Corda          ',
                 '               ',
                 '               ',
                 'Munição        ',
                 'Livro          ']

    let reliquias = ['Cálice sagrado ',
                     'Lança chamas   ',
                     'Cachorro       ']

    let rand = Math.random()*100
    let arma1 = armas[Math.round(Math.random()*armas.length)]
    let arma2 = '               '
    rand = Math.random()*100
    if (rand > 90)
        arma2 = reliquias[Math.round(Math.random()*reliquias.length)]
    else if (rand > 15)
        arma2 = trecos[Math.round(Math.random()*trecos.length)]

    let name = "Investigador Tosco"
    let FOR = sumDice(3, 6, 0)
    let CON = sumDice(3, 6, 0)
    let DES = _.pad(sumDice(3, 6, 0), 2)
    let INT = _.pad(sumDice(2, 6, 6), 2)
    let TAM = sumDice(2, 6, 6)
    let POD = _.pad(sumDice(3, 6, 0), 2)
    let APA = _.pad(sumDice(3, 6, 0), 2)
    let EDU = _.pad(sumDice(3, 6, 3), 2)
    let ideia = _.pad(INT*5, 2)
    let conhec = _.pad(EDU*5, 2)
    let sorte = _.pad(POD*5, 2)

    let bdd = FOR+TAM
    if (bdd < 12)
        bdd = '-1d6'
    else if (bdd < 17)
        bdd = '-1d4'
    else if (bdd < 25)
        bdd = '0'
    else if (bdd < 33)
        bdd = '1d4'
    else
        bdd = '1d6'
    bdd = _.pad(bdd, 4)

    let pv = TAM + CON
    pv = Math.ceil(pv/2)
    pv = _.pad(pv, 2)
    let san = _.pad(POD*5, 2)

    FOR = _.pad(FOR, 2)
    TAM = _.pad(TAM, 2)
    CON = _.pad(CON, 2)

    let body = `
 _____________________________________
|                                     |
|  Nome: ${name}           |
|  Bônus: ${bdd}          PV: ${pv}        |
|                                     |
|  FOR: ${FOR}              CON: ${CON}       |
|  DES: ${DES}              INT: ${INT}       |
|  TAM: ${TAM}              POD: ${POD}       |
|  APA: ${APA}              EDU: ${EDU}       |
|                                     |
|  Ideia: ${ideia}            Conhe: ${conhec}     |
|  Sorte: ${sorte}            Sanid: ${san}     |
|                                     |
|  Arma1: ${arma1}             |
|  Arma2: ${arma2}             |
|                                     |
|_____________________________________|`

    return {body:body, title:title}
}

function sumDice(times, size, bonus) {
    let sum = 0
    for (let i = 0; i < times; i++){
        let number = Math.ceil(Math.random() * (size))
        sum += number
    }
    return sum + bonus
}

function diceHelp() {
    return "!roll, rola um d20" +
        "\n!roll (n)d(m), rola n dm" +
        "\n!roll (n)d(m) +x, rola n dm e soma x" +
        "\nDica: vc pode mandar quantos dados e quantos bonus quiser"
}

module.exports = {
    rollDice,
    chtuluFicha,
    diceHelp
}