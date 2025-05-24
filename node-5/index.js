const express = require("express");
const productsRouter = require("./routes/product-route");
const quotesRouter = require("./routes/quote-route");
const app = express();

app.use(express.json());
app.use("/products", productsRouter.exportrouter);
app.use("/quotes", quotesRouter.exportrouter);

app.listen(8080, () => {
  console.log("Server listening at the port 8080");
});
