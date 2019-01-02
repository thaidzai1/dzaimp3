const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const singerSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  nationality: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now()
  }
})

mongoose.model('singers', singerSchema);
