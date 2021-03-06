
[Vue](https://cn.vuejs.org/)
[element](https://element.faas.ele.me/#/zh-CN)


# 1.构建项目

## 1) 安装vue-cli3
    npm install -g @vue/cli
    npm install -g @vue/cli-service-global

## 2) 新建项目

    vue create vue-buy

## 3）配置

    - Bable 代码转义
    - Linter 代码风格
    - 测试

## 4) 启动开发联调环境

    npm run serve

## 5）项目结构

```
.
|-- README.md   文档
|-- babel.config.js     babel配置   
|-- package-lock.json
|-- package.json
|-- public     静态资源
|   |-- favicon.ico
|   |-- index.html
|-- src   源码
      |-- App.vue
      |-- assets
      |     |-- logo.png
      |-- components
      |     |-- HelloWorld.vue
      |-- main.js
```


## 6) 纯浏览器体验

```html
<div id="app">
    {{ message }}
</div>

<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<script>
  var app = new Vue({
    el: '#app',
    data: {
      message: 'Hello Vue!'
    }
}) 
</script>
```

## 7) vue的三种创建方式
```
new Vue({})  vue的入口

Vue.component()  新建一个vue的全局组件

export default {} 单文件组件，.vue对外暴露的组件内容
```

# 2.简单开发

## 1）单文件组件

.vue是vue单文件组件，一个文件就是一个组件，由template，script和style三个标签构成，分别是html,js和css的内容部分，修改App.vue文件内容。
```html
<template>
    <div id="app">
        {{name}}
    </div>
</template>

<script>
  export default {
    name: 'app',
    data(){
        return { 
            name: '开课吧' 
        } 
    }
  } 
</script>
  
<style>
  #app{
    color:red; 
    }
</style>
```

## 2) 条件与循环

#### 条件
```html
<template>
    <p v-if="showName">{{name}}</p>
</template>

<script>
  export default {
    name: 'app',
    data(){
        return {
            name: '开课吧', 
            showName:true
        },
    created(){
        //组件创建后，会自动执行created这个生命周期    
        setTimeout(()=>{
            this.showName = false
        },2000);
    } 
  }
</script>
```

#### 循环
```html
<template>
    <div id="app">
        <ul>
            <li v-for='good in goods'>{{good.text}}</li>
        </ul> 
    </div>
</template>

<script>
  export default {
    name: 'app',
    data(){
        return {
            name: '开课吧', 
            showName:true,
            goods:[
                {text:'百万年薪架构是'}, 
                {text:'web课程'}, 
                {text:'Python爬虫'}, 
                {text:'Java架构师'}
            ]
        }
    },
  }
</script>
```

## 3) 处理用户输入

使用@添加一个事件监听器，通过它调用在VUE实例中定义的方法。
```html
<template>
    <div id="app">
        <input type="text" v-model='inputStr'> 
        <button @click="addGood">添加</button>
        <ul>
            <li v-for='good in goods'>{{good.text}}</li>
        </ul> 
    </div>
</template>

<script>
export default {
    name: 'app',
    data(){
        return {
            name: '开课吧', 
            showName:true,
            inputStr:'',
            goods:[
                {text:'百万年薪架构是'}, 
                {text:'web课程'}, 
                {text:'Python爬虫'}, 
                {text:'Java架构师'}
            ]
        }
    },
    methods:{
        addGood(){
            if(this.inputStr){
                this.goods.push({text: this.inputStr});
                this.inputStr = '';
            }
        } 
    }
}
</script>
```

# 3.组件化

## 1）组件之间数据传递

#### 简单
App.vue
```html
<template>
    <div id="app">
        <ul>
            <li v-for='good in goods'>{{good.text}} ￥{{good.price}}
              <button @click="addCart">添加购物车</button>
            </li>
        </ul> 
        <hr>
        <!-- cartName前面加上冒号:，name就与下面data重的name绑定了 -->
        <Cart :cartName="name"></Cart>
    </div>
</template>

<script>
import Cart from './components/Cart' //导入Cart组件
export default {
    name: 'app',
    components: {Cart}, //声明Cart组件
    data(){
        return {
            name: '开课吧', 
            showName:true,
            inputStr:'',
            goods:[
                {text:'百万年薪架构是',price:100}, 
                {text:'web课程',price:90}, 
                {text:'Python爬虫',price:80}, 
                {text:'Java架构师',price:120}
            ]
        }
    },
    methods:{
        addGood(){
            if(this.inputStr){
                this.goods.push({text:this.inputStr});
                this.inputStr = '';
            }
        },
        addCart(){

        }
    }
}
</script>

```
Cart.vue
```html
<template>
    <div>
        {{cartName}}-购物车
    </div>
</template>

<script>
export default {
    props: ['cartName'], //cartName是外面输入的属性
    data(){
        return {
            
        }
    },
}
</script>
```

#### 复杂
循环中添加```:key="c.name"```的作用是使循环唯一。

App.vue
```html
<template>
    <div id="app">
        <ul>
            <li v-for='(good, index) in goods'>{{good.text}} ￥{{good.price}}
              <button @click="addCart(index)">添加购物车</button>
            </li>
        </ul> 
        <hr>
        <!-- cartName前面加上冒号:，name就与下面data重的name绑定了 -->
        <Cart :cartName="name" :cart="cart"></Cart>
    </div>
</template>

<script>
import Cart from './components/Cart' //导入Cart组件
export default {
    name: 'app',
    components: {Cart}, //声明Cart组件
    data(){
        return {
            name: '开课吧', 
            showName:true,
            inputStr:'',
            goods:[
                {text:'百万年薪架构是',price:100}, 
                {text:'web课程',price:90}, 
                {text:'Python爬虫',price:80}, 
                {text:'Java架构师',price:120}
            ],
            cart: []
        }
    },
    methods:{
        addGood(){
            if(this.inputStr){
                this.goods.push({text:this.inputStr});
                this.inputStr = '';
            }
        },
        addCart(i){
          const good = this.goods[i];
          const ret = this.cart.find(v=>v.text==good.text);
          if(ret){
            ret.count+=1;
          }else{
            this.cart.push({...good, active:true, count:1});
          }
        }
    }
}
</script>
```
Cart.vue
```html
<template>
    <div>
        {{cartName}}-购物车

        <table border='1'>
              <tr>
                    <th>课程名</th> 
                    <th>单价</th> 
                    <th>数量</th> 
                    <th>价格</th>
              </tr>
              <tr v-for="c in cart" :key="c.name">
                    <td>{{c.text}}</td>
                    <td>{{c.price}}</td> 
                    <td>{{c.count}}</td> 
                    <td>{{c.count*c.price}}</td> 
                </tr>
        </table>
    </div>
</template>

<script>
export default {
    props: ['cartName', 'cart'], //cartName是外面输入的属性
    data(){
        return {
            
        }
    },
}
</script>
```
#### 购物车中商品增删
```html
<template>
    <div>
        {{cartName}}-购物车

        <table border='1'>
              <tr>
                    <th>课程名</th> 
                    <th>单价</th> 
                    <th>数量</th> 
                    <th>价格</th>
              </tr>
              <tr v-for="(c, i) in cart" :key="c.name">
                    <td>{{c.text}}</td>
                    <td>{{c.price}}</td> 
                    <td>
                        <button @click="minus(i)">-</button>
                        <span>{{c.count}}</span>
                        <button @click="add(i)">+</button>
                    </td> 
                    <td>{{c.count*c.price}}</td> 
                </tr>
        </table>
    </div>
</template>

<script>
export default {
    props: ['cartName', 'cart'], //cartName是外面输入的属性
    data(){
        return {
            
        }
    },
    methods: {
        add(i){
            this.cart[i].count +=1
        },
        minus(i){
            const count = this.cart[i].count;
            if(count>1){
                this.cart[i].count -= 1;
            }else{
                this.remove(i);
            }
        },
        remove(i){
            if(window.confirm(`是否删除商品${this.cart[i].text}?`)){
                this.cart.splice(i,1);
            }
        }
    }
    
}
</script>
```


## 2）属性校验

```
props:{
        name:{
            type:String, // name必须是字符串
            required:true //必传项
        },
        cart:{
          type:Array
        } 
},
```

## 3）样式和class绑定

设置单选框，选中与否修改购物车文字颜色。

内联样式v-bind:style，可以简写成:style。

```html
<tr v-for="(c, i) in cart" :key="c.text" :style="{color:c.active?'red':'black'}">
    <td>
        <input type="checkbox" v-model='c.active'>
    </td>
</tr>
```
class绑定，使用:class
```html
<tr v-for="(c, i) in cart" :key="c.text" :class="{activeClass:c.active}">
    <td>
        <input type="checkbox" v-model='c.active'>
    </td>
</tr>

<style>
tr.activeClass{
    color:red;
}
</style>
```

## 4）计算属性

使用computed字段，可以进行复杂的逻辑的计算.

```html
Cart.vue
<template>
    <div>
        {{cartName}}-购物车
        <table border='1'>
            <tr>
                <th></th> 
                <th>课程名</th> 
                <th>单价</th> 
                <th>数量</th> 
                <th>价格</th>
            </tr>
            <!-- <tr v-for="(c, i) in cart" :key="c.text" :style="{color:c.active?'red':'black'}"> -->
            <tr v-for="(c, i) in cart" :key="c.text" :class="{activeClass:c.active}">
                <td>
                    <input type="checkbox" v-model='c.active'>
                </td>
                <td>{{c.text}}</td>
                <td>{{c.price}}</td> 
                <td>
                    <button @click="minus(i)">-</button>
                    <span>{{c.count}}</span>
                    <button @click="add(i)">+</button>
                </td> 
                <td>{{c.count*c.price}}</td> 
            </tr>
            <tr>
                <td colspan='3'>{{activeCount}}/ {{count}}</td>
                <td colspan='2'> {{total}}</td> 
            </tr>
        </table>
    </div>
</template>

<script>
export default {
    props: ['cartName', 'cart'], //cartName是外面输入的属性
    data(){
        return {
            
        }
    },
    computed:{
        total(){
            let num = 0;
            this.cart.forEach(v=>{
                if(v.active){
                    num+= v.price*v.count;
                } 
            })
            return num;
        },
        count(){
            return this.cart.length;
        },
        activeCount(){
            return this.cart.filter(v=>v.active).length;
        }
    },
    methods: {
        add(i){
            this.cart[i].count +=1
        },
        minus(i){
            const count = this.cart[i].count;
            if(count>1){
                this.cart[i].count -= 1;
            }else{
                this.remove(i);
            }
        },
        remove(i){
            if(window.confirm(`是否删除商品${this.cart[i].text}?`)){
                this.cart.splice(i,1);
            }
        }
    }
    
}
</script>

<style>
tr.activeClass{
    color:red;
}
</style>
```

# 3.使用总线机制在组件间传递事件和数据

vue每个实例都有订阅/发布模式的实现，使用$on和$emit来使用。

```js
main.js

Vue.prototype.$bus = new Vue();
```

```html
App.vue

<template>
    <div id="app">
        <ul>
            <li v-for='(good, index) in goods' :key="good.text">{{good.text}} ￥{{good.price}}
              <button @click="addCart(index)">添加购物车</button>
            </li>
        </ul> 
        <hr>
        <!-- cartName前面加上冒号:，name就与下面data重的name绑定了 -->
        <Cart :cartName="name"></Cart>
    </div>
</template>

<script>
import Cart from './components/Cart' //导入Cart组件
export default {
    name: 'app',
    components: {Cart}, //声明Cart组件
    data(){
        return {
            name: '开课吧', 
            showName:true,
            inputStr:'',
            goods:[
                {text:'百万年薪架构是',price:100}, 
                {text:'web课程',price:90}, 
                {text:'Python爬虫',price:80}, 
                {text:'Java架构师',price:120}
            ],
        }
    },
    methods:{
        addGood(){
            if(this.inputStr){
                this.goods.push({text:this.inputStr});
                this.inputStr = '';
            }
        },
        addCart(i){
            const good = this.goods[i];
            this.$bus.$emit('addCart', good);
        }
    }
}
</script>
```

```html
Cart.vue

<template>
    <div>
        {{cartName}}-购物车
        <table border='1'>
            <tr>
                <th></th> 
                <th>课程名</th> 
                <th>单价</th> 
                <th>数量</th> 
                <th>价格</th>
            </tr>
            <tr v-for="(c, i) in cart" :key="c.text" :class="{activeClass:c.active}">
                <td>
                    <input type="checkbox" v-model='c.active'>
                </td>
                <td>{{c.text}}</td>
                <td>{{c.price}}</td> 
                <td>
                    <button @click="minus(i)">-</button>
                    <span>{{c.count}}</span>
                    <button @click="add(i)">+</button>
                </td> 
                <td>{{c.count*c.price}}</td> 
            </tr>
            <tr>
                <td colspan='3'>{{activeCount}}/ {{count}}</td>
                <td colspan='2'> {{total}}</td> 
            </tr>
        </table>
    </div>
</template>

<script>
export default {
    props: ['cartName'], //cartName是外面输入的属性
    data(){
        return {
            cart: []
        }
    },
    created(){
        this.$bus.$on('addCart', good=>{
            const ret = this.cart.find(v=>v.text==good.text);
            if(ret){
              ret.count+=1;
            }else{
                this.cart.push({...good, active:true, count:1});
            }
        });
    },
    computed:{
        total(){
            let num = 0;
            this.cart.forEach(v=>{
                if(v.active){
                    num+= v.price*v.count;
                } 
            })
            return num;
        },
        count(){
            return this.cart.length;
        },
        activeCount(){
            return this.cart.filter(v=>v.active).length;
        }
    },
    methods: {
        add(i){
            this.cart[i].count +=1
        },
        minus(i){
            const count = this.cart[i].count;
            if(count>1){
                this.cart[i].count -= 1;
            }else{
                this.remove(i);
            }
        },
        remove(i){
            if(window.confirm(`是否删除商品${this.cart[i].text}?`)){
                this.cart.splice(i,1);
            }
        }
    }
}
</script>

<style>
tr.activeClass{
    color:red;
}
</style>
```


# 4.mock数据

### 1）简单的mock
使用自带的webpack-dev-server即可，新建vue.config.js扩展webpack设置。
```js
module.exports = {
    configureWebpack: {
        devServer: {
            //app是一个express实例
            before(app) {
                app.get('/api/goods', function (req, res) {
                    res.json({
                        list: [
                            {text:'百万年薪架构是',price:100}, 
                            {text:'web课程',price:90}, 
                            {text:'Python爬虫',price:80}, 
                            {text:'Java架构师',price:120}
                        ] 
                    });
                }); 
            }
        } 
    }
}
```
访问http://localhost:8080/api/goods看的mock数据。

### 2）使用axios获取接口数据

安装：npm install axios --save

```js
created(){
        axios.get('/api/goods').then(res => {
            this.goods = res.data.list;
            console.log(this.goods);
        });
    },
```
### 3）使用ES7语法
```js
async created(){
      const res = await axios.get('/api/goods')
      this.goods = res.data.list
}
```

# 5.数据持久化

简单的localstorage + vue监听

```html
    watch: {
        cart: function(){   //cart数据变化时执行
            this.setLocal();
        }
    },

    created(){
        this.cart = JSON.parse(window.localStorage.getItem('cart')) || [];
    },

    methods: {
        setLocal(){ //将数据保存在本地
            window.localStorage.setItem('cart',JSON.stringify(this.cart));
        },
    }
```

循环监听
```
    watch: {
        cart:{
            handler(){
                this.setLocal();
            },
            deep:true
        }
    },
```


# 6.vue生命周期

![vue生命周期](../../picture/vue_lifecycle.png)

