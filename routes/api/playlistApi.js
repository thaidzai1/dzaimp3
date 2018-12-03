const router = require('express').Router();
const mongoose = require('mongoose');
const playList = mongoose.model('playlists');
const Song = mongoose.model('songs');

const playlistMiddleware = require('../../middleware/playlistMiddleware');

router.get('/playlist/:user_id', async (req, res) => {
  const { user_id } = req.params;

  const playlist = await playList.findOne({user_id: user_id}).select('list -_id');

  return res.status(200).json(playlist);
})

router.put('/playlist/new/:user_id', async (req, res) => {
  const { user_id } = req.params;
  const { list_name } = req.body;
  const playlist = await playList.findOne({user_id: user_id});

  playlist.list.push({list_name});
  await playlist.save();

  return res.status(200).json(playlist.list);
})

router.put('/playlist/addsong/:user_id/:list_id',
  playlistMiddleware.duplicateSong,
  async (req, res) => {
    const { user_id, list_id } = req.params;
    const { song_id } = req.body;
    const playlist = await playList.findOne({user_id: user_id, "list._id": list_id}, {list: {$elemMatch: {_id: list_id}}});

    const song = await Song.findById(song_id).select('-created_at -song_image');
    playlist.list[0].songs.push(song);
    await playlist.save();
    return res.status(200).json(playlist);
  }
)

module.exports = router;
