// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

const projectName = "project-2";
const capitalized = (string) => string[0].toUpperCase() + string.slice(1).toLowerCase();

app.use(function (req, res, next) {
    // console.log(app.locals);
    app.locals.user = req.session.user;
    next();
  });

app.locals.title = `${capitalized(projectName)} created with IronLauncher`;


//Handlebar Helper

hbs.registerHelper('decimalsFixed', function(price) {
  return Number(price).toFixed(2);
});


// 👇 Start handling routes here
const index = require("./routes/index");
app.use("/", index);

const authRoutes = require("./routes/auth");
app.use("/auth", authRoutes);

const quisRoutes = require('./routes/quiz.routes');
app.use('/',quisRoutes)

const walletRoutes = require('./routes/wallet.routes');
app.use('/',walletRoutes)


const postRoutes = require("./routes/post.routes");
app.use("/", postRoutes);

const commentRoutes = require("./routes/comment.routes");
app.use("/", commentRoutes);


// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;



///////////////////

