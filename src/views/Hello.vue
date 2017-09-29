<template>
  <div class="hello" @click="aaa">
    {{msg}}
    <my-aaa></my-aaa>
  </div>
</template>

<script>
export default {

  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  component:('my-aaa',{
            template:'<h3>我是组件</h3><strong>我是加粗标签</strong>'
        }),
  methods:{
  	aaa(){
  		alert();
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello{
	border:1px solid;
}
</style>
