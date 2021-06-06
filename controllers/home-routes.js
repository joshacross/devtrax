const router = require('express').Router();
const sequelize = require('../config/connection');
const { Project } = require('../models');
const passport = require('passport');
require('dotenv').config();

router.get(
  "/",
  passport.authenticate("auth0", {
    scope: "openid email profile"
  }),
  (req, res) => {
    res.render('profile');
  }
);


// Home Page , if logged in go to user's profile, if not redirect to login
router.get('/', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/profile');
    return;
  }
  res.redirect('/login');
});

// If logged in, redirect to '/' which redirects to user profile
// If not logged in, render login page.

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
  // if (req.session.loggedIn) {
  //   let nickname = req.session.passport.user.nickname;
  //   let displayname = req.session.passport.user.displayName;
  //   let lastname = "";
  //   let  = req.session.passport.user.displayName;
  //   if (!nickName) {
  //     const response = await fetch('/api/users', {
  //       method: 'post',
  //       body: JSON.stringify({
  //         nickname,
  //         displayname,
  //         lastname,
  //         email,
  //         password
  //       }),
  //       headers: { 'Content-Type': 'application/json' }
  //     });

  //     // check the response status
  //     if (response.ok) {
  //         console.log('success');
  //     } else {
  //         alert(response.statusText);
  //     }
  //   }
  // }
// }
    // if(user !exists){
    //   // post new user;
    // }
    res.redirect('/profile');
    return;

  } else {
  res.redirect('/login');
  }
});

// // Login Post Route, by 
// router.post('/login', (req, res) => {
//   User.findOne({
//     where: {
//       email: req.session.email
//     }
//   }).then(dbUserData => {
//     if (!dbUserData) {
//       res.status(400).json({ message: 'No user with that email address!' });
//       return;
//     }

//     const validPassword = dbUserData.checkPassword(req.body.password);

//     if (!validPassword) {
//       res.status(400).json({ message: 'Incorrect password!' });
//       return;
//     }

//     req.session.save(() => {
//       // declare session variables
//       req.session.user_id = dbUserData.id;
//       req.session.username = dbUserData.username;
//       req.session.loggedIn = true;

//       res.json({ user: dbUserData, message: 'You are now logged in!' });
//     });
//   });
// });

// router.get('/logout', (req, res) => {
//   res.render('login');
// })

//Contracts Page 
router.get('/contracts', (req, res) => {
  const userDataId = req.session.passport.user.user_id;
  const userName = req.session.passport.user.displayName;
  const userEmail = req.session.passport.user._json.email;
  
  res.render('contracts', {userDataId, userName, userEmail});
  return;
});

// //Signup Page
// router.get('/signup', (req, res) => {
//   res.render('signup');
//   return;
// });

// router.get('/profile', (req, res) => {
//   console.log(req.session);

//   Project.findAll({
//     attributes: [
//       'project_id',
//       'project_url',
//       'project_title',
//       'project_description',
//       'services_rendered',
//       'services_rendered_description',
//       'project_start_date',
//       'project_completion_date',
//       'total_price_of_project',
//       'fee_schedule',
//       'length_of_project',
//       'client_first_name',
//       'client_last_name',
//       'client_email_address',
//       'client_company_name',
//       'client_billing_address',
//       'client_city',
//       'client_zipcode',
//       'contract_signed',
//       'contract_created_date',
//       'contract_signed_date',
//       'user_id',
//       'username',
//       'user_email',
//       'user_first_name',
//       'user_last_name',
//       'created_at',
//       'updated_at'
//     ]
//     // include: [
//     //   {
//     //     model: User,
//     //     attributes: ['user_id', 'username', 'first_name', 'last_name']
//     //   }
//     // ]
//   })
//     .then(dbProjectData => {
//         const projects = dbProjectData.map(project => project.get({ plain: true}));
//       // pass a single post object into the homepage template
//       res.render('profile', { projects });
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });


// GET /api/projects by user_id
// router.get('/profile', async (req, res) => {
//   let projects = await Project.findAll({
//     where: {
//       user_id: req.session.passport.user.user_id
//     },
//   })
//   res.render("profile", { projects });
//   return;
// });

