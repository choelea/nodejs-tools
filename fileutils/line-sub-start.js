const fs = require('fs');
const readline = require('readline');
var argv = require('yargs')
    .usage('Usage: $0  [options]')
    .alias('s', 'sourceFile').nargs('s', 1).describe('s', 'source file that to be processed')
    .alias('d', 'targetFile').nargs('d', 1).describe('d', 'Target file that will be written')
    .alias('e', 'startStr').nargs('e', 1).describe('e', 'start String')
    .demandOption(['s', 'd', 'e'])
    .help('h').alias('h', 'help').epilog('copyright 2017')
    .argv;

var targetFile = argv.targetFile;
var lineReader = readline.createInterface({
    input: fs.createReadStream(argv.sourceFile)
});
var writable = fs.createWriteStream(targetFile);

lineReader.on('line', function (line) {
    if (line.trim().length > 2) {
        if (line.startsWith(argv.startStr)) {
            writable.write(line.substring(argv.startStr.length, line.length) + "\n");
        } else {
            writable.write(line + "\n");
        }
    }
});