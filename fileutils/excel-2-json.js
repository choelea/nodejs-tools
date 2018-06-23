const fs = require('fs');
const readline = require('readline');
const path = require('path');


var argv = require('yargs')
    .usage('Usage: $0  [options]')
    .example('$0 -f product.json', 'Convert Excel to json file')
    .alias('f', 'file').nargs('f', 1).describe('f', 'Load a file')
    .demandOption(['f'])
    .help('h').alias('h', 'help').epilog('copyright 2017')
    .argv;

var sourceFile = argv.file;
var targetFile = sourceFile.replace(".xlsx", ".json");
        var writable = fs.createWriteStream(targetFile);
const excelToJson = require('convert-excel-to-json');
 
const result = excelToJson({
    sourceFile: sourceFile,
    header:{
        // Is the number of rows that will be skipped and will not be present at our result object. Counting from top to bottom
        rows: 1 // 2, 3, 4, etc.
    },
    columnToKey: {
        A: 'cate0Zh',
        B: 'cate1Zh',
        C: 'cate2Zh',
        D: 'cate0En',
        E: 'cate1En',
        F: 'cate2En'
    },
    sheets: ['category']
});
// INSERT INTO okchem.ProductCategory (id,code, createdDate, lastModifiedDate, version, orders, grade, name, parent_id, generalRate, selfRate, treePath, image) 
const id=0;

result.category.forEach(element => {
    element.cate0Code=element.cate0En.toLowerCase().replace(/\W/g, '-').replace('--','-').replace('--','-');
    element.cate1Code=element.cate0Code +'-'+ element.cate1En.toLowerCase().replace(/\W/g, '-').replace('--','-').replace('--','-');
    if(element.cate2En){
        element.cate2Code=element.cate1Code + '-' + element.cate2En.toLowerCase().replace(/\W/g, '-').replace('--','-').replace('--','-');
    }
});
writable.write(JSON.stringify(result))