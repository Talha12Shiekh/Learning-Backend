const EventEmitter = require('node:events');
const fs = require("fs");
const rr = fs.createReadStream("./data.json");


rr.on("data",(data) => {
    console.log({data});
})

const myEmitter = new EventEmitter();

myEmitter.on('demo', (data) => {
  console.log(`Demo event ${JSON.stringify(data)}!`);
});

myEmitter.emit('demo',{name:"talha"});