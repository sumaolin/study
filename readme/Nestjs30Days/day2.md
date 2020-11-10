# Nest 基础功能 — Controller, Service, Module

Nest cli 提供的创建 Controller, Service, Module 的命令

`$ nest g [文件类型] [文件名] [文件目录（src目录下）]`

通过`nest g --help` 可以看到可以创建的文件类型列表，并且提供了 alias，下面书主要用到的

| name        | alias | description                         |
| ----------- | ----- | ----------------------------------- |
| controller  | co    | Generate a controller declaration   |
| service     | s     | Generate a service declaration      |
| module      | mo    | Generate a module declaration       |
| provider    | pr    | Generate a provider declaration     |
| guard       | gu    | Generate a guard declaration        |
| filter      | f     | Generate a filter declaration       |
| gateway     | ga    | Generate a gateway declaration      |
| interceptor | in    | Generate an interceptor declaration |
| middleware  | mi    | Generate a middleware declaration   |
| pipe        | pi    | Generate a pipe declaration         |
| resource    | res   | Generate a new CRUD resource        |

resource 可以选择创建的类型，REST API 类型后，是一次创建好 service , controller, module，后期熟练整个流程后可以简化使用

## Review

#### controller

简单理解为路由设置，通过装饰器@controller() 来注解，可以设置全局路由，类应用，方法的路由前缀，

可以获取请求方法，请求各种参数，请求 header，返回状态码，

#### provider

生成 service，通过装饰器@injectable()注解，处理数据库相关的各种业务逻辑， DTO 类型应该在这层应用吧

#### module

拟合 controller 和 provider 的注解容器，通过装饰器@module() 注解实现，装饰器有四个参数：imports，controllers, providers, exports。provider 只有在 module 中进行配置后才可以在 controller 的构造器中注入使用，开始是在根 module AppModule 中进行配置的，后面不同的 Modules 可以单独进行配置成独立的 module 后再在 AppModule 中进行 imports 配置。

方便调用，允许设置一个全局 Module，通过装饰器 @Global()

动态 module，可以用于数据库的动态链接

## Reference

1. [Nest.js 从零到壹系列（一）：项目创建&路由设置&模块](https://juejin.im/post/6844904096017678343)

   > NestJS 的设计模式，主要就是 `Controller`、`Service`、`Module` 共同努力，形成了一个模块。
   >
   > - `Controller`：传统意义上的控制器，提供 api 接口，负责处理路由、中转、验证等一些简洁的业务；
   > - `Service`：又称为 `Provider`， 是一系列服务、repo、工厂方法、helper 的总称，主要负责处理具体的业务，如数据库的增删改查、事务、并发等逻辑代码；
   > - `Module`：负责将 `Controller` 和 `Service` 连接起来，类似于 `namespace` 的概念；
   >
   > **个人习惯先创建 Service**，最后再创建 Module，因为 Controller 和 Module 都需要引入 Service，这样引入的时候就可以有提示了（当然，也可以事先写 import 语句，但 ESLint 的检查会冒红点，强迫症患者表示不接受）

2. [Nestjs 框架教程（第二篇：入门）](https://keelii.com/2019/07/03/nestjs-framework-tutorial-2/)

3. [Nestjs 框架教程（第三篇：控制器）](https://keelii.com/2019/07/03/nestjs-framework-tutorial-3/)

   路由，请求方法，请求参数，返回状态码，请求 Head，都有详细的装饰器控制实现

   路由方法的优先级：

   > 路由的注册顺序与控制器类中的**方法**顺序相关，如果你先装饰了一个 cats/:id 的路由，后面又装饰了一个 cats 路由，那么当用户访问到 GET /cats 时，后面的路由将不会被捕获，因为参数才都是**非必选**的

4. [Nestjs 框架教程（第四篇：Providers）](https://keelii.com/2019/07/03/nestjs-framework-tutorial-4/)

   service 的概念 ，基于装饰器@injectable

5. [Nestjs 框架教程（第五篇：模块）](https://keelii.com/2019/07/03/nestjs-framework-tutorial-5/)

   装饰器中通过配置参数，providers, controllers 关联相应的 service 和 controller, app 根 module 中直接 imports 就可以配置完成了

6. [Nestjs framework 30 天初探:Day02 Controllers](https://ithelp.ithome.com.tw/articles/10190759)

   DTO 类 (Data Transfer Object)

7. [Nestjs framework 30 天初探:Day03 Components](https://ithelp.ithome.com.tw/articles/10190874)

   应该对应的是 V7 版本中的 provider

8. [Nestjs framework 30 天初探:Day04 Modules](https://ithelp.ithome.com.tw/articles/10190941)

   俩个 module，在 A module 中调用 B module 的方法， 其中装饰器中的 modules 参数在 V7 版本中变成了 imports

9. [Nest 基础功能 —— Controller](https://github.com/dzzzzzy/Nestjs-Learning/blob/master/docs/controller.md)

   > `@Controller()` 注解的源码：
   >
   > ```typescript
   > export function Controller(prefix?: string): ClassDecorator {
   >   const path = isUndefined(prefix) ? '/' : prefix
   >   return (target: object) => {
   >     Reflect.defineMetadata(PATH_METADATA, path, target)
   >   }
   > }
   > ```

10. [Nest 基础功能 —— Provider](https://github.com/dzzzzzy/Nestjs-Learning/blob/master/docs/provider.md)

11. [Nest 基础功能 —— Module](https://github.com/dzzzzzy/Nestjs-Learning/blob/master/docs/module.md) **推荐**

    装饰器有四个参数： imports, controlllers, providers, exports

    可以创建动态 Module

    全局 module，每个 nest 应用只能有一个全局 module

12. [Nest 基础功能 —— NestFactory](https://github.com/dzzzzzy/Nestjs-Learning/blob/master/docs/nest-factory.md)

    后面可以看下 NestFactory 源码
