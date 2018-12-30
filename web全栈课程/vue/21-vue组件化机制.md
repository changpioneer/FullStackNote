# 1.组件的分类

1、通用组件
>   通用组件，大部分UI库都是这种组件，比如表单、弹窗、布局等等。

2、业务组件
>   业务需求挂钩，会被复用，比如抽奖、摇一摇等。

3、页面组件
>   每个页面都是组件，不会复用，完整功能。


# 2.provide&inject

provide声明的参数，在子组件中通过inject就可以使用。App.vue中使用provide声明的参数，相当于全局变量，

```html
App.vue

<template>
    <div id="app">
        <FormItem></FormItem>
    </div>
</template>

<script>
    import FormItem from './components/FormItem'
    export default {
        name: 'app',
        components: {
            FormItem
        },
        provide(){
            return{
                name:"kaikaba"
            }
        }
    }
</script>
```

```html
FormItem.vue

<template>
    <div>
        {{name}}
    </div>
</template>

<script>
    export default {
        inject:["name"]
    }
</script>
```

# 3.插槽
插槽用来扩展组件的内容。

- 单个插槽
```html
Form.vue

<template>
    <form>
        <slot>插槽</slot>
    </form>
</template>
```

```html
App.vue

<template>
    <div>
        <Form>
            <button>替换插槽</button>
        </Form>
    </div>
</template>
```

- 多个插槽
```html
Form.vue

<template>
    <form>
        <slot name="slot1">插槽1</slot>
        <hr>
        <slot name="slot2">插槽2</slot>
    </form>
</template>
```

```html
App.vue

<template>
    <div>
        <Form>
            <template slot="slot1"><button>替换插槽1</button></template>
            <template slot="slot2"><button>替换插槽2</button></template>
        </Form>
    </div>
</template>
```

# 4.[通过事件向父级组件发送消息](https://cn.vuejs.org/v2/guide/components.html#%E4%BD%BF%E7%94%A8%E4%BA%8B%E4%BB%B6%E6%8A%9B%E5%87%BA%E4%B8%80%E4%B8%AA%E5%80%BC)

```html
BlogPost.vue

<template>
    <div class="blog-post">
        <span>{{ post.title }}</span>
        <button v-on:click="$emit('enlarge-text')">
            Enlarge text
        </button>
        <div v-html="post.content">faaf</div>
    </div>
</template>

<script>
    export default {
        name: "blog-post",
        props: ['post'],
    }
</script>
```

上面，子组件通过$emit抛出了一个消息enlarge-text，在父组件中通过v-on监听这个消息。

```html
App.vue

<template>
    <div id="app" :style="{ fontSize: postFontSize + 'em' }">
        <blog-post
                v-for="post in posts"
                v-bind:key="post.id"
                v-bind:post="post"
                v-on:enlarge-text="postFontSize += 0.1"
        ></blog-post>
    </div>
</template>

<script>
    import BlogPost from './components/BlogPost'
    export default {
        name: 'app',
        components: {
            BlogPost
        },
        data:function(){
            return{
                posts: [
                    { id: 1, title: 'My journey with Vue', content:'<h5>aaa</h5>' },
                    { id: 2, title: 'Blogging with Vue', content:'<h5>aaa</h5>' },
                    { id: 3, title: 'Why Vue is so fun', content:'<h5>aaa</h5>' }
                ],
                postFontSize: 1,
            }
        },
    }
</script>
```

## 1.[用事件抛出一个值](https://cn.vuejs.org/v2/guide/components.html#%E4%BD%BF%E7%94%A8%E4%BA%8B%E4%BB%B6%E6%8A%9B%E5%87%BA%E4%B8%80%E4%B8%AA%E5%80%BC)

$emit的第二个参数提供这个值。
```html
BlogPost.vue

<template>
    <div class="blog-post">
        <span>{{ post.title }}</span>
        <button v-on:click="$emit('enlarge-text', 0.1)">
            Enlarge text
        </button>
        <div v-html="post.content">faaf</div>
    </div>
</template>

<script>
    export default {
        name: "blog-post",
        props: ['post'],
    }
</script>
```

然后当在父级组件监听这个事件的时候，我们可以通过 $event 访问到被抛出的这个值：
```html
App.vue

<template>
    <div id="app" :style="{ fontSize: postFontSize + 'em' }">
        <blog-post
                v-for="post in posts"
                v-bind:key="post.id"
                v-bind:post="post"
                v-on:enlarge-text="postFontSize += $event"
        ></blog-post>
    </div>
</template>

<script>
    import BlogPost from './components/BlogPost'
    export default {
        name: 'app',
        components: {
            BlogPost
        },
        data:function(){
            return{
                posts: [
                    { id: 1, title: 'My journey with Vue', content:'<h5>aaa</h5>' },
                    { id: 2, title: 'Blogging with Vue', content:'<h5>aaa</h5>' },
                    { id: 3, title: 'Why Vue is so fun', content:'<h5>aaa</h5>' }
                ],
                postFontSize: 1,
            }
        },
    }
</script>
```
## 2.如果这个事件处理函数是一个方法
```html
App.vue

<template>
    <div id="app" :style="{ fontSize: postFontSize + 'em' }">
        <blog-post
                v-for="post in posts"
                v-bind:key="post.id"
                v-bind:post="post"
                v-on:enlarge-text="onEnlargeText"
        ></blog-post>
    </div>
</template>

<script>
    import BlogPost from './components/BlogPost'
    export default {
        name: 'app',
        components: {
            BlogPost
        },
        methods:{
            onEnlargeText:function(largeValue) {
                this.postFontSize += largeValue;
            },
        },
        data:function(){
            return{
                posts: [
                    { id: 1, title: 'My journey with Vue', content:'<h5>aaa</h5>' },
                    { id: 2, title: 'Blogging with Vue', content:'<h5>aaa</h5>' },
                    { id: 3, title: 'Why Vue is so fun', content:'<h5>aaa</h5>' }
                ],
                postFontSize: 1,
            }
        },
    }
</script>
```

