const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema ({
  username: String,
  password: String,
  googleId: String,
  email: String
})

mongoose.model('users', userSchema);
