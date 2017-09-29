<template>
  <div class="alter">

    <div class="conListTab">
        <div class="gongshangInof">
            <p class="gongshangInofH2 gongshangto">商标详情 <span class="count"></span></p>
            <table class="tableList"  width="100%">
              <tr >
                <td>图片:</td>
                <td><img width="100" :src="'http://tm.bidata.com.cn/'+TRADEMARKDETAIL.IMGNAME" alt=""  :onerror="errorImg"/></td>
              </tr>
              <tr>
                <td>商标名称:</td>
                <td>{{TRADEMARKDETAIL.MARKNAME}}</td>
              </tr>
              <tr>
                <td>注册号:</td>
                <td>{{TRADEMARKDETAIL.MARKCODEKEY}}</td>
              </tr>
              <tr>  
                <td>分类: </td>
                <td>{{TRADEMARKDETAIL.MARKTYPE_NEW}} </td>
              </tr>
              <tr >  
                <td>商标状态: </td>
                <td>{{TRADEMARKDETAIL.STATUS}} </td>
              </tr>
               <tr>
                <td>申请人: </td>
                <td>{{TRADEMARKDETAIL.APPERSON}}</td>
              </tr>
              <tr>
                <td>申请日期:</td>
                <td>{{TRADEMARKDETAIL.APPDATE}}</td>
              </tr>
              <tr>
                <td>专用期（起始日期）:</td>
                <td>{{TRADEMARKDETAIL.BEGINDATE}}</td>
              </tr>
              <tr>
                <td>专用期（到期日期）:</td>
                <td>{{TRADEMARKDETAIL.ENDDATE}}</td>
              </tr>
              <tr>
                <td>商标/服务:</td>
                <td>{{TRADEMARKDETAIL.TYPEDETAILDES}}</td>
              </tr>
              <tr>
                <td>商标类型:</td>
                <td>{{TRADEMARKDETAIL.MARKTYPE}}</td>
              </tr>

              <tr>
                <td>是否有效:</td>
                <td>{{TRADEMARKDETAIL.ISINVALID}}</td>
              </tr>
              <tr>
                <td>是否有效代码:</td>
                <td>{{TRADEMARKDETAIL.ISINVALIDCODE}}</td>
              </tr>
              <tr>
                <td>最后公告:</td>
                <td>{{TRADEMARKDETAIL.ZIPCODE}}</td>
              </tr>
              <tr>
                <td>代理人名称:</td>
                <td>{{TRADEMARKDETAIL.AGENTNAME}}</td>
              </tr>
              <tr>
                <td>注册人名称:</td>
                <td>{{TRADEMARKDETAIL.APPERSON}}</td>
              </tr>
              <tr>
                <td>申请地址:</td>
                <td>{{TRADEMARKDETAIL.ADDR}}</td>
              </tr>
              <tr>
                <td>申请注册号:</td>
                <td>{{TRADEMARKDETAIL.MARKCODEKEY}}</td>
              </tr>
              <tr>
                <td>类似群组代码:</td>
                <td>{{TRADEMARKDETAIL.TYPEDETAILCODE}}</td>
              </tr>
              <tr>
                <td>类似群组:</td>
                <td>{{TRADEMARKDETAIL.TYPEDETAIL}}</td>
              </tr>
             <tr>
                <td>国际分类代码:</td>
                <td>{{TRADEMARKDETAIL.UNIONTYPECODE}}</td>
              </tr>
              <tr>
                <td>国际分类:</td>
                <td>{{TRADEMARKDETAIL.UNIONTYPE}}</td>
              </tr>
             <tr>
                <td>初审公告日期:</td>
                <td>{{TRADEMARKDETAIL.CHECKDATE}}</td>
              </tr>
              <tr>
                <td>注册公告日期:</td>
                <td>{{TRADEMARKDETAIL.REGDATE}}</td>
              </tr>
            </table>
          </div>
          </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      entName: '',
      TRADEMARKLIST:[],
      code:'',
      TRADEMARKDETAIL:{},

      errorImg:'this.src="' + require('../../assets/errorImg.png') + '"',
    }
  },
  watch:{
      '$route': function () {
        this.code = this.$route.params.code;              (id为接收路由传过来的id)
      }
  },
  mounted(){
    this.code = this.$route.params.code;
    this._getTradeMarkInfo(this.code)
  },
  methods:{
    _getTradeMarkInfo(code){
      console.log(this.code)
        this.axios.get(this.api.entBase+'/trademark/detail?markcodekey='+ code).then((res)=>{
          console.log(res)
          this.TRADEMARKDETAIL = res.data.TRADEMARKDETAIL;
        }).catch(err => {
            console.log(err);
        })
      },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.gongshangInof{
    padding:20px;
  }
    .gongshangInofH2{
    margin-top:10px;
    font-size: 16px;
    font-weight: bold;
  }
  .tableList{
    margin-top:24px;
    border-collapse: collapse;
  }

  .tableList  td{
    line-height: 30px;
    padding-left: 15px;
    border:1px solid #E6E6E6;
    padding: 5px 8px 5px 15px;
  }
    .tableList tr td:first-child{
      width: 200px;
    }
    .conListTab{
    margin-top:24px;
    background: #ffffff;
    box-shadow: 0 2px 5px 0 rgba(0,0,0,0.05);
    padding-bottom:50px;
  }
</style>
