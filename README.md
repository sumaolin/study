# Nestjs Beginner
### 2020.06.16

1. [第一步 - Nest.js 中文文档](https://docs.nestjs.cn/7/firststeps)  

   官方文档，init 项目了下



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

   
