module.exports = (sequelize, Sequelize) => {
    const Group = sequelize.define("group", {
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
        groupStatus_ID: {
            type: Sequelize.INTEGER
        }
    }, {
        freezeTableName: true
    });
  
    return Group;
};
  