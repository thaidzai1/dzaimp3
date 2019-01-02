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
      _id: Schema.Types.ObjectId
    }
  ]
})

const playlistSchema = new Schema({
  user_id: Schema.Types.ObjectId,
  list: Array(listSchema)
})

playlistSchema.methods.getUserPlaylists = async function(id) {
  let user_id = mongoose.Types.ObjectId(id);

  return await this.model('playlists').aggregate([
    { $match: { user_id: user_id}},
    { $project: { list: 1}},
    { $unwind: "$list"},
    { $unwind: { path: "$list.songs", preserveNullAndEmptyArrays: true}},
    {
      $lookup: {
        from: 'songs',
        let: {song_id: "$list.songs._id"},
        pipeline: [
          { $match: { $expr: { $eq: ["$_id", "$$song_id"]}}},
          { $project: { created_at: 0}}
        ],
        as: 'list.songs'
      },
    },
    { $unwind: { path: "$list.songs", preserveNullAndEmptyArrays: true}},
    {
      $lookup: {
        from: 'singers',
        let: { singer_id: "$list.songs.singer_id"},
        pipeline: [
          { $match: { $expr: { $eq: ["$_id", "$$singer_id"]}}},
          { $project: { created_at: 0}}
        ],
        as: 'list.songs.singer'
      }
    },
    { $unwind: { path: "$list.songs.singer", preserveNullAndEmptyArrays: true}},
    {
      $lookup: {
        from: 'albums',
        let: { album_id: "$list.songs.album_id"},
        pipeline: [
          { $match: { $expr: { $eq: [ "$_id", "$$album_id"]}}},
          { $project: { created_at: 0}}
        ],
        as: 'list.songs.album'
      }
    },
    { $unwind: { path: '$list.songs.album', preserveNullAndEmptyArrays: true}},
    {
      $group: {
        _id: { _id: "$_id", list_id: "$list._id", list_name: "$list.list_name"},
        songs: {
          $addToSet: {
            $cond: {
              if: { $gt: [ "$list.songs", {} ]},
              then: "$list.songs",
              else: "$noval"
            }
          }
        }
      }
    },
    {
      $group: {
        _id: "$_id._id",
        list: {
          $push: {
            _id: "$_id.list_id", list_name: "$_id.list_name", songs: "$songs"
          }
        }
      }
    }
  ]);
}

mongoose.model('playlists', playlistSchema);
