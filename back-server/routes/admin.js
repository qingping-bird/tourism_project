const Admin = require('../model/admin')
const Sequelize = require('sequelize')
const multiparty = require('koa2-multiparty');//存取post请求中的文件 https://www.npmjs.com/package/koa2-multiparty
const {projectImgUpload}=require('../util/files');
const router = require('koa-router')()
const Op = Sequelize.Op

router.post('/addAdmin', async (ctx, next) => {
  let data =await ctx.request.body;
  let phone=await data.phone;
  let password=await data.password;
  await Admin.findOne({ 
    where: {phone:phone}
  }).then(async function(result) {
      if(result){
        ctx.body={
        err:1
      }
      }
      else{
        await Admin.create({
          phone:phone,
          password:password
          }).then(function(result){
            ctx.body={
              err:0
            }
          }).catch(function(err){
            console.log(err)
          ctx.body={
            err:1
          }
          })

      }
  }).catch(function(err){
    console.log(err)
    ctx.body={
      err:1
    }
  })
  
})

router.get('/adminList', async (ctx, next) => {
    await Admin.findAll({}).then(function(result){
      ctx.body={
        data:result
      };
  })
})

router.get('/deleteAdmin', async (ctx, next) => {
    await Admin.destroy({
      where: {adminId:ctx.query.id}
    }).then(function(result){
      ctx.body={
        err:0
      };
  })
})

router.post('/login', async (ctx, next) => {
  let data =await ctx.request.body;
  let phone=await data.phone;
  let password=await data.password;
  await Admin.findOne({ 
    where: {phone:phone}
  }).then(async function(result) {
    if(result.password+""==password+""){
        ctx.body={
        err:0,
        phone:phone,
        id:result.adminId
      }
      }
      else{
          ctx.body={
            err:1
          }

      }
  }).catch(function(err){
    console.log(err)
    ctx.body={
      err:1
    }
  })
  
})

module.exports = router
