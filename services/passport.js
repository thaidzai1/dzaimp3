const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');

const keys = require('../config/keys');
const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id);
})

passport.deserializeUser( async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
})

passport.use(
  new GoogleStrategy({
    clientID: keys.googleClientId,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback',
    proxy: true
  },
  async (accessToken, refreshToken, profile, done) => {
    console.log(profile);
    const existedUser = await User.findOne({googleId: profile.id});
    if(existedUser){
      // Google User already existed
      return done(null, existedUser);
    }

    const user = await new User({username: profile.displayName, email: profile.emails[0].value, googleId: profile.id}).save();
    return done(null, user);
  }
))
