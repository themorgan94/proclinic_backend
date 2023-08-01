module.exports = (sequelize, Sequelize) => {
    const UserStatus = sequelize.define("userStatus", {
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
        timestamps: false,
    });
  
    return UserStatus;
};
  