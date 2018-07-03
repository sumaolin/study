# 笔记

## 进度

### 2018.06.27

1.  #### [koa2 开始](https://chenshenhai.github.io/koa2-note/note/start/quick.html)

### 2018.06.28

2. [路由](https://chenshenhai.github.io/koa2-note/note/route/koa-router.html)

```js
route.use('/user', user.routes(), user.allowAllMethods()) // '/user' 是prefix 前缀
```



3. [请求数据获取](https://chenshenhai.github.io/koa2-note/note/request/get.html)

问题：

1. Unexpected identifier: await ，看[资料](https://cnodejs.org/topic/5640b80d3a6aa72c5e0030b6) **await必须在async函数的上下文中**
2. ctx.req 是context封装的node的原生request对象





### 2018.06.29

4. [静态资源加载](https://chenshenhai.github.io/koa2-note/note/static/server.html)

`demo1.js` 实现了node 原生的静态资源服务，遇到的俩问题：

1. `walk.js` 中 `fs.readdirSync()` 写成了 `fs.readFileSync()` ，报错， [API](http://nodejs.cn/api/fs.html)
2. `Array.entries()` 的 [API](http://www.runoob.com/jsref/jsref-entries.html) 





5. [cookie/session](https://chenshenhai.github.io/koa2-note/note/cookie/info.html) 
   1. cookie设置的时候domain 没写正确，没看到相应的cookie

   2. `Error: ER_BAD_FIELD_ERROR: Unknown column 'NaN' in 'field list'`   错误是因为expires 字段值必须为int类型，不能是字符串类型，expires 和 maxAge 字段的值写反了造成的

   3. `_mysql_session_store`  为 koa-mysql-session 默认的session生成的table 。数据库sesion_demo 必须手动创建

   4. mac下启动mysql `mysql.server start`   ;   `mysql.server stop`  停止Mysql

   5. mac修改Mysql root密码: ` mysqladmin -u root -p password 123465 ` 进行修改可以通过 `mysql -u root -p session_demo进行连接登陆，需要输入密码的

   6. ```js
      app.use(
        session({
          key: 'SESSION_ID',  // cookie中key：value中key为的值；_mysql_session_store 数据表中id值为key：value的组合值
          cookie: cookie,
          store: store
        })
      )

      ctx.sesion = {
          user_id: 13324,
          count: 2
      } //是设置在 _mysql_session_store table中data的值
      ```




### 2018.07.03

1. [模板引擎](https://chenshenhai.github.io/koa2-note/note/template/add.html) 

   > package `koa-views`  & `ejs` 