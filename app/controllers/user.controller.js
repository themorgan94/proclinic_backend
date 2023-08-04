const md5 = require("md5");
const db = require("../models");
const User = db.users;
const Person = db.persons;
const UserStatus = db.userStatus;
const Op = db.Sequelize.Op;

// Create and Save a new User
exports.create = async (req, res) => {
  // Validate request
  const { userName, password, email, firstName, lastName, DOB } = req.body
  if (!userName || !password || !email || !firstName || !lastName) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  try {
    // Save User in the database
    const newPerson = await Person.create({
      firstName,
      lastName,
      DOB
    })

    const pendingStatus = await UserStatus.findOne({ where: { name: "PENDING" }})

    await newPerson.createUser({
      userName,
      password: md5(password),
      email,
      userStatus_ID: pendingStatus.ID,
    })

    res.json({
      'message': 'User was created successfully'
    })
  } catch(err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating user"
    });
  }
};

// Retrieve all Users from the database.
exports.list = async (req, res) => {
  const userName = req.query.userName || '';
  const email = req.query.email || '';
  
  var condition = {}
  
  if (userName) condition['userName'] = { [Op.like]: `%${userName}%` }
  if (email) condition['email'] = { [Op.like]: `%${email}%` }

  try {
    const users = await User.findAll({ where: condition, include: Person })
    res.send(users)
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving users."
    });
  }
};

// Find a single user with an id
exports.read = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.findByPk(id, { include: Person })
    if (user) {
      res.send(user);
    } else {
      res.status(404).send({
        message: `Cannot find User with id=${id}.`
      });
    }
  } catch(err) {
    res.status(500).send({
      message: "Error retrieving User with id=" + id
    });
  }
};

// Update a User by the id in the request
exports.update = async (req, res) => {
  const id = req.params.id;
  const firstName = req.body.firstName || ''
  const lastName = req.body.lastName || ''
  const DOB = req.body.DOB || ''

  try {
    const user = await User.findByPk(id)
    if (user) {
      const updateData = {}
      if (firstName) updateData['firstName'] = firstName
      if (lastName) updateData['lastName'] = lastName
      if (DOB) updateData['DOB'] = DOB

      const num = await Person.update(updateData, {
        where: {ID: user.person_ID}
      })

      if (num == 1) {
        res.send({
          message: "User was updated successfully."
        });
      } else {
        res.status(400).send({
          message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
        });
      }
    }
    else {
      res.status(404).send({
        message: `Cannot find User with id=${id}.`
      });
    }
  } catch(err) {
    res.status(500).send({
      message: "Error updating User with id=" + id
    });
  }
};

// Delete a User with the specified id in the request
exports.delete = async (req, res) => {
  const id = req.params.id;
  
  try {
    const user = await User.findByPk(id)
    if (user) {
      const person_ID = user.person_ID
      const num = await User.destroy({
        where: { ID: id }
      })

      if (num == 1) {
        await Person.destroy({
          where: { ID: person_ID }
        })
        res.send({
          message: "User was deleted successfully!"
        });
      }
      else {
        res.status(400).send({
          message: `Cannot delete User with id=${id}`
        });
      }
    }
    else {
      res.status(404).send({
        message: `Cannot find User with id=${id}.`
      });
    }
  } catch(err) {
    res.status(500).send({
      message: "Could not delete User with id=" + id
    });
  }
};
