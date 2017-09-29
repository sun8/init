<template>
  <div class="alter">
    <div class="tip">
      <p><i class="icon"></i>您尚未开通本产品，如需开通请联系客服电话：<span>4008905900</span></p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: ''
    }
  },

  methods:{

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .tip{
    height:60px;
    line-height:60px;
    background-color: rgba(255,255,255,1);
    border-left:3px solid #36c6d3;
    padding-left:10px;
  }
  .alter p{
    position: relative;
    padding-left:32px;
    font-size:18px;

  }
  .alter p .icon{
    position: absolute;
    top:15px;
    left:0;
    width:200px;
    height:200px;
    background:url(../../assets/warn_icon.png) no-repeat;
    -webkit-background-size:27px;
    background-size:27px;
  }
  .alter p span{
    color: #000;
  }
</style>
