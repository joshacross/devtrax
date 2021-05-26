const router = require('express').Router();
const sequelize = require('../config/connection');
const { Project, User } = require('../models');

// Insert Rate - Const Data = [ project_title, etc...]
const projectdata = [
  {
      project_id: "12345",
      client_first_name: "ricardo",
      client_last_name: "limon",
      client_company: "limon auto",
      contract_signed: true,
      date_contract_created: DateTime.new(2021, 6 , 30 ,0),
      project_title: "Limon Auto Website and Branding",
      project_description: "full graphic design with brandboard and a website with site navigation using html, css, and javascript",
      services_rendered: "front-end web development",
      project_start_date: DateTime.new(2021, 7, 1, 0),
      project_completion_date: DateTime.new(2021, 7 , 14 ,0),
      total_price_of_project: 5000.00,
      fee_schedule: "paid in full",
      length_of_project: "2 weeks"
  }
];


router.get('/', (req, res) => {
  console.log(req.session);

  // Project.findAll({
  //   attributes: [
  //     'id',
  //     'project_url',
  //     'title',
  //     'created_at',
  //   //   [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
  //   ],
  //   include: [
  //     {
  //       model: Comment,
  //       attributes: ['id', 'comment_text', 'project_id', 'user_id', 'created_at'],
  //       include: {
  //         model: User,
  //         attributes: ['username']
  //       }
  //     },
  //     {
  //       model: User,
  //       attributes: ['username']
  //     }
  //   ]
  // })
    // .then(dbProjectData => {
    //     const projects = dbProjectData.map(project => project.get({ plain: true}));
      // pass a single post object into the homepage template
      res.render('homepage', { projectdata });
    // })
    // .catch(err => {
    //   console.log(err);
    //   res.status(500).json(err);
    // });
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

module.exports = router;