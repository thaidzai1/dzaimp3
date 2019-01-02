const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const albumSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  poster: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now()
  },
  singer_id: {
    type: Schema.Types.ObjectId,
    required: true
  }
})

albumSchema.methods.getNewAlbums = async function() {
  return await this.model('albums').aggregate([
    {
      $lookup: {
        from: 'singers',
        let: {singer_id: "$singer_id"},
        pipeline: [
          { $match: { $expr: { $eq: ["$_id", "$$singer_id"]}}},
          { $project: { created_at: 0 }}
        ],
        as: 'singer'
      }
    },
    { $unwind: { path: "$singer", preserveNullAndEmptyArrays: true}}
  ])
}

albumSchema.methods.getAlbumDetail = async function(album_id) {
  const id = mongoose.Types.ObjectId(album_id);

  const album = await this.model('albums').aggregate([
    { $match: { _id: { $eq: id}}},
    {
      $lookup: {
        from: 'singers',
        let: {singer_id: "$singer_id"},
        pipeline: [
          {$match: { $expr: { $eq: ["$_id", "$$singer_id"]}}},
          {$project: { created_at: 0}}
        ],
        as: 'singer'
      }
    },
    { $unwind: { path: "$singer", preserveNullAndEmptyArrays: true}},
    { $project: { created_at: 0}}
  ]);
  return album[0];
}

mongoose.model('albums', albumSchema);
