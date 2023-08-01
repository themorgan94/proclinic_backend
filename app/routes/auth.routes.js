module.exports = app => {
    const auth = require("../controllers/auth.controller.js");
  
    var router = require("express").Router();
  
    router.post("/login", auth.login);

    router.post("/signup", auth.signup);

    router.get("/verify/:token", auth.verify);

    router.post('/refreshToken', auth.refreshToken);

    router.post('/forgetPassword', auth.forgetPassword);

    router.post('/resetPassword', auth.resetPassword);
  
    app.use('/api/auth', router);
  };
  