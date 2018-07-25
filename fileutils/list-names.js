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
fs.readdir(folderPath, (err, files) => {
    files.forEach(file => {
        var name = file.replace('.jpg','').replace('.png','');
        console.log(`update okchem.ProductCategory set image ='https://d1e6t0jxhk2yjq.cloudfront.net/categories/${file}'  where code='${name}';`)
    });
})