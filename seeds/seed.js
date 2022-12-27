const sequelize = require('../config/connection');
const { User, Feedback, Comment, Reply } = require('../models');

// const userData = require('')
const feedbackData = require('./feedbackData.json');

const seedDatabase = async () => {
    await sequelize.sync({
        force: true
    });

    const users = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    for (const feedback of feedbackData) {
        await Feedback.create({
            ...feedback,
            user_id: user[Math.floor(Math.floor() * users.length)].id
        });
    }

    await Comment.bulkCreate(commentData, {
        individualHooks: true,
        returning: true,
    });

    await Reply.bulkCreate(replyData, {
        individualHooks: true,
        returning: true,
    })

    process.exit(0)
};

seedDatabase();