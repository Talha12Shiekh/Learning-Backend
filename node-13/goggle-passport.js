const { GoggleUser } = require("./GoggleUser");
const passport = require("passport");
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;

// {
//   id: '105463833198282569092',
//   displayName: 'Talha Shiekh',
//   name: { familyName: 'Shiekh', givenName: 'Talha' },
//   emails: [ { value: 'tk.shiekh4567@gmail.com', verified: true } ],
//   photos: [
//     {
//       value: 'https://lh3.googleusercontent.com/a/ACg8ocI6GHOBmFUFEvDxZmkWYuveUUWmG5WQV808sGxHx7jgNTu-LnM=s96-c'
//     }
//   ],
//   provider: 'google',
//   _raw: '{\n' +
//     '  "sub": "105463833198282569092",\n' +
//     '  "name": "Talha Shiekh",\n' +
//     '  "given_name": "Talha",\n' +
//     '  "family_name": "Shiekh",\n' +
//     '  "picture": "https://lh3.googleusercontent.com/a/ACg8ocI6GHOBmFUFEvDxZmkWYuveUUWmG5WQV808sGxHx7jgNTu-LnM\\u003ds96-c",\n' +
//     '  "email": "tk.shiekh4567@gmail.com",\n' +
//     '  "email_verified": true\n' +
//     '}',
//   _json: {
//     sub: '105463833198282569092',
//     name: 'Talha Shiekh',
//     given_name: 'Talha',
//     family_name: 'Shiekh',
//     picture: 'https://lh3.googleusercontent.com/a/ACg8ocI6GHOBmFUFEvDxZmkWYuveUUWmG5WQV808sGxHx7jgNTu-LnM=s96-c',
//     picture: 'https://lh3.googleusercontent.com/a/ACg8ocI6GHOBmFUFEvDxZmkWYuveUUWmG5WQV808sGxHx7jgNTu-LnM=s96-c',
//     email: 'tk.shiekh4567@gmail.com',
//     email_verified: true
//   }
//   }


exports.connectGoggleAuth = () => {
    passport.use(new GoogleStrategy({
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/auth/google/callback"
    },
        function (accessToken, refreshToken, profile, cb) {

            const { displayName, emails, id, photos } = profile;

            GoggleUser.findOrCreate({
                username: displayName,
                email: emails[0].value,
                googleId: id,
                avatar: photos[0].value
            }, function (err, user) {
                return cb(err, user);
            });
        }
    ));

    passport.serializeUser(function (user, done) {
        console.log("Hello world");
        console.log(user);
        console.log("Bello world");
        done(null, user._id);
    });

    passport.deserializeUser(async function (id, done) {
        try {
            let user = await GoggleUser.findById(id);
            if (user) return done(null, user);
        } catch (error) {
            done(error);
        }
    });
}