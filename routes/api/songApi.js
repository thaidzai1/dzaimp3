const router = require('express').Router();
const mongoose = require('mongoose');
const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const { dir } = req.body;
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  }
})

const fileFilter = (req, file, cb) => {
  console.log('hihi')
}

const upload = multer({
  storage: storage,
  limit: {
    fileSize: 1024 * 1024 * 15
  },
  // fileFilter
})

const songMiddleware = require('../../middleware/songMiddleware');

const Song = mongoose.model('songs');

router.get('/song/new', async (req, res) => {
  const songs = await Song.find({}).sort({created_at: -1}).limit(12);

  res.status(200).json(songs);
})

router.post('/upload/file',
  upload.single('file'),
  (req, res) => {
    res.json(req.body);
  }
)

router.get('/song/:id', async (req, res) => {
  const song = await Song.findById(req.params.id);
  if(song !== null) {
    res.status(200).json(song);
  }
  else {
    res.status(404).json({message: 'Not found song'})
  }
})

router.put('/song/:id', async (req, res) => {
  const { songName, singer, poster, audio, song_image } = req.body;
  let song = await Song.findById(req.params.id);

  if(song !== null) {
    song.songName = songName;
    song.singer = singer;
    song.poster = poster;
    song.audio = audio;
    song.song_image = song_image;
    song.save();
    res.status(200).json(song);
  }
  else {
    res.status(404).json({message: 'song not found'});
  }
})

router.post('/song', songMiddleware.validateSong, async (req, res) => {
  const { songName, singer, poster, audio, song_image } = req.body;
  const newSong = await new Song({ songName, singer, poster, audio, song_image }).save();

  res.status(200).json(newSong);
})

router.post('/test', (req, res) => {
  console.log(req.body);
})

module.exports = router;
