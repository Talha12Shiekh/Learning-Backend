const { Console } = require("console");
const express = require("express");
const fs = require("fs");

const server = express();

const data = JSON.parse(fs.readFileSync("data.json", "utf-8"));
const products = data.products;

// API - Endpoints - Routes
server.get("/", (req, res) => {
  res.send({ type: "GET" });
});
server.post("/", (req, res) => {
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
