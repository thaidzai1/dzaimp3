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
const auth = require('../../middleware/authorization');

const Song = mongoose.model('songs');
const Singer = mongoose.model('singers');
const Album = mongoose.model('albums');

router.get('/song/new', async (req, res) => {
  // const songs = await Song.find({}).sort({created_at: -1}).limit(12);
  const songs = await Song().getSongs(12, -1, 'created_at');
  res.status(200).json(songs);
})

router.post('/song', songMiddleware.createSong, async (req, res) => {
  const { songName, poster, audio, song_image, singer_id, album_id } = req.body;
  let newSong;

  try{
    newSong = await new Song({ songName, poster, audio, song_image, singer_id, album_id }).save();
    res.status(200).json(newSong);
  }
  catch(err) {
    return res.status(400).json(err.message);
  }
})

router.get('/song/:id', async (req, res) => {
  const { id } = req.params;
  let song_id = mongoose.Types.ObjectId(id);
  const song = await Song().findSongById(song_id);

  if(song.length > 0) {
    return res.status(200).json(song[0]);
  }
  return res.status(400).json();
})

router.post('/upload/file',
  auth.admin,
  upload.single('file'),
  (req, res) => {
    res.json(req.body);
  }
)

router.put('/song/:id', songMiddleware.createSong, async (req, res) => {
  const { songName, poster, audio, song_image, singer_id, album_id } = req.body;
  let song = await Song.findById(req.params.id);

  if(song !== null) {
    song.songName = songName;
    song.poster = poster;
    song.audio = audio;
    song.song_image = song_image;
    song.singer_id = singer_id;
    song.album_id = album_id;
    song.save();
    res.status(200).json(song);
  }
  else {
    res.status(404).json({message: 'song not found'});
  }
})

router.get('/allsongs/:page_num', async (req, res) => {
  const { page_num } = req.params;
  console.log(page_num);
  let songs = await Song.find({}).sort({created_at: -1}).skip(2*(page_num-1)).limit(2);

  return res.status(200).json(songs);
})

module.exports = router;
