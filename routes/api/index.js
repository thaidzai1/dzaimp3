module.exports = app => {
  app.use('/api', require('./songApi'), require('./playlistApi'));
}
