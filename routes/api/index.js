module.exports = app => {
  app.use('/api',
    require('./songApi'),
    require('./playlistApi'),
    require('./singerApi'),
    require('./albumApi')
  );
}
