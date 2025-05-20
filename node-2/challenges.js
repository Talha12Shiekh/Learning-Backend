// Assignment 2 : In the chapter we developed a server with only URL switch, but you have to make that more efficient by making it check both METHOD (GET,POST) + URL path
// So output of a request with GET /demo will be different from POST /demo [ Use POSTMAN for requests]

// const express = require("express");

// const app = express();

// app.all('/{*splat}', (req, res) => {
//   if(req.method === "GET"){
//     res.send("<h1>Get request</h1>");
//   }else if(req.method === "POST"){
//     res.send("<h1>POST request</h1>");
//   }else {
//     res.status(404);
//     res.end();
//   }
// });

// app.listen(8080,() => {
//     console.log("Server started");
// })

// const express = require("express");

// const app = express();

// app.get("/",(req,res) => {
//     res.send("Hello world");
// })

// app.listen(process.argv[3] || 8080,() => {
//     console.log("Server 1 started");
// });

// app.listen(process.argv[2] || 8081,() => {
//     console.log("Server 2 started");
// });

const express = require("express");
const fs = require("fs");

const indexhtml = fs.readFileSync("index.html", "utf-8");
const data = fs.readFileSync("data.json", "utf-8");

const app = express();

app.get("/demo", (req, res) => {
  let { product } = req.query;
  const id = +product;
  if (id > 30 || id < 0) {
    res
      .status(404)
      .send("<h1 style='text-align:center'>Such product does not exists</h1>");
    return;
  }

  const findedproduct = JSON.parse(data).products.find((p) => p.id === +id);
  res.setHeader("Content-type", "text/html");
  const replacedindex = indexhtml
    .replace("**title**", findedproduct.title)
    .replace("**url**", findedproduct.thumbnail)
    .replace("**price**", findedproduct.price)
    .replace("**rating**", findedproduct.rating);
  res.send(replacedindex);
});

app.listen(8080, () => {
  console.log("Server started successully !");
});
