const router = require('express').Router();
const { Feedback, User, Comment, Reply } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, (req, res) => {
    Feedback.findAll({
            where: {
                user_id: req.session.user_id
            },
            attributes: ['id', 'title', 'description', 'status', 'date_created'],
            include: [{
                    model: Comment,
                    attributes: ['id', 'comment', 'feedback_id', 'user_id', 'date_created'],
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
            // /dashboard/new?
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

// router.get('/dashboard/edit/:id', withAuth, (req, res) => {
//     Feedback.findOne({
//             where: {
//                 id: req.params.id
//             },
//             attributes: ['id', 'title', 'description', 'status', 'date_created'],
//             include: [{
//                     model: User,
//                     attributes: ['username']
//                 },
//                 {
//                     model: Comment,
//                     attributes: ['id', 'comment', 'feedback_id', 'user_id', 'date_created'],
//                     include: {
//                         model: User,
//                         attributes: ['username']
//                     }
//                 }
//             ]
//         })
//         .then(feedbackData => {
//             if (!feedbackData) {
//                 res.status(404).json({
//                     message: 'No post found with this id'
//                 });
//                 return;
//             }

//             const feedback = feedbackData.get({
//                 plain: true
//             });
//             res.render('edit-feedback', {
//                 feedback,
//                 logged_in: true
//             });
//         })
//         .catch(err => {
//             console.log(err);
//             res.status(500).json(err);
//         });
// });

router.get('/new', (req, res) => {
    res.render('new-feedback');
});

router.get('/edit', (req, res) => {
    res.render('edit-feedback');
});

module.exports = router;