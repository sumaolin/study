# HttpException

## Review

1. throw new Error() 非 HttpException Nest 会 respons 客户端 500 ，同时后台显示错误信息

   ```json
   {
     "statusCode": 500,
     "message": "Internal server error"
   }
   ```

   HttpException 错误，客户端会相应 403

   ```json
   {
     "statusCode": 403,
     "message": "Forbidden"
   }
   ```

2. 扩展 HttpException，来自定义自己的 异常显示

3. 实现 ExceptionFilter 来过滤自定义异常处理

   @catch() 参数可以确定要过滤的异常类型，如果不写，可以过滤全部异常，在实现接口中catch方法时候也要第一个参数catch(exception：unknown)，才可以捕获全部异常

4. 使用 异常过滤器 ExceptionFilter，可以在不同作用域的异常处理，（不同作用域，代表不同的控制范围），通过装饰器 @UseFilters(new ExceptionFilter()) 来实现

   1. method
   2. controler
   3. app 全局，全局方式有两种，一是 app.useGlobalFilters(new ExceptionFilter())，这个方式无法在 ExceptionFilter 中通过构造函数 依赖注入

   

## Reference

1. [Nestjs framework 30 天初探:Day06 Exception Filters](https://ithelp.ithome.com.tw/articles/10191003)
2. [Nestjs 框架教程（第七篇：异常过滤器）](https://keelii.com/2019/07/03/nestjs-framework-tutorial-7/)
3. [Nest 高级功能 —— Exception filter](https://github.com/dzzzzzy/Nestjs-Learning/blob/master/docs/exception-filter.md) 
4. [异常过滤器](https://docs.nestjs.cn/7/exceptionfilters?id=异常过滤器)  官网
