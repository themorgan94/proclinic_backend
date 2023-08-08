module.exports = (sequelize, Sequelize) => {
  const ApiLog = sequelize.define("apiLog", {
    ID: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    requestBody: {
      type: Sequelize.STRING(10000)
    },
    endpoint: {
      type: Sequelize.STRING(1000)
    },
    responseBody: {
      type: Sequelize.STRING(10000)
    }
  }, {
    freezeTableName: true,
    createdAt: 'createdTime',
    updatedAt: false
  });

  return ApiLog;
};
