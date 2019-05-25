'use strict';

var mongoose = require('mongoose'),
    jwt = require('jsonwebtoken'),
    bcrypt = require('bcrypt'),
    User = mongoose.model('user');

exports.register = function(req, res){
    var newUser = new User(req.body);
    newUser.hash_password = bcrypt.hashSync(req.body.password, 10);
    newUser.save(function(err, user) {
        if (err) {
            return res.status(400).send({
                message: err
            });
        } else {
            user.password = undefined;
            return res.json(user);
        }
    });
};

exports.sign_in = function(req, res){
    User.findOne({
        email: req.body.email
    }, function(err, user) {
        if (err) throw err;
        if (!user) {
          res.status(401).json({ message: 'Authentication failed. User not found.' });
        } else if (user) {
          if (!user.comparePassword(req.body.password)) {
            res.status(401).json({ message: 'Authentication failed. Wrong password.' });
          } else {
            return res.json({
                token: jwt.sign({ email: user.email, fullName: user.name, _id: user._id, role: user.role}, 'RESTFULAPIs')
            });
          }
        }
    });
};

exports.loginRequired = function(req, res, next){
    if (req.user) {
        console.log(req.user);
        next();
    } else {
        return res.status(401).json({ message: 'Unauthorized user!' });
    }
};

exports.roleRequired = function(req, res, next){
    if (req.user && req.user.role) {
        next();
    } else {
        return res.status(401).json({ message: 'Unauthorized user!' });
    }
};

exports.list_all_user = function(req, res) {
    User.find({}, function(err, user) {
      if (err)
        res.send(err);
      res.json(user);
    }).populate('role').select();
};

exports.user_by_email = function(req, res) {
    User.findOne({email:req.params.email}, function(err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });
};

exports.update_a_user = function(req, res) {
    User.findOneAndUpdate({_id: req.params.userId}, req.body, {new: true}, function(err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });
};

exports.delete_a_user = function(req, res) {
  User.deleteOne({
  _id: req.params.userId
}, function(err, user) {
  if (err)
    res.send(err);
  res.json({ message: 'user successfully deleted' });
});
};