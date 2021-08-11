
const { roles } = require("../models");
const db = require("../models");
const Role = db.roles;
const User = db.users;
const Company = db.companies;


// Retrieve all companies from the database.
exports.findAll = (req, res) => {
  const name = req.query.Name;
  var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};

  Company.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving companies."
      });
    });
};
exports.getMine = (req, res) => {

  Company.findById(req.CompanyId)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving companies."
      });
    });
};

// Find a single company with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Company.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found company with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving company with id=" + id });
    });
};
// Create and Save a new Company
exports.create = (req, res) => {
  // Validate request
  if (!req.body.Name) {
    res.status(400).send({ message: 'Company needs a name' });
    return;
  }



  // Create a article
  const company = new Company({
    Name: req.body.Name,
    Description: req.body.Description,
    Address: req.body.Address,
  });



  // Save article in the database
  company
    .save(company)
    .then(async (data) => {
      User.findById(req.UserId).then(result => {
        Role.find({ Name: 'Superadmin' }).then((role) => {
          result.Role = role[0]._id;
          result.Company = company.id;
          result.save(result);
        })

      });
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error ss while creating the company.',
      });
    });
};
// Update a article by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: 'Data to update can not be empty!',
    });
  }
  if(!req.body.Name){
    return res.status(400).send({
      message: 'Needs a name mate',
    });
  }

  const id = req.params.id;
  Company.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((company) => {
      if (!company) {
        res.status(404).send({
          message: `Cannot update company with id=${id}. Maybe company was not found!`,
        });
      } else res.status(200).send(req.body);
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error updating company with id=' + id,
        error: err,
      });
    });
};
