module.exports = (sequelize, Sequelize) => {
  const TaskFeature_has_group = sequelize.define("taskFeature_has_group", {
    taskFeature_ID: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    group_ID: {
      type: Sequelize.INTEGER,
      primaryKey: true
    }
  }, {
    freezeTableName: true,
    timestamps: false
  });

  return TaskFeature_has_group;
};
  