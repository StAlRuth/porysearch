var fs = require('fs');

var data = JSON.parse(fs.readFileSync('app/rawdata/move.poke','utf-8'));

var machines = [];
var tm = new Array(100);
var hm = new Array(6);

for(var i = 0; i < data.length; i++) {
  if(data[i].tm.toString().charAt(0) === 'T') {
    tm[Number(data[i].tm.substr(2)) - 1] = data[i]["name"];
  } else if (data[i].tm.toString().charAt(0) === 'H') {
    hm[Number(data[i].tm.substr(2)) - 1] = data[i]["name"];
  }
}

for(var i = 0; i < tm.length; i++) {
  machines.push({"name":"TM"+(i+1),"move":tm[i]});
}

for(var i = 0; i < hm.length; i++) {
  machines.push({"name":"HM"+(i+1),"move":hm[i]});
}

console.log(JSON.stringify(machines));
