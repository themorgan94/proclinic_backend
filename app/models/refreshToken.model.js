module.exports = (sequelize, Sequelize) => {
    const RefreshToken = sequelize.define("refreshToken", {
        ID: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        expires: {
            type: Sequelize.DATE
        },
        Created: {
            type: Sequelize.DATE
        },
        Token: {
            type: Sequelize.STRING(5000)
        },
        CreatedByIp: {
            type: Sequelize.STRING(100)
        },
        Revoked: {
            type: Sequelize.DATE
        },
        RevokedByIp: {
            type: Sequelize.STRING(100)
        },
        ReplacedByToken: {
            type: Sequelize.STRING(5000)
        },
        user_ID: {
            type: Sequelize.INTEGER
        }
    }, {
        freezeTableName: true,
        createdAt: 'Created',
        updatedAt: false
    });
  
    return RefreshToken;
};
  