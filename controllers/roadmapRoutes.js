const router = require('express').Router();
const { Feedback, User, Comment, Reply } = require('../models');
const { Op } = require("sequelize");
// const withAuth = require('../utils/auth');

router.get('/', (req, res) => {
    Feedback.findAll({
        where: {
            [Op.or]: [{
                status: { [Op.eq]: 'planned'},
            },
            {
                status: { [Op.eq]: 'in progress'},
            },
            {
                status: { [Op.eq]: 'live'},
            },
        ],
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
        const planned = feedbackData.filter(feedback => {
            return feedback.status === 'planned'
        }).map(planned => planned.get({ plain: true}));

        const live = feedbackData.filter(feedback => {
            return feedback.status === 'live'
        }).map(live => live.get({ plain: true}));

        const inProgress = feedbackData.filter(feedback => {
            return feedback.status === 'in progress'
        }).map(inProgress => inProgress.get({ plain: true}));

        res.render('roadmap', { planned, live, inProgress, logged_in: req.session.logged_in });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
        });
});

module.exports = router;