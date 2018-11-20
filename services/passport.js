const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');

const keys = require('../config/keys');
const User = mongoose.model('users');
module.exports = passport => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  })

  passport.deserializeUser( async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
  })

  passport.use(
    new LocalStrategy(
      {usernameField: 'email', passwordField: 'password'},
      async (email, password, done) => {
      const user = await User.findOne({email: email});
      if(user.validatePassword(password)) {
        return done(null, user);
      }
      else {
        return res.status(404).json({
          message: 'user not existed'
        })
      }
    })
  )

  passport.use(
    new GoogleStrategy({
      clientID: keys.googleClientId,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      const existedUser = await User.findOne({googleId: profile.id});
      if(existedUser){
        // Google User already existed
        return done(null, existedUser);
      }

      const existedEmail = await User.findOne({email: profile.emails[0].value});
      if(existedEmail) {
        existedEmail.googleId = profile.id;
        await existedEmail.save();
        return done(null, existedEmail);
      }

      const user = await new User({username: profile.displayName, email: profile.emails[0].value, googleId: profile.id}).save();
      return done(null, user);
    }
  ))
}
