<template>
  <div style="height: 100%">
    <!--search-->
    <iframe style="width: 100%;min-height:1680px" :src="'http://dashboard.bidata.com.cn/?uid='+tokenF" scrolling="yes" frameborder="0"></iframe>

  </div>
</template>

<script>
export default {

  data () {
    return {
     tokenF:''
    }
  },
  computed:{

  },
  mounted(){
    this.token()

  },
  methods: {
    token(){
      this.tokenF = localStorage.getItem('tokenF')
    }

  },

  watch: {

  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
