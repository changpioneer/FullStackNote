[TOC]


[Koa](https://koajs.com/)

# 创建项目

- npm init

- 安装：npm i -S koa

- 创建一个最简单server
```js
  const app = new Koa();
  
  // 响应
  app.use(ctx => {
      // ctx封装了req,res
      // ctx.log(ctx);
      ctx.body = 'Hello, Koa！';
  })
  
  // 监听, 等同于http.createServer(app.callback()).listen(3000)
  app.listen(3000);
```

# 常用API

- ctx.request/response  koa封装的请求和响应对象

- ctx.req/res  原始请求和响应对象

- ctx.state 全局状态，用于给中间件视图传参，类似res.locals

- ctx.throw(status,msg,props) 快速错误处理

- ctx.app 应用实例引用

- app.context  ctx原型，ctx创建依赖于它，编辑它可以编辑ctx
    ```js
        // 修改ctx原型
        app.context.log = console.log;
        // app.context.db = require('./model/db');
    ```


- 衍生框架：eggjs(阿里)


