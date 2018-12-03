const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Song = mongoose.model('songs');

const listSchema = new Schema({
  list_name: {
    type: String,
    default: 'Your playlist'
  },
  songs: [
    {
      _id: Schema.Types.ObjectId,
      songName: String,
      singer: String,
      audio: String,
      poster: String
    }
  ]
})

const playlistSchema = new Schema({
  user_id: Schema.Types.ObjectId,
  list: Array(listSchema)
})

const playList = mongoose.model('playlists', playlistSchema);
