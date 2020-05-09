const User = require('../model/user')
const Projects = require('../model/projects')
const Book = require('../model/books')
const Home=require('../model/home')
const Sequelize = require('sequelize')
const multiparty = require('koa2-multiparty');//存取post请求中的文件 https://www.npmjs.com/package/koa2-multiparty
const {projectImgUpload}=require('../util/files');
const router = require('koa-router')()
const Op = Sequelize.Op

router.post('/upload/banner', async (ctx, next) => {//测试用
    await Home.create({
      }).then(async function(result){
          console.log('fd')
    }).catch(function(err){
        console.log(err)
      ctx.body={
        err:1
      }
      })
  })

  router.get('/upload/banner/projectList', async (ctx, next) => {
    await Projects.findAll({
      where:{project_active:true},
      attributes:['id','project_name']
      }).then(async function(result){
        ctx.body={
         data:result
        }
    }).catch(function(err){
        console.log(err)
      ctx.body={
        err:1
      }
      })
  })

  router.get('/bannerList', async (ctx, next) => {
    await Home.findAll({
      attributes: { exclude: ['createdAt','updatedAt'] }
      }).then(async function(result){
        ctx.body={
         data:result
        }
    }).catch(function(err){
        console.log(err)
      ctx.body={
        err:1
      }
      })
  })

  router.post('/upload/banner/new',multiparty(), async (ctx, next) => {
    let tem=await ctx.req.files.file;
    let data=await ctx.req.body;
    console.log(data)
    let newName=await projectImgUpload(tem,data.id,"D://imgDatabase//bannerImg//");
    
    await Home.update({
      homeTitle:data.title,
      homeHref:data.project,
      homeText:data.text,
      homeImg: newName
      },{
        where:{homeId:data.id}
      }).then(async function(result){
          ctx.body={
            err:0
          }
      }).catch(function(err){
        console.log(err)
      ctx.body={
        err:1
      }
      })
  })

  module.exports = router