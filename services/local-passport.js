const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
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
  {usernameField: 'email', passwordField: 'password'},
  new LocalStrategy(async (email, password) => {
    const user = await User.findOne({email: email});
    if(user.comparePassword(password)) {
      return done(null, user);
    }
    else {
      return res.status(404).json({
        message: 'user not existed'
      })
    }
  })
)
