require("dotenv").config();
const express = require("express");
const productsRouter = require("./routes/product-route");
const quotesRouter = require("./routes/quote-route");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

// Routes
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static(path.resolve(__dirname,process.env.PUBLIC_DIR)));
app.use("/products", productsRouter.exportrouter);
app.use("/quotes", quotesRouter.exportrouter);
app.use("/*splat", (req, res) => {
  res.sendFile(path.resolve(__dirname, process.env.PUBLIC_DIR, "index.html"), (er) => {
    console.log(er);
  });
})

// mongodb://localhost:27017/
// db connectors
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.DB_URL);
  console.log("Connected Successfully! ");
}

app.listen(process.env.PORT, () => {
  console.log("Server listening at the port 8080");
});
