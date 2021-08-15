module.exports = app => {
  const roles = require("../controllers/role.controller.js");
  const { authJwt } = require("../middlewares");
  var router = require("express").Router();

  // Retrieve all roles
  router.route("/").get([authJwt.verifyToken], roles.findAll);


  app.use('/api/Role', router);
};