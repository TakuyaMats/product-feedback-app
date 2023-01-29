const User = require('./User');
const Feedback = require('./Feedback');
const Comment = require('./Comment');
const Reply = require('./Reply');

User.hasMany(Feedback, {
    foreignKey: 'user_id'
});

User.hasMany(Comment, {
    foreignKey: 'user_id',
    // onDelete: 'CASCADE'
});

User.hasMany(Reply, {
    foreignKey: 'user_id',
    // onDelete: 'CASCADE'
});

Feedback.belongsTo(User, {
    foreignKey: 'user_id',
    // onDelete: 'CASCADE'
});

Feedback.hasMany(Comment, {
    foreignKey: 'feedback_id',
    // onDelete: 'CASCADE'
});

// Feedback.hasMany(Reply, {
//     foreignKey: 'feedback_id',
//     // onDelete: 'CASCADE'
// });

Comment.belongsTo(Feedback, {
    foreignKey: 'feedback_id',
    // onDelete: 'CASCADE'
});

Comment.belongsTo(User, {
    foreignKey: 'user_id',
    // onDelete: 'CASCADE'
});

Comment.hasMany(Reply, {
    foreignKey: 'comment_id',
    // onDelete: 'CASCADE'
});

Reply.belongsTo(User, {
    foreignKey: 'user_id',
    // onDelete: 'CASCADE'
});

Reply.belongsTo(Comment, {
    foreignKey: 'comment_id',
    // onDelete: 'CASCADE'
});


// Feedback.belongsTo(User, {
//     foreignKey: 'user_id',
//     // onDelete: 'CASCADE'
// });

// Feedback.hasMany(Comment, {
//     foreignKey: 'feedback_id',
//     // onDelete: 'CASCADE'
// });

// Feedback.hasMany(Reply, {
//     foreignKey: 'reply_id',
//     // onDelete: 'CASCADE'
// });

// Reply.belongsTo(User, {
//     foreignKey: 'user_id',
//     // onDelete: 'CASCADE'
// });

// Reply.belongsTo(Comment, {
//     foreignKey: 'comment_id',
//     // onDelete: 'CASCADE'
// });

module.exports = {
    User,
    Comment,
    Feedback,
    Reply
};