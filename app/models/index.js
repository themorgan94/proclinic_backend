const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: 0,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./user.model.js")(sequelize, Sequelize);
db.persons = require("./person.model.js")(sequelize, Sequelize);
db.refreshTokens = require("./refreshToken.model.js")(sequelize, Sequelize);
db.userStatus = require('./userStatus.model.js')(sequelize, Sequelize);
db.taskFeature_has_user = require('./taskFeature_has_user.model.js')(sequelize, Sequelize);
db.taskFeature = require('./taskFeature.model.js')(sequelize, Sequelize);
db.modulo = require('./modulo.model.js')(sequelize, Sequelize);
db.moduleFeatureTaskStatus = require('./moduleFeatureTaskStatus.model.js')(sequelize, Sequelize);

db.persons.hasOne(db.users, {
  foreignKey: 'person_ID',
  onDelete: 'CASCADE'
});

db.users.belongsTo(db.persons, {
  foreignKey: 'person_ID',
  onDelete: 'CASCADE',
});

db.users.belongsTo(db.userStatus, {
  foreignKey: 'userStatus_ID'
});

db.userStatus.hasOne(db.users, {
  foreignKey: 'userStatus_ID'
});

db.users.hasOne(db.refreshTokens, {
  foreignKey: 'user_ID',
  onDelete: 'CASCADE',
});

db.refreshTokens.belongsTo(db.users, {
  foreignKey: 'user_ID',
  onDelete: 'CASCADE'
});

module.exports = db;
