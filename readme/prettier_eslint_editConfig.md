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

### 后续更新

1. [配置 editorconfig](https://segmentfault.com/a/1190000014755172#articleHeader11) 中相关的配置，随手加上去了！

```
root = true

[*]
charset = utf-8
indent_style = space
indent_size = 2
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true
```





2. [使用ESLint+Prettier来统一前端代码风格](https://segmentfault.com/a/1190000015315545) 中提到的可以Prettier的配置选项

```json
module.exports = {
  "printWidth": 80, // 一行的字符数，如果超过会进行换行，默认为80
  "tabWidth": 2, // 一个tab代表几个空格数，默认为80
  "useTabs": false, // 是否使用tab进行缩进，默认为false，表示用空格进行缩减
  "singleQuote": false, // 字符串是否使用单引号，默认为false，使用双引号
  "semi": true, // 行位是否使用分号，默认为true
  "trailingComma": "none", // 是否使用尾逗号，有三个可选值"<none|es5|all>"
  "bracketSpacing": true, // 对象大括号直接是否有空格，默认为true，效果：{ foo: bar }
  "parser": "babylon" // 代码的解析引擎，默认为babylon，与babel相同。
}
```

