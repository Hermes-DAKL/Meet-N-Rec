var mongoose = require('mongoose');

mongoURI = process.env.MONGOLAB_URI || 'mongodb://localhost/meetrekt';

mongoose.connect(mongoURI);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Mongo Connection Initialized');
});

module.exports = db;