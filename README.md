# study

学习新知识

## 学习资料

1.  [基于 Koa2 搭建 Node.js 实战项目教程](https://github.com/ikcamp/koa2-tutorial)
    > 不同的分支对应不同的课程进度

## 规范

1.  [git commit message 规范设置](./readme/git_cmmit_message.md)

    > git commit 直接改成 git cz 提交暂存区信息

## 进度

### 2018.06.12

#### [路由 koa-router](https://github.com/ikcamp/koa2-tutorial/tree/2-koa-router)

1. ` const Router = require('koa-router')// 是Object对象` 

2. 可以`new Router()` 多个 对象进行嵌套

3. ```javascript
   const a = new Router(); 
   a.get('/home', async(ctx, next)=>{
     ctx.response.body = '<h1>index page</h1>'
     // await next() // 才可以执行到all，本质还是middleware
   })
   a.all('/*', async(ctx, next)=>{
     console.log('all action')
   })
   ```




### [4 refactor 重构](https://github.com/ikcamp/koa2-tutorial/tree/4-refactor)

1. 关于 `router.allowedMethods()` 不清楚做什么用的， 看了下文章：[KOA2的koa-router中的allowedMethods()是必须的吗？有什么作用？](https://segmentfault.com/q/1010000013110474) ，实在没看明白有啥区别，只是说处理了`ctx.status` 为空的情况