const express = require("express");
const { User } = require("./user");
const passport = require("passport");
const router = express.Router();

router.post("/register", async (req, res) => {

    const { username, password } = req.body;

    try {
        let user = await User.findOne({ username });
        if (user) return res.status(409).json({ success: false, message: "User already exists" });

        let newUser = await new User({ username, password }).save();

        return res.status(201).json({ success: true, message: "User created successfully", user: newUser })
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ success: false, message: error.message });
    }
});

router.get("/login", (req, res) => {
    res.send("Login page");
})

// router.post("/login", (req, res, next) => {
// passport.authenticate('local', (err, user, info) => {
//     if (err) return res.status(500).json({ success: false, message: "Something went wrong" });
//     if (!user) return res.status(401).json({ success: false, message: info.message });

//     req.logIn(user, (err) => {
//         if (err) return res.status(500).json({ success: false, message: "Login failed" });
//         return res.status(200).json({ success: true, message: "Logged in successfully", user });
//     });
// })(req, res, next);

// });

router.post("/login", passport.authenticate("local", { failureRedirect: "/auth/login" }), (req, res) => {
    res.redirect("/");
});

router.get("/logout", (req, res,next) => {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
})

module.exports = router;