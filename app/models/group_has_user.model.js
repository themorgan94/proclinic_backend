module.exports = (sequelize, Sequelize) => {
    const Group_has_user = sequelize.define("group_has_user", {
        group_ID: {
            type: Sequelize.INTEGER
        },
        user_ID: {
            type: Sequelize.INTEGER
        }
    }, {
        freezeTableName: true
    });
  
    return Group_has_user;
};
  