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
import axios from 'axios'
import Cart from './components/Cart' //导入Cart组件
export default {
    name: 'app',
    components: {Cart}, //声明Cart组件
    data(){
        return {
            name: '开课吧', 
            showName:true,
            inputStr:'',
            goods:[],
        }
    },
    created(){
        axios.get('/api/goods').then(res => {
            this.goods = res.data.list;
            console.log(this.goods);
        });
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
        // addCart(i){
        //   const good = this.goods[i];
        //   const ret = this.cart.find(v=>v.text==good.text);
        //   if(ret){
        //     ret.count+=1;
        //   }else{
        //     this.cart.push({...good, active:true, count:1});
        //   }
        // }
    }
}
</script>

<style>
</style>