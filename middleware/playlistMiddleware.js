const mongoose = require('mongoose');
const playList = mongoose.model('playlists');

module.exports = {
  async duplicateSong(req, res, next) {
    const {user_id, list_id, song_id } = req.params;
    let newsong = mongoose.Types.ObjectId(song_id);
    const playlist = await playList.findOne({user_id: user_id, "list._id": list_id}, {_id: 0, list: {$elemMatch: {_id: list_id}}});

    let duplicated = playlist.list[0].songs.filter(song => song._id.equals(newsong)).length > 0 ? true: false;
    if(duplicated) {
      return res.status(400).json(null);
    }

    next();
  }
}
