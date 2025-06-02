const express = require("express");
const productsRouter = require("./routes/product-route");
const quotesRouter = require("./routes/quote-route");
const app = express();
const mongoose = require("mongoose");

// Routes
app.use(express.json());
app.use("/products", productsRouter.exportrouter);
app.use("/quotes", quotesRouter.exportrouter);

// mongodb://localhost:27017/
// db connectors
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/ecommerce");
  console.log("Connected Successfully! ");
}

app.listen(8080, () => {
  console.log("Server listening at the port 8080");
});
