module.exports = app => {
    const auth = require("../controllers/auth.controller.js");
  
    var router = require("express").Router();
  
    router.post("/login", auth.login);

    router.post("/signup", auth.signup);

    router.get("/verify/:token", auth.verify);

    router.post('/refresh-token', auth.refreshToken);

    router.post('/forget-password', auth.forgetPassword);

    router.post('/reset-password', auth.resetPassword);
  
    app.use('/api/auth', router);
  };
  