const fs = require('fs');
const readline = require('readline');
const path = require('path');


var argv = require('yargs')
    .usage('Usage: $0  [options]')
    .example('$0 -f product.json', 'Convert Json to properties')
    .alias('f', 'file').nargs('f', 1).describe('f', 'Load a file')
    .demandOption(['f'])
    .help('h').alias('h', 'help').epilog('copyright 2017')
    .argv;

var sourceFile = argv.file;
var targetFile = sourceFile.replace(".json", ".properties");
var writable = fs.createWriteStream(targetFile);

var lineReader = readline.createInterface({
    input: fs.createReadStream("" + argv.file)
});

lineReader.on('line', function (line) {
    if (line.trim().length > 2) {
        var newLine = line.replace(":", "=").replace("\"", "").replace("\"", "").replace("\"", "").replace("\"", "").replace("\"", "").replace(",", "");
        var ss = line.split(":");
        //console.log(ss);
        var key = ss[0].trim().replace("\"", "").replace("\"", "").replace(" ", ".").replace(" ", ".").replace(" ", ".").replace(" ", ".").toLowerCase();
        var value = ss[1].trim().replace("\"", "").replace("\"", "").replace(",", "");
        writable.write(key + "=" + value + "\n");
    }
});