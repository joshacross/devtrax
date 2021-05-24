const router = require('express').Router();
const sequelize = require('../config/connection');
const { Project, User } = require('../models');

router.get('/', (req, res) => {
  console.log(req.session);

  Project.findAll({
    attributes: [
      'id',
      'project_url',
      'title',
      'created_at',
    //   [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
    ],
    include: [
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
        const projects = dbProjectData.map(project => project.get({ plain: true}));
      // pass a single post object into the homepage template
      res.render('homepage', { projects });
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