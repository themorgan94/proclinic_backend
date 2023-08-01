module.exports = (sequelize, Sequelize) => {
    const GroupStatus = sequelize.define("groupStatus", {
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
        freezeTableName: true
    });
  
    return GroupStatus;
};
  