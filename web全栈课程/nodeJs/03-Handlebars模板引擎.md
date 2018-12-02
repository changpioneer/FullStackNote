*  [目录](#0)
    *  [页面渲染](#1)
    *  [设置模板页](#2)
    *  [传递参数](#3)
    *  [中间件](#4)
    *  [路由传参](#5)
    *  [错误处理](#6)
    *  [模板引擎:Handlebars](#7)
    *  [帮助方法Helper](#8)
    *  [部分视图partial](#9)


<h1 id="1">页面渲染</h1>

```javascript
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


#### 通过条件语句实现switch语句

1. 在路由中处理数据

```js
router.get('/', function(req, res, next) {
  let type = 'bbb';
  res.render('index', {
    title: 'Express',
    typeSwitch:{
      isA : type == 'aaa',
      isB : type == 'bbb',
      isC : type == 'ccc'
    }
  });
});
```

2. 模板语句

```html
{{#if typeSwitch.isA}}
    <div>aaa</div>
    {{else if typeSwitch.isB}}
        <div>bbb</div>
    {{else if typeSwitch.isC}}
        <div>ccc</div>
    {{else}}
        <div>default</div>
{{/if}}
```

<h1 id="8">帮助方法Helper</h1>

要使用帮助方法需要先引用hbs模块。
```js
var hbs = require('hbs');
```

#### 行内helper
最终输出只是字符串的helper 

- 声明helper:  hbs.registerHelper('addOne', function (num){ return xx;}
- 使用helper:  {{addOne arg1}}

常见使用场景:数据格式化

#### 块级helper
最终输出是html的helper

- 注册扩展代码块helper
```js
// 注册扩展代码块helper
const blocks = {};//代码块缓存对象
hbs.registerHelper('myExtend', function (name, context) {
    // context 是上下文，保存有用方法和数据，最后一个参数永远是context
    let block = blocks[name]; // block用来存放代码块
    if (!block) {
        block = blocks[name] = [];
    }
    // 编译指令中代码块并放入block
    console.log(this);
    block.push(context.fn(this));
    // 与context.fn()配对还有一个方法
    // context.inverse()
});

hbs.registerHelper('myBlock', function (name) {
    const val = (blocks[name] || []).join('\n')
    blocks[name] = [];//清空缓存
    return val;
});
```

- 在视图页面中写的代码通过这样的方式保存进内存中。
```html
{{#myExtend 'myName'}}
    <script>
       function mmm() {
           
       };
    </script>
{{/myExtend}}
```

- 在使用的地方取出来使用.
```html
{{{myBlock 'myName'}}}
```

#### helper哈希传参
1. 注册helper；
```js
hbs.registerHelper('myLinks', function (options) {
    const {text, href, style} = options.hash;

    return `<a herf="${href}" style="${style}">${text}</a>`;
});
```

2. 在layout.hbs中传参；
```html
{{myLinks text='开课吧' href='http://www.kaikeba.com' style='color: red'}}
```

3. 在上面的案例中，显示出来的是字符串，而不是a标签；
```html
<a herf="http://www.kaikeba.com" style="color: red">开课吧</a>
```
**解决方法:**

- 使用hbs.SafeString
```js
hbs.registerHelper('myLinks', function (options) {
    const {text, href, style} = options.hash;
    return new hbs.SafeString(`<a herf="${href}" style="${style}">${text}</a>`);
});
```

- 使用三个大括号
```html
{{{myLinks text='开课吧' href='http://www.kaikeba.com' style='color: red'}}}
```

4. hbs.Utils.escapeExpression

将html字符串以字符串输出。
```js
hbs.registerHelper('myLinks', function (options) {
    const {text, href, style} = options.hash;
    const texts = '<span>fsfs</span>';
    return new hbs.SafeString(`<a herf="${href}" style="${style}">${hbs.Utils.escapeExpression(texts)}</a>`);
});
```


#### 抽取
在根目录下创建helpers目录，在helpers中创建index.js，将之前的注册代码写在index.js中。在app.js中引入index.js即可。因为hbs是单例，只需要执行就可以使用，不用通过module.exports来引用。

```js
const hbs = require('hbs');
```

#### [N多帮助方法库](https://github.com/helpers/handlebars-helpers)
```
const helpers = require('handlebars-helpers');
//只导入一部分，并且和我们handlebars挂钩
helpers.comparsion({handlebars: hbs.handlebars});
```

<h1 id="9">部分视图partial</h1>

(每次编写新的partial，需要重启) 

### 使用步骤

1. 注册partial目录(代码可以写在app.js或者上面抽取的helpers目录下，将来一些小的组件放进去);
```js
hbs.registerPartials(path.join(__dirname, '../views/partials'))
```
2. 在partials下面创建nav.hbs,将导航组件放进去;
3. 在layout.hbs中使用该组件
```html
{{> nav}}
```

### 动态partial
1. 注册动态partial，其实就是注册一个helper，whichPartial就是一个方法；
```js
// 动态partial
hbs.registerHelper('whichPartial', function (name) {
    return name;
});
```
2. 在layout.hbs中使用；
```html
{{> (whichPartial partialName)}}
```
partialName是个参数，传递进whichPartial方法中，返回一个值。比如在中间件中根据登录状态显示不同的布局。

```js
let isLogin = true;
res.locals.partialName = isLogin ? "abc1" : "nav2";
```
>这块也可以通过if-else来实现视图切换

### 块级部分视图 partial-block

#### 错误处理

如果nav视图不存在则显示下面的布局

```html
{{#> nav}}
  出现错误时，您会看到这句话
{{/nav}}
```

#### 使用块级partial传递内容
1. 在partials下面创建win.hbs;
```html
<style type="text/css">
    .winow{
        color: #00B7FF;
    }
</style>

<div class="winow">
    {{> @partial-block}}
</div>
```
2. 在layout.hbs中使用该组件，这里的div内容会被搬迁到win.hbs中，然后显示在layout.hbs，所以字体颜色会变；
```html
{{#> win}}
    <div>这里是窗口内容</div>
{{/win}}
```

#### 使用块级partial传递参数
1. 和上面一样，在partials下面创建win.hbs，里面有个参数myTitles;

```html
<style type="text/css">
    .winow{
        color: #00B7FF;
    }
</style>

<div class="winow">
    <div>标题：{{myTitles}}</div>
    {{> @partial-block}}
</div>
```

2. 在layout.hbs中使用该组件，这里myTitles后面的值可以传递给上面的myTitles。或者myTitles后面也可以是参数，通过路由来传递值。
```html
{{#> win myTitles='这里是窗口标题'}}
        <div>这里是窗口内容</div>
{{/win}}

或者：
{{#> win myTitles=others}}
        <div>这里是窗口内容</div>
{{/win}}
```

#### 使用布局partial
1. 在partials下面创建layout.hbs，以后使用的时候向里面的top、bottom填充内容;
```html
<div>
    {{> top}}
</div>

<div>
    {{> bottom}}
</div>
```
2. 使用

```html
{{#> layout}}
      {{#*inline 'top'}}
          这是top
      {{/inline}}

      {{#*inline 'bottom'}}
          这是bottom
      {{/inline}}
  {{/layout}}
```



