## 枚举 enum

默认从 0 开始的自增类型的对象

```
enum enumDemo1{
  a,
  b,
}
```

可以直接给枚举元素赋值

```
enum enumDemo2{
  a=2,
  b
}
```

#### constont enum 常量枚举

```
const enum enumconstDemo{
  c,
  a=1,
  b
}
```

不能输出 常量变量整体会提示，只在 TS 中起作用
`[ts] 'const' enums can only be used in property or index access expressions or the right hand side of an import declaration or export assignment or type query.`
