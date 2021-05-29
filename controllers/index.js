// File to collect the packaged group of API endpoints and prefixing them with the path /api
const router = require('express').Router();

const apiRoutes = require('./api');

const homeRoutes = require('./home-routes.js');

router.use('/api', apiRoutes);

router.use('/', homeRoutes);

// Catch-all if a request is made to any endpoint that does not exist
router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;
