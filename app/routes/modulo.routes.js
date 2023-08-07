const authMiddleware = require('../middlewares/auth.js')

module.exports = app => {
    const modulo = require("../controllers/modulo.controller.js");
  
    var router = require("express").Router();
  
    router.post("/", modulo.create);
  
    router.get("/", modulo.list);
  
    router.get("/:id", modulo.read);
  
    router.put("/:id", modulo.update);
  
    router.delete("/:id", modulo.delete);

    router.post("/:id/user", modulo.addUser);

    router.post("/:id/group", modulo.addGroup);
  
    app.use('/api/modules', authMiddleware.authenticateJWT, router);
  };
  