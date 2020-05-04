const User = require('../model/user')
const Projects = require('../model/projects')
const Sequelize = require('sequelize')
const multiparty = require('koa2-multiparty');//存取post请求中的文件 https://www.npmjs.com/package/koa2-multiparty
const {projectImgUpload}=require('../util/files');
const router = require('koa-router')()
const Op = Sequelize.Op

router.post('/upload/img',multiparty(), async (ctx, next) => {
  let tem=await ctx.req.files.file;
  let data=await ctx.req.body;
  await Projects.create({
    project_name:data.project_name,
    project_start_time:data.project_start_time,
    project_end_time:data.project_end_time,
    project_money:data.project_money,
    project_detail:data.project_detail,
    project_sort:data.project_sort,
    project_day:data.project_day,
    }).then(async function(result){
      let newName=await projectImgUpload(tem,result.project_id);
      await Projects.update(
        {
          project_img: newName
        }, {
          where: { project_id: result.project_id }
        }
      ).then(function(result){
        ctx.body={
          err:0
        }
    })}).catch(function(err){
    ctx.body={
      err:1
    }
    })
})

router.get('/project', async (ctx, next) => {
  let tem_sort=await ctx.query.project_sort;
  let key=await ctx.query.keyWord;
  let obj=await Object.assign(
    tem_sort==0?{}:{project_sort:tem_sort}, 
    !key?{}:{project_name:{[Op.like]:`%${key}%`}});
    await Projects.findAll({
      limit:10,
      offset:ctx.query.offset*10,
      order:[["project_id","DESC"]],
      attributes: { exclude: ['createdAt','updatedAt'] },
      where: obj
    }).then(function(result){
      console.log()
      ctx.body={
        data:result
      };
  })
})

router.get('/countProject', async (ctx, next) => {
  let tem_sort=await ctx.query.project_sort;
  let key=await ctx.query.keyWord;
  let obj=await Object.assign(
    tem_sort==0?{}:{project_sort:tem_sort}, 
    !key?{}:{project_name:{[Op.like]:`%${key}%`}});
    await Projects.count({
      where: obj
    }).then(function(result){
      ctx.body={
        count:result
      };
  })
})

router.get('/changeProjectMoney', async (ctx, next) => {
  let id=await ctx.query.id;
  let money=await ctx.query.money;
    await Projects.update({project_money: money},{
      where: {project_id: id}
    }).then(function(result){
      ctx.body={
        count:result
      };
  })
})



router.get('/deleteProject/', async (ctx, next) => {
  let _id=await ctx.query.id;
  await Projects.destroy({
    where: { project_id: _id}
  }).then(function(result){
    ctx.body={
      err:0
    };
})
})

module.exports = router
