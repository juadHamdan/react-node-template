const passport = require("passport")
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const User = require('./models/User')

passport.serializeUser(function (user, done) {
        done(null, user);
});

passport.deserializeUser(function (user, done) {
        done(null, user);
});

passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
        passReqToCallback: true
},
        async (request, accessToken, refreshToken, profile, done) => {
                try {
                        const user = await User.findOne({ uid: profile.id });
                        if (user) {
                                done(null, user);
                        } else {
                                const newUser = new User({
                                        uid: profile.id,
                                        firstName: profile.given_name,
                                        lastName: profile.family_name,
                                        email: profile.email,
                                        picture: profile.picture
                                });
                                await newUser.save();
                                done(null, newUser);
                        }
                } catch (error) {
                        done(error, null);
                }
        }
));