//group routes
module.exports = app => {
  //authentication
  app.use('/auth', require('./authRoutes'))
  require('./api')(app);
}
