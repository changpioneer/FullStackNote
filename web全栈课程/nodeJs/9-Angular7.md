*  [目录](#0)
    *  [Angular7的使用](#1)
    *  [用户登录、注册功能](#2)
    *  [登录表单](#3)
    *  [发送登录请求](#4)
    *  [模块化](#5)
    *  [用户注册](#6)


<h1 id="1">1.Angular7的使用(学习中心开发)</h1>

## 1. angular/vue/react比较

angular: 完整解决方案、超前架构体系、跨平台、模块化、学习曲线陡峭

vue：轻量级、渐进式、易用性强、文档丰富

react：单项数据流，生态系统强大、跨平台

angular适合规模比较大的项目，vue/react适合中小型项目，但是也可以做大型项目。

## 2. 创建angular项目
[官网](https://angular.cn)

- 环境准备工作：angular cli：

   npm i -g @angular/cli
   mac: sudo npm i -g @angular/cli

- 创建项目：ng new kaikeba-student  或 webstorm新建(angular cli)

- 运行项目：ng serve 或 npm start

- 创建组件：ng generate component xxx 简写 ng g c xxx


<h1 id="2">2.用户登录、注册功能</h1>

### 1.组件注册，app.module.ts

```js
declarations: [// 声明组件，才能正常使用组件
  AppComponent,
  LoginComponent,
  RegisterComponent
]
```

### 2.配置路由/声明路由，app.module.ts

```js
import {Router, RouterModule} from '@angular/router';

const routes: Router = [
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent}
  ];
```

### 3.导入路由模块，app.module.ts

```js
imports:[
  ​ RouterModule.forRoot(routes)   
  ]
```
  
>import是导入代码的模块，imports导入的是框架模块。


### 4.放入路由插座
app.component.html
```html
<!--想要看到路由内容，需要放置路由出口-->
<router-outlet></router-outlet>
```

### 5.路由链接

app.component.html
```html
  <a routerLink="login" routerLinkActive="active">登录</a>
```


```js
<!--路由导航链接-->
<div class="logo">
  <a href="http://www.kaikeba.com/">
    <img src="http://student.kaikeba.com/assets/blue_logo-57d711624a.png">
  </a>
</div>
<div class="nav">
  <a routerLink="login" routerLinkActive="active">登录</a>
  <a routerLink="register" routerLinkActive="active">注册</a>
</div>

<!--想要看到路由内容，需要放置路由出口-->
<router-outlet></router-outlet>
```


<h1 id="3">3.登录表单</h1>

###  1. 表单校验：模板驱动表单校验

```
@NgModule({
  imports: [
    FormsModule, // 使用模板驱动表单
  ],
})
export class AppModule {
}
```

​第一步：导入FormsModule

​第二步：创建数据模型modle=LoginUser{phone, password}

​第三步：表单中绑定该模型[(ngModel)]="model.phone"

- 关于输入输出属性，输出属性(click)="onClick($event)"，输入属性[title]="myName"

- 双向绑定，即输入又输出[(ngModel)]="model.phone"

- 模板引用变量

>在当前模板上下文定义一个变量, ```<input #phone>```  ,若不赋值，表示dom元素；
若赋值为ngModel，```<input #phone1="ngModel">``` , 表示把ngModel的值赋值给phone1,则可以访问当前元素校验状态；若赋值为ngForm，则可以访问整个表单校验状态.

- 数据校验是基于H5表单校验

>常用的有：required,min,max,minlength,maxlength,pattern, type='email | number | url'

- 校验状态

>valid,invalid,touched,untouched,dirty(用户输入过东西了),pristine(用户没有输入过东西)

- errors里面的字段名就是上面的h5校验名字，如：phone.errors.required

```html
<form #form="ngForm" (ngSubmit)="login()">
  <div class="form-group">
    <!-- #phone1是模板引用变量 -->
    <input type="text" class="form-control"
           name="phone" placeholder="请输入手机号"
           [(ngModel)]="model.phone" #phone1="ngModel"
           required pattern="1[3,5,7,8]\d{9}" >
    <div class="error" [hidden]="phone1.valid || phone1.untouched" >
      <span *ngIf="phone1?.errors?.required">请输入手机号</span>
      <span *ngIf="phone1?.errors?.pattern">手机格式不正确</span>
    </div>
  </div>

  <div class="form-group">
    <input type="password" class="form-control"
           name="password" placeholder="请输入密码"
           required="required"
    [(ngModel)]="model.password" #psd="ngModel" >
    <div class="error" [hidden]="psd.valid || psd.untouched" >
      <span *ngIf="psd?.errors?.required">请输入密码</span>
    </div>
  </div>

  <div class="cb-group">
    <label>
      <input type="checkbox">
      <span>7天自动登录</span>
    </label>
    <a href="">忘记密码</a>
  </div>

  <button type="submit" class="btn btn-primary"
          [disabled]="form.invalid" >登录
  </button>
</form>
```

<h1 id="4">4.发送登录请求</h1>

### 1.配置代理，防止跨域

​项目的根目录下创建proxy.conf.json文件

```json
{
  "/api": {
    "target": "http://localhost:3000",
    "secure": false, // true表示HTTPS
    "pathRewrite": {
      "^/api": "" //将会替换路径中的url为空，api/user/login ==> http://localhost:3000/user/login
    }
  }
}
```

​在package.json中配置。

```
"start": "ng serve --proxy-config proxy.conf.json",
```

### 2. 导入HttpClient模块才能使用http请求

- HttpClient模块: 导入到BrowserModule后面
```
@NgModule({
  imports: [
    HttpClientModule, 
  ],
})
export class AppModule {
}
```

- 依赖注入：使用服务时候只管使用，不管实例化

```
  constructor(private http: HttpClient)
```

- 发送请求

```
  post:  this.http.post(url，body，config)

  get: this.http.get(url, config)

  put: this.http.put(url，body，config)

  del: this.http.del(url, config)
```

- 响应处理: 得到一个Observable

```
  this.http.post(url，body，config).subscribe(next,error)
```


### 3. 请求后台接口一般写入服务中

​   创建： ng  g  s user

​   使用：UserService中使用HttpClient服务   

```
export class UserService {
  url = '/api/users/';

  // 依赖注入：构造函数注入服务
  constructor(private http: HttpClient) {
  }

  login(user: LoginUser) {
    // 返回的结果是Observable对象
    return this.http.post<Result<User>>(this.url + 'login', user);
  }
}
```

### 4. 组件中注入服务并调用之
​   
LoginComponent中使用UserService

```
export class LoginComponent implements OnInit {

  model: LoginUser;
  constructor(private userService: UserService) { // 依赖注入
    this.model = new LoginUser();
  }

  login() {
    // 使用服务
    // 发送请求
    this.userService.login(this.model).subscribe(successCb, errorCb);
  }
}
```


### 5.后台创建表和接口

### 6.session处理

  1）安装: npm i -S express-session

  2）配置 在app.js中，放在cookie后面

```
const session = require('express-session');
app.use(session({
    secret: 'its a secret',//秘钥
    resave: false,
    saveUninitialized: false
}))
```

  3) session使用

- 赋值 req.session.xx = xx;
- 获取 req.session.xx;
- 删除 delete req.session.xx;

  4)将session信息存入数据库

npm i -S express-mysql-session

```js
app.use(cookieParser('its a secret'));
const Store = require('express-mysql-session')(session);
const {pool} = require('./databases/db.js');
const store = new Store(null, pool);
app.use(session({
    store, // 设置session存储为mysql，注意当前数据库用户需要表创建权限
    secret: 'its a secret',//秘钥
    resave: false,
    saveUninitialized: false
}));
```

### 7.依赖注入

只有通过Injectable修饰的类才能被依赖注入

```
@Injectable({
  providedIn: 'root'
})
export class UserService {

}
```



<h1 id="5">5.模块化</h1>

## 1.重构用户注册、登录

#### 1. 提取app路由至独立路由模块AppRoutingModule(app-routing.module.ts)
- 创建AppRoutingModule
- 将全局路由在其中配置
- 在AppModule中引入该模块

```js
const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'user/login'},
  {path: '**', redirectTo: 'user/login'},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

```js
imports: [
    AppRoutingModule //在AppModule中引入该模块
  ],
```

#### 2. 提取登录、注册到用户模块UserModule

- 创建UserModule和UserRoutingModule：ng g model user --routing;
- 在AppModule中引入该模块UserModule;
- 将之前在AppModule中声明的登录注册组件移至UserModule;

```
  declarations: [
    LoginComponent, //登录
    RegisterComponent, //注册
  ],
```

- 将之前在AppModule中导入的FormsModule移至UserModule;
- 创建登录注册组件的父组件UserComponent: ng g c user/user;
- 将之前在AppComponent中声明的导航菜单移至user-component.html，并添加一个```<router-outlet>```;
- 在UserRoutingModule配置路由嵌套关系;

```js
const routes: Routes = [{
  path: 'user', component: UserComponent, children: [
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
  ]
}];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
```

- 将UserModule中用到的组件、服务、类等等都放在user文件夹中;


<h1 id="6">6.用户注册</h1>

### 1.验证图形验证码

- 后台nodejs安装trek-captcha,生成验证码；

npm i -S trek-captcha

```js
  const captcha = require('trek-captcha')
  router.get('/code-img', async (req, res) => {
      try {
          // token:是数字字母表示形式
          // buffer:是图片数据
          const {token, buffer} = await captcha({size: 4});
          // session中存储该token在将来验证时使用
          req.session.codeImg = token;
          // 将图片数据返回给前端
          res.json({
              success: true,
              data: buffer.toString('base64')
          })
      } catch (error) {
          // ...
          console.log(error);
      }
  })
```

前端获取验证码
```js
this.http.get<Result<string>>(this.url + 'image-code');
```


### 2.异步校验

手机号查重验证：

- 1)创建异步校验指令 phone-validator，在UserModule模块中声明；

>命令：ng g d user/register/phone-validator

```js
  // Directive：这是一个指令
  @Directive({
    selector: '[appPhoneValidator]',// 选择器
    providers: [ // 将当前类加入到NG_ASYNC_VALIDATORS中等待ng校验时调用
      {provide: NG_ASYNC_VALIDATORS, useExisting: PhoneValidatorDirective, multi: true}
    ]
  })
  export class PhoneValidatorDirective {
  
    constructor(private us: UserService) {}
  
    // 该校验器需要实现一个validate()方法
    //control:使用该方法的控件
    validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
      // 得到数据结构是Observable<Result<string>>，
      // 但是当前函数需要Observable<ValidationErrors>
      // 使用map操作符进行数据转换(rxjs编程)
      return this.us.verifyPhone(control.value).pipe(
        map((r: Result<string>) => {
          // null说明校验通过,true表示校验没有通过
          return r.success ? null : {verifyPhone: true};
        }),
        catchError(e => of({verifyPhone: true}))
      );
    }
```

- 2)在模板中声明该指令

```html
  <input name="phone" [(ngModel)]="model.phone" appPhoneValidator>

  <span *ngIf="phone?.errors?.verifyPhone">手机号码已存在</span>
```

这里的appPhoneValidator就会调用PhoneValidatorDirective中的validate方法。号码唯一说明校验通过则返回null,号码重复了说明校验失败verifyPhone就为true，下面的提示信息就会显示。









