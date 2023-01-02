require("dotenv").config();

// Imports
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const mongoose = require("mongoose");
const sessionMiddleware = require("./middleware/sessionMiddleware");
const loggedInMiddleware = require("./middleware/loggedInMiddleware");
const loggedOutMiddleware = require("./middleware/loggedOutMiddleware");
const registrationController = require("./controllers/registrationController");
const loginController = require("./controllers/loginController");
const logoutController = require("./controllers/logoutController");
const dashboardController = require("./controllers/dashboardController");

// DB connection
mongoose.set("strictQuery", true);
mongoose.connect(process.env.MONGODB_CONNECTION);

const app = express();
const port = process.env.PORT;

// Set middlewares
// If a specific origin is needed to be set, use { origin: process.env.ALLOW_ORIGIN || "*", credentials: true }
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(sessionMiddleware);

// Routes
app.post("/register", loggedOutMiddleware, registrationController);
app.post("/login", loggedOutMiddleware, loginController);
app.get("/dashboard", loggedInMiddleware, dashboardController);
app.get("/logout", loggedInMiddleware, logoutController);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
