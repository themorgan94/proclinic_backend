module.exports = (sequelize, Sequelize) => {
  const ModuleFeatureTaskStatus = sequelize.define("moduleFeatureTaskStatus", {
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
      code: {
          type: Sequelize.STRING(10)
      }
  }, {
      freezeTableName: true,
      timestamps: false
  });

  return ModuleFeatureTaskStatus;
};