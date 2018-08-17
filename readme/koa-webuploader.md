# webuploader koa的server实现

## 规划功能

### 1. 总结上面两个教程

#### [Node Koa2 实战](https://github.com/ikcamp/koa2-tutorial)

1. [Log4js](https://github.com/nomiddlename/log4js-node) 日志插件
2. [规范与部署](https://github.com/ikcamp/koa2-tutorial/tree/10-mi-rule) 
3. [处理错误请求](https://github.com/ikcamp/koa2-tutorial/tree/9-mi-http-error)



####  [Koa2进阶学习笔记](https://github.com/chenshenhai/koa2-note)

1. [session & cookie](https://chenshenhai.github.io/koa2-note/note/cookie/info.html)
2. [koa-jsonp中间件](https://github.com/ChenShenhai/koa2-note/blob/master/note/jsonp/koa-jsonp.md) jsonp 实现
3. [busboy模块](https://github.com/ChenShenhai/koa2-note/blob/master/note/upload/busboy.md) 上传文件 [busboy](https://www.npmjs.com/package/busboy) 
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

后端只有`PHP`的实现代码，想通过`koa`实现下，配合`webuploader`实现：

- [ ] 支持断点续传
- [ ] 支持暂停上传
- [ ] 支持分块
- [ ] 支持多线程(*)
- [ ] 支持秒传(*)
- [ ] 支持显示上传进度
- [ ] 支持图片预览、压缩
- [ ] 支持文件多选，类型过滤，拖拽(文件&文件夹)，图片粘贴功能
- [ ] 基于 socket 




## 问题

1. `DeprecationWarning: Calling an asynchronous function without callback is deprecated.`

   可以通过`node --trace-deprecation app.js`  或者 `node --throw-deprecation app.js`  引起警告的位置

   参考： [DeprecationWarning: Calling an asynchronous function without callback is deprecated. - how to find where the “function:” is?](https://stackoverflow.com/questions/41195580/deprecationwarning-calling-an-asynchronous-function-without-callback-is-depreca) 





## 参考资料

#### 脚手架 bootstrap

1. [使用 Node.js 开发简单的脚手架工具](https://github.com/lin-xin/blog/issues/27)

#### 上传

1. [Koa2 之文件上传下载](https://github.com/lin-xin/blog/issues/25) 已读

   > [koa-body](https://www.npmjs.com/package/koa-body) 处理上传
   >
   > [koa-send](https://www.npmjs.com/package/koa-send) 处理下载功能

2. [Node.js如何解析Form上传？](https://github.com/sumaolin/ebook/blob/master/md/Node.js%E5%A6%82%E4%BD%95%E8%A7%A3%E6%9E%90Form%E4%B8%8A%E4%BC%A0%EF%BC%9F.md)  **推荐**

   > node 解析 `content-type` 为 `multipart/form-data` 的form文件上传的数据细节

3. [node-formidable详解](https://github.com/sumaolin/ebook/blob/master/md/node-formidable%E8%AF%A6%E8%A7%A3.md)

4. [聊聊大文件上传.md](https://github.com/kazaff/me.kazaff.article/blob/master/%E8%81%8A%E8%81%8A%E5%A4%A7%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0.md)  **主要参考实现**

   > 基于`webuploader`的分析，很详细周全，给出来实现目标，和遇到的各种细节考虑，给出了[demo](https://github.com/kazaff/webuploaderDemo) 
   >
   > demo中node实现报的问题通过 问题1解决

5. [文件（图片）上传调研](https://github.com/fex-team/webuploader/blob/research/experiment/README.md) by webuploader

6. [WebUploader Design](https://github.com/fex-team/webuploader/blob/research/design/README.md) & [**UML**](https://github.com/fex-team/webuploader/blob/research/design/UML.pdf)  by webuploader  

7. [Nodejs文件上传](http://xieyufei.com/2017/09/25/Nodejs-File-Upload.html?nsukey=3LOBfwkk%2F385vE%2F3ah0OInlID7GqSbUftOC97tSZdoO1XNXiPuRbJsMDoRhEJRbXzBpqCva1jL61LBW0uM4SyApDmmpSTkpHZ8JbNKpR%2B9dUmZPdY2xR17WKzklv6vFzGnTcnMI1trbKzXcXXPeDbGwc8GaxCpmxNzhT6CcJZkQZZjxYybo5Hfd5TdPe%2FauoUPNUfsOpT5jQbsIeXoFqIQ%3D%3D) 

   > `multer`  基于 `busbuy` ，只能出来`multipart/form-data` 类型的表单数据

8. [基于 ThinkJS 的文件上传（普通上传，文件预览，压缩上传，分片上传）](https://github.com/zhengqingxin/file-upload-demo) 

   > 基本的前端F2E操作和后端的实现，基础版实现

9. [移动端 Web 传图](https://github.com/progrape/mobile-upload-demo/issues/1) 

   > 前端的实现，配合koa后端简单实现

10. [记一次项目总结](http://xieyufei.com/2017/03/29/Project-Summary.html) 

   > 文件类型过滤：
   >
   > ```json
   > 后缀名            MIME名称
   > *.3gpp      audio/3gpp, video/3gpp
   > *.ac3       audio/ac3
   > *.asf       allpication/vnd.ms-asf
   > *.au        audio/basic
   > *.css       text/css
   > *.csv       text/csv
   > *.doc       application/msword    
   > *.dot       application/msword    
   > *.dtd       application/xml-dtd    
   > *.dwg       image/vnd.dwg    
   > *.dxf       image/vnd.dxf
   > *.gif       image/gif    
   > *.htm       text/html    
   > *.html      text/html    
   > *.jp2       image/jp2    
   > *.jpe       image/jpeg
   > *.jpeg      image/jpeg
   > *.jpg       image/jpeg    
   > *.js        text/javascript, application/javascript    
   > *.json      application/json    
   > *.mp2       audio/mpeg, video/mpeg    
   > *.mp3       audio/mpeg    
   > *.mp4       audio/mp4, video/mp4    
   > *.mpeg      video/mpeg    
   > *.mpg       video/mpeg    
   > *.mpp       application/vnd.ms-project    
   > *.ogg       application/ogg, audio/ogg    
   > *.pdf       application/pdf    
   > *.png       image/png    
   > *.pot       application/vnd.ms-powerpoint    
   > *.pps       application/vnd.ms-powerpoint    
   > *.ppt       application/vnd.ms-powerpoint    
   > *.rtf       application/rtf, text/rtf    
   > *.svf       image/vnd.svf    
   > *.tif       image/tiff    
   > *.tiff      image/tiff    
   > *.txt       text/plain    
   > *.wdb       application/vnd.ms-works    
   > *.wps       application/vnd.ms-works    
   > *.xhtml     application/xhtml+xml    
   > *.xlc       application/vnd.ms-excel    
   > *.xlm       application/vnd.ms-excel    
   > *.xls       application/vnd.ms-excel    
   > *.xlt       application/vnd.ms-excel    
   > *.xlw       application/vnd.ms-excel    
   > *.xml       text/xml, application/xml    
   > *.zip       aplication/zip    
   > *.xlsx      application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
   > ```
   >
   > 但是在开发时，我们习惯把accept设置为`image/*`来过滤所有非图片的文件。虽然这种方式简单粗暴，但是在新版本的chrome中，会出现点击input之后，文件选择框弹出非常慢的问题。将`accept="image/*"`改为指定的图片格式，比如指定几种常用格式，就能解决这个问题。
   >
   > ```html
   > <input type="file" name="file" accept="image/jpg,image/jpeg,image/png,image/gif">
   > ```


上面的问题记得自己也遇到过