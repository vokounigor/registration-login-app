const session = require("express-session");
const MongoDBSession = require("connect-mongodb-session")(session);

const store = new MongoDBSession({
  uri: process.env.MONGODB_CONNECTION,
  collection: "userSessions",
});

/** @type {session.SessionOptions} */
const sessionOptions = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    sameSite: "strict",
  },
};

module.exports = session(sessionOptions);
