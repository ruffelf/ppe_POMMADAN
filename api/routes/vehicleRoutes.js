'use strict';
module.exports = function(app) {
  var vehicle = require('../controllers/vehicleController'),
  userHandlers = require('../controllers/userController'),
  category = require('../controllers/categoryController'),
  role = require('../controllers/roleController'),
  usage = require('../controllers/usageController');

  // vehicle Routes
  app.route('/vehicles')
    .get(vehicle.list_all_vehicles)
    .post(userHandlers.loginRequired, vehicle.create_a_vehicle);

  app.route('/vehicles/:vehicleId')
    .get(vehicle.read_a_vehicle)
    .put(userHandlers.loginRequired, vehicle.update_a_vehicle)
    .delete(userHandlers.loginRequired, vehicle.delete_a_vehicle);

  // user Routes
  app.route('/auth/register')
    .post( userHandlers.register);

  app.route('/auth/sign_in')
    .post(userHandlers.sign_in);

  app.route('/users')
    .get(userHandlers.list_all_user);

  app.route('/users/:email')
    .get(userHandlers.user_by_email);

  app.route('/users/:userId')  
    .put(userHandlers.loginRequired, userHandlers.update_a_user)
    .delete(userHandlers.loginRequired, userHandlers.delete_a_user);

  // category Routes
  app.route('/categories')
    .get(category.list_all_categories)
    .post(userHandlers.loginRequired, category.create_a_category);

  // role Routes
  app.route('/roles')
    .get(role.list_all_roles)
    .post(userHandlers.loginRequired, role.create_a_role);

  // usage Routes
  app.route('/usages')
    .get(usage.list_all_usages)
    .post(usage.create_a_usage)
    

  app.route('/usages/:usageId')
    .put(usage.update_a_usage)
    .delete(usage.delete_a_usage);

  app.route('/usages/now')
    .get(usage.list_usages_futur);

  app.route('/usages/available/:start/:end')
    .get(usage.list_vehicle_available);

};