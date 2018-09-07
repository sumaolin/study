# MileStones 开发进度



### 2018.08.22

- [x] koa-router
- [x] koa-static
- [x] koa-view（ejs）

### 2018.08.23

- [x] koa-bodyparse
- [x] middleware mi-send



#### Question

1. node-uuid has been deprecated，so，使用[uuid](https://www.npmjs.com/package/uuid)  

```js
const uuidv4 = require('uuid/v4');
uuidv4();
```



#### Reference

1. [nodejs async.whilst用法](https://www.cnblogs.com/yangluping/p/6504904.html)





### 2018.09.05

#### Question

```
Error: ENOENT: no such file or directory, mkdir 'F:\gitDev\study\uploads\a52b1bc17d1ff4c8fa356210b8a91e8b'
  errno: -4058,
  code: 'ENOENT',
  syscall: 'mkdir',
```

#### Method

对应的目录下没有相应的 目录，mkdir相应的path



#### Question

前期`status=md5Check` 等参数的数据 没有在formidable组件中处理，只有没有`status` 参数处理了，看了下两者的不同在于前者是`Content-Type: application/x-www-form-urlencoded; charset=UTF-8` 后者是： `Content-Type: multipart/form-data; boundary=----WebKitFormBoundaryfdAFyp5MIU7l65NU` 

#### Fixed

`koa-badyparser` Package 个处理了`Content-Type: application/x-www-form-urlencoded;` 类型的数据 





### 2018.09.07