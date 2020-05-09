const User = require('../model/user')
const Projects = require('../model/projects')
const Book = require('../model/books')
const Home=require('../model/home')
const Sequelize = require('sequelize')
const multiparty = require('koa2-multiparty');//存取post请求中的文件 https://www.npmjs.com/package/koa2-multiparty
const {avatarUpload}=require('../util/files');
const router = require('koa-router')()
const Op = Sequelize.Op


router.get('/bannerList', async (ctx, next) => {
  await Home.findAll({
    attributes: { exclude: ['createdAt','updatedAt'] }
  }).then(function(result){
    ctx.body={
      data:result
    };
})
})

module.exports = router
