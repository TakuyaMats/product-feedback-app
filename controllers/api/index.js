const router = require('express').Router();
const userRoutes = require('./userRoutes');
const feedbackRoutes = require('./feedbackRoutes');
const commentRoutes = require('./commentRoutes');
// const replyRoutes = require('./replyRoutes');

router.use('/users', userRoutes);
router.use('/feedbacks', feedbackRoutes);
router.use('/comments', commentRoutes);
// router.use('/replies', replyRoutes);

module.exports = router;