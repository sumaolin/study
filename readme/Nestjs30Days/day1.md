# 基础入门

## Reference

1. [Nestjs framework 30 天初探:Day01 攻略行前說明](https://ithelp.ithome.com.tw/articles/10190659)

   v4 版本通过 clone 线上项目来初始化项目，到 v7 版本有专门的 cli 工具来初始化项目

   > ## 筆者 30 天規劃
   >
   > - 基礎介紹篇(10 天):了解[Modules](https://docs.nestjs.com/modules)、[Controllers](https://docs.nestjs.com/controllers)、[Components](https://docs.nestjs.com/components)、等框架的核心 API。
   > - [Websocket](https://developer.mozilla.org/zh-TW/docs/WebSockets/WebSockets_reference/WebSocket)運用篇(3 天):[Nestjs](https://nestjs.com/)對於[Websocket](https://developer.mozilla.org/zh-TW/docs/WebSockets/WebSockets_reference/WebSocket)有一些處理[更細緻的 API](https://docs.nestjs.com/websockets/gateways)可以使用。
   > - [MicroServices](https://zh.wikipedia.org/zh-tw/微服務)運用篇(2 天):了解[Nestjs](https://nestjs.com/)如何建立[MicroServices](https://docs.nestjs.com/microservices/basics)。
   > - 資料庫操作篇(3 天):介紹如何透過[Nestjs](https://nestjs.com/)的 API 去[串接操作資料庫](https://docs.nestjs.com/recipes/sql-typeorm)。
   > - 串接第三方 API 運用篇(3 天):介紹如何在[Nestjs](https://nestjs.com/)使用[Passport 模組](https://docs.nestjs.com/recipes/passport)、串接[Swagger](https://docs.nestjs.com/recipes/swagger)服務等。
   > - 會員聊天室實作篇(9 天):採[Restful API](https://stackoverflow.com/questions/671118/what-exactly-is-restful-programming)風格，撰寫具備 CRUD 功能且能即時聊天的小專案。

2. [Nestjs 框架教程（第一篇：简介）](https://keelii.com/2019/07/03/nestjs-framework-tutorial-1/)

3. [Nest.js 从零到壹系列（一）：项目创建&路由设置&模块](https://juejin.im/post/6844904096017678343)

   **安装 nest cli** : `npm i -g @nestjs/cli` ，成功后可以在 cli 中使用 nest 命令

   **初始化项目**： `nest new project`

   **通过 controller 控制路由**

   1. `@get('/hello')` 控制访问
   2. `@controller('/user')` 整个 controller 下的都可以必须加 user 前缀了
   3. app 全局添加前缀 `app.setGlobleProfix('admin')` 来控制所有路由添加前缀

   app.controller.ts 中的 getHello() 方法 通过上面的设置对应的访问路由变化：

   1. <http://localhost:3000/hello>
   2. <http://localhost:3000/user/hello>
   3. <http://localhost:3000/admin/user/hello>

   nodemon 模式启动项目 ： `yarn start:dev` ，这样每次修改代码后程序自动重新启动，不用手动启动了
