const authMiddleware = require('../middlewares/auth.js')

module.exports = app => {
    const task = require("../controllers/task.controller.js");
  
    var router = require("express").Router();
  
    router.post("/", task.create);
  
    router.get("/", task.list);
  
    router.get("/:id", task.read);
  
    router.put("/:id", task.update);
  
    router.delete("/:id", task.delete);
  
    app.use('/api/tasks', authMiddleware.authenticateJWT, router);
  };
  