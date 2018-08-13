# webuploader koa的server实现





### 1. 总结上面两个教程

#### [Node Koa2 实战](https://github.com/ikcamp/koa2-tutorial)

1. [Log4js](https://github.com/nomiddlename/log4js-node) 日志插件
2. [规范与部署](https://github.com/ikcamp/koa2-tutorial/tree/10-mi-rule) 
3. [处理错误请求](https://github.com/ikcamp/koa2-tutorial/tree/9-mi-http-error)



####  [Koa2进阶学习笔记](https://github.com/chenshenhai/koa2-note)

1. [session & cookie](https://chenshenhai.github.io/koa2-note/note/cookie/info.html)
2. [koa-jsonp中间件](https://github.com/ChenShenhai/koa2-note/blob/master/note/jsonp/koa-jsonp.md) jsonp 实现
3. [busboy模块](https://github.com/ChenShenhai/koa2-note/blob/master/note/upload/busboy.md) 上传文件
4. [MySQL 建表初始化](https://chenshenhai.github.io/koa2-note/note/mysql/init.html) 



#### 两个课程公用的Feature

1. koa-router
2. koa-static
3. koa-bodyparser 解析表单数据
4. koa-view（ejs| nunjucks）
5. mvc（models | controllers | services ）



把上面的有点集中下，写个脚手架bootstrap

### 2. koa-webuploader

#### 百度FEX 开发的 [webuploader](https://github.com/fex-team/webuploader) It's a new file uploader solution!

> 特点： 分片、并发；预览、压缩；多途径添加文件（支持文件多选，类型过滤，拖拽(文件&文件夹)，图片粘贴功能）；HTML5 & FLASH； MD5秒传。

后端只有PHP的实现代码，想通过koa实现下，配合webuploader实现：

- [ ] 分片、并发
- [ ] MD5秒传
- [ ] 多途径添加文件（支持文件多选，类型过滤，拖拽(文件&文件夹)，图片粘贴功能）；
- [ ] 预览、压缩；






### 参考资料

#### 脚手架

1. [使用 Node.js 开发简单的脚手架工具](https://github.com/lin-xin/blog/issues/27)

#### 上传

1. [Koa2 之文件上传下载](https://github.com/lin-xin/blog/issues/25) 
2. [Node.js如何解析Form上传？](https://github.com/sumaolin/ebook/blob/master/md/Node.js%E5%A6%82%E4%BD%95%E8%A7%A3%E6%9E%90Form%E4%B8%8A%E4%BC%A0%EF%BC%9F.md) 
3. [node-formidable详解](https://github.com/sumaolin/ebook/blob/master/md/node-formidable%E8%AF%A6%E8%A7%A3.md)

 