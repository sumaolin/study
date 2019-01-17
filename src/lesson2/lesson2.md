# Type System

![img](https://github.com/MiYogurt/nodelover-books/raw/master/typescript/img/zaiwHEAC9am5JlYoNUWPhaOJTToUhNKzKNENoHAo.jpg) 



### 基础类型

1. number
2. string
3. boolean
4. `any`  不提示
5. `Enum`：枚举类型 `enum choose{yes, no}` 
6. Array : `Array<string>`  or `string[]` 
7. Tuple 元组，规定好数组元素类型的数组 `[string, number]`
8. void : method no return
9. never :　method never return , example：`while(true){}` or  `throw new Error()` 



### 强制类型转换

1. ` customerInput as string`   
2. `<string>customerInput`  





### 声明类型

1. `const | let 变量名称 : 变量类型 = 变量的值` 
2. `function() : 返回值的变量类型`  无返回值 `void` 





### 变量解构 Destructuring

1. 对象属性，数组的解构： `[a,b,c] = ['a', 'b', 'c']` 
2. `...b`  剩余的为指定变量
3. `{a: x, b} = {a: 'string', b: 'number'}`  => `x='string'   `



