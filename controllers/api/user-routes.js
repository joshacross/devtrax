const router = require('express').Router();
const { User, Post, Vote, Comment } = require('../../models');

// GET /api/users
router.get('/', (req, res) => {
    // Access our User model and run .findAll() method
    User.findAll({
        attibutes: { exclude: ['password'] }
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//GET /api/users/1
router.get('/:id', (req, res) => {
    User.findOne({
        attibutes: { exclude: ['password'] },
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Project,
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
                ]
            }
        ]
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id'});
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// POST /api/users
router.post('/', (req, res) => {
    // expects {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234'}
    User.create({
        username: req.body.username,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password
    })
    .then(dbUserData => {
        req.session.user_id = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.loggedIn = true;

        res.json(dbUserData);
    });
});

router.post('/login', (req, res) => {
    // Query Operation > expects email, password
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(dbUserData => {
        if (!dbUserData) {
            res.status(400).json({ message: 'No user with that email address!'});
            return;
        }

        // Verify User
        const validPassword = dbUserData.checkPassword(req.body.password);
            if (!validPassword) {
                res.status(400).json({ message: 'Incorrect password!'});
                return;
            }

        req.session.save(() => {
            //declare session variables
        req.session.user_id = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.loggedIn = true;
            
        res.json({ user: dbUserData, message: 'You are now logged in!'});
        });
    });
});

router.post('/logout', (req, res) => {
    if(req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    }
    else {
        res.status(404).end();
    }
});

// PUT /api/users/1
router.put('/:id', (req, res) => {
    // expects {username, email, password}

    // if req.body has exact key.value pairs to match the model, use req.body instead
    User.update(req.body, {
        individualHooks: true,
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if (!dbUserData[0]) {
            res.status(404).json({ message: 'No user found with this id'});
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// DELETE /api/users/1
router.delete('/:id', (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id'});
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;