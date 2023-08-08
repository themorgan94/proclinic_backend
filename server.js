const express = require("express");
const cors = require("cors");
const sls = require("serverless-http");

const app = express();

app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");

db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

const ApiLog = db.apiLog;

app.use((req, res, next) => {
  const oldJson = res.json;
  res.json = (body) => {
    res.locals.body = body;
    return oldJson.call(res, body);
  };


  const oldSend = res.send;
  res.send = (body) => {
    res.locals.body = body;
    return oldSend.call(res, body);
  };


  res.on('finish', async () => {
    await ApiLog.create({
      requestBody: JSON.stringify(req.body),
      endpoint: req.originalUrl,
      responseBody: JSON.stringify(res.locals.body)
    })
  })
  next()
})

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Hello World!" });
});

require("./app/routes/user.routes")(app);
require("./app/routes/modulo.routes")(app);
require("./app/routes/feature.routes")(app);
require("./app/routes/task.routes")(app);
require("./app/routes/group.routes")(app);
require("./app/routes/taskFeature.routes")(app);
require("./app/routes/auth.routes")(app);


// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}.`);
// });

module.exports.server = sls(app);
