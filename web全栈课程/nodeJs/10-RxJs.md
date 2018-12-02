*  [目录](#0)
    *  [主要概念](#1)
    *  [创建Observable的方式](#2)
    *  [错误处理](#3)
    *  [](#4)
    *  [](#5)
    *  [](#6)


[RxJs](https://rxjs-dev.firebaseapp.com/)
（reactive extention js）：通过Observable来编写异步和基于事件的程序：


<h1 id="1">1.主要概念</h1>

## 1.Observable可观察对象

## 2.Observer观察者：回调函数集合

## 3.Subscription订阅：表示Observable执行，可以用它取消Observable执行

```js
// Observable对象创建, 构造函数中传入订阅函数，其参数是观察者
    const ob1 = new Observable((observer) => {
      setInterval(() => {
        // 请求成功，发送数据
        observer.next({success: true, data: 1});
        observer.next({success: true, data: 2});
        observer.next({success: true, data: 3});

        // 如果出错，执行error()
        // observer.error({success: false, data: 1});

        // 如果请求结束，执行complete()
        // observer.complete();
      }, 2000);
    });

// 获得实例后，订阅
const subscription = ob1.subscribe((result) => {
      console.log(result);
    }, (error) => {
      console.error(error);
    }, () => {
      console.log('complete！');
    });

// 通过订阅对象可取消
subscription.unsubscribe();
```

## 4.Operators操作符：操作集合的函数

  - filter  过滤

  - map 映射：数据格式转换加工

```js
const ob5 = of(1, 2, 3, 4);
    // 操作符
    ob5.pipe(
      filter(n => n % 2 !== 0), // 过滤奇数
      map(n => n * n), // 求平方
      // ...
    ).subscribe(
      n => console.log(n)
    );
```

## 5.Subject主题：相当于事件派发器


<h1 id="2">2.创建Observable的方式</h1>

- 1.new Observable(subscriber)

- 2.Observable.create(subscriber)

- 3.通过Promise(不常用)

```js
  const ob2 = fromPromise(fetch('assets/data.json'));

  ob2.subscribe({
    next(resp) {
      console.log(resp);
    },
    error(error) {
      console.log(error);
    }
  });
```

- 4.通过定时器

```js
  // 通过定时器构造
  const ob3 = interval(1000).pipe(
    take(5) //定时器只执行5次
  );

  ob3.subscribe(val => console.log('计数：' + val));
```

- 5.通过事件

```js
  const ob4 = fromEvent(document.getElementById('p1'), 'click');

  ob4.subscribe((evt: MouseEvent) => {
    console.log(evt.clientX + '-' + evt.clientY);
  });
```

- 6.通过已存在值创建Observable

```js
  const ob5 = of(1, 2, 3, 4); // Observable<number>
  const ob6 = of([1, 2, 3, 4]); // Observable<Array<number>>
  const ob7 = of({foo: 'bar'}); // Observable<{foo:string}>
```

<h1 id="3">3.错误处理</h1>

- 方式一：ob.subscribe(next,error)

- 方式二：操作符catchError(error => of(...)),

  > 使用了方式二，方式一error回调就不会执行了，数据会进入next流程.


