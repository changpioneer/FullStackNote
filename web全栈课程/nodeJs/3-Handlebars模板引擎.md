*  [目录](#0)
    *  [页面渲染](#1)
    *  [设置模板页](#2)
    *  [传递参数](#3)
    *  [中间件](#4)
    *  [路由传参](#5)
    *  [错误处理](#6)
    *  [模板引擎:Handlebars](#7)


<h1 id="1">页面渲染</h1>
```js
res.render(tplName, ctx)
```

<h1 id="2">设置模板页</h1>
## 默认模板页
如果不设置模板页，则默认使用layout.hbs。在layout.hbs中，会将其他hbs的内容填充进{{{body}}}里面，所以页面的公共部分(比如导航栏)就可以写在layout.hbs中。

```html
<body>
    {{{body}}}
</body>
```

## 设置特定模板页
如果要设置特定模板页，需设置layout上下文。配置layout为layout2，则访问http://localhost:3000/vip-course时候会使用layout2.hsb模板。
```js
router.get('/', function(req, res, next) {
    res.render('course/vipcourse', {layout: 'layout2'});
});
```
<h1 id="3">传递参数</h1>

- 方式一: res.locals.xxx = 'yyy';
- 方式二: xxx:'kkkkk';

>方式一的参数可以在其他地方使用；方式二的优先级高；

```js
router.get('/', function(req, res, next) {
    res.locals.myPara = 'foooo';
    res.render('course/vipcourse', {myPara:'kkkkkk'});
});
```

<h1 id="4">中间件</h1>

- 对请求、响应对象进行预处理函数;
- 中间件函数签名:function(req,res,next){};
- 执行完处理逻辑后，必须执行next()，否则处理中断了;
- 中间件是线性的，从上往下依次执行;
- 路由是特殊的中间件，前面设置地址，只有在遇到地址时才起作用;
- 注册中间件app.use([url],middleware),url是限制;

在项目目录下创建目录middleware/get-vip-courses.js
```js
module.exports.initLocals = function (req, res, next) {
    // 将vip菜单数据存放至res.locals中
    res.locals.courses = [
        {
            url: '/vip-course/web',
            icon: 'https://img.kaikeba.com/web_menu.png',
            name: 'WEB全栈架构师',
            desc: '授课深度对标百度，。。。。。。。。。。。。'
        },
        //...其他数据省略
    ];
    next();// 进入后续中间件
}
```
在app.js中导出自定义的中间件，并且注册。在后面的路由中就可以使用中间件中获取的数据。
```js
//导出
var getVipCourses = require('./middleware/get-vip-courses');

//注册自定义中间件
app.use(getVipCourses.initLocal);

//中间件中获取的数据只能用在open-course路由中
app.use('/open-course', getVipCourses.initLocal);
```

<h1 id="5">路由传参</h1>

#### 定义占位符 
**/:id 获取req.params.id**

如下代码，在路由那里加上占位符，之后访问路径http://localhost:3000/vip-course/后面是web或者python，就去访问对应的vip-course/web.hbs和vip-course/python.hbs。

```js
//http://localhost:3000/vip-course/web
router.get('/:coursename', function(req, res) {
    res.render('vip-course/'+req.params.coursename);
});
```

案列：动态的修改title
```js
router.get('/:coursename', function(req, res) {
    // res.render('course/vipcourse');
    console.log('chang---', req.params.coursename);
    res.render('vip-course/'+req.params.coursename, {title: getTitle(res, req.params.coursename)});
});

function getTitle(res,course) {
    for(const c of res.locals.courses){
        if(c.url.indexOf(course) != -1){
            return c.name;
        }
    }
    return 'VIP开课';
}
```

#### 查询参 
获取方式: **req.query.xx**

比如http://localhost:3000/vip-course/python?name=zhangsan
```js
req.query.name  //zhangsan
```

#### 请求体 
获取方式: **req.body**

<h1 id="6">错误处理</h1>

- 方式1:next(new Error('错误信息'))
- 方式2:重定向，res.redirect([statuscode], path) path填写完整路由地址,statuscode默认302
```js
next(new Error('wocuole', 404));

next(createError(404, '我错愕'));//需要http-errors模块
```

<h1 id="7">模板引擎:Handlebars</h1>

- 插值绑定 {{prop}}
- 注释 {{! content}}
- HTML内容 {{{htmlStr}}}
- 条件语句 {{#if condition}}...{{/if}}
>condition只能是布尔值或者可以转换为布尔值的值，他不能是表达式 
>可以结合{{else if condition}}、{{else}}使用
- 循环语句 {{#each arr}}....{{/each}}
> - each可嵌套
> - 使用this或者.(点)表示上下文，常用语数据是值的情况
> - 使用@index，@key
> - 遍历对象 @key
> - 结合{{else}}，当数组为空时显示特别信息
       


