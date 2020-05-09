const Sequelize = require("sequelize");
const sequelize = require('../db');
const User = require('../model/user')
const Projects = require('../model/projects')
const Book = require('../model/books')
const Home = require('../model/home')
const Admin=require('../model/admin')


Book.sync({
    force: false
})

Projects.sync({
    force: false
})

//创建表，默认是false，true则是删除原有表，再创建
User.sync({
    force: false
})

Home.sync({
    force: false
})

Admin.sync({
    force: false
})


Book.belongsTo(User,{foreignKey:'user_id'});

Book.belongsTo(Projects,{foreignKey:'project_id'});

Projects.hasMany(Book);

User.hasMany(Book);