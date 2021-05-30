/**
 * Required External Modules
 */

 const exphbs = require('express-handlebars');

 const sequelize = require("./config/connection");

 const helpers = require('./utils/helpers');

 const hbs = exphbs.create({ helpers });

 const express = require("express");
 const path = require("path");
 
 const expressSession = require("express-session");
 const passport = require("passport");
 const Auth0Strategy = require("passport-auth0");
 
 require("dotenv").config();
 
 const authRouter = require("./controllers/api/auth");

 /**
 * App Variables
 */

const app = express();
const PORT = process.env.PORT || "8000";

/**
 * Session Configuration (New!)
 */
const SequelizeStore = require('connect-session-sequelize')(expressSession.Store);

const session = {
  secret: process.env.SESSION_SECRET,
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

if (app.get("env") === "production") {
  // Serve secure cookies, requires HTTPS
  session.cookie.secure = true;
}


/**
 * Passport Configuration (New!)
 */
 const strategy = new Auth0Strategy(
  {
    domain: process.env.AUTH0_DOMAIN,
    clientID: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    callbackURL: process.env.AUTH0_CALLBACK_URL
  },
  function(accessToken, refreshToken, extraParams, profile, done) {
    /**
     * Access tokens are used to authorize users to an API
     * (resource server)
     * accessToken is the token to call the Auth0 API
     * or a secured third-party API
     * extraParams.id_token has the JSON Web Token
     * profile has all the information from the user
     */
    return done(null, profile);
  }
);


/**
 *  App Configuration
 */
 app.set("views", path.join(__dirname, "views"));
 app.use(express.json());
 app.use(express.urlencoded({ extended: false }));
 app.engine('handlebars', hbs.engine);
 app.set("view engine", "handlebars");
 app.use(express.static(path.join(__dirname, "public")));
 
 app.use(expressSession(session));
 
 passport.use(strategy);
 app.use(passport.initialize());
 app.use(passport.session());
 
 passport.serializeUser((user, done) => {
   done(null, user);
 });
 
 passport.deserializeUser((user, done) => {
   done(null, user);
 });

 // Creating custom middleware with Express
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated();
  next();
});

 app.use("/", authRouter);

 app.use(require('./controllers/'));

 const secured = (req, res, next) => {
  if (req.user) {
      return next();
  }
  req.session.returnTo = req.originalUrl;
  res.redirect("/login");
};

// Defined routes
app.get("/user", secured, (req, res, next) => {
  const { _raw, _json, ...userProfile } = req.user;
  res.render("user", {
    title: "Profile",
    userProfile: userProfile
  });
});

 sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
})
.catch((error) => {
  console.error('Unable to connect to the database:', error);
});