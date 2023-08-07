const authMiddleware = require('../middlewares/auth.js')

module.exports = app => {
    const feature = require("../controllers/feature.controller.js");
  
    var router = require("express").Router();
  
    router.post("/", feature.create);
  
    router.get("/", feature.list);
  
    router.get("/:id", feature.read);
  
    router.put("/:id", feature.update);
  
    router.delete("/:id", feature.delete);

    router.post("/:id/user", feature.addUser);

    router.post("/:id/group", feature.addGroup);
  
    app.use('/api/features', authMiddleware.authenticateJWT, router);
  };
  