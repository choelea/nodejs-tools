const fs = require('fs');
const readline = require('readline');
var argv = require('yargs')
    .usage('Usage: $0  [options]')
    .alias('s', 'sourceFile').nargs('s', 1).describe('s', 'source file that to be processed')
    .demandOption(['s'])
    .help('h').alias('h', 'help').epilog('copyright 2017')
    .argv;

var lineReader = readline.createInterface({
    input: fs.createReadStream(argv.sourceFile)
});
var index  = 1;
var lineIndex = 0;
lineReader.on('line', function (line) {
    if(lineIndex%300===0){
        writable = fs.createWriteStream(argv.sourceFile+index+".txt");
        index++;
    }
    lineIndex++;
    writable.write(line + "\n");
});