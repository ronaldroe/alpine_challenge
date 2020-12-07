const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  first_name: String,
  last_name: String,
  email: {type: String, unique: true},
  password: String,
  user_level: {type: Number, default: 0}
});

module.exports = mongoose.model('User', userSchema);