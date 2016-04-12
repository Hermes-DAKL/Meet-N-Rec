var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  eventsCreated: String,
  eventsAttending: String,
  imageUrl: String,
  emailAddress: String
})

var User = mongoose.model('User', userSchema);

module.exports = User;
