const User = require('../model/user')
const Projects = require('../model/projects')
const Book = require('../model/books')
const Sequelize = require('sequelize')
const multiparty = require('koa2-multiparty');//存取post请求中的文件 https://www.npmjs.com/package/koa2-multiparty
const {avatarUpload}=require('../util/files');
const router = require('koa-router')()
const Op = Sequelize.Op

router.post('/user/avatar',multiparty(), async (ctx, next) => {
  await  console.log(ctx.req);
  let tem=await ctx.req.files.file;
  let id=await ctx.req.body.id;
  let newName=await avatarUpload(tem,id);
  
  await User.update(
    {
      avatar: newName
    }, {
      where: { id: id }
    }
  ).then(function(result){
    ctx.body={
      err:2
    }
})
})

router.post('/login', async (ctx, next) => {
  let data =await ctx.request.body;
  let code=await data.code;
  let name=await data.name;
  await User.findOne({ where: {
    [Op.or]: [
      { userName:name },
      { phone:name }
    ]
  }}).then(function(result) {
    if(result.password+""==code+""){
      ctx.body={
        id:result.id,
        userName:result.username,
        avatar:result.avatar,
        phone:result.phone,
        err:0
      }
    }else {
      ctx.body={
        err:1
      }
    }
  }).catch(()=>{
    ctx.body={
      err:1
    }
  });
})


router.post('/register', async (ctx, next) => {
  let data =await ctx.request.body;
  let code=await data.code;
  let name=await data.name;
  let phone=await data.phone;
  await User.findOne({ 
    where: {
      [Op.or]: [
        { userName:name },
        { phone:phone }
      ]
    }
  }).then(async function(result) {
      if(result)
      ctx.body={
        err:2
      }
      else{
        await User.create({
          username:data.name,
          password:data.code,
          phone:data.phone
          }).then(function(result){
            ctx.body={
              err:0
            }
          }).catch(function(err){
          ctx.body={
            err:1
          }
          })

      }
  }).catch(function(err){
    ctx.body={
      err:1
    }
  })
  
})

router.get('/project', async (ctx, next) => {
    const orders=[["id","DESC"],["project_count","DESC"],["project_money"]];
    const money=[{[Op.between]: [0, 499]},{[Op.between]: [500, 2000]},{[Op.between]: [2001,8000]},{[Op.gte]: 8001}];
    const day=[1,2,3,4,5,6,7,{[Op.gt]: 7}]
    let order=await ctx.query.order;


    let obj=await Object.assign(
      {[Op.not]:[{project_sort:4}]},
      {project_active:true},
      ctx.query.project_sort==0?{}:{project_sort:ctx.query.project_sort}, 
      ctx.query.project_money==0?{}:{project_money:money[ctx.query.project_money-1]},
      ctx.query.project_day==0?{}:{project_day:day[ctx.query.project_day-1]}, 
      !ctx.query.keyWord?{}:{project_name:{[Op.like]:`%${ctx.query.keyWord}%`}});

    await Projects.findAll({
      order:[orders[order]],
      attributes: { exclude: ['createdAt','updatedAt'] },
      where:obj
    }).then(function(result){
      ctx.body={
        data:result
      };
  })
})

router.get('/projectNearby', async (ctx, next) => {
  const orders=[["id","DESC"],["project_count","DESC"],["project_money"]];
  let order=await ctx.query.order;

  let obj=await Object.assign(
    {project_sort:4},
    {project_active:true},
    !ctx.query.keyWord?{}:{project_name:{[Op.like]:`%${ctx.query.keyWord}%`}});

  await Projects.findAll({
    order:[orders[order]],
    attributes: { exclude: ['createdAt','updatedAt'] },
    where:obj
  }).then(function(result){
    ctx.body={
      data:result
    };
})
})

router.get('/projectDetail', async (ctx, next) => {
  await Projects.findOne({
    attributes: { exclude: ['createdAt','updatedAt'] },
    where:{id:ctx.query.id},
    include:[{
      model:Book,
      attributes: { exclude: ['createdAt','updatedAt'] },
  }]
  }).then(function(result){
    ctx.body={
      data:result
    };
})
})

module.exports = router
