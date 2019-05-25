'use strict';


var mongoose = require('mongoose'),
  Vehicle = mongoose.model('vehicle');

exports.list_all_vehicles = function(req, res) {
  Vehicle.find({}, function(err, vehicle) {
    if (err)
      res.send(err);
    res.json(vehicle);
  }).populate('category').select();
};




exports.create_a_vehicle = function(req, res) {
  var new_vehicle = new Vehicle(req.body);
  new_vehicle.save(function(err, vehicle) {
    if (err)
      res.send(err);
    res.json(vehicle);
  });
};


exports.read_a_vehicle = function(req, res) {
    Vehicle.findById(req.params.vehicleId, function(err, vehicle) {
    if (err)
      res.send(err);
    res.json(vehicle);
  });
};


exports.update_a_vehicle = function(req, res) {
  Vehicle.findOneAndUpdate({_id: req.params.vehicleId}, req.body, {new: true}, function(err, vehicle) {
    if (err)
      res.send(err);
    res.json(vehicle);
  });
};


exports.delete_a_vehicle = function(req, res) {
  Vehicle.deleteOne({
    _id: req.params.vehicleId
  }, function(err, vehicle) {
    if (err)
      res.send(err);
    res.json({ message: 'Vehicle successfully deleted' });
  });
};
