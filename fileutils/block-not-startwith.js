/**
 * 
 * 两个空格之间算一个block， 可以用来过滤重复的异常, 比如去掉： org.apache.shiro.crypto.CryptoException 的异常
 */
const fs = require('fs');
const readline = require('readline');
const path = require('path');
const uuid = require('uuid/v1');

var argv = require('yargs')
    .usage('Usage: $0  [options]')
    .example('-f access.log -t org.apache.shiro.crypto.CryptoException', 'Remove block starting with org.apache.shiro.crypto.CryptoException')
    .alias('f', 'file').nargs('f', 1).describe('f', 'Load a file')
    .alias('t', 'targetStr').nargs('t', 1).describe('t', "Target block starting")
    .demandOption(['f', 't'])
    .help('h').alias('h', 'help').epilog('copyright 2015')
    .argv;

var lineReader = readline.createInterface({
    input: fs.createReadStream("" + argv.file)
});
var writable = fs.createWriteStream('D:\\tmp\\'+uuid());
var skipline = false;
lineReader.on('line', function (line) {
    if(line.length<4){
        skipline = false;
    }
    if (line.startsWith(argv.targetStr)) { //
        skipline = true;
    } 

    if(!skipline){
        writable.write(line + "\n");
    }
});
