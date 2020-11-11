

# 中间件 Middleware

## Review

## Reference

1. [Nestjs framework 30 天初探:Day05 Middlewares](https://ithelp.ithome.com.tw/articles/10190981)

2. [Nestjs 框架教程（第六篇：中间件）](https://keelii.com/2019/07/03/nestjs-framework-tutorial-6/) 

   函数中间件不可以使用exclude的 （测试可以使用啊）

3. [Nest 高级功能 —— Middleware](https://github.com/dzzzzzy/Nestjs-Learning/blob/master/docs/middleware.md)

   通过两种方式定义中间件，类中间件和函数中间件

   **Class 中间件**:要 @injectable() 注解并且 implement NestMiddleware，可以通过`nest g mi`  直接生成基础代码

   函数中间件：

   ```typescript
   function log(req, res, next) {
     console.log('user middleware')
     next()
   }
   ```

   使用中间件

   1. 全局使用  app.use(LoggerMiddleware) 

   2. 根Module使用 ，AppModule 要implements  NestModule（代码测试不用implements也是可以的）在configure中进行配置

      ``` typescript
      export class AppModule implements NestModule {
        configure(cm: MiddlewareConsumer) {
          cm.apply(LoggerMiddleware)
            .exclude({ path: 'cats', method: RequestMethod.GET }) // 排除不想使用中间件的路由
            .forRoutes('cat');  // 可以是 controller
        }
      }
      ```

   中间件中可以通过constructor 注入 provider来调用service的方法