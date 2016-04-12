var mongoose = require('mongoose');

var eventSchema = mongoose.Schema({
  eventName: String,
  creator: String,
  location: String,
  coord: Mixed,
  imageUrl: String,
  dateCreated: Date,
  dateofEven: Date,
  tags: String
})

var Event = mongoose.model('Event', eventSchema);

module.exports = Event;