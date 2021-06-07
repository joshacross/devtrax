// auth.js

/**
 * Required External Modules
 */
 const express = require("express");
 const router = express.Router();
 const passport = require("passport");
 const querystring = require("querystring");
 
 require("dotenv").config();

/**
 * Routes Definitions
 */
 router.get(
  "/login",
  passport.authenticate("auth0", {
    scope: "openid email profile"
  }),
  (req, res) => {
    res.redirect("/welcome");
    // res.render('/');
  }
);

router.get("/callback", (req, res, next) => {
  passport.authenticate("auth0", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.redirect("/login");
    }
    req.logIn(user, async (err) => {
      if (err) {
        return next(err);
      }
      const returnTo = req.session.returnTo;
      // delete req.session.returnTo;
      // userId = req.session.passport.user.id.substring(req.session.passport.user.id.length - 24 );
// the user id is going to be pulled from the user database.
      // User.create({
      //   username: req.session.passport.user.id,
      //   first_name: req.body.first_name,
      //   last_name: req.body.last_name,
      //   email: req.body.email,
      //   password: req.body.password,
      //   nickname: req.session.passport.user.nickname,
      // })
      // .then(dbUserData => {
      //   req.session.save(() => {
      //   req.session.user_id = req.session.passport.user.id;
      //   req.session.username = dbUserData.username;
      //   req.session.email = dbUserData.email;
      //   req.session.loggedIn = true;

      //   res.render(dbUserData);
      //   });
      // });
      res.redirect(returnTo || "/welcome");
    });
  })(req, res, next);
});

// router.post('/', (req, res) => {
//   // expects {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234'}
//   User.create({
//       username: req.body.username,
//       first_name: req.body.first_name,
//       last_name: req.body.last_name,
//       email: req.body.email,
//       password: req.body.password,
//       nickname: req.session.passport.user.nickname,
//   })
//   .then(dbUserData => {
//       req.session.save(() => {
//       req.session.user_id = req.session.passport.user.id;
//       req.session.username = dbUserData.username;
//       req.session.email = dbUserData.email;
//       req.session.loggedIn = true;

//       res.json(dbUserData);
//       });
//   });
// });

// router.post('/login', (req, res) => {
//   User.findOne({
//       where: {
//           email: req.body.email
//       }
//   }).then(dbUserData => {
//       if (!dbUserData) {
//           res.status(400).json({ message: 'No user with that email address!' });
//           return;
//       }

//       // Verify User
//       const validPassword = dbUserData.checkPassword(req.body.password);
      
//       if (!validPassword) {
//           res.status(400).json({ message: 'Incorrect password!' });
//           return;
//       }

//       req.session.save(() => {
//           //declare session variables
//           req.session.user_id = dbUserData.user_id;
//           req.session.username = dbUserData.username;
//           req.session.email = dbUserData.email;
//           req.session.loggedIn = true;

//       res.json({ user: dbUserDaclearta, message: 'You are now logged in!', ok: true });
//       });
//   });
// });

// router.post('/logout', (req, res) => {
//   if (req.session.loggedIn) {
//       req.session.destroy(() => {
//           res.status(204).end();
//       });
//   }
//   else {
//       res.status(404).end();
//   }
// });

router.get('/user', (req, res) => {
  const userDataId = req.session.passport.user
  passport.authenticate('')
  res.send(userDataId);
})

router.get("/logout", (req, res) => {
//   if (req.session.loggedIn){
//     req.session.destroy(() => {
//       res.status(204).end();
//     });
//   } else {
//     res.status(404).end();
//   }
// });
  req.logOut();

  let returnTo = req.protocol + "://" + req.hostname;
  const port = req.connection.localPort;

  if (port !== undefined && port !== 80 && port !== 443) {
    returnTo =
      process.env.NODE_ENV === "production"
        ? `${returnTo}/`
        : `${returnTo}:${port}/`;
  }

  const logoutURL = new URL(
    `https://${process.env.AUTH0_DOMAIN}/v2/logout`
  );

  const searchString = querystring.stringify({
    client_id: process.env.AUTH0_CLIENT_ID,
    returnTo: "localhost:3001"
  });
  logoutURL.search = searchString;

  res.redirect(logoutURL);
});


/**
 * Module Exports
 */

module.exports = router;