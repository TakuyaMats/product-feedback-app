const User = require('./User');
const Feedback = require('./Feedback');
const Comment = require('./Comment');
const Reply = require('./Reply');

User.hasMany(Feedback, {
    foreignKey: 'user_id'
});

User.hasMany(Comment, {
    foreignKey: 'user_id',
});

User.hasMany(Reply, {
    foreignKey: 'user_id',
});

Feedback.belongsTo(User, {
    foreignKey: 'user_id',
});

Feedback.hasMany(Comment, {
    foreignKey: 'feedback_id',
});

Comment.belongsTo(Feedback, {
    foreignKey: 'feedback_id',
});

Comment.belongsTo(User, {
    foreignKey: 'user_id',
});

Comment.hasMany(Reply, {
    foreignKey: 'comment_id',
});

Reply.belongsTo(User, {
    foreignKey: 'user_id',
});

Reply.belongsTo(Comment, {
    foreignKey: 'comment_id',
});

module.exports = {
    User,
    Comment,
    Feedback,
    Reply
};