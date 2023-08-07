module.exports = (sequelize, Sequelize) => {
  const Group_has_user = sequelize.define("group_has_user", {
    group_ID: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    user_ID: {
      type: Sequelize.INTEGER,
      primaryKey: true
    }
  }, {
    freezeTableName: true,
    timestamps: false
  });

  return Group_has_user;
};
