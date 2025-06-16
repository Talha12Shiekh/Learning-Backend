require("dotenv").config();
const express = require("express");
const productsRouter = require("./routes/product-route");
const quotesRouter = require("./routes/quote-route");
const userRouter = require("./routes/user-route");
const app = express();

const server = require('http').createServer(app);
const io = require('socket.io')(server);

const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

// Routes
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static(path.resolve(__dirname, process.env.PUBLIC_DIR)));
app.use("/products", productsRouter.exportrouter);
app.use("/users", userRouter.exportrouter);
app.use("/quotes", quotesRouter.exportrouter);
app.use("/*splat", (req, res) => {
  res.sendFile(path.resolve(__dirname, process.env.PUBLIC_DIR, "index.html"), (er) => {
    console.log(er);
  });
});

io.on('connection', (socket) => {
  console.log(socket.id);

  socket.on("msg", (data) => {
    console.log({ data });
  });

  setTimeout(() => {
    socket.emit("serverMsg", { server: "hi" })
  }, 4000);
});

// mongodb://localhost:27017/
// db connectors
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.DB_URL);
  console.log("Connected Successfully! ");
}

server.listen(process.env.PORT, () => {
  console.log("Server listening at the port 8080");
});
