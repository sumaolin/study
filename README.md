# [Nestjs framework 30 天初探](https://ithelp.ithome.com.tw/users/20107195/ironman/1252)

参考上面的文档学习 Nestjs，文档写于 2017-12-04,当时 Nestjs 版本是 V4.0.2, 当前的版本是 V7.5.0, 所有教程已当前版本 V7 为主实现，有些功能 nest-cli 可以直接生成会给出相应的 cli 命令。

本项目代码地址[Nestjs30Days](https://github.com/sumaolin/study/tree/dev_Nestjs30Days), 目录 project, 分支都是上一日起的基础上开始新分支，如: nestDay/1, nestDay/2。

版本信息： node 12.19.0; npm 6.14.8; nest-cli 7.2.0

## Reference

1. [NestJS 实战教程](https://juejin.im/collection/6845244185432293389)
2. [Nest.js 教程](https://github.com/dzzzzzy/Nestjs-Learning)
3. [Nestjs 框架教程](https://keelii.com/2019/07/03/nestjs-framework-tutorial-1/)

## 学习进度

### [Day1](./readme/Nestjs30Days/day1.md) 2020-11-09

安装 nest cli : npm i -g @nestjs/cli ，成功后可以在 cli 中使用 nest 命令

初始化项目： nest new project

通过 controller 控制路由

1. @get('/hello') 控制访问
2. @controller('/user') 整个 controller 下的都可以必须加 user 前缀了
3. app 全局添加前缀 app.setGlobleProfix('admin') 来控制所有路由添加前缀

app.controller.ts 中的 getHello() 方法 通过上面的设置对应的访问路由变化：

1. <http://localhost:3000/hello>
2. <http://localhost:3000/user/hello>
3. <http://localhost:3000/admin/user/hello>

nodemon 模式启动项目 ： yarn start:dev ，这样每次修改代码后程序自动重新启动，不用手动启动了

### [Day2](./readme/Nestjs30Days/day2.md) 2020-11-10

#### controller

简单理解为路由设置，通过装饰器@controller() 来注解，可以设置全局路由，类应用，方法的路由前缀，

可以获取请求方法，请求各种参数，请求 header，返回状态码，

#### provider

生成 service，通过装饰器@injectable()注解，处理数据库相关的各种业务逻辑， DTO 类型应该在这层应用吧

#### module

拟合 controller 和 provider 的注解容器，通过装饰器@module() 注解实现，装饰器有四个参数：imports，controllers, providers, exports。provider 只有在 module 中进行配置后才可以在 controller 的构造器中注入使用，开始是在根 module AppModule 中进行配置的，后面不同的 Modules 可以单独进行配置成独立的 module 后再在 AppModule 中进行 imports 配置。

方便调用，允许设置一个全局 Module，通过装饰器 @Global()

动态 module，可以用于数据库的动态链接

### [Day3](./readme/Nestjs30Days/day3.md) 2020-11-11

#### 自定义中间件的方式

1. 类 implements NestMiddleware，并且通过装饰器 @injectable 注解，可以通过 cli 工具直接生成基础代码 ： `nest g mi Logger middlewarePaht`
2. 函数中间件，类似 express 的

自定义中间件时候可以通过构造函数注入 provider，调用其他逻辑

#### 使用中间件 Middleware

1. 根 Module 实现 NestModule 并且在 configure(cm:customerMiddleware){cm.apply(LoggerMiddleware).exclude().forRoutes()}

   ```typescript
   export class AppModule implements NestModule {
     configure(cm: MiddlewareConsumer) {
       cm.apply(LoggerMiddleware)
         .exclude({ path: 'cats', method: RequestMethod.GET }) // 排除不想使用中间件的路由
         .forRoutes('cat') // 可以是 controller
     }
   }
   ```

2. app.use(LoggerMiddleware) exppress 方式的

### [Day4](./readme/Nestjs30Days/day4.md) 2020-11-12

异常过滤器对异常进行捕获处理

1. 定义自己的异常 ，实现 HttpException 类

2. 定义自己的异常过滤器 实现 ExceptionFilter，并使用 装饰器 @catch 进行注解

3. 使用自定义的异常过滤器，根据作用范围可以分为： 方法，控制器，全局，通过装饰器@useFilters()使用，里面参数最好使用类，不要使用实例

   ```typescript
   @useFilter(HttpExceptionFilter) // 推荐
   @useFilter(new HttpExceptionFilter()) // 不推荐
   ```

   因为 Nest 遵循的单例模式

#### 疑问点

使用异常处理器时候定义了两种方法，3 是一种，还有一种没体会出两种的不同

## 规范

1. [git commit message 规范设置](./readme/git_cmmit_message.md)

   > git commit 直接改成 git cz 提交暂存区信息
