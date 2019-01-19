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
      added_at: Date
    }
  ]
})

const playlistSchema = new Schema({
  user_id: Schema.Types.ObjectId,
  list: Array(listSchema)
})

playlistSchema.methods.getUserPlaylists = async function(id, playlist_id = null) {
  let user_id = mongoose.Types.ObjectId(id);
  let playlist = mongoose.Types.ObjectId(playlist_id);
  let query = { $project: { list: 1, user_id: 1}};

  if(playlist_id !== null) {
    query = {
      $project: {
        list: { 
          $filter: {
            input: "$list", 
            as: "list", 
            cond: { $eq: ["$$list._id", playlist]}
          }
        }, 
        user_id: 1
      }
    };
  }

  let result = await this.model('playlists').aggregate([
    { $match: { user_id: user_id}},
    query,
    { $unwind: { path: "$list", preserveNullAndEmptyArrays: true}},
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
    // {$sort: { "list.songs.added_at": -1}},
    {
      $group: {
        _id: { _id: "$user_id", list_id: "$list._id", list_name: "$list.list_name"},
        songs: {
          $push: {
            $cond: {
              if: { $gt: [ "$list.songs", {} ]},
              then: "$list.songs",
              else: "$noval"
            }
          }
        }
      }
    },
    // {
    //   $group: {
    //     _id: { _id: "$user_id", list_id: "$list._id", list_name: "$list.list_name"},
    //     songs: {
    //       $addToSet: {
    //         $cond: {
    //           if: { $gt: [ "$list.songs", {} ]},
    //           then: "$list.songs",
    //           else: "$noval"
    //         }
    //       }
    //     }
    //   }
    // },
    {  $group: {
        _id: "$_id._id",
        list: {
          $push: {
            _id: "$_id.list_id", list_name: "$_id.list_name", songs: "$songs"
          }
        }
      }
    },
  ]);

  return result[0];
}

mongoose.model('playlists', playlistSchema);
