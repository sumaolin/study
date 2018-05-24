#git commit message 规范设置



### 参考文档

1. [Commit message 和 Change log 编写指南](http://www.ruanyifeng.com/blog/2016/01/commit_message_change_log.html)
> 下面的代码步骤主要参考的文章，讲解了使用使用方法，和配置方法

2. [Git Commint规范](http://mrzhang123.github.io/2017/10/18/git-commint-norm/)

3. [用 husky 和 lint-staged 构建超溜的代码检查工作流](https://zhuanlan.zhihu.com/p/27094880)
> 配合prettier 在提交的时候对代码进行格式化

**项目初始化最先进行的 git commit message 的规范**

#### 代码步骤：

##### 1. 生成 `package.json`文件 设置项目信息

``` json
npm init
```
##### 2. 安装 git commit 相关package

``` json
npm install --g commitizen 
commitizen init cz-conventional-changelog --save-dev --save-exact
```
commitizen 全局安装然后才可以使用 `commitizen` 命令，上面两行命令后 **凡是用到git commit命令，一律改为使用git cz**，这时候就如下提示你写 git commit message了
![image](/uploads/689ea055e4f350a2d3b2e231188a3d22/image.png)

第二行代码就设置了支持 Angular 的 Commit message 格式，相关信息查看参考文档


##### 3. 上面的步骤设置完成后，提交的信息就是 commitizen friendly就可以在项目发布的时候 通过命令行生成Change log， 首先：

``` json
npm install -g conventional-changelog
```
生成 change log文件 `CHANGELOG.md`
``` json
$ conventional-changelog -p angular -i CHANGELOG.md -w -r 0
```

#### 进阶设置 

如果 commitizen, commitizen-changelog 只是想当前的项目内进行设置，或者所有的项目开发者统一使用 cimmitizen friendly ，可以进行进一步的设置

##### 1. commitizen local install
``` json
npm install --save-dev commitizen
```
然后package.json 添加
``` json
"scripts": {
    "cz": "git-cz"
 }
```
`git commit` 直接使用 `npm rum cz`

同时生成 change log 的命令也可以写入到package.json 中
``` json
"scripts": {
    "changelog": "conventional-changelog -p angular -i CHANGELOG.md -w -r 0"
  }
```

通过 `npm run changelog` 生成 change log日志

#### bug

windows 7 环境下 cmder软件 对 git cz 一直报错，vscode 的terminal 是没问题的，和自带的cmd 命名工具也是没问题的，就暂时放弃了对bug的 继续跟进





## 知识点

1. `git clone  giturl --depth=1` 参数 --depth ==1 只拿到了一个分支一个 commit，便于快速的clone。如果在去fetch 其他的branch 和commits，直接`git fetch --all` 做不到的，要单独设置下  `git pull --unshallow` 或者 `git fetch --unshallow`  

   > 前天git clone分支的时候使用总吧master 分支的东西clone下来，东西很多时间很长，加`--depth=1` 就可以解决了

   参考链接 ： [`git clone --depth=1` 之后怎样获取完整仓库?](https://segmentfault.com/q/1010000000409170)

   ​