// auth.js

/**
 * Required External Modules
 */
 const express = require("express");
 const router = express.Router();
 const passport = require("passport");
 const dotenv = require('dotenv');
 const util = require('util');
 const url = require('url');
 const querystring = require("querystring");
//  const sequelize = require('../config/connection');
//   const { Project, User } = require('../models');
 
dotenv.config();

/**
 * Routes Definitions
 */
 router.get(
  "/login",
  passport.authenticate("auth0", {
    scope: "openid email profile"
  }),
  (req, res) => {
    res.redirect("/");
    // res.render('/');
  });

router.get("/callback", (req, res, next) => {
  passport.authenticate("auth0", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.redirect("/login");
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      const returnTo = req.session.returnTo;
      // delete req.session.returnTo;
      userId = req.session.passport.user.id.substring(req.session.passport.user.id.length - 24 );
// the user id is going to be pulled from the user database. 

      res.redirect(returnTo || "/profile/" + userId);
    });
  })(req, res, next);
});

router.get("/logout", (req, res) => {
  req.logOut();

  let returnTo = req.protocol + "://" + req.hostname;
  const port = req.connection.localPort;

  if (port !== undefined && port !== 80 && port !== 443) {
    returnTo += ':' + port;
  }
  const logoutURL = new url.URL(
    util.format('https://%s/v2/logout', process.env.AUTH0_DOMAIN)
  );
  const searchString = querystring.stringify({
    client_id: process.env.AUTH0_CLIENT_ID,
    returnTo: returnTo
  });
  logoutURL.search = searchString;

  res.redirect(logoutURL);
});


/**
 * Module Exports
 */

module.exports = router;

module.exports = function () {
  return function secured (req, res, next) {
    if (req.user) { return next(); }
    req.session.returnTo = req.originalUrl;
    res.redirect('/login');
  };
};