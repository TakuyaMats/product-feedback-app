const router = require('express').Router();
const { Feedback, User, Comment, Reply } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, (req, res) => {
    Feedback.findAll({
            where: {
                user_id: req.session.user_id
            },
            attributes: ['id', 'title', 'description', 'status', 'created_at'],
            include: [{
                    model: Comment,
                    attributes: ['id', 'comment', 'feedback_id', 'user_id', 'created_at'],
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
            const feedbacks = feedbackData.map(feedback => feedback.get({
                plain: true
            }));
            res.render('dashboard', {
                feedbacks,
                logged_in: true
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/edit/:id', withAuth, (req, res) => {
    Feedback.findOne({
            where: {
                id: req.params.id
            },
            attributes: ['id', 'title', 'description', 'status', 'created_at'],
            include: [{
                    model: User,
                    attributes: ['username']
                },
                {
                    model: Comment,
                    attributes: ['id', 'content', 'feedback_id', 'user_id', 'created_at' ],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                }
            ]
        })
        .then(feedbackData => {
            if (!feedbackData) {
                res.status(404).json({
                    message: 'No post found with this id'
                });
                return;
            }

            const feedback = feedbackData.get({
                plain: true
            });
            res.render('edit-feedback', {
                feedback,
                logged_in: true
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/new', (req, res) => {
    res.render('new-feedback');
});

module.exports = router;