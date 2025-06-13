require("dotenv").config();
const express = require("express");
const usersRouter = require("./routes/user-route");
const {
  signUp,
  login
} = require("./controller/auth-controller");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
var jwt = require('jsonwebtoken');
const fs = require("fs");

const publickey = fs.readFileSync(path.resolve(__dirname,"./public.key"),"utf-8");

const auth = (req, res, next) => {
  try {
    const token = req.get("Authorization").split("Bearer ")[1];
    let decoded = jwt.verify(token, publickey);
    if (decoded.email) {
      next();
    } else {
      res.sendStatus(401);
    }
  } catch (error) {
    res.sendStatus(401);

  }
};

// Routes
app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, process.env.PUBLIC_DIR)));
app.use("/users", auth, usersRouter.exportrouter);
app.post("/auth/signup", signUp);
app.post("/auth/login", login);
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