router.get('/profile', (req, res) => {
  const userDataId = req.session.passport.user.user_id;
  const userName = req.session.passport.user.displayName;
  const userEmail = req.session.passport.user.emails.value;
  // Ping Database by session id to find projects.
  // If project doesn't exist, render profile page
  // If project exists, render dbProjectData 
  console.log(userDataId);
  Project.findAll({
    where: {
      user_id: userDataId
    },
    attributes: [
      'project_id',
      'project_url',
      'project_title',
      'project_description',
      'services_rendered',
      'services_rendered_description',
      'project_start_date',
      'project_completion_date',
      'total_price_of_project',
      'fee_schedule',
      'length_of_project',
      'client_first_name',
      'client_last_name',
      'client_email_address',
      'client_company_name',
      'client_billing_address',
      'client_city',
      'client_zipcode',
      'contract_signed',
      'contract_created_date',
      'contract_signed_date',
      'user_id',
      'username',
      'user_email',
      'user_first_name',
      'user_last_name',
      'created_at',
      'updated_at'
    ],
    // include: [
    //   {
    //     model: Session,
    //     attributes: [userData.user_id, userData.username, userData.email]
    //   }
    // ]
  })
    .then(dbProjectData => {
      if (!dbProjectData) {
        res.render('profile', { userDataId, userName, userEmail });
        return;
      } else {
      const projects = dbProjectData.map(project => project.get({ plain: true }));
      // pass a single post object into the homepage template
      res.render('profile', { projects });
      return;
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// get one user
router.get('/client-contract-signature/:id', (req, res) => {
  Project.findOne({
    where: {
      project_id: req.params.id
    },
    // define attributes
    attributes: [
      'project_id',
      'project_url',
      'project_title',
      'project_description',
      'services_rendered',
      'services_rendered_description',
      'project_start_date',
      'project_completion_date',
      'total_price_of_project',
      'fee_schedule',
      'length_of_project',
      'client_first_name',
      'client_last_name',
      'client_email_address',
      'client_company_name',
      'client_billing_address',
      'client_city',
      'client_zipcode',
      'contract_signed',
      'contract_created_date',
      'contract_signed_date',
      'user_id',
      'username',
      'user_email',
      'user_first_name',
      'user_last_name',
      'created_at',
      'updated_at'
    ],
    // order projects based on the most recent project created_at date
    order: [['created_at', 'DESC']]
    // JOIN to the user table using include
    // include: [
    //   //include client model
    //   {
    //     model: User,
    //     attributes: ['user_id', 'username', 'first_name', 'last_name']
    //   }
    // ]
  })
    .then(dbProjectData => {
      if (!dbProjectData) {
        res.status(404).json({ message: 'No project found with this id' });
        return;
      }
      res.render("non-dev-contract-signature", dbProjectData.dataValues);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// get one user
router.get('/client-contract/:id', (req, res) => {
  Project.findOne({
    where: {
      project_id: req.params.id
    },
    // define attributes
    attributes: [
      'project_id',
      'project_url',
      'project_title',
      'project_description',
      'services_rendered',
      'services_rendered_description',
      'project_start_date',
      'project_completion_date',
      'total_price_of_project',
      'fee_schedule',
      'length_of_project',
      'client_first_name',
      'client_last_name',
      'client_email_address',
      'client_company_name',
      'client_billing_address',
      'client_city',
      'client_zipcode',
      'contract_signed',
      'contract_created_date',
      'contract_signed_date',
      'user_id',
      'username',
      'user_email',
      'user_first_name',
      'user_last_name',
      'created_at',
      'updated_at'
    ],
    // order projects based on the most recent project created_at date
    order: [['created_at', 'DESC']]
    // JOIN to the user table using include
    // include: [
    //   //include client model
    //   {
    //     model: User,
    //     attributes: ['user_id', 'username', 'first_name', 'last_name']
    //   }
    // ]
  })
    .then(dbProjectData => {
      if (!dbProjectData) {
        res.status(404).json({ message: 'No project found with this id' });
        return;
      }
      res.render("client-contract", dbProjectData.dataValues);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/calendar', async (req, res) => {
  let projects = await Project.findAll({
    where: {
      user_id: req.session.passport.user.user_id
    },
  })
  res.render("calendar", { projects });
});

module.exports = router;