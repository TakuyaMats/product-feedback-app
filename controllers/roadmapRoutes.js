const router = require('express').Router();
const { Feedback, User, Comment, Reply } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', (req, res) => {
    res.render('roadmap');
});

module.exports = router;