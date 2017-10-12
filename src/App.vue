<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  data () {
      return {
      }
    }
}
</script>

<style>
  .zloading{
    position: fixed;
    z-index: 1111;
    left: 50%;
    transform: translateX(-50%);
    top: 5%;
    width: 80px;
    display: none;
  }
  .zloading{
    top: 30%;
  }
  #app{
    font-family:Roboto,"Helvetica Neue",Helvetica,Tahoma,Arial,"PingFang SC","Microsoft YaHei";
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    min-height:100%;
    position: relative;
    left:0;
    top:0;
    bottom:0;
    right:0;
    background: #e9ecf3;
   }
    html,body{
    height:100%;
/*
    background: #e9ecf3;*/
    }
  .w{
    width:1200px;
    margin:0 auto;
  }
  .fl{
    float: left;
  }
  .fr{
    float: right;
  }
  html, body, div, span, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  abbr, address, cite, code,
  del, dfn, em, img, ins, kbd, q, samp,
  small, sub, sup, var,
  b, i,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, figcaption, figure,
  footer, header, hgroup, menu, nav, section, summary,
  time, mark, audio, video {
    margin:0;
    padding:0;
    border:0;
    outline:0;
    font-size:100%;
    background:transparent;
  }

  body,div,dl,dt,dd,ul,ol,li,h1,h2,h3,h4,h5,h6,pre,code,form,fieldset,legend,input,textarea,p,blockquote,th,td{
    margin:0;
    padding:0;
  }
  body{
    line-height:1;
    font-size:14px;
    color: #323232;
    overflow:auto !important;
    padding-right:0 !important;
    position: relative;
  }
  a {
    text-decoration: none;
  }
  ul,ol {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  img {vertical-align: top;}
  input,textarea{outline:none}
  fieldset,img {
    border: 0;
  }
  address,caption,cite,code,dfn,em,th,var {
    font-weight: normal;
    font-style: normal;
  }
  caption,th {
    text-align: left;
  }
  h1,h2,h3,h4,h5,h6 {
    font-weight: normal;
    font-size: 100%;
  }
  /*清除浮动*/
  .clearfix:after{content:'.';display:block;width:0;visibility:hidden;height:0;clear:both;}
  .clearfix{*zoom:1;}
  .page-header.navbar.navbar-fixed-top{
    z-index:1000 !important;
  }
  .mask{
    padding-right: 17px !important;
    width: 100%;
    box-sizing: content-box;
  }
  .stockpawn .el-dialog--small{
    width:800px !important;
  }
  .morg .el-dialog--small{
    width:900px !important;
  }
  .trade .el-dialog--small{
    width:900px !important;
  }
  .trade .tableList tbody tr td:first-child{
    width:150px;
  }
</style>
