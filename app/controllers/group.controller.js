const db = require("../models");
const Op = db.Sequelize.Op;
const Group = db.group;
const Group_has_user = db.group_has_user;

exports.create = async (req, res) => {
  const { name, description, groupStatus_ID } = req.body
  if (!name || !description || !groupStatus_ID) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  try {
    await Group.create({
      name,
      description,
      groupStatus_ID
    })

    res.json({
      'message': 'Group was created successfully'
    })
  } catch(err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating group"
    });
  }
};

exports.list = async (req, res) => {
  const name = req.query.name || '';
  const description = req.query.description || '';
  
  var condition = {}
  
  if (name) condition['name'] = { [Op.like]: `%${name}%` }
  if (description) condition['description'] = { [Op.like]: `%${description}%` }

  try {
    const groups = await Group.findAll({ where: condition })
    res.send(groups)
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving groups."
    });
  }
};

exports.read = async (req, res) => {
  const id = req.params.id;

  try {
    const group = await Group.findByPk(id)
    if (group) {
      res.send(group);
    } else {
      res.status(404).send({
        message: `Cannot find group with id=${id}.`
      });
    }
  } catch(err) {
    res.status(500).send({
      message: "Error retrieving group with id=" + id
    });
  }
};

exports.update = async (req, res) => {
  const id = req.params.id;
  const name = req.body.name || ''
  const description = req.body.description || ''
  const groupStatus_ID = req.body.groupStatus_ID || ''

  try {
    const updateData = {}

    if (name) updateData['name'] = name
    if (description) updateData['description'] = description
    if (groupStatus_ID) updateData['groupStatus_ID'] = groupStatus_ID

    const num = await Group.update(updateData, {
      where: {ID: id}
    })

    if (num == 1) {
      res.send({
        message: "Group was updated successfully."
      });
    } else {
      res.status(400).send({
        message: `Cannot update group with id=${id}. Maybe group was not found or req.body is empty!`
      });
    }
  } catch(err) {
    res.status(500).send({
      message: "Error updating group with id=" + id
    });
  }
};

exports.delete = async (req, res) => {
  const id = req.params.id;
  
  try {
    const num = await Group.destroy({
      where: { ID: id }
    })

    if (num == 1) {
      res.send({
        message: "Group was deleted successfully!"
      });
    }
    else {
      res.status(400).send({
        message: `Cannot delete group with id=${id}`
      });
    }
  } catch(err) {
    res.status(500).send({
      message: "Could not delete group with id=" + id
    });
  }
};

exports.addUser = async (req, res) => {
  const group_ID = req.params.id;
  const user_ID = req.body.user_ID || ''
  if (!user_ID) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  try {
    const users = await Group_has_user.findAll({ where: { group_ID, user_ID } })
    if (users.length) {
      res.status(400).send({
        message: 'User already exists in the group.'
      });
    }
    else {
      await Group_has_user.create({
        group_ID,
        user_ID
      })
  
      res.json({
        'message': 'User was added to group successfully'
      })
    }
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while add users to group."
    });
  }
}
