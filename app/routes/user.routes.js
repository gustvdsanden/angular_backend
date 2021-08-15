module.exports = app => {
  const users = require("../controllers/user.controller.js");
  const { authJwt } = require("../middlewares");

  var router = require("express").Router();

  // Create a new user
  router.post("/", users.create);
  
  // Authenticate user
  router.post("/authenticate", users.authenticate);

  router.route("/company").get([authJwt.verifyToken], users.findAllOfCompany);
  router.route("/company/noComp").get([authJwt.verifyToken],users.findNoCompany);
  router.route("/company/addToCompany/:id").get([authJwt.verifyToken],users.addToCompany);
  

  // Retrieve a single user with id
  router.route("/:id").get([authJwt.verifyToken], users.findOne).put([authJwt.verifyToken], users.update).delete([authJwt.verifyToken], users.delete);
  
  router.route("/token/:id").get([authJwt.verifyToken], users.updateToken)
  


  app.use('/api/User', router);
  
};