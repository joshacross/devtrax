const router = require('express').Router();
const sequelize = require('../config/connection');
const { Contract, User } = require('../models');

router.get('/', (req, res) => {
  console.log(req.session);

  Contract.findAll({
    attributes: [
      'id',
      'contract_url',
      'title',
      'created_at',
    //   [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
    ],
    include: [
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
        const contracts = dbContractData.map(contract => contract.get({ plain: true}));
      // pass a single post object into the homepage template
      res.render('homepage', { contracts });
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

module.exports = router;