module.exports = (sequelize, Sequelize) => {
  const Modulo = sequelize.define("module", {
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
  }, {
      freezeTableName: true,
      timestamps: false
  });

  return Modulo;
};
