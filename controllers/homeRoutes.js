const router = require('express').Router();
const { Feedback, User, Comment, Reply } = require('../models');

router.get('/', (req, res) => {
    Feedback.findAll({
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
        const feedbacks = feedbackData.map(feedback => feedback.get({ plain: true }));
        res.render('homepage', { feedbacks, logged_in: req.session.logged_in });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/feedback/:id', (req, res) => {
    Feedback.findOne({
            where: {
                id: req.params.id
            },
            attributes: [ 'id', 'title', 'category', 'upvotes', 'status', 'description'],
            include: [{
                    model: Comment,
                    attributes: [ 'id', 'content', 'feedback_id', 'user_id' ],
                    include: {
                        model: User,
                        attributes: ['username', 'name']
                    }
                },
                {
                    model: User,
                    attributes: ['username', 'name']
                }
            ]
        })
        .then(feedbackData => {
            if (!feedbackData) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }
            const feedback = feedbackData.get({ plain: true });
            res.render('single-feedback', { feedback, logged_in: req.session.logged_in });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;