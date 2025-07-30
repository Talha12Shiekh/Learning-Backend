const express = require("express");
const { connectToMongoose } = require("./mongoose");
const { setupPassport,isAuhtenticated } = require("./passport")
const passport = require("passport");
const app = express();
const port = 3000;
const session = require("express-session");
const authRouter = require("./authRouter");

connectToMongoose();
setupPassport();

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 60000 }
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());

app.use("/auth",authRouter);
app.get("/",(req,res) => {
    res.send("Home page");
});
app.get("/profile",isAuhtenticated,(req,res,next) => {
    res.json(req.user);
})

app.listen(port, () => {
    console.log("---------------------------------")
    console.log(`Sample app listening on port ${port}`);
})