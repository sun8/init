<template>
  <div class="row">
    <div class="col-md-3">
      <div class="widget-thumb">
        <h4>在营企业总数</h4>
        <div class="widget-thumb-wrap">
          <i class="bg-green"></i>
          <div class="widget-thumb-body">
            <span class="widget-thumb-subtitle"></span>
            <span class="widget-thumb-body-stat">444</span>
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-3">
      <div class="widget-thumb">
        <h4>在营个体总数</h4>
        <div class="widget-thumb-wrap">
          <i class="bg-red"></i>
          <div class="widget-thumb-body">
            <span class="widget-thumb-subtitle"></span>
            <span class="widget-thumb-body-stat">333</span>
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-3">
      <div class="widget-thumb">
        <h4>统一社会信用代码</h4>
        <div class="widget-thumb-wrap">
          <i class="bg-purple"></i>
          <div class="widget-thumb-body">
            <span class="widget-thumb-subtitle"></span>
            <span class="widget-thumb-body-stat">111</span>
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-3 padding0">
      <div class="widget-thumb">
        <h4>今年成立企业数</h4>
        <div class="widget-thumb-wrap">
          <i class="bg-blue"></i>
          <div class="widget-thumb-body">
            <span class="widget-thumb-subtitle"></span>
            <span class="widget-thumb-body-stat">222</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:[""],
  data () {
    return {

    }
  },

  methods:{

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style type="text/css" lang="scss" scoped>
.row{
  margin: 0;
  padding:10px;
  background-color: #fff;
}
.col-md-3{
    box-sizing: border-box;
    float: left;
    width: 25%;
		height: 142px;
		overflow: hidden;
    padding: 0 0;
    padding-right: 10px;
    position: relative;
    min-height: 1px;
}
.padding0{
    padding-right: 0;
}
.widget-thumb{
    border: 1px solid #e7ecf1;
    padding: 20px;
    background: #fff;
		overflow: hidden;
    h4{
				height: 18px;
        font-size: 16px;
        font-weight: 600;
        color: #8e9daa;
        margin: 0 0 20px;
        font-family: "Open Sans",sans-serif;
        line-height: 1.1;
        text-transform: uppercase;
				overflow: hidden;
    }
}


.widget-thumb-wrap{
    overflow: hidden;
    i{
        float: left;
        width: 60px;
        height: 60px;
        display: inline-block;
        font-size: 20px;
        line-height: 41px;
        color: #fff;
        text-align: center;
        padding: 10px;
        margin-right: 15px;
        border-radius: 10px;
    }
    .bg-green{
        background: #4DB3A4 url('../assets/echart_icon/enterprise.png') no-repeat 13px 13px !important;
        background-size: 34px 34px !important;
    }
    .bg-red {
        background: #F36A5A url('../assets/echart_icon/individual.png') no-repeat 13px 13px !important;
        background-size: 34px 34px !important;
    }
    .bg-purple {
        background: #5B9BD1 url('../assets/echart_icon/honor.png') no-repeat 13px 13px !important;
        background-size: 34px 34px !important;
    }
    .bg-blue{
        background: #A276A4 url('../assets/echart_icon/built.png') no-repeat 13px 13px !important;
        background-size: 34px 34px !important;
    }
}
.widget-thumb-body{
    overflow: hidden;

    .widget-thumb-subtitle{
        padding-top: 2px;
        display: block;
				height: 21px;
        font-size: 14px;
        font-weight: 600;
        color: #8e9daa;
    }
    .widget-thumb-body-stat{
        display: block;
        font-size: 20px;
        font-weight: 600;
        color: #3e4f5e;
    }
}
</style>
