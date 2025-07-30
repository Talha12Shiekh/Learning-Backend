const passport = require("passport");
const { User } = require("./user");
const LocalStrategy = require("passport-local").Strategy;

exports.setupPassport = () => {
    passport.use(new LocalStrategy(
        async function (username, password, done) {
            try {
                let user = await User.findOne({ username });

                if (!user) return done(null, false, { message: "User does not exists" });

                if (user.password != password) return done(null, false, { message: "Wrong user password !" });

                return done(null, user, { message: "User created successfully !" });

            } catch (error) {
                return done(error);
            }

        }
    ));

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(async function (id, done) {
        try {
            let user = await User.findById(id);
            if (user) return done(null, user);
        } catch (error) {
            done(error);
        }
    });
}

exports.isAuhtenticated = (req,res,next) => {
    if(req.user) return next();

    res.redirect("/");
}