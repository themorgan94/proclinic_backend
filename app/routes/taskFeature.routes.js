const authMiddleware = require('../middlewares/auth.js')

module.exports = app => {
  const taskFeature = require("../controllers/taskFeature.controller.js");

  var router = require("express").Router();

  router.post("/", taskFeature.create);

  router.get("/", taskFeature.list);

  router.get("/:id", taskFeature.read);

  router.put("/:id", taskFeature.update);

  router.delete("/:id", taskFeature.delete);

  router.post("/:id/user", taskFeature.addUser);

  router.post("/:id/group", taskFeature.addGroup);

  app.use('/api/taskfeatures', authMiddleware.authenticateJWT, router);
};
  