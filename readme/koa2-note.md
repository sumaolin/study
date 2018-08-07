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



2. [文件上传](https://chenshenhai.github.io/koa2-note/note/upload/busboy.html) 

+ node [util.inspect](https://www.zhihu.com/question/34776469#answer-27551087) 的用法





### 2018.07.11

1. [数据库mysql](https://chenshenhai.github.io/koa2-note/note/mysql/info.html)

* 在 第一demo中 报错：

```bash
 throw err; // Rethrow non-MySQL errors
        ^

Error: ER_PARSE_ERROR: You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near SELECT * FROM _mysql_session_store' at line 1
    at Query.Sequence._packetToError (F:\gitDev\study\node_modules\mysql\lib\protocol\sequences\Sequence.js:52:14)
```

在Mac下没看出来的

```sql
'SELECT * FROM _mysql_session_store'
```

前面多了个点，去掉就可以了

* `demo1.js` 报错： `TypeError: connection.release is not a function`  ，因为没有使用连接池时候结束connection时用 `connection.end()`，`connection.release()` 是释放到连接池中



* demo4.js 中报错：

```shell
(node:13172) UnhandledPromiseRejectionWarning: Unhandled promise rejection (rejection id: 1): Error: ER_PARSE_ERROR: You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near 'JSON DEFAULT NULL,
  `create_time` varchar(20) DEFAULT NULL,
  `modified_time` v' at line 3
(node:13172) [DEP0018] DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code.
```

引起原因：  `data_info JSON DEFAULT NULL` 中的 JSON数据类型

> mysql自5.7.8版本开始，就支持了json结构的数据存储和查询 

我window上的是 `5.6.21 - MySQL Community Server (GPL)` 看来是不支持了，回家试下最新的版本是否支持





2. [JSONP实现](https://chenshenhai.github.io/koa2-note/note/jsonp/koa-jsonp.html) 





### 2018.07.12

10. [单元测试](https://chenshenhai.github.io/koa2-note/note/test/unit.html) 

报错： `1) Uncaught error outside test suite` ， 是因为 app调用了两次的原因，测试的时候demo不需要启动，参考： [mocha watching fails under npm](https://stackoverflow.com/questions/32868692/mocha-watching-fails-under-npm) 



报错： `Uncaught AssertionError: expected true to be a boolen`  ，手残boolean写错了！





### 2018.07.13

12. [项目框架设计](https://chenshenhai.github.io/koa2-note/note/project/framework.html) 

> 结合react 实现用户注册，登录功能！



先使用 react antd-UI进行页面的构建，想到以前的 [Rekit](http://rekit.js.org/) 工具使用更快捷写

参考：

1. [Rekit 2.0 构建基于React+Redux+React-router的可扩展Web应用](https://www.jianshu.com/p/fe89870007fc)  一下午看这篇文章了，挺长的
2. [精读《Rekit Studio》](https://zhuanlan.zhihu.com/p/33853805) 关于rekit工具设计的一些感想
3. [Introducing Rekit Studio: a real IDE for React and Redux development](https://medium.freecodecamp.org/introducing-rekit-studio-a-real-ide-for-react-and-redux-development-baf0c99cb542) 



### 2018.08.07

停了好久了，继续拾起来做完这件事吧！

#### Done

完成了user界面的 tab选项卡功能，和workspace 代表登陆成功后的节目

#### Question

使用Rekit生成的项目使用了react-router，所以路由要有前端控制了，和后端的koa-router有些冲突，想下怎么解决？