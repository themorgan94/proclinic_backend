const db = require("../models");
const Op = db.Sequelize.Op;
const Task = db.task;

exports.create = async (req, res) => {
  const { encounterID, formID } = req.body
  if (!encounterID || !formID) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  try {
    await Task.create({
      encounterID,
      formID
    })

    res.json({
      'message': 'Task was created successfully'
    })
  } catch(err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating task"
    });
  }
};

exports.list = async (req, res) => {
  const encounterID = req.query.encounterID || '';
  const formID = req.query.formID || '';
  
  var condition = {}
  
  if (encounterID) condition['encounterID'] = encounterID
  if (formID) condition['formID'] = formID

  try {
    const tasks = await Task.findAll({ where: condition })
    res.send(tasks)
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving tasks."
    });
  }
};

exports.read = async (req, res) => {
  const id = req.params.id;

  try {
    const task = await Task.findByPk(id)
    if (task) {
      res.send(task);
    } else {
      res.status(404).send({
        message: `Cannot find task with id=${id}.`
      });
    }
  } catch(err) {
    res.status(500).send({
      message: "Error retrieving task with id=" + id
    });
  }
};

exports.update = async (req, res) => {
  const id = req.params.id;
  const encounterID = req.body.encounterID || ''
  const formID = req.body.formID || ''

  try {
    const updateData = {}

    if (encounterID) updateData['encounterID'] = encounterID
    if (formID) updateData['formID'] = formID

    const num = await Task.update(updateData, {
      where: {ID: id}
    })

    if (num == 1) {
      res.send({
        message: "Task was updated successfully."
      });
    } else {
      res.status(400).send({
        message: `Cannot update task with id=${id}. Maybe task was not found or req.body is empty!`
      });
    }
  } catch(err) {
    res.status(500).send({
      message: "Error updating task with id=" + id
    });
  }
};

exports.delete = async (req, res) => {
  const id = req.params.id;
  
  try {
    const num = await Task.destroy({
      where: { ID: id }
    })

    if (num == 1) {
      res.send({
        message: "Task was deleted successfully!"
      });
    }
    else {
      res.status(400).send({
        message: `Cannot delete task with id=${id}`
      });
    }
  } catch(err) {
    res.status(500).send({
      message: "Could not delete task with id=" + id
    });
  }
};
