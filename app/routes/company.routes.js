const { authJwt } = require('../middlewares');

module.exports = app => {
  const company = require("../controllers/company.controller.js");

  var router = require("express").Router();

  // Retrieve all articlestatus
 

  router.route('/mine').get([authJwt.verifyToken], company.getMine);
  // Retrieve a single articlestatus with id
  router.route('/:id').get([authJwt.verifyToken], company.findOne).put([authJwt.verifyToken], company.update);

  router.route('/').get([authJwt.verifyToken], company.findAll).post([authJwt.verifyToken], company.create);

  app.use('/api/Company', router);
};