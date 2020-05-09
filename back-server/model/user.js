const Sequelize = require("sequelize");
const sequelize = require('../db');
const Book = require('../model/books')

const User = sequelize.define('users', {
    id:{
        type: Sequelize.INTEGER, 
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        field: 'id'
    },
    username: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true
    },
    phone: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    avatar:{
        type: Sequelize.STRING(100),
        allowNull: true
    }
},
{
	freezeTableName: false,
	timestamps: true
});
//timestamp字段，默认为true，表示数据库中是否会自动更新createdAt和updatedAt字段，false表示不会增加这个字段。
//freezeTableName,默认为true,会自动给表名表示为复数: user => users，为false则表示，使用我设置的表名





module.exports = User;