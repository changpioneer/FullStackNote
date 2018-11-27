*  [目录](#0)
    *  [Angular7的使用](#1)
    *  [用户登录、注册功能](#2)
    *  [登录表单](#3)
    *  [发送登录请求](#4)


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

```
@NgModule({
  imports: [
    FormsModule, // 使用模板驱动表单
  ],
})
export class AppModule {
}
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
- 删除 delete req.session.xx


### 7.依赖注入

只有通过Injectable修饰的类才能被依赖注入

```
@Injectable({
  providedIn: 'root'
})
export class UserService {

}
```
