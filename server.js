var express = require('express'),
  app = express(),
  port = process.env.PORT || 8005,
  mongoose = require('mongoose'),
  moment = require('moment'),
  Vehicle = require('./api/models/vehicleModel'), //created model loading here
  User = require('./api/models/userModel'),
  Usage = require('./api/models/usageModel'),
  Role = require('./api/models/roleModel'),
  Category = require('./api/models/categoryModel'),
  bodyParser = require('body-parser')
  jsonwebtoken = require("jsonwebtoken");
  
// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/ppe5', {useNewUrlParser: true});
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
var db = mongoose.connection; 
db.on('error', console.error.bind(console, 'Erreur lors de la connexion')); 
db.once('open', function (){
    console.log("Connexion à la base OK"); 
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  if (req.method === "OPTIONS") {
    console.log("!OPTIONS");
    res.end();
  }
  next();
});

app.use(function(req, res, next){
  if(req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT'){
    jsonwebtoken.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIs', function(err, decode){
      if(err) req.user = undefined;
      req.user = decode;
      next();
    });
  }else{
    req.user = undefined;
    next();
  }
});

var routes = require('./api/routes/vehicleRoutes'); //importing route
routes(app); //register the route

app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});

app.listen(port);

console.log('ppe2 REST API server started on: ' + port);

module.exports = app;