
'use strict'

function randomCard() {
    if (Math.ceil(Math.random() * (27)) === 27)
        return "🃏"

    let number = Math.ceil(Math.random() * (13))
    let suit = Math.ceil(Math.random() * (4))
    return printCard(number, suit)
}

function printCard(number, suit) {
    let card = ""
    switch (number) {
        case 1:
            card += 'A'
            break
        case 11:
            card += 'J'
            break
        case 12:
            card += 'Q'
            break
        case 13:
            card += 'K'
            break
        default:
            card += number
    }

    switch (suit) {
        case 1:
            card += '♢'
            break
        case 2:
            card += '♡'
            break
        case 3:
            card += '♣'
            break
        default:
            card += '♠'
    }

    return card
}

function drawCard() {
    return "Sua carta é: " + randomCard()
}

function drawMultipleCards(amount) {
    let resp = ""

    for (let i = 0; i < amount; i++) {
        resp += drawCard() + "\n"
    }

    return resp
}
module.exports = {
    randomCard,
    drawCard,
    drawMultipleCards
}