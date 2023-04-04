// const router = require('express').Router();
// const { Reply } = require('../../models')
// const withAuth = require('../../utils/auth');

// router.get('/', (req, res) => {
//     Reply.findAll({})
//         .then(replyData => res.json(replyData))
//         .catch(err => {
//             console.log(err);
//             res.status(500).json(err);
//         })
// });

// router.get('/:id', (req, res) => {
//     Reply.findAll({
//             where: {
//                 id: req.params.id
//             }
//         })
//         .then(replyData => res.json(replyData))
//         .catch(err => {
//             console.log(err);
//             res.status(500).json(err);
//         })
// });

// // router.post('/', withAuth, (req, res) => {
// //     if (req.session) {
// //         Reply.create({
// //                 content: req.body.content,
// //                 comment_id: req.body.comment_id,
// //                 user_id: req.session.user_id,
// //             })
// //             .then(replyData => res.json(replyData))
// //             .catch(err => {
// //                 console.log(err);
// //                 res.status(400).json(err);
// //             })
// //     }
// // });

// router.post('/', withAuth, (req, res) => {
//     if (!req.session) {
//         res.status(401).json({ message: 'You need to be logged in to create a reply' });
//         return;
//     }

//     // Check if required fields are present in request body
//     if (!req.body.content || !req.body.comment_id) {
//         res.status(400).json({ message: 'Content and Comment ID are required' });
//         return;
//     }

//     Reply.create({
//         content: req.body.content,
//         comment_id: req.body.comment_id,
//         user_id: req.session.user_id,
//     })
//         .then(replyData => res.json(replyData))
//         .catch(err => {
//         console.log(err);
//         res.status(500).json(err);
//     });
// });


// router.put('/:id', withAuth, (req, res) => {
//     Reply.update({
//         content: req.body.content
//     }, {
//         where: {
//             id: req.params.id
//         }
//     }).then(replyData => {
//         if (!replyData) {
//             res.status(404).json({ message: 'No reply found with this id' });
//             return;
//         }
//         res.json(replyData);
//     }).catch(err => {
//         console.log(err);
//         res.status(500).json(err);
//     });
// });

// router.delete('/:id', withAuth, (req, res) => {
//     Reply.destroy({
//         where: {
//             id: req.params.id
//         }
//     }).then(replyData => {
//         if (!replyData) {
//             res.status(404).json({ message: 'No reply found with this id' });
//             return;
//         }
//         res.json(replyData);
//     }).catch(err => {
//         console.log(err);
//         res.status(500).json(err);
//     });
// });


// module.exports = router;