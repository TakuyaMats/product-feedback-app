const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init({
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
    feedback_id: {
        type: DataTypes.INTEGER,
        reference: {
            model: 'feedback',
            key: 'id'
        }
    },
    // username: {
    //     type: DataTypes.STRING,
    //     reference: {
    //         model: 'user',
    //         key: 'id'
    //     }
    // },
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
    modelName: 'comment'
});

module.exports = Comment;