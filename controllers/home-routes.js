const router = require('express').Router();
const { Project, User } = require('../models');
// const db = require('../models');
// const secured = require('../lib/middleware/secured');
const passport = require('passport');


router.get(
  "/",
  passport.authenticate("auth0", {
    scope: "openid email profile"
  }),
  (req, res) => {
    res.render('profile');
  });

// Home Page , if logged in go to user's profile, if not redirect to login
router.get('/', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/welcome');
    return;
  }
  res.redirect('/login');
});

// If logged in, redirect to '/' which redirects to user profile
// If not logged in, render login page.

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/welcome');
    return;
  } else {
  res.redirect('/login');
  }
});


//Welcome Page - Render if user does not exist. If they do exist render profile page.
router.get('/welcome', (req, res, next) => {
  const { _raw, _json, ...userProfile } = req.user;

  User.findOne({
    where: {
      auth_id: userProfile.id
    }
  })
  .then((dbUserData) => {
    if (!dbUserData) {
      const userDataId = userProfile.id;
      const userName = userProfile.displayName;
      const userEmail = _json.email;
  
      res.render('welcome', { userDataId, userName, userEmail });
      return;
    } else {
    res.redirect('/profile');
    return;
    }
  });
});

router.get('/profile', (req, res, next) => {
  const { _raw, _json, ...userProfile } = req.user;

  User.findOne({
    where: {
      auth_id: userProfile.id
    },
    attributes: [
      'id',
      'user_first_name',
      'user_last_name',
      'username',
      'user_email'
    ]
  })
  .then((dbUserData => {
    Project.findAll({
      attributes: 
      [
        'project_id',
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
        'created_at',
        'updated_at'
      ]
    })
  }))
    .then((dbProjectData => {
      if (!dbProjectData) {
        User.findOne({
          where: {
            auth_id: userProfile.id
          },
          attributes: [
            'id',
            'user_first_name',
            'user_last_name',
            'username',
            'user_email'
          ]
        })
        .then((dbUserData => {
          const usersData = [dbUserData].map(users => users.get({ plain: true }));
        res.render('profile', { usersData });
        return;
        }))
      } else {
      const projects = dbProjectData.map(project => project.get({ plain: true }));
      // const user = dbUserData.map(user => user.get({ plain: true }));
      // pass a single post object into the homepage template
      res.render('profile', { projects });
      return;
      }
      }
    ))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


// Contracts Page 
// Add info to page - at the top showing user's information that will be added to the contract.

router.get('/contracts', (req, res) => {
  const { _raw, _json, ...userProfile } = req.user;

  User.findOne({
    where: {
      auth_id: userProfile.id
    },
    attributes: [
      'id',
      'user_first_name',
      'user_last_name',
      'user_company_name',
      'user_billing_address',
      'user_city',
      'user_zipcode',
      'username',
      'user_email',
      'auth_id'
    ]
  })
  .then((dbUserData => {
  const usersData = [dbUserData].map(users => users.get({ plain: true }));
  const userDataId = userProfile.id;
  const userName = userProfile.displayName;
  const userEmail = req.session.passport.user._json.email;
  
  res.render('contracts', { usersData, userDataId, userName, userEmail });
  return;
  }))
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
      'created_at',
      'updated_at'
    ],
    // order projects based on the most recent project created_at date
    order: [['created_at', 'DESC']],
    // JOIN to the user table using include
    include: [
      //include client model
      {
        model: User,
        attributes: ['user_id', 'username', 'user_first_name', 'user_last_name']
      }
    ]
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
      'created_at',
      'updated_at'
    ],
    // order projects based on the most recent project created_at date
    order: [['created_at', 'DESC']],
    // JOIN to the user table using include
    include: [
      //include client model
      {
        model: User,
        attributes: ['user_id', 'username', 'user_first_name', 'user_last_name']
      }
    ]
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