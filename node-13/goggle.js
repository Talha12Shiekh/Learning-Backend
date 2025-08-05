require('dotenv').config()
const express = require("express");
const app = express();
const port = 3000;
const { connectToMongoose } = require("./mongoose")
const session = require("express-session");
const { connectGoggleAuth, isAuhtenticated } = require('./goggle-passport');
const {goggleAuthRouter} = require("./goggleAuthRouter");
const passport = require("passport");
const cors = require('cors')

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 60000 }
}));

app.use(passport.initialize())
app.use(passport.session())
app.use(express.json());
app.use(cors());


connectToMongoose();
connectGoggleAuth();

app.use("/auth/google",goggleAuthRouter);
app.get("/dashboard",isAuhtenticated,(req,res) => {
    res.json(req.user);
});
app.get("/",isAuhtenticated,(req,res) => {
    res.send("Home page");
})
// http://localhost:3000/auth/google/callback

app.listen(port, () => {
    console.log("---------------------------------")
    console.log(`Sample app listening on port ${port}`);
})
