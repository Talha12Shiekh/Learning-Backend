const express = require('express')
const app = express()
const port = 3000
const main = require("./mongoose");
const passport = require("passport");
var LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const { User } = require('./user');

main().catch(err => console.log(err));



app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(require("body-parser").urlencoded({ extended: true }));
app.use(express.json());


passport.use(new LocalStrategy(
    async function (username, password, done) {

        try {
            let user = await User.findOne({ username: username });
            if (!user) { return done(null, false, { message: "Incorrect username !" }); }
            if (user.password != password) { return done(null, false, { message: "Incorrect password !" }); }
            return done(null, user);
        } catch (err) {
            if (err) { return done(err); }
        }

    }
));

passport.serializeUser((user, done) => {
    if (user) {
        return done(null, user.id);
    }
    return done(null, false);
});

passport.deserializeUser(async (id, done) => {
    try {
        let usr = await User.findById(id);
        return done(null, usr);
    } catch (error) {
        return done(null, false);
    }
});

function isAuthenticated(req, res, next) {
    if (req.user) {
        return next();
    }
    return res.redirect("/");
}

app.post("/logout", (req, res, next) => {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect('/');
        console.log("user logged out");
    });
})

app.get("/login", (req, res) => {
    res.send("Login page");
});

app.get("/test", isAuthenticated, (req, res) => {
    res.send("Testing");
});

app.post("/register", async (req, res, next) => {
    const { username, email, password } = req.body;
    try {
        let usr = await User.findOne({ username });
        if (usr) return res.redirect("/");
        let newuser = new User({ username, email, password });
        await newuser.save();

        return next(null,newuser);
    } catch (error) {
        return next(null,false);
    }
}, passport.authenticate('local', { failureRedirect: '/login', failureMessage: true }), (req, res) => {
    return res.json(req.user);
})

app.post('/login',
    passport.authenticate('local', { failureRedirect: '/login', failureMessage: true }),
    function (req, res) {
        res.json(req.user);
    });

app.get("/", (req, res) => {
    res.send("Home page");
})

app.listen(port, () => {
    console.log("---------------------------------");
    console.log(`Example app listening on port ${port}`)
})