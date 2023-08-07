module.exports = (sequelize, Sequelize) => {
  const Task = sequelize.define("task", {
    ID: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },  
    encounterID: {
      type: Sequelize.INTEGER
    },
    formID: {
      type: Sequelize.INTEGER
    }
  }, {
    freezeTableName: true,
    timestamps: false
  });

  return Task;
};