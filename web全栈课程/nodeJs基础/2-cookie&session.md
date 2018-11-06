*  [目录](#0)
    *  [cookie&session简介](#1)
    *  [cookie](#2)
    *  [session](#3)
   


<h1 id="1">cookie&session简介</h1>

#### cookie
在浏览器保存一些数据，每次请求都会带过来

- cookie空间非常小——省着用(4K)
- 安全性非常差

#### session
  保存数据，保存在服务端
  *安全、无限

session：基于cookie实现的,cookie中会有一个session的ID，服务器利用sessionid找到session文件、读取、写入;

隐患：session劫持

<h1 id="2">cookie</h1>
### 发送cookie
path表示访问/aaa时才会生成cookie，maxAge超时时间，单位毫秒
~~~js
server.get('/aaa/a.html', function (req, res) {
//path表示访问/aaa时才会生成cookie，maxAge超时时间，单位毫秒
    res.cookie('cookiename', 'chang', {path:'/aaa', maxAge: 2*3600*1000});
    res.send('ok');
});
~~~
如下两个目录：
在/ccc下生成一个cookie，根目录/和上级目录/aaa是可以访问该cookie的，但是/bbb是不能访问这个cookie。
~~~
/aaa/ccc
/bbb
~~~

### 解析cookie
~~~js
const expresss = require('express');
const cookieParser = require('cookie-parser');
const server = expresss();
server.use(cookieParser());
server.use('/aaa/a.html', function (req, res) {
    console.log(req.cookies);
    res.send('okk');

});
~~~

### 发送签名cookie
需使用cookie-parser模块。 

加密cookie使用cookie-encryption模块。
```js
const expresss = require('express');
const cookieParser = require('cookie-parser');

const signStr = '123abc';
const server = expresss();

server.use(cookieParser(signStr));

server.use('/aaa/a.html', function (req, res) {
    req.secret = signStr;
    res.cookie('user', 'chang', {path:'/aaa', signed:true});
    
    console.log('签名cookie', req.signedCookies);// { user: 'chang' }
    console.log('无签名cookie', req.cookies);// {}
    res.send('okk');

});
server.listen(3000);

//签名后的cookie值:   s%3Achang.lZyf%2F%2Fbg4AeZydiF1aFPGhVKh1ndUyR8asfOY3NLVj4
```
#### 删除cookie
res.clearCookie(名字);如res.clearCookie('user');

<h1 id="3">session</h1>
需使用cookie-session模块。
~~~js
const expresss = require('express');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');

const server = expresss();

server.use(cookieParser());//必须先解析cookie，因为session是依赖于cookie
server.use(cookieSession({
    keys: ['aaa', 'bbb', 'ccc'],//必选，循环使用来加密session，
    name: 'pioneer', //修改session名称，默认是session
    maxAge: 20*60*1000 //session有效期
}));

server.use('/aaa/a.html', function (req, res) {
    if(req.session['count'] == null){
        req.session['count'] = 1;
    }else {
        req.session['count'] += 1;
    }
    console.log(req.session);//Session { count: 2 }
    res.send('ok');
});
server.listen(3000);
~~~

删除session
~~~js
delete req.session;
~~~






