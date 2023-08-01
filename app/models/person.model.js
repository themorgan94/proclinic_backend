module.exports = (sequelize, Sequelize) => {
    const Person = sequelize.define("person", {
        ID: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        firstName: {
            type: Sequelize.STRING
        },
        lastName: {
            type: Sequelize.STRING
        },
        DOB: {
            type: Sequelize.STRING(20)
        }
    }, {
        freezeTableName: true,
        createdAt: false,
        updatedAt: false
    });
  
    return Person;
};
  