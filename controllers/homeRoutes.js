const router = require('express').Router();
const { Feedback, User, Comment } = require('../models');

router.get('/', (req, res) => {
    Feedback.findAll({
        attributes: [ 'id', 'title', 'description' ],
            include: [{
                model: Comment,
                attributes: [ 'id', 'comment', 'feedback_id', 'user_id' ],
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
    .then(blogData => {
        const blogs = blogData.map(blog => blog.get({ plain: true }));
        res.render('homepage', { blogs, logged_in: req.session.logged_in });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});