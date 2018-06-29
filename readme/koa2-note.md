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