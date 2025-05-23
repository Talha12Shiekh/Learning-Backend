const express = require("express");
const fs = require("fs");
const app = express();

const data = JSON.parse(fs.readFileSync("data.json", "utf-8"));
const products = data.products;

app.use(express.json());

app.get("/products", (req, res) => {
  res.status(201).json(products);
});

app.get("/products/:id", (req, res) => {
  const id = +req.params.id;
  const searchedproduct = products.find((p) => p.id == id);
  res.status(201).json(searchedproduct);
});



app.post("/products", (req, res) => {
  console.log(req.body);
  products.push(req.body);
  res.status(201).json(req.body);
});

app.put("/products/:id", (req, res) => {
  const id = +req.params.id;
  const notupdatedproduct = products.find((p) => p.id == id); 
  console.log(notupdatedproduct);
  const searchedproductindex = products.findIndex((p) => p.id == id);

  products[searchedproductindex] = { ...notupdatedproduct,...req.body, id };
  res.status(201).json({ item: "updated" });
});

app.listen(8080, () => {
  console.log("Server listening at the port 8080");
});
