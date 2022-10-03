const express = require('express');
const fs = require('fs');
const Monkey = require('./Monkey.js');

// Initialise server variables
const init = () => {
    this.app = express();
    this.port = 3000;

    this.app.set('view engine', 'ejs');

    this.Monkey = new Monkey();

    getLetter();

    server.bind(this)()
}

// Server runtime function
const server = () => {
    // listens for actiity on root page
    // takes request, response
    this.app.get('/', (req, res) => {
        console.log('User has connected to the root');

        let data = require('./letters.json');
        let charactersStr = data.letters.toString().replaceAll(',', '');
        let letters = charactersStr.replaceAll('**', ',');

        res.render('index',{letters: letters})
    });

    this.app.listen(this.port, () => {
        console.log(`Server Listening on port ${this.port}`);
    });
}

// Get letter and add it too the JSON
const getLetter = () => {
    loop = () => {
        let letterJSON = require('./letters.json');
        this.Monkey.pickNumber();
        let num = this.Monkey.number

        let char = this.Monkey.typeWriter.keys[num];

        letterJSON.letters.push(char);
        let data = JSON.stringify(letterJSON);
        fs.writeFile('letters.json', data, err => {
            if (err)
                console.error(err);
            else
                console.log('JSON saved successfully');
        });

        setTimeout(loop, 1000);
    }
    loop()
}

init();