const router = require('express').Router();
const { Project, User } = require('../../models');
const sequelize = require('../../config/connection');

// get all users
router.get('/', (req, res) => {
    Project.findAll({
        // define attributes
        attributes: [
            'id', 
            'project_url', 
            'title', 
            'created_at'
            // [
            //     sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'),
            //     'vote_count'
            // ]
        ],
        // order projects based on the most recent created_at date
        order: [['created_at', 'DESC']],
        // JOIN to the user table using include
        include: [
            //include comment model
            {
              model: Comment,
              attributes: ['id', 'comment_text', 'project_id', 'user_id', 'created_at'],
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
        attributes: [
            'id', 
            'project_url', 
            'title', 
            'created_at'
            // [
            //     sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'),
            //     'vote_count'
            // ]
        ],
        include: [
            //include comment model
            {
              model: Comment,
              attributes: ['id', 'comment_text', 'project_id', 'user_id', 'created_at'],
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

router.post('/', (req, res) => {
    // expects title, project_url, user_id
    Project.create({
        title: req.body.title,
        project_url: req.body.project_url,
        user_id: req.body.user_id
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