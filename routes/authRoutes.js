const router = require('express').Router();
const passport = require('passport');
const mongoose = require('mongoose');

const User = mongoose.model('users');
const playList = mongoose.model('playlists');

router.get('/google', passport.authenticate('google', {scope: ['profile', 'email']}))

router.get('/google/callback', passport.authenticate('google'), (req, res) => {
  res.redirect('/');
})

router.post('/login', passport.authenticate('local'), (req, res) => {
  res.status(200).json(req.user);
})

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
})

router.get('/current_user', (req, res) => {
  if(req.user){
    return res.status(200).json(req.user);
  }

  return res.status(404).json();
})

router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;
  const existedUser = await User.findOne({email: email});
  if(existedUser) {
    if(existedUser.password === null) {
      existedUser.password = await existedUser.hashPassword(password);
      existedUser.save();
      return res.status(200).json({
        message: 'account create successfully'
      });
    }
    else {
      return res.status(200).json({
        message: 'email is existed'
      })
    }
  }
  else {
    const user = new User();
    user.username = username;
    user.email = email;
    user.password = await user.hashPassword(password);
    await user.save();

    const playlist = new playList();
    playlist.user_id = user._id;
    playlist.save();

    return res.status(200).json(null);
  }
})

module.exports = router;
