const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get('/',
    passport.authenticate('google', {
        scope: ['email', 'profile']
}));

router.get("/success", (req, res) => {
    res.send("Goggle success");
});

router.get("/failure", (req, res) => {
    res.send("Goggle failure");
})

router.get('/callback',
    passport.authenticate('google', {
        successRedirect: '/auth/google/success',
        failureRedirect: '/auth/google/failure'
    }))

exports.goggleAuthRouter = router;