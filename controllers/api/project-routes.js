const router = require('express').Router();
const { Project, User, Client } = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');

// get all users
router.get('/', (req, res) => {
    Project.findAll({
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
    .then(dbProjectData => res.json(dbProjectData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// get one user
router.get('/:id', (req, res) => {
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
            res.status(404).json({ message: 'No project found with this id'});
            return;
        }
        res.json(dbProjectData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
    // expects info about project: project title, project_url, user_id...etc.
    Project.create({
        project_url: req.body.project_url,
        project_title: req.body.project_title,
        project_description: req.body.project_description,
        services_rendered: req.body.services_rendered,
        services_rendered_description: req.body.rendered_description,
        project_start_date: req.body.start_date,
        project_completion_date: req.body.project_completion,
        total_price_of_project: req.body.total_price_of_project,
        fee_schedule: req.body.fee_schedule,
        length_of_project: req.body.length_of_project,
        client_first_name: req.body.client_first_name,
        client_last_name: req.body.client_last_name,
        client_email: req.body.client_email_address,
        client_company_name: req.body.client_company_name,
        client_billing_address: req.body.client_billing_address,
        client_city: req.body.client_city,
        client_zipcode: req.body.client_zipcode,
        contract_signed: req.body.contract_signed,
        contract_created_date: req.body.contract_created_date,
        contract_signed_date: req.body.contract_signed_date,
        user_id: req.session.user_id
    })
    .then(dbProjectData => res.json(dbProjectData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
    Project.update(
      {
        project_url: req.body.project_url,
        project_title: req.body.title,
        project_description: req.body.description,
        services_rendered: req.body.services_rendered,
        services_rendered_description: req.body.rendered_description,
        project_start_date: req.body.start_date,
        project_completion_date: req.body.project_completion,
        total_price_of_project: req.body.price_of_project,
        fee_schedule: req.body.fee_schedule,
        length_of_project: req.body.length_of_project,
        client_first_name: req.body.client_first_name,
        client_last_name: req.body.client_last_name,
        client_email: req.body.client_email_address,
        client_company_name: req.body.client_company_name,
        client_billing_address: req.body.client_billing_address,
        client_city: req.body.client_city,
        client_zipcode: req.body.client_zipcode,
        contract_signed: req.body.contract_signed,
        contract_created_date: req.body.contract_created_date,
        contract_signed_date: req.body.contract_signed_date,
      },
      {
        where: {
          project_id: req.params.id
        }
      }
    )
      .then(dbProjectData => {
        if (!dbProjectData) {
          res.status(404).json({ message: 'No Project found with this id' });
          return;
        }
        res.json(dbProjectData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  router.delete('/:id', (req, res) => {
    Project.destroy({
      where: {
        project_id: req.params.id
      }
    })
      .then(dbProjectData => {
        if (!dbProjectData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }
        res.json(dbPostData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

module.exports = router;