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
          'project_title',
          'services_rendered',
          'project_start_date',
          'project_completion_date',
          'total_price_of_project',
          'fee_schedule',
          'length_of_project',
          'contract_created',
          'contract_signed',
          'created_at'
        ],
        // order projects based on the most recent project created_at date
        order: [['created_at', 'DESC']],
        // JOIN to the user table using include
        include: [
            //include client model
            {
              model: Client,
              attributes: ['client_id', 'client_first_name', 'client_last_name', 'client_company_name', 'client_email'],
              include: {
                model: User,
                attributes: ['username']
              }
            },
            {
                model: User,
                attributes: ['username']
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
            id: req.params.id
        },
        // define attributes
        attributes: [
          'project_id',
          'project_title',
          'services_rendered',
          'project_start_date',
          'project_completion_date',
          'total_price_of_project',
          'fee_schedule',
          'length_of_project',
          'contract_created',
          'contract_signed',
          'created_at'
        ],
        // order projects based on the most recent project created_at date
        order: [['created_at', 'DESC']],
        // JOIN to the user table using include
        include: [
            //include client model
            {
              model: Client,
              attributes: ['client_id', 'client_first_name', 'client_last_name', 'client_company_name', 'client_email'],
              include: {
                model: User,
                attributes: ['username']
              }
            },
            {
                model: User,
                attributes: ['username']
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

router.post('/', withAuth, (req, res) => {
    // expects info about project: project title, project_url, user_id...etc.
    Project.create({
        project_title: req.body.title,
        project_url: req.body.project_url,
        project_description: req.body.description,
        project_title: req.body.project_title,
        services_rendered: req.body.services_rendered,
        project_start_date: req.body.start_date,
        project_completion_date: req.body.project_completion,
        total_price_of_project: req.body.price_of_project,
        fee_schedule: req.body.fee_schedule,
        length_of_project: req.body.length_of_project,
        contract_created: req.body.contract_created,
        contract_signed: req.body.contract_signed,
        client_first_name: req.body.client_first_name,
        client_last_name: req.body.client_last_name,
        client_company_name: req.body.client_company_name,
        client_email: req.body.client_email,
        user_id: req.session.user_id
    })
    .then(dbProjectData => res.json(dbProjectData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Script could be used
// // Put /api/projects/upvote
// router.put('/upvote', (req, res) => {
//     // custom static method created in models/Post.js
//     Post.upvote(req.body, { Vote })
//         .then(updatedPostData => res.json(updatedPostData))
//         .catch(err => {
//             console.log(err);
//             res.status(400).json(err);
//         });
// });

router.put('/:id', (req, res) => {
    Project.update(
      {
        title: req.body.title
      },
      {
        where: {
          id: req.params.id
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
        id: req.params.id
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