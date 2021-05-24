const router = require('express').Router();

const userRoutes = require('./user-routes.js');
const contractRoutes = require('./contract-routes');
// const commentRoutes = require('./comment-routes');

router.use('/users', userRoutes);
router.use('/posts', contractRoutes);
// router.use('/comments', commentRoutes);

module.exports = router;