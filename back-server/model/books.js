const Sequelize = require("sequelize");
const sequelize = require('../db');
const User = require('../model/user')
const Projects = require('../model/projects')

const Book = sequelize.define('books', {
    bookId:{
        type: Sequelize.INTEGER, 
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        field: 'book_id'
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'user_id'
    },
    projectId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'project_id'
    },
    book_time: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    book_count: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    book_comment:{
        type: Sequelize.TEXT,
        allowNull: true
    },
    comment_time:{
        type: Sequelize.STRING(100),
        allowNull: true
    },
    refund_time:{
        type: Sequelize.STRING(100),
        allowNull: true
    },
    book_state:{
        type: Sequelize.INTEGER,
        defaultValue: 0
    }
},
{
	freezeTableName: false,
	timestamps: true
});
//timestamp字段，默认为true，表示数据库中是否会自动更新createdAt和updatedAt字段，false表示不会增加这个字段。
//freezeTableName,默认为true,会自动给表名表示为复数: user => users，为false则表示，使用我设置的表名


//创建表，默认是false，true则是删除原有表，再创建

module.exports = Book;