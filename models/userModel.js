var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
  },
});
var UserModel = mongoose.model('User', UserSchema);
module.exports = UserModel;
