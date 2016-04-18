var User = require ('../models/user.js');
var path = require('path');
var session = require('express-session');


exports.signup = function(req, res, next) {

  if (!req.body.emailAddress || !req.body.password ) {
    return res.status(422).send({ error: 'You must provide email and password' });
  }

  // See if a user with the given email exists
  User.findOne({ emailAddress: req.body.emailAddress }, function(err, existingUser) {
    if (err) {
      return next(err);
    }
    // If a user with email does exist, return an error
    if (existingUser) {
      return res.status(422).send({ error: 'Email is in use' });
    }

    // Else create and save user and email
    req.body.eventsAttending = [];
    var user = new User(req.body);
    user.save(function(err) {
      if (err) {
        return next(err);
      }
      // Response to request indicating the user was created
    }).then(function(newUser) {
        return req.session.regenerate(function() {
          req.session.user = newUser;
          res.send({redirect: '/'});
        });
    });

  });

};


exports.signin = function(req, res, callback) {
  User.findOne({ emailAddress: req.body.emailAddress}, function(err, foundUser) {

  if (err) { return callback(err); }
  if (!foundUser) {return callback(null, false); }

  foundUser.comparePassword(req.body.password, function(err, isMatch) {
    if (err) { return callback(err); }
    if (!isMatch) { return callback(null, false); } 
      return req.session.regenerate(function() {
//        console.log("uC:51 - This is your cookie: " + JSON.stringify(req.session));
        req.session.user = foundUser;
        res.send({redirect: '/'});
      });
    });
  });
}

exports.addEvent = function(req, res, callback) {
  User.findOne({ emailAddress: req.session.user.emailAddress }, function(err, foundUser) {
      foundUser.eventsAttending.push(req.body.eventID);
      foundUser.save();
  });
}

// exports.getEvent = function (req, res, callback) {
//   User.findOne({ emailAddress: req.session.emailAddress }, function(err, data) {
//     if (err) {
//       return callback(false);
//     } else {
//       return callback(data);
//     }
//   })
// }

exports.removeEvent = function(req, res, callback) {
  User.findOne({ emailAddress: req.session.user.emailAddress }, function(err, foundUser) {
      foundUser.eventsAttending.splice(foundUser.eventsAttending.indexOf(req.body.eventID), 1);
      foundUser.save();
  });
}

//               {$push: {eventsAttending: req.body.eventID}}, callback);
// }

var isLoggedIn = function(req) {
  return req.session ? !!req.session.user : false;
};

exports.checkUser = function(req, res, next){
  if (!isLoggedIn(req)) {
     res.redirect('/login');
  } else {
    next();
  }
};

exports.createSession = function(req, res, newUser) {
  return req.session.regenerate(function() {
      req.session.user = newUser;
      res.redirect('/index.html');
    });
};