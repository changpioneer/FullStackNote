*  [目录](#0)
    *  [数据库事务处理](#1)
    *  [angular管道](#2)
    *  [动态样式](#3)

<h1 id="1">1.事务处理</h1>

事务处理：node-mysql中事务处理基于连接conn

   - 开启事务  conn.beginTrasaction(err=>{})

   - 事务提交 conn.commit(()=>{})

   - 事务回滚 conn.rollback(err=>{})

     ```
     // 标准用法
     // 1. 获取连接
     conn = await getConnection();
     // 2. 开启事务
     beginTransaction(conn);
     // 3. 开启操作
     ...
     // 4. 提交事务
     commit(conn);
     
     // 如果出错则回滚
     rollback(conn);
     ```


<h1 id="2">2.angular管道</h1>
angular管道：用来对数据进行格式化

- 语法：{{data | pipe}}, 例如：{{birthday | date:'yyyy-MM-dd'}}

- 内置管道：[请查阅](https://www.angular.cn/api?query=pipe)

- 自定义管道：使用Pipe包装，实现PipeTransform接口即可

```
     @Pipe({
       name: 'st'
     })
     export class StPipe implements PipeTransform {
     
       transform(value: number, type: 'hours' | 'minutes'): any {
         if (type === 'hours') {
           return Math.floor(value / 60);
         } else if (type === 'minutes') {
           return Math.floor(value % 60);
         }
         return '--';
       }
     }
```


<h1 id="3">3.动态样式</h1>

- 动态类：[ngClass]="{cls:boolean}"; 传递数组：[ngClass]="[cls1,cls2]"
- [class.xx]   例如： [class.done]="stage.state == 1"
- 动态样式：[ngStyle]="{color: expr}"
- [style.prop]   例如：[style.font-size.px]="expr"




