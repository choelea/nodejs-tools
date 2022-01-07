const fs = require('fs');
const moment = require('moment');
const SortedMap = require("collections/sorted-map"); //https://www.collectionsjs.com/sorted-map
const sourceFolder = "/Users/joe/Downloads";

// 获取昨天的时间
moment.locale('zh-cn');
const _today = moment();
const yesterday = _today.subtract(1, 'days').format('YY-MM-DD'); /*前一天的时间*/


// 将ORDERING 读入Map
const sourceOrderLogFile = `${sourceFolder}/ORDERING_${yesterday}.log`;
const orderMap = new SortedMap();
const data = fs.readFileSync(sourceOrderLogFile, 'UTF-8');

// split the contents by new line
let lines = data.split(/\r?\n/);

//{"shopID":"48","api":"/qrCodePay","OrderID":"59448","payType":"WECHAT","amount":300}
// print all lines
lines.forEach((line) => {
    if (line.trim().length > 2) {
        const lineJson = JSON.parse(line.trim());
        lineJson.paid=false;
        lineJson.paidAmount=0;
        orderMap.add(lineJson, lineJson.OrderID);
    }
});

// 读Notify 文件更新map的内容
const sourceNotifyLogFile = `${sourceFolder}/NOTIFY_${yesterday}.log`;
const notifyData = fs.readFileSync(sourceNotifyLogFile, 'UTF-8');

// split the contents by new line
lines = notifyData.split(/\r?\n/);
//{"ShopID":"17","OrderID":"84357","amount":20,"payType":"ALIPAY"}
lines.forEach((line) => {
    if (line.trim().length > 2) {
        const lineJson = JSON.parse(line.trim());
        const order = orderMap.get(lineJson.OrderID);
        if(order){
            order.paid = true;
            order.paidAmount = lineJson.amount;
        }else{
            console.log ("未找到"+line)
        }
        
    }
});



// 写入新文件
let targetFile = `${sourceFolder}/MERGED_${yesterday}.log`;
let writable = fs.createWriteStream(targetFile);

orderMap.toArray().forEach(element=>{
    writable.write(JSON.stringify(element)+"\n");
})



// API维度统计
//{api:"", totalAmount:, count:}
targetFile = `${sourceFolder}/STATICS_${yesterday}.log`;
writable = fs.createWriteStream(targetFile);

const staticApiMap = new SortedMap();
orderMap.toArray().forEach(element=>{
    const obj = staticApiMap.get(element.api);
    if(obj){
        obj.count +=1;
        obj.totalAmount+=element.paidAmount
        if(element.paid){
            obj.paidCount++;
        }
    }else{
        const json = {api:element.api, totalAmount:element.paidAmount, count:1, paidCount:0}
        if(element.paid){
            json.paidCount++;
        }
        staticApiMap.add(json, element.api);
    }
})
const apiStatics = staticApiMap.toArray();

const staticJson = {
    apiStatics,
}

writable.write(JSON.stringify(staticJson, null, 3));