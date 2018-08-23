# koa 启动框架

## Feature

### 项目目录

```json
项目根目录
├─readme  // 说明文档
└─server  // server后端
    ├─controllers  // 用于解析用户的输入，处理后返回相应的结果
    ├─initDB       // 数据库初始化目录
    ├─logs         // 日志目录
    ├─middleware   // 中间件集中地，用于编写中间件
    ├─models       // 数据模型model层目录
    ├─public       // 前端静态代码
    ├─routers      // 路由目录
    ├─services     // 业务层 用于编写业务逻辑层，比如连接数据库，调用第三方接口等
    ├─uploads      // 上传文件目录
    ├─utils        // 工具类目录
    └─views        // 模板目录
    └─app.js       // 用于自定义启动时的初始化工作，比如启动 https，调用中间件，启动路由等

```



### 1. 总结上面两个教程

#### [Node Koa2 实战](https://github.com/ikcamp/koa2-tutorial)

- [ ] [Log4js](https://github.com/nomiddlename/log4js-node) 日志插件
- [ ] [规范与部署](https://github.com/ikcamp/koa2-tutorial/tree/10-mi-rule) 
- [ ] [处理错误请求](https://github.com/ikcamp/koa2-tutorial/tree/9-mi-http-error)

#### [Koa2进阶学习笔记](https://github.com/chenshenhai/koa2-note)

- [ ] [session & cookie](https://chenshenhai.github.io/koa2-note/note/cookie/info.html)
- [ ] [koa-jsonp中间件](https://github.com/ChenShenhai/koa2-note/blob/master/note/jsonp/koa-jsonp.md) jsonp 实现
- [ ] [busboy模块](https://github.com/ChenShenhai/koa2-note/blob/master/note/upload/busboy.md) 上传文件 [busboy](https://www.npmjs.com/package/busboy) 
- [ ] [MySQL 建表初始化](https://chenshenhai.github.io/koa2-note/note/mysql/init.html) 

#### 两个课程公用的Feature

- [x] koa-router
- [x] koa-static
- [x] koa-bodyparser 解析表单数据
- [x] koa-view（ejs| nunjucks）
- [ ] mvc（models | controllers | services ）
- [ ] 把上面的有点集中下，写个脚手架bootstrap

### 

