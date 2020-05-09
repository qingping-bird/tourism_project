const User = require('../model/user')
const Projects = require('../model/projects')
const Book = require('../model/books')
const Sequelize = require('sequelize')
const multiparty = require('koa2-multiparty');//存取post请求中的文件 https://www.npmjs.com/package/koa2-multiparty
const {projectImgUpload}=require('../util/files');
const router = require('koa-router')()
const Op = Sequelize.Op

router.get('/userList',async function (ctx, next) { //获取用户列表
  let key=await ctx.query.keyWord;
  let obj=await Object.assign(
    !key?{}:{[Op.or]: [
      { userName:{[Op.like]:`%${key}%`} },
      { phone:{[Op.like]:`%${key}%`} }
    ]});
    await User.findAll({
      attributes: { exclude: ['createdAt','updatedAt'] },
      where: obj
    }).then(function(result){
      ctx.body={
        data:result
      };
  })
})

router.get('/userDelete',async function (ctx, next) { //删除用户
  let id=await ctx.query.id;
  const parents = await User.findOne({
    where: { id: id },
    include: [{
        model: Book,
    }],
  });
  await console.log(parents.books)
    for (const Book of parents.books) {
      await Book.destroy();
    }
    await parents.destroy().then(function(result){
      ctx.body={
        data:result
      };
      });
})

router.get('/userBookList',async function (ctx, next) { //查找指定用户的订单
  let _id=await ctx.query.id;
  await Book.findAll({
    where: { userId: _id},
    attributes: { exclude: ['createdAt','updatedAt'] },
    include:[{
      model:Projects,
      attributes:  ['project_name']
  }]
  }).then(function(result){
    ctx.body={
      data:result
    };
})
})

router.get('/refundList',async function (ctx, next) { //查找所有退单
  let key=await ctx.query.keyWord;
  await User.findAll({
      where:{phone:{[Op.like]:`%${key}%`}},
      attributes: [ 'phone' ],
      include:[{
        model:Book,
        where:{book_state:1},
        attributes: { exclude: ['createdAt','updatedAt'] },
        include:[{
          model:Projects,
          attributes: ['project_name'],
      }]
    }]
    }).then(function(result){
      ctx.body={
        data:result
      };
  }).catch((err)=>{
    console.log(err)
  })
})

router.get('/refundAction',async function (ctx, next) { //处理退单
  let _id=await ctx.query.id;
  let _action=await ctx.query.action;
  await Book.update({book_state:_action},{
    where: { bookId: _id}
  }).then(function(result){
    ctx.body={
      err:0
    };
}).catch((err)=>{
  console.log(err)
  ctx.body={
    err:1
  };
})
})

module.exports = router
