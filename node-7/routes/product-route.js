const express = require("express");
const {
  getAllProducts,
  getProduct,
  createProducts,
  replaceProduct,
  updateProduct,
  deleteProduct,
} = require("../controller/products-controller");
const router = express.Router();

exports.exportrouter = router
  .get("/", getAllProducts)
  .get("/:id", getProduct)
  .post("/", createProducts)
  .put("/:id", replaceProduct)
  .patch("/:id", updateProduct)
  .delete("/:id", deleteProduct);
