/** Name:   Monkey and Typewriter JS file
 *  Desc:   Holds the logic for monkey selecting letter on typewriter
 *  Author: Jimy Houlbrook
 *  Date:   03/10/22
 */

module.exports = class Monkey{
    constructor(){
        this.number = 0
        this.typeWriter = new typeWriter()
    }

    pickNumber = () => {
        let a = Math.floor(Math.random() * this.typeWriter.keys.length);
        let b = Math.floor(Math.random() * this.typeWriter.keys.length);
        let c = Math.floor(Math.random() * this.typeWriter.keys.length);
        let d = Math.floor(Math.random() * this.typeWriter.keys.length);
        let e = Math.floor(Math.random() * this.typeWriter.keys.length);

        this.number = Math.floor((a + b + c + d + e) / 5)
    }
}

const typeWriter = class{
    constructor(){
        this.keys = [
            '1',
            '2',
            '3',
            '4',
            '5',
            '6',
            '7',
            '8',
            '9',
            '&',
            '0',
            '+',
            '    ',
            'a',
            'b',
            'c',
            'd',
            'e',
            'f',
            'g',
            'h',
            'i',
            'j',
            'k',
            'l',
            'm',
            'n',
            'o',
            'p',
            'q',
            'r',
            's',
            't',
            'u',
            'v',
            'w',
            'x',
            'y',
            'z',
            '%',
            '?',
            '.',
            '/',
            '§',
            ' ',
            '**'
        ]
    }
}