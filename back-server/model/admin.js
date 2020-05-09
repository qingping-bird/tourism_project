const Sequelize = require("sequelize")
const sequelize = require('../db')

const Admin = sequelize.define('admin', {
    adminId:{
        type: Sequelize.INTEGER, 
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        field: 'admin_id'
    },
    phone: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true
    }
},
{
	freezeTableName: false,
	timestamps: true
})


//创建表，默认是false，true则是删除原有表，再创建

module.exports = Admin;