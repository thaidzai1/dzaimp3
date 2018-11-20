const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const songSchema = new Schema({
  songName: String,
  singer: String,
  poster: String,
  audio: String,
  song_image: String,
  created_at: {
    type: Date,
    default: Date.now
  },
  album_id: Schema.Types.ObjectId
})

mongoose.model('songs', songSchema);
