const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Replies extends Model {}

Replies.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    comment: {
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
    modelName: 'replies'
});

module.exports = Replies;