const router = require('express').Router();
const passport = require('passport');

router.get('/google', passport.authenticate('google', {scope: ['profile', 'email']}))

router.get('/google/callback', passport.authenticate('google'), (req, res) => {
  res.redirect('/');
})

// router.get('/logout', (req, res) => {
//   req.logout();
//   res.redirect('/');
// })

router.get('/current_user', (req, res) => {
  if(req.user){
    return res.status(200).json(req.user);
  }
})

module.exports = router;
