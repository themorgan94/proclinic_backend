const jwt = require("jsonwebtoken");
const jwtConfig = require("../config/jwt.config.js");
const db = require("../models");
const TaskFeature_has_user = db.taskFeature_has_user;
const TaskFeature = db.taskFeature;

exports.authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, jwtConfig.ACCESS_TOKEN_PRIVATE_KEY, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }

      req.user = user

      next();
    });
  } else {
    res.sendStatus(401);
  }
}

exports.checkTaskFeature = (taskFeatureName) => {
  return async (req, res, next) => {
    if (req.user) {
      const taskFeature = await TaskFeature.findOne({
        where: { name: taskFeatureName }
      })
  
      if (taskFeature) {
        const taskFeature_has_user = await TaskFeature_has_user.findOne({ where: { taskFeature_ID: taskFeature.ID }}) 
        if (taskFeature_has_user) {
          next();
        }
        else {
          res.sendStatus(401);
        }
      }
      else {
        res.sendStatus(401);
      }
    }
    else {
      res.sendStatus(401);
    }
  }
}

