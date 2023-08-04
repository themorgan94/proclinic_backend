module.exports = (sequelize, Sequelize) => {
  const Feature = sequelize.define("feature", {
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
    moduleID: {
      type: Sequelize.INTEGER
    },
  }, {
      freezeTableName: true,
      timestamps: false
  });

  return Feature;
};
