const User = require('./User');
const Feedback = require('./Feedback');
const Comment = require('./Comment');
const Replies = require('./Replies');

User.hasMany(Feedback, {
    foreignKey: 'user_id'
});

User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

User.hasMany(Replies, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
})

Comment.belongsTo(Feedback, {
    foreignKey: 'feedback_id',
    onDelete: 'CASCADE'
});

Comment.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Comment.hasMany(Replies, {
    foreignKey: 'replies_id',
    onDelete: 'CASCADE'
})

Feedback.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Feedback.hasMany(Comment, {
    foreignKey: 'feedback_id',
    onDelete: 'CASCADE'
});

Replies.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Replies.belongsTo(Comment, {
    foreignKey: 'comment_id',
    onDelete: 'CASCADE'
});

module.exports = {
    User,
    Comment,
    Feedback
};