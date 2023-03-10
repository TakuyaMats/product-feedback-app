const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Reply extends Model {}

Reply.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    content: {
        type: DataTypes.STRING,
        validate: {
            len: [3]
        }
    },
    comment_id: {
        type: DataTypes.INTEGER,
        reference: {
            model: 'comment',
            key: 'id'
        }
    },
    replyingTo: {
        type: DataTypes.STRING,
        reference: {
            model: 'user',
            key: 'id'
        }
    },
    user_id: {
        type: DataTypes.INTEGER,
        reference: {
            model: 'user',
            key: 'id'
        }
    }
}, {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'reply'
});

module.exports = Reply;