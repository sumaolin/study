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




#### [4 refactor 重构](https://github.com/ikcamp/koa2-tutorial/tree/4-refactor)

1. 关于 `router.allowedMethods()` 不清楚做什么用的， 看了下文章：[KOA2的koa-router中的allowedMethods()是必须的吗？有什么作用？](https://segmentfault.com/q/1010000013110474) ，实在没看明白有啥区别，只是说处理了`ctx.status` 为空的情况





### 2018.06.23

#### [8. log 日志中间件](https://github.com/ikcamp/koa2-tutorial/tree/8-mi-log) 

1. `log4js`  的配置中：

```json
log4js.configure({
    appenders: { c2: {type: 'file', filename: 'c2.log'}},
    categories: {
        default: {
            appenders: ['c2'], level: 'error' //这的appenders 要是上面appenders中定义的；level不可缺少
        }
    }
})
```

2. 在`const logger = log4js.getLogger('cheese')` 中`getLogger()`中的参数不一定和上面配置中的appenders相同也可以使用，没弄清楚为啥？
3. 对日志中间件进行错误处理的时候，catch是从Promise中的catch方法吗？需要进一步了解啊



### 2018.06.24

#### [9. 处理错误请求](https://github.com/ikcamp/koa2-tutorial/blob/9-mi-http-error/README.md) 

1. 单独安装了模版引擎，nunjucks，理解是koa-nunjucks-2组件简化了 nunjucks在koa中的使用，比如挂载在ctx上，直接render输出数据

2. 未找到路由对应页面的处理

   ```Js
   if (ctx.response.status === 404 && !ctx.response.body) {
       ctx.throw(404)
   }
   ```

3. ctx.state.logged 标记日志处理组件已经出来了错误，如果没有处理 则有httpError组件处理，由组件的洋葱模型决定了处理异常的顺序

4. 怎样测试错误处理效果