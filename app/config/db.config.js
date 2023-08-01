module.exports = {
  HOST: "dbdev-instance-1.cp5roytqndjt.us-east-2.rds.amazonaws.com",
  USER: "devUser",
  PASSWORD: "devUser",
  DB: "dev",
  dialect: "mysql",
  pool: {
    max: 2,
    min: 0,
    acquire: 3000,
    idle: 0
  }
};
