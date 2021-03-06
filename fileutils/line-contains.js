const fs = require('fs');
const readline = require('readline');
const path = require('path');
const uuid = require('uuid/v1');

var argv = require('yargs')
    .usage('Usage: $0  [options]')
    .example('-f access.log -t /product/', 'Print out lines that contain /product/')
    .alias('f', 'file').nargs('f', 1).describe('f', 'Load a file')
    .alias('t', 'targetStr').nargs('t', 1).describe('t', "Target String that line should contain")
    .demandOption(['f', 't'])
    .help('h').alias('h', 'help').epilog('copyright 2015')
    .argv;

var lineReader = readline.createInterface({
    input: fs.createReadStream("" + argv.file)
});
var writable = fs.createWriteStream('D:\\tmp\\'+uuid());
var totalCount = 0;
var targetLineCount = 0;
lineReader.on('line', function (line) {
    if (line.indexOf(argv.targetStr) > -1) {
        targetLineCount ++;
        writable.write(line + "\n");
    }
});
