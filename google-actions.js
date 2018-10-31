
'use strict'
var google = require('google')

google.resultsPerPage = 25

const request = require('request');

function luckySearch(searchName, callback) {
    google(searchName, function (err, res) {
        if (err) console.error(err)
        var link = res.links[0];
        console.log(link.title + ' - ' + link.href)
        console.log(link.description + "\n")
        callback(link.href)
    })
    //
    // let url = 'http://www.google.com/search?q=' + searchName
    // const options = {
    //     url: url,
    //     method: 'GET',
    //     followAllRedirects: true,
    //     followRedirect: true
    // };
    // request(options, function (error, response, body) {
    //     if (error)
    //         console.log(error.toString())
    //     callback(parseResponse(this.uri.href))
    // })
}

function youtubeSearch(searchName, callback) {
    let url = 'site%3Ayoutube.com ' + searchName
    luckySearch(url, callback)
}

function wikiSearch(searchName, callback) {
    let url = 'site%3Awikipedia.org ' + searchName
    luckySearch(url, callback)
}

function parseResponse(resp) {
    let index = resp.indexOf("<h3 class=\"r\"><a href=\"/url?q=") + 30
    let words = resp.substr(index).split("&amp")
    return words[0]
}

function help() {
    return "!g (termo), googleia o termo, safe search desativado + estou com sorte" +
        "\n!y (termo), estou com sorte só que no Youtube" +
        "\n!w (termo), busca o termo na Wikipédia" +
        "\n!g help, busca no google essa mensagem muito explicativa "
}

module.exports = {
    luckySearch,
    youtubeSearch,
    wikiSearch,
    help
}

