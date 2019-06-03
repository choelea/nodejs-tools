const fs = require('fs');
const readline = require('readline');
const path = require('path');
const uuid = require('uuid/v1');

var argv = require('yargs')
    .usage('Usage: $0  [options]')
    .example('-f access.log -t 192.168.1.1 -nt GET /static/', 'Print out lines that contain 192.168.1.1 and do NOT contain GET /static')
    .alias('f', 'file').nargs('f', 1).describe('f', 'Load a file')
    .alias('t', 'targetStr').nargs('t', 1).describe('t', "Target String that line should contain")
    .alias('r', 'filteredStr').nargs('r', 1).describe('r', "Target String that line should NOT contain")
    .demandOption(['f'])
    .help('h').alias('h', 'help').epilog('copyright 2017')
    .argv;

var lineReader = readline.createInterface({
    input: fs.createReadStream("" + argv.file)
});
var writable = fs.createWriteStream('D:\\tmp\\' + uuid());
console.log(`Starting to filter out the lines and print out those lines that contain ${argv.targetStr} and DO NOT contain ${argv.filteredStr}`)
lineReader.on('line', function (line) {
    if ((!argv.targetStr || line.indexOf(argv.targetStr) > -1) && (!argv.filteredStr || line.indexOf(argv.filteredStr) === -1)) {
        console.log(line + "\n");
        writable.write(line + "\n");
    }
}
);