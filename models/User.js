const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const userSchema = new Schema ({
  username: String,
  password: {
    type: String,
    default: null
  },
  googleId: String,
  email: String,
  authorize: {
    type: Number,
    default: 0,
  }
})

userSchema.methods.hashPassword = async password => {
  let salt = await bcrypt.genSalt(10);
  let hashed = await bcrypt.hash(password, salt);
  return hashed;
}

userSchema.methods.validatePassword = function(password) {
  return bcrypt.compareSync(password, this.password);
}

mongoose.model('users', userSchema);
