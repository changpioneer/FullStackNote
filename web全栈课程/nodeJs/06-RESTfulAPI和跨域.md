*  [目录](#0)
    *  [RESTful API](#1)
    *  [跨域](#2)


<h1 id="1">RESTful API</h1>

#### 1. GET/POST/PUT/DELETE
#### 2. 编写接口
res.json(obj)底层做了三件事：
```js
    // 0.设置状态码200
    // 1.设置响应头Content-Type: application/json
    // 2.返回序列化数据JSON.stringify(obj)
    res.json(users); // 等效于res.send(users)
```

#### 3. 接口测试方法

```js
const users = [
    {name: 'tom', age: 20}
]

//查询
router.get('/', function (req, res, next) {
    res.json(users); 
});

// 新增
router.post('/', function (req, res) {
//    传参方式3：body
    console.log(req.body);
    // 将传递过来用户数据添加至users
    try {
        users.push(req.body);
        res.json({success: true, users})
    } catch (e) {
        res.json({success: false})
    }
})

// 更新
router.put('/', (req, res) => {
    try {
        const index = users.findIndex(u => u.name == req.body.name)
        if (index != -1) {
            users[index] = req.body;
            res.json({success: true, users})
        }

    } catch (e) {
        res.json({success: false})
    }
})

// 删除
router.delete('/:name', (req, res) => {
    try {
        console.log(req.params.name);
        const index = users.findIndex(u => u.name == req.params.name)
        console.log(index);
        if (index != -1) {
            users.splice(index, 1);
            res.json({success: true, users})
        } else {
            res.json({success: false})
        }
    } catch (e) {
        res.json({success: false})
    }
})
```

<h1 id="2">跨域</h1>

**浏览器同源策略（协议、主机名、端口都相同）引起的前端接口调用问题**

## 1. 常见解决方案：

### 1. JSONP(Json With Padding)，前端+后端，绕过跨域

原理：前端动态添加script到当前页面，其src指向接口URL，服务器返回一个函数执行语句，该函数名有callback参数决定

实现：
   前端：指定请求方式为jsonp, jquery中{dataType:'jsonp'};

   后端：res.jsonp(data);

   > 接口必须是get方法，传递参数只能通过url的方式

```js
前端
<script>
$.ajax({
         url: 'http://127.0.0.1:8080/users/jsonp',
         dataType: 'jsonp',
         data: {name: 'tom'},
         success: function (users) {
             console.log(users);
         }
     })
</script>
```

```js
后端
router.get('/jsonp', (req, res) => {
         // 参数通过查询参或者url参数获取
          res.jsonp(users);

         // 底层实现原理，callback是回调函数名称
         // res.send(`${req.query.callback}(${JSON.stringify(users)})`) //es6
         // res.send(req.query.callback+'('+JSON.stringify(users)+')') //es5
     })
```

### 2. PROXY 代理，后端方案
原理：通过同源服务器发送请求至接口服务器，再由同源服务器转发结果给前端，从而规避跨域

   webpack-dev-server

   proxy

### 3. CORS（Cross），后端方案

#### 原理
CORS是W3C规范，真正意义上解决跨域问题。他需要服务器对请求检查，对响应头做特殊处理，从而解决跨域。

#### 实现

##### 1.对于简单请求
添加：res.set('Access-Control-Allow-Origin', 'http://localhost:8080');

   > 简单请求：方法是GET、POST、HEADER，同时对于post请求，不能有自定义请求头，同时编码方式必须是application/x-www-urlencoded, multipart/form-data,text/plain三个之一.

```js
前端
<script>
      //get
      $.ajax({
         url: 'http://127.0.0.1:8080/users/cors',
         success: function (users) {
             console.log(users);
         }
     });

     //post
     $.ajax({
         url: 'http://127.0.0.1:8080/users/cors',
         method: 'post', // 默认编码urlencoded,会将数值变为字符串
         data: { name:'jerry', age:20 },
         success: function (users) {
             console.log(users);
         }
     });
</script>
```

```js
后端
router.get('/cors', (req, res) => {
    // 添加响应头Access-Control-Allow-Origin
    res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.json(users);
})

router.post('/cors', (req, res) => {
    users.push(req.body);
    // 添加响应头Access-Control-Allow-Origin
    res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.json(users);
})
```

##### 2.对于预检测preflight请求，添加：

1）预检测路由 router.options()

2）响应头添加res.set('Access-Control-Allow-Headers', 'Content-Type');

3）如果请求方法是PUT或DELETE添加
```js
res.set('Access-Control-Allow-Methods', 'GET,POST,PUT');
```

```js
前端
<script>
//post
$.ajax({
          url: 'http://127.0.0.1:8080/users/cors',
          method: 'post', 
          headers: {'Content-Type': 'application/json'},
          data: JSON.stringify({ name:'jerry', age:20 }),
          success: function (users) {
              console.log(users);
          }
      })
</script>
```

```js
后端
    // 预检测
    router.options('/cors', (req, res) => {
        res.set('Access-Control-Allow-Origin', 'http://localhost:8080');
        res.set('Access-Control-Allow-Headers', 'Content-Type');

        //如果请求方法是PUT或DELETE
        //res.set('Access-Control-Allow-Methods', 'GET,POST,PUT');
        res.sendStatus(204);
    });

    router.post('/cors', (req, res) => {
        users.push(req.body);
        // 添加响应头Access-Control-Allow-Origin
        res.set('Access-Control-Allow-Origin', 'http://localhost:8080');
        res.json(users);
    });
```

##### 3.对于证书类型Credentials：请求中携带cookie的请求，需要额外处理

1）在options和请求路由中均添加：res.set('Access-Control-Allow-Credentials', 'true');

```js
前端
<script>
 // put
    $.ajax({
        url: 'http://127.0.0.1:8080/users/cors',
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        data: JSON.stringify({name: 'tom', age: 21}),
        xhrFields: {withCredentials: true}, // 携带cookie
        success: function (users) {
            console.log(users);
        }
    })
</script>
```

```js
后端
    // 预检测
    router.options('/cors', (req, res) => {
        res.set('Access-Control-Allow-Origin', 'http://localhost:8080');
        res.set('Access-Control-Allow-Headers', 'Content-Type');

        //请求中携带cookie的请求
        res.set('Access-Control-Allow-Credentials', 'true');
        res.sendStatus(204);
    });

    router.put('/cors', (req, res) => {
      // 添加响应头Access-Control-Allow-Origin
      res.set('Access-Control-Allow-Origin', 'http://localhost:8080');
      res.set('Access-Control-Allow-Credentials', 'true');

      const index = users.findIndex(u => u.name == req.body.name)
      if (index != -1) {
        users[index] = req.body;
      }
      res.json(users);
})
```
 
##### 4.cors模块

安装命令：npm i cors -S

基本使用

```js
   const cors = require('cors')
   app.use(cors()); //门户大开，相当于Access-Control-Allow-Origin：*
   
   app.use(cors({ //只对localhost:8080开，且可携带cookie
       origin: 'http://localhost:8080',
       credentials: true
   }));
   
   //白名单
   var whitelist = ['http://example1.com', 'http://example2.com']
   app.use(cors({
     origin: function (origin, callback) {
       if (whitelist.indexOf(origin) !== -1) {
         callback(null, true)
       } else {
         callback(new Error('Not allowed by CORS'))
       }
     }
   }));
   
   //异步配置
   var whitelist = ['http://example1.com', 'http://example2.com']
   var corsOptionsDelegate = function (req, callback) {
     var corsOptions;
     if (whitelist.indexOf(req.header('Origin')) !== -1) {
       corsOptions = { origin: true } // 生成配置项
     } else {
       corsOptions = { origin: false } 
     }
     callback(null, corsOptions) // 将选项作为参数2
   }
   
```

