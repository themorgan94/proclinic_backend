const db = require("../models");
const Op = db.Sequelize.Op;
const Feature = db.feature;
const TaskFeature = db.taskFeature;
const TaskFeature_has_user = db.taskFeature_has_user;
const TaskFeature_has_group = db.taskFeature_has_group;
const ModuleFeatureTaskStatus = db.moduleFeatureTaskStatus;

exports.create = async (req, res) => {
  const { name, description, moduleID } = req.body
  if (!name || !description || !moduleID) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  try {
    const activeStatus = await ModuleFeatureTaskStatus.findOne({ where: { name: "ACTIVE" }})

    await Feature.create({
      name,
      description,
      moduleFeatureTaskStatusID: activeStatus.ID,
      moduleID
    })

    res.json({
      'message': 'Feature was created successfully'
    })
  } catch(err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating feature"
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
    const features = await Feature.findAll({ where: condition })
    res.send(features)
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving features."
    });
  }
};

exports.read = async (req, res) => {
  const id = req.params.id;

  try {
    const feature = await Feature.findByPk(id)
    if (feature) {
      res.send(feature);
    } else {
      res.status(404).send({
        message: `Cannot find feature with id=${id}.`
      });
    }
  } catch(err) {
    res.status(500).send({
      message: "Error retrieving feature with id=" + id
    });
  }
};

exports.update = async (req, res) => {
  const id = req.params.id;
  const name = req.body.name || ''
  const description = req.body.description || ''
  const moduleID = req.body.moduleID || ''

  try {
    const updateData = {}

    if (name) updateData['name'] = name
    if (description) updateData['description'] = description
    if (moduleID) updateData['moduleID'] = moduleID

    const num = await Feature.update(updateData, {
      where: {ID: id}
    })

    if (num == 1) {
      res.send({
        message: "Feature was updated successfully."
      });
    } else {
      res.status(400).send({
        message: `Cannot update feature with id=${id}. Maybe feature was not found or req.body is empty!`
      });
    }
  } catch(err) {
    res.status(500).send({
      message: "Error updating feature with id=" + id
    });
  }
};

exports.delete = async (req, res) => {
  const id = req.params.id;
  
  try {
    const num = await Feature.destroy({
      where: { ID: id }
    })

    if (num == 1) {
      res.send({
        message: "Feature was deleted successfully!"
      });
    }
    else {
      res.status(400).send({
        message: `Cannot delete feature with id=${id}`
      });
    }
  } catch(err) {
    res.status(500).send({
      message: "Could not delete feature with id=" + id
    });
  }
};

exports.addUser = async (req, res) => {
  const featureID = req.params.id;
  const user_ID = req.body.user_ID || ''
  if (!user_ID) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  try {
    const taskFeatures = await TaskFeature.findAll({ where: { featureID }})
    let rows = []

    let exist_IDs = await TaskFeature_has_user.findAll({ 
      where: { user_ID }, 
      attributes: ['taskFeature_ID'], 
      raw: true
    })

    exist_IDs = exist_IDs.map(row => row.taskFeature_ID)

    taskFeatures.forEach(tf => {
      if (exist_IDs.indexOf(tf.ID) < 0) rows.push({ taskFeature_ID: tf.ID, user_ID })  
    });

    await TaskFeature_has_user.bulkCreate(rows)

    res.json({
      'message': 'User was added to feature successfully'
    })
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while add user to feature."
    });
  }
}

exports.addGroup = async (req, res) => {
  const featureID = req.params.id;
  const group_ID = req.body.group_ID || ''
  if (!group_ID) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  try {
    const taskFeatures = await TaskFeature.findAll({ where: { featureID }})
    let rows = []

    let exist_IDs = await TaskFeature_has_group.findAll({ 
      where: { group_ID }, 
      attributes: ['taskFeature_ID'], 
      raw: true
    })

    exist_IDs = exist_IDs.map(row => row.taskFeature_ID)

    taskFeatures.forEach(tf => {
      if (exist_IDs.indexOf(tf.ID) < 0) rows.push({ taskFeature_ID: tf.ID, group_ID })  
    });

    await TaskFeature_has_group.bulkCreate(rows)

    res.json({
      'message': 'Group was added to feature successfully'
    })
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while add group to feature."
    });
  }
}
