[TOC]

#  1. 基础点

- ctx指上下文，它封装了请求和响应
- ctx.request/response
- 常用请求别名：
    - method 请求方法
    - protocal 协议
    - href 
    - host 宿主
    - path 路径
    - query 查询参
    - headers 请求头
- 常用响应别名
    - status 状态码
    - type 设置Content-Type
    - body 设置响应体数据
- state  给视图传递全局参数命名空间
- ctx.cookies.get()/set()

    ```
    // cookie签名使用keys
    app.keys = ['secret'];


    // 路由响应
    app.use(ctx => {
        //3
        console.log(3);
        // ctx封装了req,res
        // ctx.log(ctx);
        // console.log(ctx.method);
        // console.log(ctx.href);
        // console.log(ctx.headers);
        // console.log(ctx.query);
        // console.log(ctx.request.body); // 请求体中数据


        // 常用响应别名
        // ctx.status = 200;
        // ctx.type = 'json';
        // ctx.body = {success: true, data: 'lalala'};
        ctx.type = 'html';

        // 访问cookie
        if (ctx.url === '/index') {
            ctx.cookies.set('foo', 'bar', {
                domain: 'localhost', // 表示域名匹配才进行path验证
                path: '/index', // 表示请求url必须是localhost/index
                maxAge: 86400000,
                httpOnly: true,
                signed: true // 签名cookie
            });
            ctx.body = '<h1>koa</h1>';
        } else if (ctx.url === '/index/a') {
            console.log(ctx.cookies.get('foo', {signed: true}));
            ctx.body = '<h1>' + ctx.cookies.get('foo') + '</h1>';
        } else {
            // ctx.throw(404)
            // ctx.throw(404, '没有您要的页面')
            // ctx.throw(404, '没有您要的页面', {foo: 'bar'})
            throw new Error('自定义错误信息')
        }
    })
    ```

- ctx.throw([status],[msg],[props]) 用于快速创建用户级错误信息,可用于响应内容
- app.context  ctx原型

# 2. koa中间件体系

- 中间件函数签名 async (ctx,next)=>{await next();}

  > 中间件必须是async
  >
  > next()之前的代码

- 对于这两个中间件，请求过来时，先执行1，再执行2，再执行之后的逻辑代码，执行完成后返回数据时，执行3，再执行4.

```js
// logger
app.use(async (ctx, next) => {
    //1
    console.log(1);

    await next();

    //4
    console.log(ctx.method + '-' + ctx.url + ' ' + ctx.response.get('X-Response-Time'));
})

// 响应时间
app.use(async (ctx, next) => {
    //2
    console.log(2);
    const start = Date.now();//开始计时

    await next();

    //3
    const ms = Date.now() - start;//计时结束
    ctx.set('X-Response-Time', ms+'ms');
})
```

#  3.错误处理

```
// 错误处理
app.use(async (ctx, next) => {
    try {
        await next();
    }catch (e) {
        ctx.app.emit('error', e);  // 委托全局事件
        ctx.body = '服务器内部错误：500'
    }
})

// 全局错误处理
app.on('error', err => {
    console.error(err);
})
```


# 4.项目工程化、自动化：koa-generator

    - 安装 npm i -g koa-generator
    - 创建项目 `koa2 koa-test --hbs`
    - 启动 npm run dev

## 1) 模板引擎：koa-hbs

- 卸载之前的 npm uninstall koa-views

- 安装：npm i -S koa-hbs@next

- 配置：

    ```
    // app.use(views(__dirname + '/views', {
    //     extension: 'hbs',
    //     map: { hbs: 'handlebars' }
    // }))

    app.use(hbs.middleware({
        viewPath: path.join(__dirname, './views'),
        defaultLayout: 'layout',
        partialsPath: path.join(__dirname, '/views/partials'),
        contentHelperName: 'extend', // 扩展代码原名contentAs
        disableCache: true
    }));
    ```

## 2) 路由：koa-router

- 安装：免安装，koa-generator已集成

- 路由定义：

    ```
    const router = require('koa-router')()
    
    // 注册路由前缀
    router.prefix('/users')
    router.get('/:id', async function (ctx) {})
    ```

## 3) 路由传参：

    - query    ctx.query
    - params ctx.params.xx
    - body      ctx.request.body

```js
router.get('/:id', async function (ctx) {
    console.log(ctx.query);
    console.log(ctx.params.id);
    // ctx.throw(500,'aaa')
    // throw(new Error('aaa'))
    await ctx.render('users', {
        layout: false // 和express里面不一样，传false
    })
    // ctx.body = 'this is a users response!'
})

router.post('/', async (ctx) => {
    // ctx.body = ctx.request.body.username + '欢迎你！'
    ctx.redirect('/'); // 重定向
})
```

## 4) 数据库

- 在app.js中导入数据库
```
// 添加ctx.db
const db = require('./databases/db');
app.context.db = db;
```

- 使用数据库
```
router.get('/', async function (ctx, next) {
    const users = await ctx.db.sqlQuery('select * from user');
    console.log(users);
    ctx.body = 'this is a users response!'
})
```


