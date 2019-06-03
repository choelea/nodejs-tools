const timestampRgx = "(?<timestamp>\\d{4}-\\d{2}-\\d{2} \\d{2}:\\d{2}:\\d{2})";
const threadRgx = "\\[(?<thread>[^\\]]+)]";
const levelRgx = "(?<level>INFO|ERROR|WARN|TRACE|DEBUG|FATAL)";
const classRgx = "\\s(?<class>[^\\]]+)\\s";
const msgClassRgx = "\\[(?<msgClass>[^\\]]+)]";
const msgMethodRgx = "\\[(?<msgMethod>[^\\]]+)]";
const msgMillsRgx = "\\[(?<msgMills>[^\\]]+)]";
//const textRgx = "(?<text>.*?)(?=\\d{4}-\\d{2}-\\d{2} \\d{2}:\\d{2}:\\d{2}|\\Z)";
const textRgx = "\\s(?<text>.*?)";
 
const jobLogRegex = RegExp(`${timestampRgx} ${threadRgx} ${levelRgx} ${classRgx}- Job${msgClassRgx} with method name ${msgMethodRgx} started at ${msgMillsRgx}$`);
const regex = "/(?<timestamp>\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2},\d{3}) (?<level>INFO|ERROR|WARN|TRACE|DEBUG|FATAL)\s+\[(?<class>[^\]]+)]-\[(?<thread>[^\]]+)]\s+(?<text>.*?)$/s";
const str = `2019-06-02 16:00:00 [task-scheduler-4] INFO  net.shopxx.job.AdProductJob - Job[net.shopxx.job.AdProductJob] with method name [handleStatus] started at [1559491200000]`;
let m;

if ((m = jobLogRegex.exec(str)) !== null) {
    // The result can be accessed through the `m`-variable.
    m.forEach((match, groupIndex) => {
        console.log(`Found match, group ${groupIndex}: ${match}`);
    });
}