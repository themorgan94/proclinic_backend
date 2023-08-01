module.exports = (sequelize, Sequelize) => {
    const TaskFeature_has_user = sequelize.define("taskFeature_has_user", {
        taskFeature_ID: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        user_ID: {
            type: Sequelize.INTEGER,
            primaryKey: true
        }
    }, {
        freezeTableName: true,
        createdAt: false,
        updatedAt: false
    });
  
    return TaskFeature_has_user;
};
  