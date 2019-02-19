const router = require('express').Router();
const mongoose = require('mongoose');
const path = require('path');
const multer = require('multer');
const axios = require('axios');
const lrcParser = require('lrc-parser');

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

// async function getLyricFromMp3(link) {
//   return new Promise(async function(resolve, reject) {
//     if(link !== null) {
//       const mp3Response = await axios.get(link);
//       let regex = /media\/get-source\?type=audio&key=.{33}/;
//       let match = mp3Response.data.match(regex);
//       console.log(match);
//       if(!match) throw new Error("can't find the resource");
//       const [matchUrl] = match;
//       console.log(matchUrl);
  
//       const mp3SongData = await axios.get(`https://mp3.zing.vn/xhr/${matchUrl}`);
    
//       let lyric = await axios.get(mp3SongData.data.data.lyric);
  
//       let lrcFile = lrcParser(lyric.data).scripts;
//       console.log(lrcFile);
//       resolve(lrcFile);
//     }
//     reject(null);
//   })
// }

router.get('/song/:id', async (req, res) => {
  const { id } = req.params;
  let song_id = mongoose.Types.ObjectId(id);
  const song = await Song().findSongById(song_id);

  if(song) {
    return res.status(200).json(song);
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
  let songEachPage = 12;
  let songs = await Song().getSongs(songEachPage, -1, 'created_at', songEachPage*(page_num -1));
  let songQuantity = await Song.count({});

  return res.status(200).json({songs, songQuantity});
})

router.get('/test', async (req, res) => {
  let songs = await Song().getSongs(10, -1);
  return res.json(songs);
})

module.exports = router;
