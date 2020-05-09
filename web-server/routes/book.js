const User = require('../model/user')
const Projects = require('../model/projects')
const Book = require('../model/books')
const Sequelize = require('sequelize')
const multiparty = require('koa2-multiparty');//存取post请求中的文件 https://www.npmjs.com/package/koa2-multiparty
const router = require('koa-router')()
const Op = Sequelize.Op

router.get('/book', async (ctx, next) => {
  let data =await ctx.query;
  let {user_id,project_id,book_time,book_count}=data
  await Book.create({
    userId:user_id,
    projectId:project_id,
    book_time:book_time,
    book_count:book_count
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
})

router.get('/booklist',async (ctx, next) => {
    let obj=await Object.assign(
        {userId:await ctx.query.id},
        ctx.query.state==0?{}:{book_state:ctx.query.state-1});
    await Book.findAll({
        order:[["bookId","DESC"]],
        where:obj,
        attributes:  { exclude: ['createdAt','updatedAt'] } ,
        include:[{
            model:Projects,
            attributes: { exclude: ['createdAt','updatedAt'] },
        }]
    }).then(function(data){

        ctx.body={
            data
          }
    }).catch(function(err){
        console.log(err)
    });
})

router.get('/booklistRefund',async (ctx, next) => {
    await Book.update(
        {
            book_state: ctx.query.state,
            refund_time:ctx.query.time
        },{
        where:{bookId:ctx.query.id}
    }).then(function(data){
        ctx.body={
            err:0
          }
    }).catch(function(err){
        console.log(err)
    });
})

router.get('/booklistComment',async (ctx, next) => {
    await Book.update(
        {
            book_comment: ctx.query.value,
            comment_time:ctx.query.time
        },{
        where:{bookId:ctx.query.id}
    }).then(function(data){
        ctx.body={
            err:0
          }
    }).catch(function(err){
        console.log(err)
    });
})

router.get('/bookDetail',async (ctx, next) => {
    await User.findOne({
        where:{id:ctx.query.id}
    }).then(function(data){
        ctx.body={
            data:data
          }
    }).catch(function(err){
        console.log(err)
    });
})


module.exports = router