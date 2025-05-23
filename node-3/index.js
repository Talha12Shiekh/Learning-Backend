const express = require("express");
const fs = require("fs");
const morgan = require("morgan");

const server = express();

const data = JSON.parse(fs.readFileSync("data.json", "utf-8"));
const products = data.products;

// MIDDLEWEARS

server.use(express.json());
server.use(morgan("default"));
server.use(express.static("public"));


// server.use((req, res, next) => {
//   // console.log("In the first middlewear");

//   // console.log(req.method, req.ip, req.hostname);
//   // console.log(req.get("User-Agent"));
//   // console.log("going to the second middlewear");
//   next();
// });



const auth = (req, res, next) => {
  // console.log("inside the second middlewear");

  // if (req.query.password == "123") {
  //   next();
  // } else {
  //   res.sendStatus(401);
  // }
  next();

  // console.log("second middlewear finished");
};

// API - Endpoints - Routes
server.get("/", auth, (req, res) => {
  // console.log("Sended request");
  res.send({ type: "GET" });
  // console.log("Finished request");
});
server.get("/product/:id",auth,(req,res) => {
  res.send({type:`PRODUCT with id = ${req.params.id}`});
})
server.post("/",auth, (req, res) => {
  res.send({ type: "POST" });
});
server.delete("/", (req, res) => {
  res.send({ type: "DELETE" });
});
server.patch("/", (req, res) => {
  res.send({ type: "PATCH" });
});
server.put("/", (req, res) => {
  res.send({ type: "PUT" });
});

server.get("/demo", (req, res) => {
  //   res.send("<h1>hello world</h1>");
  //   res.sendFile("C:\\Users\\786\\Documents\\LEARNING-NODE\\node-3\\index.html");
  //   res.json(products);
  //   res.sendStatus(404);
  res.status(201).send(products);
});

server.listen(8080, () => {
  console.log("Server started");
});
