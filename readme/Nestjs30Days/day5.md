# Pipe 管道

## Review

### 2020.11.20

几种管道的用法 Pipe

1. `class-validator& class-transformer`  进行 TS 中的 类型验证，统计装饰器来定义数据类型，通过pipe来验证数据类型的正确与否，正确返回原数据，不正确抛出异常
2. 数据类型转换 pipe
3. findUserByIdPipe 通过管道来实现业务逻辑
4. 内置验证管道 validationPipe

自定义管道后使用管道 ，通过作用域可以分为全局，方法，方法的参数。通过全局进行设置的时候和异常过滤器一样，使用`useGlobalPipes()`无法注入依赖，需要在根模块下通过provider声明的方法进行设置

```typescript
import { Module } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';

@Module({
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe
    }
  ]
})
export class AppModule {}

```





### 2020.11.19

这两天被 refer 2,3 里面使用 joi 的 demo 卡住了，2020.11.19 看了 [Joi](https://github.com/sideway/joi) 官方 demo 才明白了自己在那块写错了，Joi 版本升级后写法的改变，schema 的的 object 定义方法改变了，新知识还是要查[官方的文档 API](https://joi.dev/api/) 啊

```typescript
export const CreateCatSchema = Joi.object({
  name: Joi.string().required(),
  age: Joi.number().required(),
  breed: Joi.string().required(),
})
```

原来不需要通过 `Joi.object()` 定义的，直接字面量定义对象就可以了，旧的代码：

```typescript
export const CreateCatSchema = {
  name: Joi.string().required(),
  age: Joi.number().required(),
  breed: Joi.string().required(),
}
```

## Reference

1. [Nestjs framework 30 天初探:Day07 Pipes](https://ithelp.ithome.com.tw/articles/10191227)

2. [Nestjs 框架教程（第八篇：管道）](https://keelii.com/2019/07/03/nestjs-framework-tutorial-8/)

   > 管道通常有两种作用：
   >
   > - **转换/变形**：转换输入数据为目标格式
   > - **验证**：对输入数据时行验证，如果合法让数据通过管道，否则抛出异常
   >
   > 管道 pipe 和过滤器 filter 之间的关系：管道偏向于服务端控制器逻辑，过滤器则更适合用客户端逻辑

3. [官网 管道](https://docs.nestjs.cn/7/pipes)
