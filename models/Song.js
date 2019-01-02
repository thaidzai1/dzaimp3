const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const songSchema = new Schema({
  songName: {
    type: String,
    required: true
  },
  poster: {
    type: String,
    required: true
  },
  audio: {
    type: String,
    required: true
  },
  song_image: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  singer_id: {
    type: Schema.Types.ObjectId,
    required: true
  },
  album_id: {
    type: Schema.Types.ObjectId,
    required: true
  }
})

songSchema.methods.findSongById = async function(song_id) {
  song_id = mongoose.Types.ObjectId(song_id);
  const song = await this.model('songs').aggregate([
    { $match: {"_id": song_id}},
    {
      $lookup: {
        from: 'singers',
        let: {singer_id: "$singer_id"},
        pipeline: [
          { $match: { $expr: { $eq: ["$_id", "$$singer_id"]}}},
          { $project: { created_at: 0}}
        ],
        as: "singer"
      }
    },
    { $unwind: "$singer" },
    {
      $lookup: {
        from: 'albums',
        let: {album_id: "$album_id"},
        pipeline: [
          { $match: { $expr: { $eq: ["$_id", "$$album_id"]}}},
          { $project: {created_at: 0}}
        ],
        as: "album"
      }
    },
    { $unwind: "$album"}
  ]);

  return song;
}

songSchema.methods.getSongs = async function(limit=null, sort=1, sortDocument='created_at') {
  if(!limit) {
    limit = await this.model('songs').count();
  }

  let sortQuery = {};
  sortQuery[sortDocument] = sort;

  const song = await this.model('songs').aggregate([
    {
      $lookup: {
        from: 'singers',
        let: {singer_id: "$singer_id"},
        pipeline: [
          { $match: { $expr: { $eq: ["$_id", "$$singer_id"]}}},
          { $project: { created_at: 0}}
        ],
        as: "singer"
      }
    },
    { $unwind: "$singer"},
    {
      $lookup: {
        from: 'albums',
        let: {album_id: "$album_id"},
        pipeline: [
          { $match: { $expr: { $eq: ["$_id", "$$album_id"]}}},
          { $project: {created_at: 0}}
        ],
        as: "album"
      }
    },
    { $unwind: "$album"},
    { $sort: sortQuery},
    { $limit: limit}
  ]);

  return song;
}

songSchema.methods.limitSong = function(limit) {
  return this.limit(limit);
}

songSchema.methods.findSongs = async function(obj) {
  const props = Object.keys(obj);
  const id = mongoose.Types.ObjectId(obj[props[0]]);

  return await this.model('songs').aggregate([
    { $match: { $expr: { $eq: [`$${props[0]}`, id]}}},
    {
      $lookup: {
        from: 'singers',
        let: {singer_id: "$singer_id"},
        pipeline: [
          { $match: { $expr: { $eq: ["$_id", "$$singer_id"]}}},
          { $project: { created_at: 0}}
        ],
        as: 'singer'
      }
    },
    {
      $lookup: {
        from: 'albums',
        let: {album_id: "$album_id"},
        pipeline: [
          { $match: { $expr: { $eq: ["$_id", "$$album_id"]}}},
          { $project: { created_at: 0}}
        ],
        as: 'album'
      }
    },
    { $unwind: { path: '$singer', preserveNullAndEmptyArrays: true}},
    { $unwind: { path: '$album', preserveNullAndEmptyArrays: true}}
  ])
}

mongoose.model('songs', songSchema);
