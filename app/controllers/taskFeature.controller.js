const db = require("../models");
const Op = db.Sequelize.Op;
const TaskFeature = db.taskFeature;
const TaskFeature_has_user = db.taskFeature_has_user;
const TaskFeature_has_group = db.taskFeature_has_group;

exports.create = async (req, res) => {
  const { name, description, moduleFeatureTaskStatusID, featureID } = req.body
  if (!name || !description || !moduleFeatureTaskStatusID || !featureID) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  try {
    await TaskFeature.create({
      name,
      description,
      moduleFeatureTaskStatusID,
      featureID
    })

    res.json({
      'message': 'TaskFeature was created successfully'
    })
  } catch(err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating TaskFeature"
    });
  }
};

exports.list = async (req, res) => {
  const name = req.query.name || '';
  const description = req.query.description || '';
  const moduleFeatureTaskStatusID = req.query.moduleFeatureTaskStatusID || '';
  const featureID = req.query.featureID || '';
  
  var condition = {}
  
  if (name) condition['name'] = { [Op.like]: `%${name}%` }
  if (description) condition['description'] = { [Op.like]: `%${description}%` }
  if (moduleFeatureTaskStatusID) condition['moduleFeatureTaskStatusID'] = moduleFeatureTaskStatusID
  if (featureID) condition['featureID'] = featureID

  try {
    const taskFeatures = await TaskFeature.findAll({ where: condition })
    res.send(taskFeatures)
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving TaskFeatures."
    });
  }
};

exports.read = async (req, res) => {
  const id = req.params.id;

  try {
    const taskFeature = await TaskFeature.findByPk(id)
    if (taskFeature) {
      res.send(taskFeature);
    } else {
      res.status(404).send({
        message: `Cannot find TaskFeature with id=${id}.`
      });
    }
  } catch(err) {
    res.status(500).send({
      message: "Error retrieving TaskFeature with id=" + id
    });
  }
};

exports.update = async (req, res) => {
  const id = req.params.id;
  const name = req.body.name || ''
  const description = req.body.description || ''
  const moduleFeatureTaskStatusID = req.body.moduleFeatureTaskStatusID || ''
  const featureID = req.body.featureID || ''

  try {
    const updateData = {}

    if (name) updateData['name'] = name
    if (description) updateData['description'] = description
    if (moduleFeatureTaskStatusID) updateData['moduleFeatureTaskStatusID'] = moduleFeatureTaskStatusID
    if (featureID) updateData['featureID'] = featureID

    const num = await TaskFeature.update(updateData, {
      where: {ID: id}
    })

    if (num == 1) {
      res.send({
        message: "TaskFeature was updated successfully."
      });
    } else {
      res.status(400).send({
        message: `Cannot update TaskFeature with id=${id}. Maybe TaskFeature was not found or req.body is empty!`
      });
    }
  } catch(err) {
    res.status(500).send({
      message: "Error updating TaskFeature with id=" + id
    });
  }
};

exports.delete = async (req, res) => {
  const id = req.params.id;
  
  try {
    const num = await TaskFeature.destroy({
      where: { ID: id }
    })

    if (num == 1) {
      res.send({
        message: "TaskFeature was deleted successfully!"
      });
    }
    else {
      res.status(400).send({
        message: `Cannot delete TaskFeature with id=${id}`
      });
    }
  } catch(err) {
    res.status(500).send({
      message: "Could not delete TaskFeature with id=" + id
    });
  }
};

exports.addUser = async (req, res) => {
  const taskFeature_ID = req.params.id;
  const user_ID = req.body.user_ID || ''
  if (!user_ID) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  try {
    const users = await TaskFeature_has_user.findAll({ where: { taskFeature_ID, user_ID } })
    if (users.length) {
      res.status(400).send({
        message: 'User already exists in the taskFeature.'
      });
    }
    else {
      await TaskFeature_has_user.create({
        taskFeature_ID,
        user_ID
      })
  
      res.json({
        'message': 'User was added to taskFeature successfully'
      })
    }
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while add users to taskFeature."
    });
  }
}

exports.addGroup = async (req, res) => {
  const taskFeature_ID = req.params.id;
  const group_ID = req.body.group_ID || ''
  if (!group_ID) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  try {
    const groups = await TaskFeature_has_group.findAll({ where: { taskFeature_ID, group_ID } })
    if (groups.length) {
      res.status(400).send({
        message: 'Group already exists in the taskFeature.'
      });
    }
    else {
      await TaskFeature_has_group.create({
        taskFeature_ID,
        group_ID
      })
  
      res.json({
        'message': 'Group was added to taskFeature successfully'
      })
    }
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while add groups to taskFeature."
    });
  }
}
