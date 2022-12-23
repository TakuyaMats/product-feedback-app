const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Feedback extends Model {}

Feedback.init({
    id: {
        type: DataTypes.INTEGER,
        allowNulls: false,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'user',
            key: 'id'
        },
    },
}, {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'feedback'
});

module.exports = Feedback;