const fs = require("fs");
const path = require("path");
const data = JSON.parse(fs.readFileSync(path.resolve(__dirname,"quotes.json"), "utf-8"));
const quotes = data.quotes;

exports.getAllQuotes = (req, res) => {
  res.status(201).json(quotes);
};
exports.getQuote = (req, res) => {
  const id = +req.params.id;
  const searchquote = quotes.find((p) => p.id == id);
  res.status(201).json(searchquote);
};
exports.createQuote = (req, res) => {
  quotes.push(req.body);
  res.status(201).json(req.body);
};
exports.replaceQuote = (req, res) => {
  const id = +req.params.id;
  const srchqteindex = quotes.findIndex((p) => p.id == id);
  quotes[srchqteindex] = { ...req.body, id };
  res.status(201).json({ item: "updated" });
};
exports.updateQuote = (req, res) => {
  const id = +req.params.id;
  const srchqteindex = quotes.findIndex((p) => p.id == id);
  const findedquote = quotes[srchqteindex];
  quotes[srchqteindex] = { ...findedquote, ...req.body };
  res.status(201).json({ item: "pathced" });
};
exports.deleteQuote = (req, res) => {
  const id = +req.params.id;
  const srchqteindex = quotes.findIndex((p) => p.id == id);
  const deletedquote = quotes[srchqteindex];
  quotes.splice(srchqteindex, 1);
  res.status(201).json(deletedquote);
};
