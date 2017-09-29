<template>
  <div class="entry">
    <!--search-->

      <img src="../../assets/loading.gif" class="zloading zloadingTh" alt="" />
    <div class="search clearfix">
      <div class="ser row">
        <div class="search-box col-lg-6">
          <input type="text" placeholder='请输入企业全称，如"小米科技有限责任公司"' ref="inputValue" v-model="query"  @keydown="_timeflash" @blur="_closeSearch">
          
        </div>
        <div class="search-box col-lg-6">
          <input type="text" style="" placeholder='请输入高管名字，如"雷军"' @keyup.enter="_getLists" ref="inputValueName" v-model="queryName">
          <div class="ser-btn" @click="_getLists"><i class="icon-ser"></i></div>
        </div>
      </div>
      <ul class="search-results" v-show="showing && query">
        <li v-for="(item,index) in serList" @click="addText(item.ENTNAME)">{{item.ENTNAME}}</li>
      </ul>
    </div>

    <!-- tab -->
    <div class="conListTab">
        <ul class="contabList clearfix">
          <li class="active">基本信息</li>
          <li>风险信息</li>
        </ul>
        <div class="contabListDiv" style="display: block;">
          <div class="gongshangList">
            <ul>
              <li @click="gongshangTo" class="gongshangActive">担任法人 <span>{{this.RYPOSFR.length||0}}</span></li>
              <li @click="gaoguanTo">担任高管 <span>{{this.RYPOSPER.length||0}}</span></li>
              <li @click="gudunTo">投资企业 <span>{{this.RYPOSSHA.length||0}}</span></li>
            </ul>
          </div>
          <div class="gongshangInof">
            <p class="gongshangInofH2 gongshangto">担任法人 <span class="count">{{this.RYPOSFR.length||0}}</span></p>
            <table class="tableList" v-for="item in RYPOSFR" width="100%">
              <tr v-if="item.ENTNAME">
                <td>企业(机构)名称:</td>
                <td>{{item.ENTNAME}}</td>
              </tr>
              <tr v-if="item.REGNO">
                <td>注册号:</td>
                <td>{{item.REGNO}}</td>
              </tr>
              <tr v-if="item.ENTTYPE">  
                <td>企业(机构)类型: </td>
                <td>{{item.ENTTYPE}} </td>
              </tr>
              <tr v-if="item.REGCAP">  
                <td>注册资本(万元): </td>
                <td>{{item.REGCAP}} </td>
              </tr>
               <tr v-if="item.ENTSTATUS">
                <td>企业状态: </td>
                <td>{{item.ENTSTATUS}}</td>
              </tr>
              <tr v-if="item.REGCAPCUR">
                <td>注册资本币种:</td>
                <td>{{item.REGCAPCUR}}</td>
              </tr>
              <tr v-if="item.ESDATE">
                <td>成立时间:</td>
                <td>{{item.ESDATE}}</td>
              </tr>
            </table>
            <p class="gongshangInofH2 gaoguanto">担任高管 <span class="count">{{this.RYPOSPER.length||0}}</span></p>
            <table class="tableList" v-for="item in RYPOSPER" width="100%">
              <tr v-if="item.ENTNAME">
                <td>企业(机构)名称:</td>
                <td>{{item.ENTNAME}}</td>
              </tr>
              <tr v-if="item.REGNO">
                <td>注册号:</td>
                <td>{{item.REGNO}}</td>
              </tr>
              <tr v-if="item.ENTTYPE">  
                <td>企业(机构)类型: </td>
                <td>{{item.ENTTYPE}} </td>
              </tr>
              <tr v-if="item.REGCAP">  
                <td>注册资本(万元): </td>
                <td>{{item.REGCAP}} </td>
              </tr>
               <tr v-if="item.ENTSTATUS">
                <td>企业状态: </td>
                <td>{{item.ENTSTATUS}}</td>
              </tr>
              <tr v-if="item.REGCAPCUR">
                <td>注册资本币种:</td>
                <td>{{item.REGCAPCUR}}</td>
              </tr>
              <tr v-if="item.ESDATE">
                <td>成立时间:</td>
                <td>{{item.ESDATE}}</td>
              </tr>
              <tr>
                <td>职务:</td>
                <td>{{item.POSITION}}</td>
              </tr>
            </table>
            <p class="gongshangInofH2 gudungto">投资企业 <span class="count">{{this.RYPOSSHA.length||0}}</span></p>
            <table class="tableList" v-for="item in RYPOSSHA" width="100%">
              <tr v-if="item.ENTNAME">
                <td>企业(机构)名称:</td>
                <td>{{item.ENTNAME}}</td>
              </tr>
              <tr v-if="item.REGNO">
                <td>注册号:</td>
                <td>{{item.REGNO}}</td>
              </tr>
              <tr v-if="item.ENTTYPE">  
                <td>企业(机构)类型: </td>
                <td>{{item.ENTTYPE}} </td>
              </tr>
              <tr v-if="item.REGCAP">  
                <td>注册资本(万元): </td>
                <td>{{item.REGCAP}} </td>
              </tr>
               <tr v-if="item.ENTSTATUS">
                <td>企业状态: </td>
                <td>{{item.ENTSTATUS}}</td>
              </tr>
              <tr v-if="item.REGCAPCUR">
                <td>注册资本币种:</td>
                <td>{{item.REGCAPCUR}}</td>
              </tr>
              <tr v-if="item.ESDATE">
                <td>成立时间:</td>
                <td>{{item.ESDATE}}</td>
              </tr>
              <tr v-if="item.SUBCONAM">
                <td>认缴出资额(万元):</td>
                <td>{{item.SUBCONAM}}</td>
              </tr>
              <tr v-if="item.CURRENCY">
                <td>认缴出资币种:</td>
                <td>{{item.CURRENCY}}</td>
              </tr>
              <tr v-if="item.CONFORM">
                <td>出资方式:</td>
                <td>{{item.CONFORM}}</td>
              </tr>
            </table>
          </div>
        </div>
        <div class="contabListDiv">
          <div class="gongshangList">
            <ul>
              <li @click="xingzhenchufaTo">行政处罚 <span>{{this.PERSONCASEINFO.length||0}}</span></li>
              <li @click="beizhixingrenTo">被执行人 <span>{{this.PUNISHED.length||0}}</span></li>
              <li @click="shixinxinxiTo">失信信息 <span>{{this.PUNISHBREAK.length||0}}</span></li>
            </ul>
          </div>
          <div class="gongshangInof">
            <p class="gongshangInofH2 xingzhenchufato">行政处罚 <span class="count">{{this.PERSONCASEINFO.length||0}}</span></p>
            <table class="tableList" v-for="item in PERSONCASEINFO" width="100%">
              <tr v-if="item.NAME">
                <td>当事人姓名:</td>
                <td>{{item.NAME}}</td>
              </tr>
              <tr v-if="item.CERNO">
                <td>证件号码:</td>
                <td>{{item.CERNO}}</td>
              </tr>
              <tr v-if="item.CASETIME">  
                <td>案发时间: </td>
                <td>{{item.CASETIME}} </td>
              </tr>
              <tr v-if="item.CASEREASON">  
                <td>案由: </td>
                <td>{{item.CASEREASON}} </td>
              </tr>
               <tr v-if="item.CASEVAL">
                <td>案值: </td>
                <td>{{item.CASEVAL}}</td>
              </tr>
              <tr v-if="item.CASETYPE">
                <td>案件类型:</td>
                <td>{{item.CASETYPE}}</td>
              </tr>
              <tr v-if="item.EXESORT">
                <td>执行类别:</td>
                <td>{{item.EXESORT}}</td>
              </tr>
              <tr v-if="item.CASERESULT">
                <td>案件结果:</td>
                <td>{{item.CASERESULT}}</td>
              </tr>
              <tr v-if="item.PENDECNO">
                <td>处罚决定文书:</td>
                <td>{{item.PENDECNO}}</td>
              </tr>
              <tr v-if="item.PENDECISSDATE">
                <td>处罚决定书签发日期:</td>
                <td>{{item.PENDECISSDATE}}</td>
              </tr>
              <tr v-if="item.PENAUTH">
                <td>处罚机关:</td>
                <td>{{item.PENAUTH}}</td>
              </tr>
              <tr v-if="item.ILLEGFACT">
                <td>主要违法事实:</td>
                <td>{{item.ILLEGFACT}}</td>
              </tr>
              <tr v-if="item.PENBASIS">
                <td>处罚依据:</td>
                <td>{{item.PENBASIS}}</td>
              </tr>
              <tr v-if="item.PENTYPE">
                <td>处罚种类:</td>
                <td>{{item.PENTYPE}}</td>
              </tr>
              <tr v-if="item.PENRESULT">
                <td>处罚结果:</td>
                <td>{{item.PENRESULT}}</td>
              </tr>
              <tr v-if="item.PENAM">
                <td>处罚金额(万元):</td>
                <td>{{item.PENAM}}</td>
              </tr>
              <tr v-if="item.PENEXEST">
                <td>处罚执行情况:</td>
                <td>{{item.PENEXEST}}</td>
              </tr>
            </table>
            <p class="gongshangInofH2 beizhixingrento">被执行人 <span class="count">{{this.PUNISHED.length||0}}</span></p>
            <table class="tableList" v-for="item in PUNISHED" width="100%">
              <tr v-if="item.CASECODE">
                <td>案号:</td>
                <td>{{item.CASECODE}}</td>
              </tr>
              <tr v-if="item.INAMECLEAN">
                <td>被执行人:</td>
                <td>{{item.INAMECLEAN}}</td>
              </tr>
              <tr v-if="item.INAMECLEAN">
                <td>身份证号码/企业注册号:</td>
                <td>{{item.CARDNUMCLEAN}}</td>
              </tr>
             
               <tr v-if="item.AREANAMECLEAN">
                <td>省份: </td>
                <td>{{item.AREANAMECLEAN}}</td>
              </tr>
              
              <tr v-if="item.COURTNAME">
                <td>执行法院:</td>
                <td>{{item.COURTNAME}}</td>
              </tr>
              <tr v-if="item.REGDATECLEAN">
                <td>立案时间:</td>
                <td>{{item.REGDATECLEAN}}</td>
              </tr>
              <tr v-if="item.CASESTATE">
                <td>案件状态:</td>
                <td>{{item.CASESTATE}}</td>
              </tr>
              <tr v-if="item.EXECMONEY">
                <td>执行标的(元) :</td>
                <td>{{item.EXECMONEY}}</td>
              </tr>
              <tr v-if="item.FOCUSNUMBER">
                <td>关注次数 :</td>
                <td>{{item.FOCUSNUMBER}}</td>
              </tr>
              <tr v-if="item.TYPE">
                <td>被执行人类型:</td>
                <td>{{item.TYPE}}</td>
              </tr>
            </table>
            <p class="gongshangInofH2 shixinxinxito">失信信息 <span class="count">{{this.PUNISHBREAK.length||0}}</span></p>
            <table class="tableList" v-for="item in PUNISHBREAK" width="100%">
              <tr v-if="item.CASECODE">
                <td>案号:</td>
                <td>{{item.CASECODE}}</td>
              </tr>
              <tr v-if="item.INAMECLEAN">
                <td>被执行人姓名/名称:</td>
                <td>{{item.INAMECLEAN}}</td>
              </tr>
              <tr v-if="item.TYPE">  
                <td>失信人类型: </td>
                <td>{{item.TYPE}} </td>
              </tr>
              <tr v-if="item.BUSINESSENTITY">  
                <td>法定代表人/负责人姓名 : </td>
                <td>{{item.BUSINESSENTITY}} </td>
              </tr>
               <tr v-if="item.CARDNUM">
                <td>身份证号码/工商注册号: </td>
                <td>{{item.CARDNUM}}</td>
              </tr>
              <tr v-if="item.REGDATECLEAN">
                <td>立案时间:</td>
                <td>{{item.REGDATECLEAN}}</td>
              </tr>
              <tr v-if="item.PUBLISHDATECLEAN">
                <td>发布时间:</td>
                <td>{{item.PUBLISHDATECLEAN}}</td>
              </tr>
              <tr v-if="item.COURTNAME">
                <td>执行法院:</td>
                <td>{{item.COURTNAME}}</td>
              </tr>
              <tr v-if="item.AREANAMECLEAN">
                <td>省份:</td>
                <td>{{item.AREANAMECLEAN}}</td>
              </tr>
              <tr v-if="item.GISTID">
                <td>执行依据文号:</td>
                <td>{{item.GISTID}}</td>
              </tr>
              <tr v-if="item.GISTUNIT">
                <td>做出执行依据单位:</td>
                <td>{{item.GISTUNIT}}</td>
              </tr>
              <tr v-if="item.DUTY">
                <td>生效法律文书确定的义务:</td>
                <td>{{item.DUTY}}</td>
              </tr>
              <tr v-if="item.DISRUPTTYPENAME">
                <td>失信被执行人行为具体情形:</td>
                <td>{{item.DISRUPTTYPENAME}}</td>
              </tr>
              <tr v-if="item.PERFORMANCE">
                <td>被执行人的履行情况:</td>
                <td>{{item.PERFORMANCE}}</td>
              </tr>
              <tr v-if="item.PERFORMEDPART">
                <td>已履行(元):</td>
                <td>{{item.PERFORMEDPART}}</td>
              </tr>
              <tr v-if="item.UNPERFORMPART">
                <td>未履行(元):</td>
                <td>{{item.UNPERFORMPART}}</td>
              </tr>
            
              <tr v-if="item.FOCUSNUMBER">
                <td>关注次数 :</td>
                <td>{{item.FOCUSNUMBER}}</td>
              </tr>
             
              <tr v-if="item.EXITDATE">
                <td>退出日期:</td>
                <td>{{item.EXITDATE}}</td>
              </tr>
            </table>
          </div>
        </div>
    </div>    
    <div class="alert alert-warning alert-dismissible zialert" role="alert">
          <button type="button" class="close" data-dismiss="alert" aria-label="Close" style="top: 3px"><span aria-hidden="true">&times;</span></button>
          {{errMsg}}
        </div>
  </div>
