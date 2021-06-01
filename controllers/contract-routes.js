const router = require('express').Router();
const sequelize = require('../config/connection');
const { Project, User } = require('../models');
const passport = require('passport');
require('dotenv').config();

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
          attributes: ['user_id', 'username', 'first_name', 'last_name']
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
          attributes: ['user_id', 'username', 'first_name', 'last_name']
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


module.exports = router;
