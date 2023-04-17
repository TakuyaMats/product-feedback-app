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

        let plannedCount = 0;
        let inProgressCount = 0;
        let liveCount = 0;

        feedbacks.forEach(feedback => {
            if (feedback.status === 'planned') {
                plannedCount += 1;
            } else if (feedback.status === 'in progress') {
                inProgressCount += 1;
            } else if (feedback.status === 'live') {
                liveCount += 1;
            }
        });

        res.render('homepage', { feedbacks, plannedCount, inProgressCount, liveCount, logged_in: req.session.logged_in });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

router.get('/signup', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }
    res.render('signup');
});

router.post('/signup', async (req, res) => {
    try {
        const userData = await User.create(req.body);

        req.session.save(() => {
            req.session.id = userData.id;
            req.session.logged_in = true;
            res.status(200).json(userData);
            console.log(userData);
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

router.get('/:category', (req, res) => {
    const category = req.params.category;
    console.log(category);

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
        let feedbacks = feedbackData.map(feedback => feedback.get({ plain: true }));

        let plannedCount = 0;
        let inProgressCount = 0;
        let liveCount = 0;
        let filteredFeedbackArr = [];

        feedbacks.forEach(feedback => {
            if (feedback.status === 'planned') {
                plannedCount += 1;
            } else if (feedback.status === 'in progress') {
                inProgressCount += 1;
            } else if (feedback.status === 'live') {
                liveCount += 1;
            }

            if (feedback.category === category) {
                filteredFeedbackArr.push(feedback);
            }
        });

        if (category === 'all') {
            filteredFeedbackArr = feedbacks;
        }

        feedbacks = filteredFeedbackArr
        
        res.render('homepage', { feedbacks, plannedCount, inProgressCount, liveCount, logged_in: req.session.logged_in });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/sortBy/:column/:sortDirection', (req, res) => {
    const { column, sortDirection } = req.params;

    Feedback.findAll({
        order: [
            [ column, sortDirection ] // convert to uppercase for consistency
        ],
        attributes: [ 'id', 'title', 'category', 'upvotes', 'status', 'description'],
        include: [
            {
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

        let plannedCount = 0;
        let inProgressCount = 0;
        let liveCount = 0;

        feedbacks.forEach(feedback => {
            if (feedback.status === 'planned') {
                plannedCount += 1;
            } else if (feedback.status === 'in progress') {
                inProgressCount += 1;
            } else if (feedback.status === 'live') {
                liveCount += 1;
            }
        });

        res.render('homepage', { feedbacks, plannedCount, inProgressCount, liveCount, logged_in: req.session.logged_in });
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
            include: [
                {
                    model: Comment,
                    attributes: [ 'id', 'content', 'feedback_id', 'user_id' ],
                    include: [{
                        model: User,
                        attributes: ['id', 'username', 'name', 'photo'],
                    },
                    {
                        model: Reply,
                        attributes: [ 'id', 'content', 'comment_id', 'replyingTo', 'user_id' ],
                        include: {
                            model: User,
                            attributes: ['id', 'username', 'name', 'photo'],
                        }
                    }]
                },
                {
                    model: User,
                    attributes: ['id', 'username', 'name', 'photo'],
                }
    ]
        })
        .then(feedbackData => {
            if (!feedbackData) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }
            const feedback = feedbackData.get({ plain: true });
            if (!req.session.logged_in) {
                feedback.comments.user_id = -1; // set default value for user_id
                feedback.comments.user = { username: 'anonymous' }; // set default value for user
            }
            res.render('single-feedback', { feedback, logged_in: req.session.logged_in });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;