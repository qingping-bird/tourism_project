const Sequelize = require("sequelize");
const sequelize = require('../db');
const Book = require('../model/books')

const Project = sequelize.define('projects', {
    id:{
        type: Sequelize.INTEGER, 
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        field: 'project_id'
    },
    project_sort: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    project_name: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    project_start_time: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    project_end_time: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    project_money: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    project_day: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    project_detail:{
        type: Sequelize.TEXT,
        allowNull: true
    },
    project_img:{
        type: Sequelize.STRING(1000),
        allowNull: true
    },
    project_count:{
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    project_active:{
        type: Sequelize.BOOLEAN, 
        allowNull: false, 
        defaultValue: true
    }
},
{
	freezeTableName: false,
	timestamps: true
});
//timestamp字段，默认为true，表示数据库中是否会自动更新createdAt和updatedAt字段，false表示不会增加这个字段。
//freezeTableName,默认为true,会自动给表名表示为复数: user => users，为false则表示，使用我设置的表名




module.exports = Project;