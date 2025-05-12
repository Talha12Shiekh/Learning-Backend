// import { sum, diff } from "./lib.js";
// const { sum, diff } = require("./lib");

// const fs = require("fs");
const express = require("express");

// const t1 = performance.now();

// // const text = fs.readFileSync("demo.txt", "utf-8");
// fs.readFile("demo.txt", "utf-8", (err, txt) => {
//   console.log(txt);
// });

// // console.log(text);
// const t2 = performance.now();

// console.log(sum(4, 5), diff(9, 5));

// console.log("Time taken: ", t2 - t1);

console.log("Hello");

const server = express();
server.listen(8080);
