
const fs = require('fs');
const readline = require('readline');
const path = require('path');
const uuid = require('uuid/v1');
var moment = require('moment');

const Sequelize = require('sequelize');

const dbUrl = 'mysql://okchem:okchem@localhost:3306/data-demo';
const sequelize = new Sequelize(dbUrl, {
    logging: false
});

let JobLog = sequelize.define('joblogs', {
    job: Sequelize.STRING,
    timestamp: Sequelize.DATE,
    thread: Sequelize.STRING,
    level: Sequelize.STRING,
    class: Sequelize.STRING,
    msgMethod: Sequelize.STRING,
    msgAction: Sequelize.STRING,
    msgMills: Sequelize.DATE
});

const timestampRgx = "(?<timestamp>\\d{4}-\\d{2}-\\d{2} \\d{2}:\\d{2}:\\d{2})";
const threadRgx = "\\[(?<thread>[^\\]]+)]";
const levelRgx = "(?<level>INFO|ERROR|WARN|TRACE|DEBUG|FATAL)";
const classRgx = "\\s(?<class>[^\\]]+)\\s";
const msgClassRgx = "\\[(?<msgClass>[^\\]]+)]";
const msgActionRgx = "(?<msgAction>started|end)";
const msgMethodRgx = "\\[(?<msgMethod>[^\\]]+)]";
const msgMillsRgx = "\\[(?<msgMills>[^\\]]+)]";
//const textRgx = "(?<text>.*?)(?=\\d{4}-\\d{2}-\\d{2} \\d{2}:\\d{2}:\\d{2}|\\Z)";
const textRgx = "\\s(?<text>.*?)";
 
const jobLogRegex = RegExp(`${timestampRgx} ${threadRgx} ${levelRgx} ${classRgx}- Job${msgClassRgx} with method name ${msgMethodRgx} ${msgActionRgx} at ${msgMillsRgx}$`);

/**
 *  Use regex to parse log with below format:
 *  2019-06-02 10:59:00 [task-scheduler-4] INFO  net.shopxx.job.AdProductJob - Job[net.shopxx.job.AdProductJob] with method name [handleStatus] started at [1559473140000]
 *  2019-06-02 10:59:00 [task-scheduler-4] INFO  net.shopxx.job.AdProductJob - Job[net.shopxx.job.AdProductJob] with method name [handleStatus] end at [1559473140015]
 * 
 */
const argv = require('yargs')
    .usage('Usage: $0  [options]')
    .example('-f app.log', 'parse app log')
    .alias('f', 'file').nargs('f', 1).describe('f', 'Load a file')
    .demandOption(['f'])
    .help('h').alias('h', 'help').epilog('copyright 2019')
    .argv;

var lineReader = readline.createInterface({
    input: fs.createReadStream("" + argv.file)
});
var writable = fs.createWriteStream('D:\\tmp\\'+uuid());
var totalCount = 0;
var targetLineCount = 0;
let jobLogs = []
lineReader.on('line', function (line) {
    const arr = jobLogRegex.exec(line);
    if(arr!==null){
        const o = arr['groups'];
        const obj = {
            job: `${o.class}-${o.msgMethod}`,
            timestamp: moment.utc(o.timestamp).toDate(),
            thread: o.thread,
            level: o.level,
            class: o.class,
            msgMethod: o.msgMethod,
            msgAction: o.msgAction,
            msgMills: moment(new Number(o.msgMills)).toDate()
        }
        jobLogs.push(obj);
        // writable.write(JSON.stringify(obj) + "\n");
    }else{
        console.log(line)
    }
}).on('close', () => {         
    sequelize.sync({ force: true }).then(() => {
        JobLog.bulkCreate(jobLogs);
    }).then(()=>{
        console.log('done')
    })
}); ;
