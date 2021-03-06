// const router = require('express').Router();
// const { User, Project } = require('../../models');
// const jwt = require('express-jwt');
// const jwksRsa = require('jwks-rsa');

// // GET /api/users
// router.get('/', (req, res) => {
//     // Access our User model and run .findAll() method
//     User.findAll({
//         attibutes: { exclude: ['password'] }
//     })
//         .then(dbUserData => res.json(dbUserData))
//         .catch(err => {
//             console.log(err);
//             res.status(500).json(err);
//         });
// });

// //GET /api/users/1
// router.get('/:id', async (req, res) => {
//     let user = await User.findOne({
//         attibutes: { exclude: ['password'] },
//         where: {
//             user_id: req.params.id
//         },
//     });
//     let projects = await Project.findAll({
//         where: {
//             user_id: req.params.id
//         },
//     })
//     res.json({ user, projects });
// });

// const checkJwt = jwt({
//     secret: jwksRsa.expressJwtSecret({
//       cache: true,
//       rateLimit: true,
//       jwksRequestsPerMinute: 5,
//       jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
//     }),
  
//     // Validate the audience and the issuer.
//     audience: 'https://infinite-shore-33875.herokuapp.com/api',
//     issuer: `https://${process.env.AUTH0_DOMAIN}/`,
//     algorithms: ['RS256']
//   });

// app.use(checkJwt);

// router.post('/', (req, res) => {
//     // expects {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234'}
//     User.create({
//         username: req.body.username,
//         first_name: req.body.first_name,
//         last_name: req.body.last_name,
//         email: req.body.email,
//         password: req.body.password,
//         nickname: req.session.passport.user.nickname,
//     })
//     .then(dbUserData => {
//         req.session.save(() => {
//         req.session.user_id = req.session.passport.user.id;
//         req.session.username = dbUserData.username;
//         req.session.email = dbUserData.email;
//         req.session.loggedIn = true;

//         res.json(dbUserData);
//         });
//     });
// });

// router.post('/login', (req, res) => {
//     User.findOne({
//         where: {
//             email: req.body.email
//         }
//     }).then(dbUserData => {
//         if (!dbUserData) {
//             res.status(400).json({ message: 'No user with that email address!' });
//             return;
//         }

//         // Verify User
//         const validPassword = dbUserData.checkPassword(req.body.password);
        
//         if (!validPassword) {
//             res.status(400).json({ message: 'Incorrect password!' });
//             return;
//         }

//         req.session.save(() => {
//             //declare session variables
//             req.session.user_id = dbUserData.user_id;
//             req.session.username = dbUserData.username;
//             req.session.email = dbUserData.email;
//             req.session.loggedIn = true;

//         res.json({ user: dbUserDaclearta, message: 'You are now logged in!', ok: true });
//         });
//     });
// });

router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    }
    else {
        res.status(404).end();
    }
});

// // PUT /api/users/1
// router.put('/:id', (req, res) => {
//     // expects {username, email, password}

//     // if req.body has exact key.value pairs to match the model, use req.body instead
//     User.update(req.body, {
//         individualHooks: true,
//         where: {
//             id: req.params.id
//         }
//     })
//         .then(dbUserData => {
//             if (!dbUserData[0]) {
//                 res.status(404).json({ message: 'No user found with this id' });
//                 return;
//             }
//             res.json(dbUserData);
//         })
//         .catch(err => {
//             console.log(err);
//             res.status(500).json(err);
//         });
// });

// // DELETE /api/users/1
// router.delete('/:id', (req, res) => {
//     User.destroy({
//         where: {
//             id: req.params.id
//         }
//     })
//         .then(dbUserData => {
//             if (!dbUserData) {
//                 res.status(404).json({ message: 'No user found with this id' });
//                 return;
//             }
//             res.json(dbUserData);
//         })
//         .catch(err => {
//             console.log(err);
//             res.status(500).json(err);
//         });
// });

// module.exports = router;