
<h1 id="1">1.路由跳转方式</h1>

### 1.链接 

```
<a routerLink="main">
```

### 2.编程式

```
router.navigate(['/main', ...params], opts)
```

#### 2.1传参：

**a. 必选参数（url传参）**

- 配置： 

```
{path: 'course/:id', component: CourseComponent}
```

- 传递必选参数：

```
router.navigate(['/main/course', 1])

<a [routerLink]="['/main/course', 1]">   // http://localhost:4200/main/course/1
```

- 获取必选参数

```
//注入激活路由：
constructor(private route: ActivatedRoute){
  //获取：
  route.paramMap.subscribe((pm: ParamMap)=>{
     pm.get('id');
  });
}
```


**b.可选参数**

- 传递可选参数：

可选参数传对象，且不需要配置路由占位符

```
http://localhost:4200/main/course/1;username=foo;age=23

命令：
router.navigate(['main/course', 1, {username: 'foo', age: 23}]);

链接：
<a [routerLink]="['/main/course',  1, {username:'foo'}]">
```

- 获取可选参数:

```
constructor(private route: ActivatedRoute) {
    route.paramMap.subscribe((pm: ParamMap) => {
      console.log(pm.get('id'));
      console.log(pm.get('username') + '--', pm.get('age'));
    });
  }
```


**c.查询参数**

- 传递查询参数：

注意不要写在数组中，写在navigate参数2上，并且queryParams是写死的。

```
http://localhost:4200/main/course/1;username=foo;age=23?sex=man

命令:
this.router.navigate(['main/course', courseId,
      {username: 'foo', age: 23}], {
      queryParams: {sex: 'man'}
    });

链接：
<a [routerLink]="['/main/course',  1, {foo:'foo'}]"  [queryParams]="{foo:'foo'}">
```

- 获取查询参数：

与前面的的获取参数不同，在queryParamMap中获取查询参数。

```
constructor(private route: ActivatedRoute) {
    route.paramMap.subscribe((pm: ParamMap) => {
      console.log(pm.get('id'));
      console.log(pm.get('username') + '--', pm.get('age'));
    });

    route.queryParamMap.subscribe((pm: ParamMap) => {
      console.log(pm.get('sex'));
    });
  }
```


