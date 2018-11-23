*  [目录](#0)
    *  [Angular7的使用(学习中心开发)](#1)
    *  [TypeScript](#2)


<h1 id="1">Angular7的使用(学习中心开发)</h1>

## 1. angular/vue/react比较

   angular: 完整解决方案、超前架构体系、跨平台、模块化、学习曲线陡峭

   vue：轻量级、渐进式、易用性强、文档丰富

   react：单项数据流，生态系统强大、跨平台

   angular适合规模比较大的项目，vue/react适合中小型项目，但是也可以做大型项目。

## 2. 创建angular项目
[官网](https://angular.cn)

   -环境准备工作：angular cli：npm i -g @angular/cli

   -创建项目：ng new kaikeba-student  或 webstorm新建(angular cli)

   -运行项目：ng serve 或 npm start


<h1 id="2">TypeScript</h1>
TypeScript：强类型的JS，ES6超集

- 变量、常量 let a; const b=1;

- 类型注解 const isBoolean:boolean;

- 元组

元组声明后长度就不会变了。
```ts
let x: [string, number];
x = ['hello', 10]; // ok
```

- 任意类型any

```ts
   // 任意类型any
   let notSure: any;
   notSure = 4;
   notSure = 'aaaa';
   
   // any也能用于数组
   const list: any[] = [1, true, 'aaa'];
   list[1] = 100;
```

- 枚举enum

```ts
enum Color {Red = 1, Green = 2, Blue = 3}
const c: Color = Color.Blue;
console.log(c);//3
console.log(Color[1]);//Red
```

- 函数用法

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

- 接口：约束类型的结构

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
