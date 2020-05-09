const Sequelize = require("sequelize")
const sequelize = require('../db')

const Home = sequelize.define('home', {
    homeId:{
        type: Sequelize.INTEGER, 
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        field: 'home_id'
    },
    homeImg: {
        type: Sequelize.STRING(100),
        allowNull: true,
        field: 'home_img'
    },
    homeTitle: {
        type: Sequelize.STRING(100),
        allowNull: true,
        field: 'home_title'
    },
    homeText: {
        type: Sequelize.STRING(100),
        allowNull: true,
        field: 'home_text'
    },
    homeHref: {
        type: Sequelize.STRING(100),
        allowNull: true,
        field: 'home_href'
    }
},
{
	freezeTableName: false,
	timestamps: true
});
//timestamp字段，默认为true，表示数据库中是否会自动更新createdAt和updatedAt字段，false表示不会增加这个字段。
//freezeTableName,默认为true,会自动给表名表示为复数: user => users，为false则表示，使用我设置的表名


//创建表，默认是false，true则是删除原有表，再创建

module.exports = Home;