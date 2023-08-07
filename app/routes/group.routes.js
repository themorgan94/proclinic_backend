const authMiddleware = require('../middlewares/auth.js')

module.exports = app => {
    const group = require("../controllers/group.controller.js");
  
    var router = require("express").Router();
  
    router.post("/", group.create);
  
    router.get("/", group.list);
  
    router.get("/:id", group.read);
  
    router.put("/:id", group.update);
  
    router.delete("/:id", group.delete);

    router.post("/:id", group.addUser);
  
    app.use('/api/groups', authMiddleware.authenticateJWT, router);
  };
  