const router = require('express').Router();
const mongoose = require('mongoose');

const albumMiddleware = require('../../middleware/albumMiddleware');
const Album = mongoose.model('albums');
const Song = mongoose.model('songs');

router.get('/newalbum', async (req, res) => {
  const album = await Album().getNewAlbums();

  return res.status(200).json(album);
})

router.get('/album/:album_id', async (req, res) => {
  const { album_id } = req.params;
  const album = await Album().getAlbumDetail(album_id);

  if(!album) {
    return res.status(404).json();
  }
  return res.status(200).json(album);
})

router.get('/album/song/:album_id', async (req, res) => {
  const { album_id } = req.params;
  const songs = await Song().findSongs({album_id: album_id});

  if(!songs) {
    return res.status(404).json();
  }
  return res.status(200).json(songs);
})

router.post('/album', albumMiddleware.createAlbum, async (req, res) => {
  const { name, poster,  singer_id } = req.body;
  let album;
  try {
    album = await new Album({ name, poster, singer_id }).save();
    return res.status(200).json(album);
  }
  catch(err) {
    return res.status(400).json(err.message);
  }
})

router.put('/album/:album_id', async (req, res) => {
  const { album_id } = req.params;
  const { name, singer_id, poster} = req.body;

  let album = await Album.findById(album_id);
  album.name = name;
  album.singer_id = singer_id;
  album.poster = poster;
  album.save();

  return res.status(200).json(album);
})

module.exports = router;
