const router = require('express').Router();
const sequelize = require('../config/connection');
const { Project, User } = require('../models');
const passport = require('passport');
require('dotenv').config();

// router.get(
//   "/",
//   passport.authenticate("auth0", {
//     scope: "openid email profile"
//   }),
//   (req, res) => {
//     res.render('profile');
//   }
// );


// Home Page , if logged in go to homepage (index.handlebars), if not redirect to login to trigger Auth0
router.get('/', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.redirect('/login');
});

// login route (verification), if 
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;

  } else {
  res.redirect('/login');
  }
});

router.get('/profile', (req, res) => {
  console.log(req.session);

  Project.findAll({
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
      'created_at',
      'updated_at'
    ],
    include: [
      {
        model: User,
        attributes: ['user_id', 'username', 'first_name', 'last_name']
      }
    ]
  })
    .then(dbProjectData => {
        const projects = dbProjectData.map(project => project.get({ plain: true}));
      // pass a single post object into the homepage template
      res.render('index', { projects });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


//GET /api/users/1
router.get('/profile/:id', async (req, res) => {
  let user = await User.findOne({
    attibutes: { exclude: ['password'] },
    where: {
      user_id: req.params.id
    },
  });
  let projects = await Project.findAll({
    where: {
      user_id: req.params.id
    },
  })
  console.log(projects);
  res.render("profile", { user, projects });
});

router.get('/', (req, res) => {
  console.log(req.session);

  Project.findAll({
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
      'created_at',
      'updated_at'
    ],
    include: [
      {
        model: User,
        attributes: ['user_id', 'username', 'first_name', 'last_name']
      }
    ]
  })
    .then(dbProjectData => {
      const projects = dbProjectData.map(project => project.get({ plain: true }));
      // pass a single post object into the homepage template
      res.render('project', { projects });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/calendar', (req, res) => {
  res.render('calendar');
})

module.exports = router;