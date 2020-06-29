# Nestjs Beginner
### 开源项目

1. [**nodepress**](https://github.com/surmon-china/nodepress) RESTful API service for Blog/CMS, powered by [@nestjs](https://github.com/nestjs) 

   > **适用于 surmon.me 的 RESTful API 服务；基于 nestjs (nodejs)； 需安装 mongoDB 和 Redis 方可完整运行。** 

   CMS 项目，文档写的很详细不错可以参考

2. [mili](https://github.com/shen100/mili)  是一个开源的社区系统，界面优雅，功能丰富 

   > **mili**是一个开源的社区系统，界面优雅，功能丰富。 已在[米粒网](https://www.golang123.com/) 得到应用，你完全可以用它来搭建自己的社区。**mili**的前端使用**vue**、**iview**等技术来开发，后端使用**typescript**、**nodejs**、**nestjs**、**typeorm**等技术来开发。

   可以研究下源代码，整体的解决方案，前端界面，管理后台，api，mysql ，nignx，Redis

3. [Chrome插件（Extensions）开发攻略](https://www.cnblogs.com/guogangj/p/3235703.html) 

   > 好，轮到我的例子登场了。它的功能是这样的：当你浏览博客园的时候，它会启动并尝试获取你浏览的文章的信息（标题、作者和日期），再通过往另一个服务器发送请求的方式，记录和获取你第一次访问这篇文章的时间

   可以通过这样的方式实现一个按钮点击，采集点击的微博，然后把整个微博的元数据发送到后端服务器进行结构化存储

### 2020.06.16

1. [第一步 - Nest.js 中文文档](https://docs.nestjs.cn/7/firststeps)  

   官方文档，init 项目了下

2. [NestJS 实战教程](<https://juejin.im/collection/5e893a1b6fb9a04d65a15400>)  



### 2020.06.29



1. [让我们用Nestjs来重写一个CNode](https://github.com/jiayisheji/blog/labels/Nest) 



### 







## [NestJS 实战教程](<https://juejin.im/collection/5e893a1b6fb9a04d65a15400>)  

### 2020.06.18

1. [NestJS 实战教程](<https://juejin.im/collection/5e893a1b6fb9a04d65a15400>)  

   一，二，三 看了下



### 2020.06.19

1. [【Nestjs实战】Nodejs必学框架 | Nest企业级项目构建与开发实战](https://www.bilibili.com/video/BV1bQ4y1A77L?p=5) 

   视频看了头三集

2. [Nest.js 从零到壹系列（一）：项目创建&路由设置&模块](https://juejin.im/post/5e708054f265da570f504905#heading-6) 

   里面讲到的 nest-cli 可以快捷的创建 service，controller, module

   `nest g service user logical`

   `nest g controller user logical` 

   不过我更懒的不想写 service，controller 用 `nest --help` 看了下 cli 的文档，发现了alias ，可以简写成 s, co了

![](F:\gitDev\sumaolin\study\readme\img\1.png)





### 2020.06.22

1. `yarn start:dev`  修改代码 dist 目录代码不更新，直接删除dist 目录，重新运行命令解决
2. SQL Err :   `Unknown column 'javascript' in 'where clause'`     传入的参数需要用引号包住，表示是字符串



每天练习一章节吧，别贪多



### 2020.06.23

1. [Nest.js 从零到壹系列（三）：使用 JWT 实现注册、登录](https://juejin.im/post/5e730e5e51882549522adf04) 

   中的makesalt 和 encryptPassword ，



### 2020.06.24 

1. [Nest.js 从零到壹系列（三）：使用 JWT 实现注册、登录](https://juejin.im/post/5e730e5e51882549522adf04) 

   实现注册功能

   JWT 依赖 package 安装



### 2020.06.25 

1. [Nest.js 从零到壹系列（三）：使用 JWT 实现注册、登录](https://juejin.im/post/5e730e5e51882549522adf04) 

   [编写 auth.service.ts 的验证逻辑](<https://juejin.im/post/5e730e5e51882549522adf04#heading-9>)  写完了开始报错：

   ```bash
   error TS2339: Property 'salt' does not exist on type 'Promise<any>'.
   ```

   查了下 [TypeScript 错误property does not exist on type Object](https://www.cnblogs.com/limbobark/p/10043769.html) ， 通过user['salt'] 来解决了。

2. 文章中提到的报错

   ```bash
   [Nest] 4964   - 2020-06-25 4:11:51 PM   [NestFactory] Starting Nest application...
   [Nest] 4964   - 2020-06-25 4:11:51 PM   [InstanceLoader] AuthModule dependencies initialized +30ms
   [Nest] 4964   - 2020-06-25 4:11:51 PM   [ExceptionHandler] Nest can't resolve dependencies of the AuthService (UserService, ?). Please make sure that the argument JwtService at index [1] is available in the AppModule context.
   
   Potential solutions:
   - If JwtService is a provider, is it part of the current AppModule?
   - If JwtService is exported from a separate @Module, is that module imported within AppModule?
     @Module({
       imports: [ /* the Module containing JwtService */ ]
     })
    +4ms
   Error: Nest can't resolve dependencies of the AuthService (UserService, ?). Please make sure that the argument JwtService at index [1] is available in the AppModule context.
   
   Potential solutions:
   - If JwtService is a provider, is it part of the current AppModule?
   - If JwtService is exported from a separate @Module, is that module imported within AppModule?
     @Module({
       imports: [ /* the Module containing JwtService */ ]
     })
   
       at Injector.lookupComponentInParentModules (F:\gitDev\sumaolin\study\nest-app\node_modules\@nestjs\core\injector\injector.js:191:19)
       at process._tickCallback (internal/process/next_tick.js:68:7)
       at Function.Module.runMain (internal/modules/cjs/loader.js:834:11)
       at startup (internal/bootstrap/node.js:283:19)
       at bootstrapNodeJSCore (internal/bootstrap/node.js:623:3)
   ```





### 2020.06.26

1. [Nest.js 从零到壹系列（四）：使用中间件、拦截器、过滤器打造日志系统](https://juejin.im/post/5e7460a5e51d4526ca15efa3) 

2. [Node.js 之 log4js 完全讲解](https://juejin.im/post/5e7460a5e51d4526ca15efa3) 

   log4js 日志库。middleware logger 记录request 日志；filter 记录 response 日志。exception 过滤器filter 记录异常日志。

3. [Nest.js 从零到壹系列（五）：使用管道、DTO 验证入参，摆脱 if-else 的恐惧](https://juejin.im/post/5e795c4f6fb9a07c867922da)  

   > 管道有两个类型:
   >
   > 转换：管道将输入数据转换为所需的数据输出；
   >
   > 验证：对输入数据进行验证，如果验证成功继续传递，验证失败则抛出异常；

4. [Nest.js 从零到壹系列（六）：用 15 行代码实现 RBAC 0](https://juejin.im/post/5e81466f51882573b75361e4) 





### 2020.06.27

1. [Nest.js 从零到壹系列（六）：用 15 行代码实现 RBAC 0](https://juejin.im/post/5e81466f51882573b75361e4) 

   报错： 

   ```bash
   SequelizeDatabaseError: Lock wait timeout exceeded; try restarting transaction
   ```

   update 时候更新不成功



2. [Nest.js 从零到壹系列（七）：讨厌写文档，Swagger UI 了解一下？](https://juejin.im/post/5e8ed1516fb9a03c5f73f34f) 



跟着教程写了下代码，可以运行了，下面归纳总结



### 归纳总结









































## 规范

1. [git commit message 规范设置](./readme/git_cmmit_message.md)

   > git commit 直接改成 git cz 提交暂存区信息

2. [prettier_eslint_editConfig](./readme/prettier_eslint_editConfig.md) 

   > 代码格式化 prettier
   >
   > 代码编程风格校验 eslint
   >
   > 编辑器代码格式 editorConfig


   三者插件结合使用，达到onSave时候自动格式化成eslint风格的代码

   
