# [Nestjs framework 30 天初探](https://ithelp.ithome.com.tw/users/20107195/ironman/1252)

参考上面的文档学习 Nestjs，文档写于 2017-12-04,当时 Nestjs 版本是 V4.0.2, 当前的版本是 V7.5.0, 所有教程已当前版本 V7 为主实现，有些功能 nest-cli 可以直接生成会给出相应的 cli 命令。

本项目代码地址[Nestjs30Days](https://github.com/sumaolin/study/tree/dev_Nestjs30Days), 目录 project, 分支都是上一日起的基础上开始新分支，如: nestDay/1, nestDay/2。

版本信息： node 12.19.0; npm 6.14.8; nest-cli 7.2.0

## Reference

1. [NestJS 实战教程](https://juejin.im/collection/6845244185432293389)
2. [Nest.js 教程](https://github.com/dzzzzzy/Nestjs-Learning)
3. [Nestjs 框架教程](https://keelii.com/2019/07/03/nestjs-framework-tutorial-1/)

## 学习进度

### [Day1](./readme/Nestjs30Days/day1.md) 2020-11-09

安装 nest cli : npm i -g @nestjs/cli ，成功后可以在 cli 中使用 nest 命令

初始化项目： nest new project

通过 controller 控制路由

1. @get('/hello') 控制访问
2. @controller('/user') 整个 controller 下的都可以必须加 user 前缀了
3. app 全局添加前缀 app.setGlobleProfix('admin') 来控制所有路由添加前缀

app.controller.ts 中的 getHello() 方法 通过上面的设置对应的访问路由变化：

1. <http://localhost:3000/hello>
2. <http://localhost:3000/user/hello>
3. <http://localhost:3000/admin/user/hello>

nodemon 模式启动项目 ： yarn start:dev ，这样每次修改代码后程序自动重新启动，不用手动启动了

## 规范

1. [git commit message 规范设置](./readme/git_cmmit_message.md)

   > git commit 直接改成 git cz 提交暂存区信息
