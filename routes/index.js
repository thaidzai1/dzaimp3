//group routes
module.exports = app => {
  //authentication
  app.use('/auth', require('./authRoutes'))
  app.use('/api', require('./api/songApi'))
}
