*  [目录](#0)
    *  [类型约束/类型注解](#1)
    *  [元组](#2)
    *  [任意类型any](#3)
    *  [枚举enum](#4)
    *  [函数](#5)
    *  [接口](#6)
    *  [类](#7)
    *  [泛型](#8)
    *  [模块](#9)


TypeScript：强类型的JS，ES6超集
<h1 id="1">1.类型约束/类型注解</h1>

```js
let a: string;
a = 'fsf';

let b: number;
b = 3;

let c: boolean;
let d: string[];
let e = 'e';//类型推论

const PI = 3.1415926;//常量
```

<h1 id="2">2.元组</h1>
元组声明后长度、类型就不会变了。
```ts
let x: [string, number];
x = ['hello', 10]; // ok
```

<h1 id="3">3.任意类型any</h1>

```ts
   // 任意类型any
   let notSure: any;
   notSure = 4;
   notSure = 'aaaa';
   
   // any也能用于数组
   const list: any[] = [1, true, 'aaa'];
   list[1] = 100;
```

<h1 id="4">4.枚举enum</h1>

```ts
enum Color {Red = 1, Green = 2, Blue = 3}
const c: Color = Color.Blue;
console.log(c);//3
console.log(Color[1]);//Red
```

<h1 id="5">5.函数</h1>
- 函数中使用类型约束
```ts
   // 函数中使用类型约束
   function greeting(person: string): string {
     return 'Hello, ' + person;
   }

    //不返回值
   function greeting(person: string): void {
     //```
   }
```

- ts中函数的参数是必须的
- 函数的可选参数
- 函数参数的默认值

```js
// first是必要参数，last可选，last有默认值
function buildName(first: string = 'James', last?: string = 'Harden') {
  return first + last;
}
```

```js
buildName('tom', 'jerry');
buildName('tom'); // 可选参 last?
buildName(); // 默认值
```

<h1 id="6">6.接口</h1>

约束类型的结构

```ts
   //接口
   interface Person {
     firstName: string;
     lastName: string;
   }
   
   //传递进来的参数对象必须有firstName和lastName这两个属性
   function greeting2(person: Person) {
     return 'hello, ' + person.firstName + ' ' + person.lastName;
   }
   
   const myname = greeting2({firstName: 'tom', lastName: 'cruise'});
   console.log(myname);
```

<h1 id="7">7.类</h1>

### 1. 基本用法
```js
class Person {
  name: string; // 属性

  constructor(msg: string) {// 构造函数
    this.name = msg;
  }

  hello() {// 方法
    console.log('my name is ' + this.name);
  }
}
```

```js
const per = new Person('tom');
per.hello();
```


### 2. 继承

```js
class Animal {
  name: string;

  constructor(theName: string) {
    this.name = theName;
  }
  move(distance: number) {
    console.log(`${this.name}移动了${distance}米`);
  }
}
```

```js
class Dog extends Animal {

  constructor(theName: string) {
    super(theName);
  }

  bark() {
    console.log('狗吠');
  }

  move(distance: number) {// 方法重写overwrite
    super.move(distance);
    console.log('很快');
  }

  move(a: number, b: number) {// 方法重载
    console.log('移动了' + (a + b) + '米');
  }
}
```


### 3. 修饰符

- public 成员默认是public，表示成员可以自由访问；
- private 表示成员只能在当前类内部使用；
- protected 表示成员能够在当前类和子类中使用;
- readonly 只读，当属性只能读取，不能设置；
```js
class Dog extends Animal {

  constructor(theName: string, protected age: number) {
    super(theName);
  }
```

- 静态成员：通过static关键字修饰属性、方法，将来通过类名直接访问
```js
interface Point {
  x: number;
  y: number;
}

// 静态成员
class Grid {
  // origin原点是所有网格都会用到的属性
  static origin = {x: 0, y: 0};

  static distance(point: Point) {
    const xDist = point.x - Grid.origin.x;
    const yDist = point.y - Grid.origin.y;
    return Math.sqrt(xDist * xDist + yDist * yDist);
  }
}
```

```js
console.log(Grid.origin.x, Grid.origin.y);
console.log(Grid.distance({x: 3, y: 4}));
```

- 存取器：当获取和设置属性时有额外逻辑时可以使用存储器（getter、setter)

```js
class Employee {
private _fullName: string;

get fullName(): string {
    return this._fullName;
   }
     
set fullName(value: string) {
    console.log('管理员修改了雇员名称');
    this._fullName = value;
    }
}
```


<h1 id="8">8.泛型</h1>

可以使用泛型Generic来创建可重用组件，一个组件可以支持多种类型的数据

### 1. 泛型基本用法

```js
// T称为类型变量，它是一种特殊的变量，只用于表示类型而不是值
function useGeneric<T>(arg: T): T {
  return arg;
}

// 用法1：完整语法
useGeneric<string>('myString');
// 用法2：利用类型推论省略<number>
useGeneric(1);
```

### 2. 泛型接口

```js
// 泛型接口
interface Result<T, U> {
  success: boolean;
  data?: T;
  message?: U;
}

interface User {
  id: number;
  name: string;
}

const r: Result<User> = {
  success: true,
  data: {id: 1, name: 'tom'}
};
```

### 3. 泛型约束
```js
interface Lengthwise {
  length: number;
}

// 泛型约束保证T中含有length属性
function useGeneric<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);
  return arg;
}
```


### 4. 泛型类
```js
class Result<T> {
  constructor(public success: boolean, public data: T) {
  }
}
```

```js
interface User {
  id: number;
  name: string;
}

const r2: Result<User> = new Result<User>(true, {id: 1, name: 'tom'});
console.log(r2.success);
console.log(r2.data);
```


<h1 id="9">9.模块</h1>

## 1. 导出
#### 1). 具名导出

```js
myModule.ts

export const HOST = 'http://localhost:4200'; // 具名导出常量

export function add(a, b) { // 具名导出函数
  return a + b;
}

export class Foo { // 具名导出类
  bar: string;
}
```

#### 2). 导出语句
abc as ABC: 使用as语法修改导出的名称。

```js
const Bar = 'bar';
const abc = 'abc';
export {Bar, abc as ABC};
```

#### 3). 默认导出

```js
export default class Student {
  name: string;
}
```

## 2. 导入

#### 1). 具名导入
HOST as host: 使用as语法修改导入的名称。

```js
import {HOST as host, add, Foo, Bar, ooxx} from './myModule';
```
#### 2). 默认导入
默认导入时不用加大括号。

```js
import Student from './myModule';
```

