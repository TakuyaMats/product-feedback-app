const sequelize = require('../config/connection');
const { User, Feedback, Comment, Reply } = require('../models');


const userData = require('./userData.json');
const feedbackData = require('./feedbackData.json');
const commentData = require('./commentData.json');
const replyData = require('./replyData.json');

const seedDatabase = async () => {
    await sequelize.sync({
        force: true
    });

    await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    await Feedback.bulkCreate(feedbackData, {
        individualHooks: true,
        returning: true,
    });

    await Comment.bulkCreate(commentData, {
        individualHooks: true,
        returning: true,
    });

    await Reply.bulkCreate(replyData, {
        individualHooks: true,
        returning: true,
    });

    process.exit(0)
};

seedDatabase();