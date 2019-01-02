const router = require('express').Router();
const mongoose = require('mongoose');
const Playlist = mongoose.model('playlists');
const Song = mongoose.model('songs');

const playlistMiddleware = require('../../middleware/playlistMiddleware');

router.get('/playlist/test/:user_id', async (req, res) => {
  const {user_id} = req.params;
  let id = mongoose.Types.ObjectId(user_id);
  const playlist = await Playlist.aggregate([
    { $match: { user_id: id }},
    { $group : { _id: "$_id"}},
    { $limit: 1}
  ])

  return res.json(playlist);
})

router.get('/playlist/:user_id', async (req, res) => {
  const { user_id } = req.params;
  // const playlist = await Playlist.findOne({user_id: user_id}).select('list -_id');
  const playlist = await Playlist().getUserPlaylists(user_id);
  console.log(playlist[0]);
  if(playlist[0].list.length === 1 && playlist[0].list[0]._id === undefined) {
    playlist[0].list.pop();
  }
  return res.status(200).json(playlist[0]);
})

router.put('/playlist/new/:user_id', async (req, res) => {
  const { user_id } = req.params;
  const { list_name } = req.body;
  const playlist = await Playlist.findOne({user_id: user_id});

  playlist.list.push({list_name});
  await playlist.save();

  return res.status(200).json(playlist.list[playlist.list.length - 1]);
})

router.put('/playlist/delete/:user_id/:list_id', async (req, res) => {
  const { user_id, list_id } = req.params;
  const playlist = await Playlist.findOne({user_id: user_id});

  playlist.list.map((item, index) => {
    if(item._id.equals(list_id)) {
      playlist.list.splice(index, 1);
    }
  })
  // await playlist.save();
  return res.status(200).json();
})

router.put('/playlist/addsong/:user_id/:list_id/:song_id',
  playlistMiddleware.duplicateSong,
  async (req, res) => {
    const { user_id, list_id, song_id } = req.params;

    const playlist = await Playlist.findOne({user_id: user_id, "list._id": list_id}, {list: {$elemMatch: {_id: list_id}}});

    const song = await Song().findSongById(song_id);
    playlist.list[0].songs.push(song_id);
    await playlist.save();
    return res.status(200).json({song: song[0], list_id});
  }
)

router.put('/playlist/remove/:user_id/:list_id/:song_id', async (req, res) => {
  const { user_id, list_id, song_id } = req.params;

  const playlist = await Playlist.findOne({user_id: user_id, "list._id": list_id}, {list: {$elemMatch: {_id: list_id}}});
  try{
    playlist.list[0].songs.map((song, index) => {
      if(song._id.equals(song_id)) {
        playlist.list[0].songs.splice(index, 1);
      }
    })
    await playlist.save();
  }
  catch(err) {
    console.log(err);
  }

  return res.status(200).json();
})

module.exports = router;
