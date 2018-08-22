# 项目代码的格式化统一配置

以前没时间过eslint，每次项目vscode 编辑器的eslint插件就关掉eslint，老项目都没注意过相关的代码规范，这次新项目加入进去实践下！




### Question

1. 三个插件功自动有些规则是冲突的，需要确定优先顺序，其他插件进行自定义化的配置
2. 都可以自动保存格式化的功能



### Reference

1. [用 ESLint 和 Prettier 写出高质量代码](https://egoist.moe/2017/12/11/write-better-code-with-eslint-and-prettier/) 

   > 在package中对两者进行配置

2. [使用ESLint ＆ Prettier美化Vue代码](https://jeffjade.com/2018/06/18/142-beautify-vue-by-eslint-and-prettier/) 

   > 相对官方的文档，感觉没讲清楚

3. [Integrating with ESLint](https://prettier.io/docs/en/eslint.html) 

   > 对优先使用了Pretiter规则还是esLint都给出了解决方案，并给出了推荐的设置



### Answer

#### 方案 1

最简单的，[Integrating with ESLint](https://prettier.io/docs/en/eslint.html) 中 最后的recommend的方案：

1.  `yarn add --dev eslint-plugin-prettier eslint-config-prettier` 

2. `.eslintrc.json` 配置中添加 

   ```json
   {
     "extends": ["plugin:prettier/recommended"]
   }
   ```

   简单 so easy！

   ​

#### 方案 2

1. ` npm i -D eslint-plugin-prettier` 

 2. `package.json`中添加配置： 

    ```json
    "eslintConfig": {
      "extends": [
        "prettier"
      ],
      "plugins": [
        "prettier"
      ]
    },
    "prettier": {
      "singleQuote": true,
      "semi": false
    },
    ```



### Different

两者的区别在于是否使用单引号和行末尾是否有分号，第二种eslint报错不会自动修复



### Recommend integrating with editor

配置编辑器的 `formatOnSave` 设置，保存后自动化格式检测，列出vscode的配置， [Reference](https://jeffjade.com/2018/06/18/142-beautify-vue-by-eslint-and-prettier/#VS-Code-%E7%BC%96%E8%BE%91%E5%99%A8)

```yaml
{
  "prettier.eslintIntegration": true,
  "eslint.autoFixOnSave": true,
  "editor.formatOnSave": true
}
```

### vscode编辑器中相关的插件：

1. [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
2. [EditorConfig for VS Code](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)
3. [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

暂时没涉及到`editconfig` 后面用到在添加