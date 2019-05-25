'use strict';
var moment = require("moment");

var mongoose = require('mongoose'),
  Usage = mongoose.model('usage'),
  Vehicle = mongoose.model('vehicle');

exports.list_all_usages = function(req, res) {
  Usage.find({}, function(err, usage) {
    if (err)
      res.send(err);
    res.json(usage);
  }).populate('vehicle').populate('user').select();
};




exports.create_a_usage = function(req, res) {
  var new_usage = new Usage(req.body);
  new_usage.save(function(err, usage) {
    if (err)
      res.send(err);
    res.json(usage);
  });
};


exports.read_a_usage = function(req, res) {
    Usage.findById(req.params.usageId, function(err, usage) {
    if (err)
      res.send(err);
    res.json(usage);
  });
};


exports.update_a_usage = function(req, res) {
    Usage.findOneAndUpdate({_id: req.params.usageId}, req.body, {new: true}, function(err, usage) {
    if (err)
      res.send(err);
    res.json(usage);
  });
};


exports.delete_a_usage = function(req, res) {
    Usage.deleteOne({
    _id: req.params.usageId
  }, function(err, usage) {
    if (err)
      res.send(err);
    res.json({ message: 'usage successfully deleted' });
  });
};

exports.list_usages_futur = function(req, res) {
  Usage.find({
    start:{$gte:moment()}
  }, function(err, usage) {
    if (err)
      res.send(err);
    res.json(usage);
  }).populate('vehicle').populate('user').select();
};

exports.list_vehicle_available = function(req, res){
    Vehicle.find({},function(err, vehicles){
      if (err)
        res.send(err);

      Usage.find({$or:[
        {start:{$gte:moment(req.params.start), $lte:moment(req.params.end)}},
        {end:{$gte:moment(req.params.start), $lte:moment(req.params.end)}},
        {start:{$lte:moment(req.params.start)},end:{$gte:moment(req.params.end)}}
      ]},function(err, usages){
        if (err)
          res.send(err);
        
        usages.forEach((e)=>{
          
          // console.log(vehicles.findIndex(ele => ele._id === e.vehicle._id))
          let index = vehicles.map(function(el){return el.registration;}).indexOf(e.vehicle.registration);
          if(index >= 0){
            vehicles.splice( index,1);
          }
        });
        res.json(vehicles);
      }).select("vehicle").populate('vehicle').select();
    });
    
    
}

// {$or:[
//   {start:{$gte:moment(req.params.end).toDate()}},
//   {end:{$lte:moment(req.params.start).toDate()}}
// ]}