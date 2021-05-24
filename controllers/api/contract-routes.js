const router = require('express').Router();
const { Contract, User } = require('../../models');
const sequelize = require('../../config/connection');

// get all users
router.get('/', (req, res) => {
    Contract.findAll({
        // define attributes
        attributes: [
            'id', 
            'contract_url', 
            'title', 
            'created_at'
            // [
            //     sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'),
            //     'vote_count'
            // ]
        ],
        // order contracts based on the most recent created_at date
        order: [['created_at', 'DESC']],
        // JOIN to the user table using include
        include: [
            //include comment model
            {
              model: Comment,
              attributes: ['id', 'comment_text', 'contract_id', 'user_id', 'created_at'],
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
    .then(dbContractData => res.json(dbContractData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// get one user
router.get('/:id', (req, res) => {
    Contract.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id', 
            'contract_url', 
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
              attributes: ['id', 'comment_text', 'contract_id', 'user_id', 'created_at'],
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
    .then(dbContractData => {
        if (!dbContractData) {
            res.status(404).json({ message: 'No contract found with this id'});
            return;
        }
        res.json(dbContractData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
    // expects title, contract_url, user_id
    Contract.create({
        title: req.body.title,
        contract_url: req.body.contract_url,
        user_id: req.body.user_id
    })
    .then(dbContractData => res.json(dbContractData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Script could be used
// // Put /api/contracts/upvote
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
    Contract.update(
      {
        title: req.body.title
      },
      {
        where: {
          id: req.params.id
        }
      }
    )
      .then(dbContractData => {
        if (!dbContractData) {
          res.status(404).json({ message: 'No Contract found with this id' });
          return;
        }
        res.json(dbContractData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  router.delete('/:id', (req, res) => {
    Contract.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(dbContractData => {
        if (!dbContractData) {
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