const router = require('express').Router();
const { Feedback, Comment, User, Reply } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
    Feedback.findAll({
            attributes: [ 'id', 'title', 'category', 'upvotes', 'status', 'description'],
            order: [
                ['date_created', 'DESC']
            ],
            include: [{
                    model: User,
                    attributes: ['username', 'name']
                },
                {
                    model: Comment,
                    attributes: ['id', 'content', 'feedback_id', 'user_id', 'reply_id'],
                    include: [{
                        model: User,
                        attributes: ['username', 'name'],
                    },{
                        model: Reply,
                        attributes: ['content', 'replyingTo']
                    }]
                }
            ]
        })
        .then(feedbackData => res.json(feedbackData.reverse()))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/:id', (req, res) => {
    Feedback.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'title', 'category', 'upvotes', 'status', 'description'],
        include: [{
            model: User,
            attributes: ['username', 'name', 'email']
        }, {
            model: Comment,
            attributes: ['id', 'content', 'feedback_id', 'user_id', 'reply_id'],
            include: [{
                model: User,
                attributes: ['username', 'name', 'email'],
            }, {
                model: Reply,
                attributes: ['content', 'replyingTo']
            }]
        }]
    }).then(feedbackData => {
        if (!feedbackData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }
        // pass the comments data to the template context
        const context = {
            feedback: feedbackData.toJSON(),
            comments: feedbackData.Comment.map(comment => comment.toJSON())
        };

        res.render('single-feedback', context);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/', withAuth, (req, res) => {
    Feedback.create({
            title: req.body.title,
            category: req.body.category,
            status: req.body.status,
            description: req.body.description,
            user_id: req.session.user_id
        })
        .then(feedbackData => res.json(feedbackData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// router.put('/:id/upvote', withAuth, (req, res) => {
//     const { upvotes } = req.body.upvotes;
//     const { id } = req.params.id;

//     Feedback.update({ upvotes }, { where: { id } })
//         .then(() => res.json({ success: true }))
//         .catch(err => {
//         console.log(err);
//         res.status(500).json(err);
//         });
// });

router.put('/:id/upvote', withAuth, (req, res) => {
    Feedback.update({
            upvotes: req.body.upvotes
        }, {
            where: {
                id: req.params.id
            }
        }).then(() => res.json({ success: true }))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.put('/:id', withAuth, (req, res) => {
    Feedback.update({
            title: req.body.title,
            category: req.body.category,
            status: req.body.status,
            description: req.body.description
        }, {
            where: {
                id: req.params.id
            }
        }).then(feedbackData => {
            if (!feedbackData) {
                res.status(404).json({ message: 'No feedback found with this id' });
                return;
            }
            res.json(feedbackData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.delete('/:id', withAuth, (req, res) => {
    Feedback.destroy({
        where: {
            id: req.params.id
        }
    }).then(feedbackData => {
        if (!feedbackData) {
            res.status(404).json({ message: 'No feedback found with this id' });
            return;
        }
        res.json(feedbackData);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;