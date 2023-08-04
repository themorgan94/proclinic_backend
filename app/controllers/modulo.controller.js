const db = require("../models");
const Op = db.Sequelize.Op;
const Modulo = db.modulo;
const ModuleFeatureTaskStatus = db.moduleFeatureTaskStatus;

exports.create = async (req, res) => {
  const { name, description } = req.body
  if (!name || !description) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  try {
    const activeStatus = await ModuleFeatureTaskStatus.findOne({ where: { name: "ACTIVE" }})

    await Modulo.create({
      name,
      description,
      moduleFeatureTaskStatusID: activeStatus.ID,
    })

    res.json({
      'message': 'Module was created successfully'
    })
  } catch(err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating module"
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
    const modulos = await Modulo.findAll({ where: condition })
    res.send(modulos)
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving modules."
    });
  }
};

exports.read = async (req, res) => {
  const id = req.params.id;

  try {
    const modulo = await Modulo.findByPk(id)
    if (modulo) {
      res.send(modulo);
    } else {
      res.status(404).send({
        message: `Cannot find Module with id=${id}.`
      });
    }
  } catch(err) {
    res.status(500).send({
      message: "Error retrieving Module with id=" + id
    });
  }
};

exports.update = async (req, res) => {
  const id = req.params.id;
  const name = req.body.name || ''
  const description = req.body.description || ''

  try {
    const updateData = {}

    if (name) updateData['name'] = name
    if (description) updateData['description'] = description

    const num = await Modulo.update(updateData, {
      where: {ID: id}
    })

    if (num == 1) {
      res.send({
        message: "Module was updated successfully."
      });
    } else {
      res.status(400).send({
        message: `Cannot update Module with id=${id}. Maybe Module was not found or req.body is empty!`
      });
    }
  } catch(err) {
    res.status(500).send({
      message: "Error updating Module with id=" + id
    });
  }
};

exports.delete = async (req, res) => {
  const id = req.params.id;
  
  try {
    const num = await Modulo.destroy({
      where: { ID: id }
    })

    if (num == 1) {
      res.send({
        message: "Module was deleted successfully!"
      });
    }
    else {
      res.status(400).send({
        message: `Cannot delete Module with id=${id}`
      });
    }
  } catch(err) {
    res.status(500).send({
      message: "Could not delete Module with id=" + id
    });
  }
};
