const db = require("../models");
const Role = db.roles;


// Retrieve all articles from the database.
exports.findAll = (req, res) => {
  
  Role.find()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving roles."
      });
    });
};

// Find a single article with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Role.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found role with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving role with id=" + id });
    });
};