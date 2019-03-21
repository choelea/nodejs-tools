/**
 * This could be used to filter out errors from java log
 */
const fs = require('fs');
const readline = require('readline');
const path = require('path');
const uuid = require('uuid/v1');

var argv = require('yargs')
    .usage('Usage: $0  [options]')
    .example('-f access.log -t /product/', 'Print out lines that not starting with /product/')
    .alias('f', 'file').nargs('f', 1).describe('f', 'Load a file')
    .alias('t', 'targetStr').nargs('t', 1).describe('t', "Target String that line should not start with")
    .demandOption(['f', 't'])
    .help('h').alias('h', 'help').epilog('copyright 2015')
    .argv;

var lineReader = readline.createInterface({
    input: fs.createReadStream("" + argv.file)
});
var writable = fs.createWriteStream('D:\\tmp\\'+uuid());
var lastOnStartedWith = true;
lineReader.on('line', function (line) {
    if (!line.startsWith(argv.targetStr)) {
        if(lastOnStartedWith){
            writable.write("\n\n");
        }
        writable.write(line + "\n");
        lastOnStartedWith = false;
    }else{
        lastOnStartedWith = true
    }
});
