module.exports = (sequelize, Sequelize) => {
  const TaskFeature = sequelize.define("taskFeature", {
    ID: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING(100)
    },
    description: {
      type: Sequelize.STRING
    },
    moduleFeatureTaskStatusID: {
      type: Sequelize.INTEGER
    },
    featureID: {
      type: Sequelize.INTEGER
    }
  }, {
    freezeTableName: true,
    timestamps: false
  });

  return TaskFeature;
};
