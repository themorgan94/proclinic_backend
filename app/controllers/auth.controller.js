const jwt = require("jsonwebtoken");
const md5 = require('md5');
const nodemailer = require("nodemailer");
const appConfig = require("../config/app.config.js");
const jwtConfig = require("../config/jwt.config.js");
const mailConfig = require("../config/mail.config.js");
const db = require("../models");
const User = db.users;
const Person = db.persons;
const UserStatus = db.userStatus;
const RefreshToken = db.refreshTokens;

// login
exports.login = async (req, res) => {
  const { userName, password } = req.body;

  try {
    const user = await User.findOne({
      where: { userName }
    })
    
    if (user) {
      if (md5(password) == user.password) {
        const payload = { ID: user.ID }
        const accessToken = jwt.sign(
          payload,
          jwtConfig.ACCESS_TOKEN_PRIVATE_KEY,
          { expiresIn: jwtConfig.ACCESS_TOKEN_EXPIRES_IN }
        )

        const refreshToken = jwt.sign(
          payload,
          jwtConfig.REFRESH_TOKEN_PRIVATE_KEY,
          { expiresIn: jwtConfig.REFRESH_TOKEN_EXPIRES_IN }
        )
  
        const oldToken = await user.getRefreshToken();

        if (oldToken) {
          await RefreshToken.destroy({ where: { ID: oldToken.ID }})
        }

        await user.createRefreshToken({
          Token: refreshToken,
          CreatedByIp: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
        })

        res.send({
          user_ID: user.ID,
          userName: user.userName,
          accessToken,
          refreshToken
        })
      }
      else {
          res.status(400).send({
              message: 'Username or password is incorrect.'
          });
      }
    }
    else {
        res.status(400).send({
            message: 'Username or password is incorrect.'
        });
    }
  } catch(err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while login the user."
    });
  }
};

exports.signup = async (req, res) => {
  const { userName, password, email, firstName, lastName, DOB } = req.body;

  if (!userName || !password || !email || !firstName || !lastName) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  try {
    const user = await User.findOne({ where: { userName }})
    if (user) {
      res.status(400).send({
        'message': 'User already exist'
      })
    }
    else {
      const newPerson = await Person.create({
        firstName,
        lastName,
        DOB
      })

      const payload = { email }

      const verifyToken = jwt.sign(
        payload,
        jwtConfig.VERIFY_TOKEN_PRIVATE_KEY,
        { expiresIn: jwtConfig.VERIFY_TOKEN_EXPIRES_IN }
      )

      const pendingStatus = await UserStatus.findOne({ where: { name: "PENDING" }})
      
      await newPerson.createUser({
        userName: userName,
        password: md5(password),
        email: email,
        userStatus_ID: pendingStatus.ID,
        VerificationToken: verifyToken
      })

      const transporter = nodemailer.createTransport({
        host: mailConfig.MAIL_SERVER,
        port: mailConfig.MAIL_PORT,
        secure: true,
        auth: {
          user: mailConfig.MAIL_USER,
          pass: mailConfig.MAIL_PASSWORD,
        }
      });

      await transporter.sendMail({
          from: mailConfig.MAIL_DEFAULT_SENDER,
          to: email,
          subject: "Please verify your email",
          text: `${appConfig.BASE_URL}/verify/${verifyToken}`,
      });

      res.status(201).json({
        'message': 'Signup successfully'
      })
    }
  } catch(err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while signup"
    });
  }
}

exports.verify = async (req, res) => {
  const token = req.params.token;

  jwt.verify(token, jwtConfig.VERIFY_TOKEN_PRIVATE_KEY, async (err, tokenDetails) => {
    if (err) {
      res.status(400).send({
        message: 'Invalid verify token'
      })
    }
    else {
      const user = await User.findOne({ where: {email: tokenDetails.email}})
      if (user) {
        const activeStatus = await UserStatus.findOne({ where: { name: "ACTIVE" }})

        await User.update({
          userStatus_ID: activeStatus.ID,
          VerificationToken: '',
          Verified: new Date()
        }, {
          where: { ID: user.ID }
        })

        res.status(201).json({
          'message': 'Email verified successfully'
        })
      }
      else {
        res.status(400).send({
          message: 'Invalid verify token'
        })
      }
    }
  })
}

exports.refreshToken = async (req, res) => {
  const token = await RefreshToken.findOne({ where: { Token: req.body.refreshToken }});

  if (token) {
    jwt.verify(token.Token, jwtConfig.REFRESH_TOKEN_PRIVATE_KEY, (err, tokenDetails) => {
      if (err) {
        res.send({
          message: 'Invalid refresh token'
        })
      }
      else {
        const payload = { id: tokenDetails.id }
        const accessToken = jwt.sign(
          payload,
          jwtConfig.ACCESS_TOKEN_PRIVATE_KEY,
          { expiresIn: jwtConfig.ACCESS_TOKEN_EXPIRES_IN }
        )

        res.json({
          accessToken
        })
      }
    })
  }
  else {
    res.send({
      message: 'Invalid refresh token'
    })
  }
}

exports.forgetPassword = async (req, res) => {
  const userName = req.body.userName;

  if (!userName) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  try {
    const user = await User.findOne({ where: { userName }})
    if (user) {
      const payload = { ID: user.ID }
      const resetToken = jwt.sign(
        payload,
        jwtConfig.RESET_TOKEN_PRIVATE_KEY,
        { expiresIn: jwtConfig.RESET_TOKEN_EXPIRES_IN }
      )
      
      await User.update({
        ResetToken: resetToken
      }, {
        where: { ID: user.ID }
      })

      const transporter = nodemailer.createTransport({
        host: mailConfig.MAIL_SERVER,
        port: mailConfig.MAIL_PORT,
        secure: true,
        auth: {
          user: mailConfig.MAIL_USER,
          pass: mailConfig.MAIL_PASSWORD,
        }
      });

      await transporter.sendMail({
          from: mailConfig.MAIL_DEFAULT_SENDER,
          to: user.email,
          subject: "Password reset",
          text: `${appConfig.BASE_URL}/resetPassword/${resetToken}`,
      });

      res.status(201).json({
        'message': 'Password reset link sent to your email address'
      })
    }
    else {
      res.status(400).send({
        'message': 'User with given username does not exist'
      })
    }
  } catch(err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while reset password"
    });
  }
}

exports.resetPassword = async (req, res) => {
  const resetToken = req.body.token
  const password = req.body.password
  if (!resetToken || !password) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  jwt.verify(resetToken, jwtConfig.RESET_TOKEN_PRIVATE_KEY, async (err, tokenDetails) => {
    if (err) {
      res.status(400).send({
        message: 'Invalid reset token'
      })
    }
    else {
      const user = await User.findOne({ where: { ID: tokenDetails.ID }})
      if (user) {
        await User.update({
          password: md5(password),
          ResetToken: '',
          PasswordReset: new Date()
        }, {
          where: { ID: user.ID }
        })

        res.status(201).json({
          'message': 'Password reset successfully'
        })
      }
      else {
        res.status(400).send({
          message: 'Invalid reset token'
        })
      }
    }
  })
}