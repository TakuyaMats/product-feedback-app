const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const {
    User,
    Feedback,
    Comment
} = require('../../models');

router.get('/', (req, res) => {
    User.findAll({
            attributes: {
                exclude: ["password"]
            }
        })
        .then(userData => res.json(userData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/:id', (req, res) => {
    User.findOne({
            attributes: {
                exclude: ['password']
            },
            where: {
                id: req.params.id
            },
            include: [{
                    model: Feedback,
                    attributes: [ 'id', 'title', 'category', 'upvotes', 'status', 'description']
                },
                {
                    model: Comment,
                    attributes: ['id', 'content', 'feedback_id', 'user_id'],
                    include: {
                        model: Feedback,
                        attributes: ['title']
                    }
                },
                {
                    model: Feedback,
                    attributes: ['title'],
                }
            ]
        })
        .then(userData => {
            if (!userData) {
                res.status(404).json({
                    message: 'No user found with this id'
                });
                return;
            }
            res.json(userData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/css/user-images')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const fileFilter = function (req, file, cb) {
    if (file.fieldname === 'photo') {
        cb(null, true)
    } else {
        cb(new Error('Unexpected field'))
    }
}

const upload = multer({ storage: storage, fileFilter: fileFilter })

function uploadMiddleware(req, res, next) {
    upload.single('photo')(req, res, function(err) {
        if (err) {
            console.log(err);
            res.status(400).json(err);
        } else {
            next();
        }
    });
}

router.post('/signup', uploadMiddleware, async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'Photo is required' });
        }
        
        const userData = {
            name: req.body.name,
            photo: '/css/user-images/' + req.file.filename,
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        };

        const newUser = await User.create(userData);
        req.session.save(() => {
            req.session.user_id = newUser.id;
            req.session.user = newUser;
            req.session.logged_in = true;
            console.log(newUser)
            res.redirect('/');
        });
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});

router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({
            where: {
                email: req.body.email
            }
        });

        if (!userData) {
            res
                .status(400)
                .json({
                    message: 'Incorrect email or password, please try again'
                });
            return;
        }

        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res
                .status(400)
                .json({
                    message: 'Incorrect email or password, please try again'
                });
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.json({
                user: userData,
                message: 'You are now logged in!'
            });
        });

    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

router.put('/:id', (req, res) => {

    User.update(req.body, {
            individualHooks: true,
            where: {
                id: req.params.id
            }
        })
        .then(userData => {
            if (!userData[0]) {
                res.status(404).json({
                    message: 'No user found with this id'
                });
                return;
            }
            res.json(userData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });

});

router.delete('/:id', (req, res) => {
    User.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(userData => {
            if (!userData) {
                res.status(404).json({
                    message: 'No user found with this id'
                });
                return;
            }
            res.json(userData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;