const fs = require("fs");
const data = JSON.parse(fs.readFileSync("data.json", "utf-8"));
const products = data.products;

exports.getAllProducts = (req, res) => {
  res.status(201).json(products);
};
exports.getProduct = (req, res) => {
  const id = +req.params.id;
  const searchedproduct = products.find((p) => p.id == id);
  res.status(201).json(searchedproduct);
};
exports.createProducts = (req, res) => {
  products.push(req.body);
  res.status(201).json(req.body);
};
exports.replaceProduct = (req, res) => {
  const id = +req.params.id;
  const searchedproductindex = products.findIndex((p) => p.id == id);
  products[searchedproductindex] = { ...req.body, id };
  res.status(201).json({ item: "updated" });
};
exports.updateProduct = (req, res) => {
  const id = +req.params.id;
  const searchedproductindex = products.findIndex((p) => p.id == id);
  const findedproduct = products[searchedproductindex];
  products[searchedproductindex] = { ...findedproduct, ...req.body };
  res.status(201).json({ item: "pathced" });
};
exports.deleteProduct = (req, res) => {
  const id = +req.params.id;
  const searchedproductindex = products.findIndex((p) => p.id == id);
  const deletedproduct = products[searchedproductindex];
  products.splice(searchedproductindex, 1);
  res.status(201).json(deletedproduct);
};