</template>

<script>
import Pager from '../../components/pager.vue'
export default {
  components:{
    Pager
  },
  data () {
    return {
      query:'',
      queryName:'',
      listKeyword:'',
      companyList:[],
      serList:[],
      showing:false,
      tipShow:false,
      loading:false,
      totalCount:0,
      seen:true,
      pagesize:10,
      flag:false,
      areaFlag:false,
      message:'收起筛选',
      arrowFlag:true,
      moreMsg:'更多',
      isMore:false,
      moreFlag:true,
      moreMsgStatus:'更多',
      isMoreStatus:false,
      moreFlagStatus:true,
      industry:[],//国民行业
      limitNum:4,
      area:[],//地域省份
      limitAreaNum:7,
      status:[],//经营状态
      eventPage: 1, //当前页，默认1
      queryPage: 1,
      paramsPage: 1,
      totalPage: 0, //总页数
      RYPOSFR:'', //法人信息
      RYPOSPER :'', //高管
      RYPOSSHA:'', //投资企业
      PERSONCASEINFO:'', //行政处罚
      PUNISHED:'', //被执行人
      PUNISHBREAK:'', //失信信息
      errMsg:'',
    }
  },
  computed:{
    filterIndustryList(){
      if(this.industry){
        return this.industry.slice(0,this.limitNum);
      }

    },
    filterAreaList(){
      if(this.area){
        return this.area.slice(0,this.limitAreaNum);
      }

    }
  },
  mounted(){
    if(this.$route.params.page) {
      this.paramsPage = parseInt(this.$route.params.page) || 1;
    } else {
      this.paramsPage = 1;
    }
    this.toTop();
    this.tabList();
    this.cook();
    if((this.query!='')&&(this.queryName!='')){
      this._getLists();
    }
    
  },
  methods:{
    cook(){
      if((window.sessionStorage.getItem('query'))&&(window.sessionStorage.getItem('queryName'))){
        this.query=window.sessionStorage.getItem('query')
        this.queryName=window.sessionStorage.getItem('queryName')
      }
    },
    toTop() {
      $('body,html').animate({scrollTop:0},300);
    },
      xingzhenchufaTo(){
        this.allTo($('.xingzhenchufato'));
      },
      shixinxinxiTo(){
        this.allTo($('.shixinxinxito'));
      },
      beizhixingrenTo(){
        this.allTo($('.beizhixingrento'));
      },
     gudunTo(){
        this.allTo($('.gudungto'));
      },
      gaoguanTo(){
        this.allTo($('.gaoguanto'));
      },
      gongshangTo(){
        this.allTo($('.gongshangto'));
      },
     allTo(nameTo){
        if(($('html').scrollTop() || $('body').scrollTop()) >= 0 && ($('html').scrollTop() || $('body').scrollTop()) < $('.contabList').offset().top){
          $('body,html').animate({'scrollTop':(nameTo.offset().top-214)},500)
        }else{
          $('body,html').animate({'scrollTop':(nameTo.offset().top-151)},500)
        }
      },
    //获取搜索列表
    _getSerLists(){
      var name = this.$refs.inputValue.value;
      if(name == ""){
        return false;
        this.serList = [];
        this.query = "";
        this.showing = false;
      }
      if(name && name.replace(/ /g,"").length <= 2){
        this.serList = [];
        this.showing = false;
        return false;
      }
      this.axios.get(this.api.entBase+'/list?key='+encodeURIComponent(name)).then((res) => {
        if(res.data.ENTERPRISES != []){
          this.serList = [];
          if(res.data.ENTERPRISES.length > 6){
            for(var i=0;i<6;i++){
              this.serList.push(res.data.ENTERPRISES[i]);
            }
          }else{
            this.serList = res.data.ENTERPRISES;
          }
          this.showing = true;
        }
      }).catch(err => {
        console.log(err);
      })
    },
    //延时减少请求
    _timeflash(){
      console.log("111111");
      var that = this;
      clearTimeout(this.timer);
      this.timer = setTimeout(function () {
        console.log(222222222)
        that._getSerLists();// 发送搜索请求
      }, 500);
    },
    _closeSearch(){
      var that = this;
      setTimeout(function(){
        that.list = [];
        that.showing = false;
      },300)
    },
    addText(key){
      this.query = key;
      this.serList = [];
      this.showing = false;

    },
    //获取列表
    _getLists(){
      $(".zloadingTh").show();
      var query=this.query;
      var queryName=this.queryName
      sessionStorage.setItem('query',query)
      sessionStorage.setItem('queryName',queryName)

      
      console.log(query)
      console.log(this.query)
      console.log(queryName);
      console.log(this.queryName);
      //this.query = this.$route.params.keyword;
//      this.loading = true;
      this.tipShow = false;
      //person/nam?entname
      this.axios.get(this.api.entBase+'/person/nam?entname='+encodeURIComponent(this.query)+'&name='+encodeURIComponent(this.queryName)+'&mask=111111').then((res) => {
        console.log(res)
            if(res.data.CODE == 703){
                     window.swal({
                       title: "",
                       text: "你已超过查询次数，如想继续查询请购买次数！",
                       type: "info",
                       showCancelButton: false,
                       confirmButtonColor: "#DD6B55",
                       confirmButtonText: "确认",
                       cancelButtonText: "取消",
                       closeOnConfirm: true,
                       closeOnCancel: true
                     });

                $(".zloadingTh").hide();
             }
             if((res.data.CODE != 703) && (res.data.CODE != 200)){
                 window.swal({
                   title: "",
                   text: "无法查询到相关信息",
                   type: "info",
                   showCancelButton: false,
                   confirmButtonColor: "#DD6B55",
                   confirmButtonText: "确认",
                   cancelButtonText: "取消",
                   closeOnConfirm: true,
                   closeOnCancel: true
                 });

                 $(".zloadingTh").hide();
             }
        this.RYPOSFR = res.data.PERSON_INFO.RYPOSFR;
        this.RYPOSPER  = res.data.PERSON_INFO.RYPOSPER;
        for(var i in res.data.PERSON_INFO.RYPOSPER){
            if(res.data.PERSON_INFO.RYPOSPER[i].POSITION == ""){
                res.data.PERSON_INFO.RYPOSPER[i].POSITION == "暂无"
            }
        }
        this.RYPOSSHA  = res.data.PERSON_INFO.RYPOSSHA;
        this.PERSONCASEINFO  = res.data.PERSON_INFO.PERSONCASEINFO;
        this.PUNISHED  = res.data.PERSON_INFO.PUNISHED;
        this.PUNISHBREAK  = res.data.PERSON_INFO.PUNISHBREAK;
        this.axios.put(this.api.common_history,{
          "productCode": "person",
          "productName": "人员查询",
          "functionCode": "nam",
          "functionName": "人员探查",
          "param": "{entname: "+query+", name: "+queryName+"}",
          "content": query+" "+ queryName
        })
        console.log("mikai");
        $(".zloadingTh").hide();
      }).catch(err => {
        console.log(err)
          
        })
         if((this.query!='')&&(this.queryName!='')){
          $('.conListTab').show();
        }
    },

    //列表切换
      tabList(){
          var top = $('.contabList').offset().top

          $('.shangbiaoTabXiala').click(function(){
              var index=$(this).index()
            console.log(index)
            if($('.shangbiaoTabXialaBoxBottom').eq(index-1).is(":hidden")){
              $('.shangbiaoTabXialaBoxBottom').hide();
              $('.shangbiaoTabXialaBoxBottom').eq(index-1).show();
            }else{
              $('.shangbiaoTabXialaBoxBottom').hide();
              $('.shangbiaoTabXialaBoxBottom').eq(index-1).hide();
            }
          });
        $('.gongshangList ul li').hover(function(){
            console.log('hover')
          $('.gongshangList ul li').removeClass('gongshanghover')
          $(this).addClass('gongshanghover')
        },function(){
          $('.gongshangList ul li').removeClass('gongshanghover')
        });
        $('.gongshangList ul li').click(function(){
          console.log('click')
          $('.gongshangList ul li').removeClass('gongshangActive')
          $(this).addClass('gongshangActive')
        });

        $(".contabList li").click(function(){
          // $('html,body').scrollTop(0);
          $(".contabList li").removeClass('active');
          $('.contabListDiv').hide();
          $(this).addClass('active')
          $('.contabListDiv').eq($(this).index()).show();
        });
      },

  },
  watch: {
    '$route': function () {
      //this.query =this.$route.params.keyword;
      if(this.$route.params.page) {
        this.paramsPage = parseInt(this.$route.params.page) || 1;
      } else {
        this.paramsPage = 1
      }
      // 当路由发生变化时自动请求数据
      this._getLists();
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 .count{
    background: #3BD2A2;
    border-radius: 3px;
    height:16px;
    line-height:16px;
    font-weight:normal;
    padding: 0 4px;
    color: #fff;
    font-size: 12px;
    margin-left: 10px;
    position: relative;
    top:-1px;
  }
.zialert{
     position: absolute;
    z-index: 12;
    left: 50%;
    transform: translateX(-50%);
    top: 30px;
    display: none;
}
  .entry{
    padding-bottom:50px;
  }
  .search{
    width:100%;
    position: relative;
        margin-top: 20px;
  }
  .ser{
    position: relative;
  }
  .search-box{
    height:38px;
    -webkit-border-radius:3px 0 0 3px;
    -moz-border-radius:3px 0 0 3px;
    border-radius:3px 0 0 3px;
  }
  .ser-btn{
    width:40px;
    height: 38px;
    background: #4AA6FF;
    -webkit-border-radius:0 3px 3px 0;
    -moz-border-radius:0 3px 3px 0;
    border-radius:0 3px 3px 0;
    position: absolute;
        top: 0px;
    right: 0%;
    cursor: pointer;
  }
  .ser-btn .icon-ser{
    position: absolute;
    left:12px;
    top:9px;
    width:16px;
    height: 16px;
    background: url(../../assets/search_icon.png) no-repeat;
  }
  .search-box input[type="text"]{
    width:100%;
    height: 38px;
    border:0 none;
    background: none;
    background: #fff;
    padding:0 10px;
    box-sizing:border-box;
    -moz-box-sizing:border-box; /* Firefox */
    -webkit-box-sizing:border-box; /* Safari */
  }
  /*去除ie浏览器input中的自带删除图标*/
  input::-ms-clear{display:none;}
  /**/
  .search-results{
    position: absolute;
    left:0;
    top:44px;
    width:100%;
    height:auto;
    background-color: #fff;
    -webkit-border-radius:3px;
    -moz-border-radius:3px;
    border-radius:3px;
    box-shadow: 0 10px 20px 0 rgba(0,0,0,0.10);
    z-index:999;
    overflow: hidden;
  }
  .search-results > li{
    line-height:40px;
    padding:0 10px;
    font-size:14px;
    color: #808080;
    cursor: pointer;
  }
  .search-results > li:hover{
    background: #f2f6f9;
    color: #323232;
  }
  .filter{
    background-color: #fff;
    box-shadow: 0 2px 5px 0 rgba(0,0,0,0.05);
    margin-top:20px;
  }
  .filter-hd{
    padding:0 25px;
    height:56px;
    line-height:56px;
  }
  .filter-tit{
    font-size:16px;
    width: 120px;
  }
  .filter-toggle{
    color: #a0a0a0;
    cursor: pointer;
  }
  .filter-toggle span{
    margin-right:8px;
  }
  .filter-toggle .arrow-down,.filter-item-toggle .arrow-down{
    display:inline-block;
    position: relative;
    top: 1px;
    left: -3px;
    width:14px;
    height: 14px;
    background:url(../../assets/turn_icon.png) no-repeat center center;
  }
  .filter-toggle .arrow-up,.filter-item-toggle .arrow-up{
    display:inline-block;
    position: relative;
    top: 1px;
    left: -3px;
    width:14px;
    height: 14px;
    background:url(../../assets/open_icon.png) no-repeat center center;
  }
  .filter-bd{
    margin: 0 25px 0 25px;
    padding-bottom:20px;
    border-top: 1px solid #e6e6e6;
    padding-top:30px;
  }
  .filter-item{
    line-height: 36px;
    overflow: hidden;
    position: relative;
    /*margin-right:100px;*/
  }
  .filter-item-tit{
    width:90px;
    color: #a0a0a0;
    position: absolute;
    left:0;
    top:0;
  }
  .row{
    margin-right: 0
  }
  .col-lg-6{
    padding-right: 0px;
  }
  .filter-item-toggle {
    width: 100px;
    color: #a0a0a0;
    cursor: pointer;
    text-align: right;
    position: absolute;
    top:0;
    right:0;
  }
  .filter-item-toggle span{
    margin-right:8px;
  }
  .filter-item-cont {
    overflow: hidden;
    /*max-width:900px;*/
    padding:0 100px;
  }
  .filter-item-base {
    display: block;
    color: #323232;
  }
  .filter-item-base em{
    color: #4AA6FF;
  }
  .filter-item-cont span {
    float: left;
    cursor: pointer;
    margin-right: 16px;
    color: #323232;
  }
  .filter-item-base:hover{
    color: #000;
  }

  .cards{
    min-height: 320px;
    position: relative;
  }
  .list-loading{
    position: absolute;
    left:50%;
    top:50%;
    margin:-6px 0 0 -40px;
  }
  .list-cards  .li-inner{
    background-color: #fff;
    padding:25px;
    box-sizing:border-box;
    -moz-box-sizing:border-box; /* Firefox */
    -webkit-box-sizing:border-box; /* Safari */
    color: #323232;
    position: relative;
    margin-bottom:20px;
    box-shadow: 0 2px 5px 0 rgba(0,0,0,0.05);
    cursor: pointer;

  }
  .list-cards .li-inner .name{
    font-size:16px;
    font-weight:bold;
    margin-bottom:28px;
    max-width: 80%;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .list-cards .li-inner p{
    margin-bottom:16px;
  }
  .list-cards .li-inner p:last-child{
    margin-bottom:0;
  }
  .list-cards .li-inner .status{
    position: absolute;
    top:-5px;
    right:10px;
    padding:10px 12px;
    background: #3BD2A2;
    text-align: center;
    box-shadow: 0 5px 10px 0 rgba(0,0,0,0.10);
    font-size:12px;
    color: #fff;
  }
.conListTab{
    margin-top:24px;
    background: #ffffff;
    box-shadow: 0 2px 5px 0 rgba(0,0,0,0.05);
    padding-bottom:50px;
    display: none;
  }
  .conListTab .contabList{
    height: 60px;
    border-bottom:1px solid #e6e6e6;
  }
  .conListTab .contabList li{
    font-size: 18px;
    height: 60px;
    line-height: 60px;
    float: left;
    text-align: center;
    width: 50%;
    cursor: pointer;
  }
  .conListTab .contabList li.active{
    color: #4AA6FF;
    border-bottom:3px solid #4AA6FF;
    height: 59px;
    line-height: 59px;
  }
   .contabListDiv{
    margin-top:1px;
    display: none;
  }
  gongshangList{
    height: 64px;
  }
  .gongshangList ul{
    height: 64px;
    box-shadow: 0 5px 20px 0 rgba(0,0,0,0.05);
  }
  .gongshangList ul li{
    float: left;
    margin-left:20px;
    margin-top:14px;
    font-size: 14px;
    padding:10px;
    border:1px solid #E6E6E6;
    border-radius: 3px;
    cursor: pointer;
    color: #5E7386;
  }
  .gongshangList ul li.gongshanghover{
    background: #4AA6FF;
    color: #fff;
  }
  .gongshangList ul li.gongshangActive{
    background: #F2F6FA;
    color: #637789;
  }
  .gongshangList ul .report-item:hover{
    background: #4AA6FF;
    color: #fff;
  }
  .gongshangList ul .report-item.active{
    background: #F2F6FA;
    color: #637789;
  }
  .gongshangInof{
    padding:20px;
  }
    .gongshangInofH2{
    margin-top:50px;
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
</style>
