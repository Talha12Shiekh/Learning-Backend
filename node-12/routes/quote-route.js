const express = require("express");
const {
  getAllQuotes,
  getQuote,
  createQuote,
  replaceQuote,
  updateQuote,
  deleteQuote,
  getAllQuotesSSR
} = require("../controller/quotes-controller");
const router = express.Router();

exports.exportrouter = router
  .get("/", getAllQuotes)
  .get("/ssr", getAllQuotesSSR)
  .get("/:id", getQuote)
  .post("/", createQuote)
  .put("/:id", replaceQuote)
  .patch("/:id", updateQuote)
  .delete("/:id", deleteQuote);
