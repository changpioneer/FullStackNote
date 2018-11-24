*  [目录](#0)
    *  [Angular7的使用](#1)
    *  [用户登录、注册功能](#2)


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
