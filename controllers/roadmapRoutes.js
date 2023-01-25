const router = require('express').Router();
const { Feedback, User, Comment, Reply } = require('../models');
const { Op } = require("sequelize");
const withAuth = require('../utils/auth');

router.get('/', (req, res) => {
    Feedback.findAll({
        where: {
            [Op.or]: [
                { status: 'planned' },
                { status: 'live' },
                { status: 'in-progress' }
            ]
        },
        attributes: [ 'id', 'title', 'category', 'upvotes', 'status', 'description'],
            include: [{
                model: Comment,
                attributes: [ 'id', 'content', 'feedback_id', 'user_id' ],
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
    .then(feedbackData => {
        const planned = feedbackData.map(feedback => {
            if (feedback.status === 'planned') {
                return feedback.get({ plain: true })
            }
        });

        const live = feedbackData.map(feedback => {
            if (feedback.status === 'live') {
                return feedback.get({ plain: true })
            }
        });

        const inProgress = feedbackData.map(feedback => {
            if (feedback.status === 'in-progress') {
                return feedback.get({ plain: true })
            }
        });

        res.render('roadmap', { planned, live, inProgress, logged_in: req.session.logged_in });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
        });
});

module.exports = router;