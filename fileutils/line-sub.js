const fs = require('fs');
const readline = require('readline');
var argv = require('yargs')
    .usage('Usage: $0  [options]')
    .alias('s', 'sourceFile').nargs('s', 1).describe('s', 'source file that to be processed')
    .alias('d', 'targetFile').nargs('d', 1).describe('d', 'Target file that will be written')
    .alias('e', 'endStr').nargs('e', 1).describe('e', 'End String')
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
        var end = line.indexOf(argv.endStr);
        if (end > -1) {
            writable.write(line.substring(0, end) + "\n");
        } else {
            writable.write(line + "\n");
        }
    }
});