# 5.在组件上使用 v-model

自定义事件也可以用于创建支持```v-model```的自定义输入组件。记住：
```html
<input v-model="searchText">
```

等价于：
```html
<input
  v-bind:value="searchText"
  v-on:input="searchText = $event.target.value"
>
```

**当用在组件上时，v-model 则会这样:**
```html
<custom-input
  v-bind:value="searchText"
  v-on:input="searchText = $event"
></custom-input>
```


为了让它正常工作，这个组件内的```<input>```必须：

    - 将其 value 特性绑定到一个名叫 value 的 prop 上
    - 在其 input 事件被触发时，将新的值通过自定义的 input 事件抛出


代码如下：
```html
CustomInput.vue
父组件传递进来value，将传递进来的value赋值给v-bind:value的value；
当input有输入动作时，激发v-on:input，$emit会发送一个input消息，值为input输入的值。

<template>
    <input type="text"
    v-bind:value="value"
    v-on:input="$emit('input', $event.target.value)"
    >
</template>

<script>
    export default {
        name: "custom-input",
        props: ['value'],
    }
</script>
```

```html
App.vue
使用如下：
v-on:click="onSearchInput"等同于v-bind:value="searchText" v-on:input="searchText = $event"；

所以searchText会传递给子组件props中的value，而v-on:input会监听上面$emit发出的input消息，把input输入的值又复制给searchText。

这样就实现了searchText与input的双向绑定

<template>
    <div id="app">
        <!--<custom-input 
            v-bind:value="searchText"
            v-on:input="searchText = $event">
            </custom-input>-->

        <button v-on:click="onSearchInput">输出searchText</button>
        <br>
        <div>同步显示上面输入框的数据：</div>
        <span>{{searchText}}</span>
    </div>
</template>

<script>
    import CustomInput from './components/CustomInput'
    export default {
        name: 'app',
        components: {
            CustomInput
        },
        data:function(){
            return{
                searchText: ''
            }
        },
    }
</script>
```


# 6.表单验证的简单实现

- Form 负责设置规则
- FormItem 负责校验和显示错误信息
- Input  负责双向绑定数据 （通知）

App.vue
```html
<template>
    <div>
        <!-- 校验规则 -->
        <k-form :model="modelV" :rules="rules">
            <k-form-item label="用户名" prop="name">
                <k-input v-model="modelV.name" name='name'></k-input>
            </k-form-item>
            <k-form-item label="年龄" prop="age">
                <k-input v-model="modelV.age" name='age'></k-input>
            </k-form-item>
        </k-form>
    </div>
</template>

<script>
    import KForm from './components/Form'
    import KInput from './components/Input'
    import KFormItem from './components/FormItem'
    export default{
        name:'app',
        components:{KForm,KFormItem,KInput},
        provide:{
            name:"开课吧"
        },
        data(){
            return{
                modelV:{
                    name:'',
                    age:""
                },
                rules:{
                    name:{required:true,message:"用户名不能为空"},
                    age:{required:true,message:"年龄不能为空"}
                }
            }
        }
    }
</script>
```

Form.vue
```html
<template>
    <form>
        <slot>Form插槽1</slot>
    </form>
</template>

<script>
    export default {
        name:"form",
        props:{
            model:{type:Object},
            rules:{type:Object}
        },
        provide(){
            return{
                form: this
            }
        }

    }
</script>
```

FormItem.vue
```html
<template>
    <div>
        <!-- 负责显示一些错误信息 -->
        <label v-if="label">{{label}}</label>
        <div>
            <slot></slot>
            <p v-if="validateStatus=='error'" class='error'>
                {{errorMessage}}
            </p>
        </div>
    </div>
</template>

<script>
    export default{
        name:"kFormItem",
        // 可以获取form的实例
        inject:['form'],
        data(){
            return {
                validateStatus:'',
                errorMessage:''
            }
        },
        created(){
            this.$bus.$on('kFormItem',(value)=>{
                this.validate(value)
            })
        },
        methods:{
            getRules(){
                let formRules = this.form.rules[this.prop]
                return formRules
            },

            // 校验
            validate(obj){
                if(obj.name !== this.prop){
                    return
                }
                const rules = this.getRules()
                const value = this.form.model[this.prop]
                if(rules.required && !value){
                    this.errorMessage = rules.message;
                    this.validateStatus = 'error'
                }else{
                    this.validateStatus = 'validating';
                }
            }
        },
        props:{
            label:{
                type:String,
            },
            prop:{
                type:String
            }
        }
    }
</script>

<style>
    p.error{
        color:red;
    }
</style>
```

Input.vue
```html
<template>
<!-- 支持v-model -->
  <input 
  type="text"
    v-bind:value="inputValue"
    v-on:input="handleInput"
    v-on:blur="handleBlur"
  />
</template>

<script>
export default {
  name:"kInput",
  props:{
    value:{
      type:String,
      default:'',
      required:true
    },
    name:{
      type:String
    }
  },

  data(){
    return {
      inputValue:this.value
    }
  },
  methods:{
    handleInput(e){
      console.log(e)
      const value = e.target.value
      this.inputValue = value
      // 通知父元素修改props
      this.$emit('input',value)
      this.$bus.$emit('kFormItem',{
        value,
        name:this.name})

    },
    handleBlur(){
      const value = this.inputValue
      this.$bus.$emit('kFormItem',{
        value,
        name:this.name
      })
    }
  },
}
</script>
```