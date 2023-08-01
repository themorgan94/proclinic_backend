module.exports = (sequelize, Sequelize) => {
    const TaskFeature_has_group = sequelize.define("taskFeature_has_group", {
        taskFeature_ID: {
            type: Sequelize.INTEGER
        },
        group_ID: {
            type: Sequelize.INTEGER
        }
    }, {
        freezeTableName: true
    });
  
    return TaskFeature_has_group;
};
  