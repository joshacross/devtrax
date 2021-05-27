const router = require('express').Router();
const sequelize = require('../config/connection');
const { Project, User } = require('../models');

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
        const projects = dbProjectData.map(project => project.get({ plain: true}));
      // pass a single post object into the homepage template
      res.render('homepage', { projectdata });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

router.get('/profile', (req, res) => {
  console.log(req.session);

  User.findAll({
    attributes: [
      'user_id',
      'username',
      'first_name',
      'last_name',
    //   [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
    ]
  })
    .then(dbUserData => {
        const users = dbUserData.map(user => user.get({ plain: true}));
      // pass a single post object into the profile template
      res.render('profile', { projectdata });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
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
        const projects = dbProjectData.map(project => project.get({ plain: true}));
      // pass a single post object into the homepage template
      res.render('project', { projectdata });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;