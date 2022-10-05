/** Name:   Monkey Server index.js 1.0.0
 *  Desc:   Monkey servers main file that handles all logic and routing
 *  Author: Jimy Houlbrook
 *  Date :  03/10/22  
 */
const express = require('express');
const fs = require('fs');
const Monkey = require('./Monkey.js');
const path = require('path')
const debug = require('debug')('app') 


//------------------------------------------------------------------------
// Initialise server variables
const init = () => {
    // initialise express app
    this.app = express();
    this.port = 8080;
    this.app.set('view engine', 'ejs');

    // Initialise monkey and wordlist
    this.Monkey = new Monkey();

    const wordListPath = require('word-list');
    this.wordArray = fs.readFileSync(wordListPath, 'utf8').split('\n');

    wordsInJSON();
    getLetter();
    server.bind(this)();

    console.log('Monkey server running');
}


//------------------------------------------------------------------------
// Server runtime function
const server = () => {
    // listens for actiity on root page
    // takes request, response
    this.app.get('/', (req, res) => {
        console.log('User has connected to the root');

        // Get data from json, take out the commas and replace special char with
        // commas for frontend
        let data = require('./letters.json');
        let charactersStr = data.display.toString().replaceAll(',', '');
        let letters = charactersStr.replaceAll('**', ',');

        let mostRecent = data.display.slice(-60).toString().replaceAll(',', '');
        console.log(mostRecent);

        // Render page with data
        res.render('index',{letters: letters, mostRecent: mostRecent})
    });

    this.app.get('/style.css', (req, res) => {
        res.sendFile(path.join(__dirname, '/static/css/style.css'))
    })

    this.app.get('/about', (req, res) => {
        console.log('User has connected to about');

        // Get Data from JSON
        let data = require('./content.json');
        let text = data.about.text;
        let link = data.about.link;

        res.render('index', {letters: text, url: link, url: '/about'})
    })

    this.app.listen(this.port, () => {
        debug(`Server Listening on port ${this.port}`);
    });
}

// Put any words found into a JSON
const wordsInJSON = () => {
    const letterJSON = require('./letters.json');
    const monkeyWordArray = letterJSON.letters;
    const potentialWords = new Array();

    // Get all words possible at the moment
    for (const word of this.wordArray){
        if(word.length >> 2 && 
            word[word.length - 1] == monkeyWordArray[monkeyWordArray.length - 1]){
            const substring = monkeyWordArray.slice(-word.length);

            if(substring.toString().replaceAll(',', '') == word)
                potentialWords.push([
                    word,
                    monkeyWordArray.length - word.length,
                    monkeyWordArray.length - 1]);
        }
    }
    if(potentialWords.length >> 0){
        // Get the longest word of possible words
        let longestFound = new Array("", 0, 0);
        for(const obj of potentialWords){
            if(obj[0].length >= longestFound[0].length){
                longestFound = obj;
            }
        }

        // Check the longest word against last word in JSON

        // If the longest word contains the last word, we can check the index to make sure that
        // the word exists in the same place before removing it
        if(letterJSON.words.length >> 0){
            if(longestFound[0].includes(
                letterJSON.words[letterJSON.words.length - 1][0])){
                    let longStartIndex = longestFound[1];
                    let longFinIndex = longestFound[2];

                    let lastStartIndex = letterJSON.words[letterJSON.words.length - 1][1];
                    let lastFinIndex = letterJSON.words[letterJSON.words.length - 1][2];

                    // Ensure the substring is within the string
                    if(lastStartIndex >= longStartIndex && lastFinIndex <= longFinIndex){
                        letterJSON.words.pop();
                    }
                }
            }

        // If the longest found word is more than 2 push it to the JSON
        if(longestFound[0].length >> 2 && longestFound[0] != letterJSON.display[letterJSON.display.length -1]){
            letterJSON.words.push(longestFound);

            // Highlight the word in the display array
            for(let i = 0; i <= longestFound[0].length; i++)
                letterJSON.display.pop()

            letterJSON.display.push(`<em style='color:lightblue'>${longestFound[0]}</em>`)

            let data = JSON.stringify(letterJSON);

            fs.writeFile('letters.json', data, err => {
                if(err)
                    console.error(`The monkeys started playing with their shit \n${err}`)
                else
                    console.log(`Monkey wrote ${longestFound}`)
            })
        }

    }  
    setTimeout(wordsInJSON, 1000);
    
}


//------------------------------------------------------------------------
// Get letter and add it too the JSON
const getLetter = () => {
    // Gets a letters, adds it to the current contents of the JSON and then
    // Rewrites the JSON
    loop = () => {
        let letterJSON = require('./letters.json');
        this.Monkey.pickNumber();
        let num = this.Monkey.number

        let char = this.Monkey.typeWriter.keys[num];

        letterJSON.letters.push(char);
        letterJSON.display.push(char);

        let data = JSON.stringify(letterJSON);
        fs.writeFile('letters.json', data, err => {
            if (err)
                console.error(`The monkeys have decided to play with their shit: \n ${err}`);
        });

        setTimeout(loop, 1000);
    }
    loop()
}

init();