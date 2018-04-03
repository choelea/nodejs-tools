const fs = require('fs');
const readline = require('readline');
const path = require('path');
const uuid = require('uuid/v1');

var argv = require('yargs')
    .usage('Usage: $0  [options]')
    .example('-f productNames.txt', 'Read file and easy line as an string item, then write to productNames.js')
    .alias('f', 'file').nargs('f', 1).describe('f', 'Load a file')
    .help('h').alias('h', 'help').epilog('copyright 2015')
    .argv;

var lineReader = readline.createInterface({
    input: fs.createReadStream("" + argv.file)
});
var writable = fs.createWriteStream('D:\\tmp\\'+uuid());
var arrNames = []
let index = 0;
lineReader.on('line', function (line) {
    // arrNames[index]=line
    // index++
    // if (line.indexOf(argv.targetStr) > -1) {
    //     console.log(line + "\n")
    //     writable.write(line + "\n");
    // }
    writable.write(`,"${line}"`)
});