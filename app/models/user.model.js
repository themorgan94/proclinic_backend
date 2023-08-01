module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        ID: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        userName: {
            type: Sequelize.STRING(510)
        },
        password: {
            type: Sequelize.STRING(64)
        },
        created: {
            type: Sequelize.DATE
        },
        updated: {
            type: Sequelize.DATE
        },
        email: {
            type: Sequelize.STRING(500)
        },
        person_ID: {
            type: Sequelize.INTEGER
        },
        userStatus_ID: {
            type: Sequelize.INTEGER
        },
        VerificationToken: {
            type: Sequelize.STRING(5000)
        },
        Verified: {
            type: Sequelize.DATE
        },
        ResetToken: {
            type: Sequelize.STRING(5000)
        },
        ResetTokenExpires: {
            type: Sequelize.DATE
        },
        PasswordReset: {
            type: Sequelize.DATE
        },
    }, {
        freezeTableName: true,
        createdAt: 'created',
        updatedAt: 'updated'
    });
  
    return User;
};
  