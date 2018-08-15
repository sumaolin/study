# koa 启动框架

## 规划

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

