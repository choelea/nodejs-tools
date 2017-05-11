const fs = require('fs');
const readline = require('readline');
var argv = require('yargs')
    .usage('Usage: $0  [options]')
    .example('-f /home/folder', 'Convert Json files to propertie files')
    .alias('f', 'folderPath').nargs('f', 1).describe('f', 'Set an folder')
    .demandOption(['f'])
    .help('h').alias('h', 'help').epilog('copyright 2017')
    .argv;

var folderPath = argv.folderPath;
console.log(folderPath);
fs.readdir(folderPath, (err, files) => {
    files.forEach(file => {
        let sourceFile = folderPath+"/"+file;
        var targetFile = sourceFile.replace(".json", ".properties");
        var writable = fs.createWriteStream(targetFile);

        var lineReader = readline.createInterface({
            input: fs.createReadStream(sourceFile)
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
    });
})