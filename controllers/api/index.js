const router = require('express').Router();
const userRoutes = require('./userRoutes');
const feedbackRoutes = require('./feedbackRoutes');
const commentRoutes = require('./commentRoutes');

router.use('/users', userRoutes);
router.use('/feedbacks', feedbackRoutes);
router.use('/comments', commentRoutes);

module.exports = router;