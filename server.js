var express = require('express');
var app = express();
var db = require('./server/db/config.js');
var bodyParser = require('body-parser');
var eventController = require('./server/db/controllers/eventController.js');
var userController = require('./server/db/controllers/userController.js');
var session = require('express-session');

var User = require ('./server/db/models/user.js');

// Temp Secret. Redo and factor it in config folder.
app.use(session({
  secret: '0c3hnd8n4bs8woJKgywCDdoff93',
  saveUninitialized: true 
}))
app.use(bodyParser.json());


app.get('/', userController.checkUser, function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

// Serve Login Page
app.get('/login', function (req, res) {
  res.sendFile(__dirname + '/login.html');
});

app.post('/signup', userController.signup);
app.post('/signin', userController.signin);

app.get('/api/event', function (req, res) {
  eventController.getEvent(function(events) {
    if (events) {
      res.status(200).send(events);
    } else {
      res.status(404).send('Could not retrieve...');
    }
  });
});


app.post('/api/event', function (req, res) {
  eventController.addEvent(req.body, function (event) {
    if (event) {
      res.status(201).send(event);
    } else {
      res.status(404).send('Did not save');
    }
  });
});

// app.post('/api/user', function (req, res) {
//   eventController.addEvent(req.body, function (event) {
//     if (event) {
//       res.status(201).send(event);
//     } else {
//       res.status(404).send('Did not save');
//     }
//   });
// });



app.get(/^(.+)$/, function (req, res) {
    res.sendFile(__dirname + req.params[0]);
});

var PORT = process.env.PORT || 3000;

app.listen(PORT);
console.log("Listening to port: " + PORT);

