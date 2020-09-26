var passport = require("passport");
var GoogleStrategy = require("passport-google-oauth20");
require("dotenv").config();
const User = require("../models/User");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/cb",
      proxy: true
    },
    (access_token, refresh_token, profile, done) => {
      User.findOne({ gauth_token: profile.id }).then((user) => {
        if (user) {
          // user already there
        //   console.log(user);
          done(null, user);
        } else {
          new User({
            name: profile.displayName,
            email: profile.emails[0].value,
            password: "",
            gauth_token: profile.id,
          })
            .save()
            .then((newUser) => {
            //   console.log(newUser);
              done(null, newUser);
            });
        }
      });
    }
  )
);
