const app = require("express");
const fs = require("fs");

const indexhtml = fs.readFileSync("index.html", "utf-8");
const data = fs.readFileSync("data.json", "utf-8");
const products = JSON.parse(data).products[0];

const server = app();

// server.get("/", (req, res) => {
//   res.setHeader("Content-type", "text/html");
//   res.end(indexhtml);
// });

// server.get("/api", (req, res) => {
//   res.setHeader("Content-type", "application/json");
//   res.send(data);
// });

// server.get('/*splat', (req, res) => {
//   res.send('ok')
// })

server.get("/{*splat}", (req, res) => {

  console.log(req.method);

  if (req.url.startsWith("/product")) {
    const id = req.url.split("/")[2];
    const findedproduct = JSON.parse(data).products.find((p) => p.id === +id);
    res.setHeader("Content-type", "text/html");
    const replacedindex = indexhtml
      .replace("**title**", findedproduct.title)
      .replace("**url**", findedproduct.thumbnail)
      .replace("**price**", findedproduct.price)
      .replace("**rating**", findedproduct.rating);
    res.end(replacedindex);
    return;
  }

  switch (req.url) {
    case "/": {
      console.log("Main Directory");
      res.setHeader("Content-type", "text/html");
      res.end(indexhtml);
      break;
    }
    case "/api": {
      res.setHeader("Content-type", "application/json");
      res.end(data);
      break;
    }
    case "/product": {
      res.setHeader("Content-type", "text/html");
      const replacedindex = indexhtml
        .replace("**title**", products.title)
        .replace("**url**", products.thumbnail)
        .replace("**price**", products.price)
        .replace("**rating**", products.rating);
      res.end(replacedindex);
      break;
    }
    default: {
      console.log("Default");
      res.sendStatus(404);
      res.end();
    }
  }
});

server.listen(8080, () => {
  console.log("Server started");
});
