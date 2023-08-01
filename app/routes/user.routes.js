const authMiddleware = require('../middlewares/auth.js')

module.exports = app => {
    const users = require("../controllers/user.controller.js");
  
    var router = require("express").Router();
  
    // Create a new User
    router.post("/", authMiddleware.checkTaskFeature('CREATEUSER'), users.create);
  
    // List and search Users
    router.get("/", authMiddleware.checkTaskFeature('LISTUSERS'), users.list);
  
    // Retrieve a single User with id
    router.get("/:id", authMiddleware.checkTaskFeature('READUSER'), users.read);
  
    // Update a User with id
    router.put("/:id", authMiddleware.checkTaskFeature('UPDATEUSER'), users.update);
  
    // Delete a User with id
    router.delete("/:id", authMiddleware.checkTaskFeature('DELETEUSER'), users.delete);
  
    app.use('/api/users', authMiddleware.authenticateJWT, router);
  };
  