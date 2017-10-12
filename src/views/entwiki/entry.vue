<template>
  <div class="entry">
      <img src="../../assets/loading.gif" class="zloading zloadingTh" alt="" />
    <!--search-->
    <div class="search clearfix">
      <div class="ser">
        <div class="search-box">
          <input type="text" placeholder='请输入企业名称、注册号或统一社会信用代码,如"小米科技"' ref="inputValue" v-model="query" @focus="_timeflash" v-on:input="_timeflash" @keyup.enter="_getLists"  @keydown="_timeflash" @blur="_closeSearch">
        </div>
        <div class="ser-btn" @click="_getLists"><i class="icon-ser"></i></div>
      </div>

      <div class="tip" v-if="tipShow">搜索无结果</div>
      <ul class="search-results" v-show="showing && query">
        <li v-for="(item,index) in serList" @click="addText(item.ENTNAME)">{{item.ENTNAME}}</li>
      </ul>
    </div>
    <!--./search-->
    <!--filter-->
    <div class="filter" v-if="companyList.length != 0">
      <div class="filter-hd clearfix">
        <span class="filter-tit fl">智能筛选</span>
        <div class="filter-selected">
          <span v-for="(item,index) in selectedArr" @click="_tabClick($event,index)">{{item}}</span>
        </div>
        <span class="filter-toggle fr" @click="_toggleClick" v-if="selectedArr.length != 3">
            <span>{{message}}</span>
            <i class="arrow-down" v-if="arrowFlag"></i>
            <i class="arrow-up" v-if="!arrowFlag"></i>
          </span>
      </div>
      <div class="filter-bd" v-if="seen">
        <div class="filter-item clearfix" ref="filterItem" v-if="industrySeen">
          <div class="filter-item-tit fl">国民行业:</div>
          <div class="filter-item-cont fl">
            <span class="filter-item-base" v-for="(item,index) in filterIndustryList" @click="_industryClick(index)">{{item.INDUSTRYPHYNAME}}<em>({{item.COUNT}})</em></span>
          </div>
          <span class="filter-item-toggle fr" @click="_toggleMore" v-if="flag">
                <span>{{moreMsg}}</span>
                <i class="arrow-up" v-if="moreFlag"></i>
                <i class="arrow-down" v-if="!moreFlag"></i>
              </span>
        </div>
        <div class="filter-item clearfix" ref="filterItemArea" v-if="areaSeen">
          <div class="filter-item-tit fl">地域省份:</div>
          <div class="filter-item-cont fl">
            <span class="filter-item-base" v-for="(item,index) in filterAreaList" @click="_areaClick(index)">{{item.AREANAME}}<em>({{item.COUNT}})</em></span>
          </div>
          <span class="filter-item-toggle fr" @click="_toggleMoreStatus" v-if="areaFlag">
              <span>{{moreMsgStatus}}</span>
              <i class="arrow-up" v-if="moreFlagStatus"></i>
              <i class="arrow-down" v-if="!moreFlagStatus"></i>
            </span>
        </div>
        <div class="filter-item clearfix" ref="filterItemStatus" v-if="statusSeen">
          <div class="filter-item-tit fl">经营状态:</div>
          <div class="filter-item-cont fl">
            <span class="filter-item-base" v-for="(item,index) in status" @click="_statusClick(index)" v-if="item.STATUSNAME != ''">{{item.STATUSNAME}}<em>({{item.COUNT}})</em></span>
          </div>
        </div>
      </div>
    </div>
    <!--./filter-->
    <!--count-->
    <div class="count" v-if="companyList.length != 0">
      共计搜索到<span>{{totalCount}}</span>家符合条件的企业(本页面只展示前20条数据)
    </div>
    <!--./count-->

    <div class="row list-row">
      <!--list-->
      <div class="cards">
        <ul class="list-cards clearfix">
          <li class="col-lg-6 col-md-6 col-sm-6 col-xs-12" v-for="(item,index) in companyList" @click="_goDetail(item.ID,item.ENTNAME,item.NAME)">
            <div class="li-inner">
              <h3 class="name">{{item.ENTNAME || '--'}}</h3>
              <p><span>统一社会信用代码：</span><span>{{item.CREDITCODE || '未公开'}}</span></p>
              <p><span>法定代表人：</span><span>{{item.NAME || '暂无'}}</span></p>
              <p><span>注册资本：</span><span v-if="item.REGCAP">{{item.REGCAP}}万元</span><span v-else>未公开</span></p>
              <p><span>注册时间：</span><span>{{item.ESDATE || '暂无'}}</span></p>
              <span class="status" v-if="item.ENTSTATUS">{{item.ENTSTATUS}}</span>
            </div>
          </li>
        </ul>
      </div>
      <!--list-->
      <!--分页组件-->
      <!-- <div class="page-list" v-if="companyList.length != 0">
        <pager
          mode="params"
          route-name="pageRoute"
          :total-page="totalPage"
          :init-page="paramsPage">
        </pager>
      </div> -->
      <!--./分页组件-->
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
      industryVal:'',
      areaVal:'',
      statusVal:'',
      industryName:'',
      areaName:'',
      statusName:'',
      selectedArr:[],
      industrySeen:true,
      areaSeen:true,
      statusSeen:true,
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

    this.cook();

    if(this.$route.params.page) {
      this.paramsPage = parseInt(this.$route.params.page) || 1;
    } else {
      this.paramsPage = 1;
    }
    this.toTop();
    if(this.query!=''){
      this._getLists()
    }
  },
  methods:{
    cook(){
      // 最新记录移除
      if(window.sessionStorage.getItem('qiteDetailPathHref')){
        sessionStorage.removeItem('qiteDetailPathHref');
      }
      //value获取
      if (window.sessionStorage.getItem('hcname')){
        this.query=window.sessionStorage.getItem('hcname');
      }
    },
    toTop() {
      $('body,html').animate({scrollTop:0},300);
    },
    _toggleClick(){
      this.seen=!this.seen;
      if(this.seen==true){
        this.message='收起筛选';
        this.arrowFlag = true;
      }
      if(this.seen==false){
        this.message='展开筛选';
        this.arrowFlag = false;
      }
    },
    _toggleMore(){

      if(this.isMore == false){
        this.moreMsg = "收起";
        this.moreFlag = false;
        //this.$refs.filterItem.style.height = 'auto';
        this.limitNum=this.industry.length;
      }
      if(this.isMore == true){
        this.moreMsg = "更多";
        this.moreFlag = true;
        //this.$refs.filterItem.style.height = '36px';
        this.limitNum = 4;

      }
      this.isMore = !this.isMore;
    },
    _toggleMoreStatus(){

      if(this.isMoreStatus == false){
        this.moreMsgStatus = "收起";
        this.moreFlagStatus = false;
        //this.$refs.filterItemStatus.style.height = 'auto';
        this.limitAreaNum = this.area.length;
      }
      if(this.isMoreStatus == true){
        this.moreMsgStatus = "更多";
        this.moreFlagStatus = true;
        //this.$refs.filterItemStatus.style.height = '36px';
        this.limitAreaNum = 7;
      }
      this.isMoreStatus = !this.isMoreStatus;
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
//        console.log(res);
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
      //value存储
      var entnamee =this.query
      sessionStorage.setItem('hcname',entnamee);
      var that = this;
      clearTimeout(this.timer);
      this.timer = setTimeout(function () {
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
      this._getLists();

    },
    //获取列表
    _getLists(){
      $('.zloadingTh').show();
      //this.query = this.$route.params.keyword;
//      this.loading = true;
      this.tipShow = false;
      // this.axios.get('/list?key='+encodeURIComponent(this.query)+"&page="+this.paramsPage+"&size="+this.pagesize).then((res) => {

        this.axios.get(this.api.entBase+'/list?key='+encodeURIComponent(this.query)+"&industry="+encodeURIComponent(this.industryVal)+"&area="+encodeURIComponent(this.areaVal)+"&status="+encodeURIComponent(this.statusVal)).then((res) => {

        this.loading = false;
        //console.log(res);
        if(res.data.CODE == 200){
          if(res.data.ENTERPRISES.length === 0){
//            this.loading = false;
            this.tipShow = true;
//            $('.listFt').css('bottom',0);
          }else{
            this.tipShow = false;
//            this.loading = false;
//            $('.listFt').css('bottom','-247px');
          }
          this.totalCount = res.data.TOTALCOUNT;
          this.companyList = res.data.ENTERPRISES;
          this.industry = res.data.INDUSTRYPHYCOUNT; //国民行业
          this.area = res.data.AREACODECOUNT;    //地域省份
          this.status = res.data.ENTSTATUSCOUNT; //经营状态
          if(this.industry.length > this.limitNum){
            this.flag = true;
          }else{
            this.flag = false;
          }
          if(this.area.length > this.limitAreaNum){
            this.areaFlag = true;
          }else{
            this.areaFlag = false;
          }
          this.totalPage = Math.ceil(this.totalCount/this.pagesize); //总页数计算

          $('.zloadingTh').hide();
        }
      }).catch(err => {
        console.log(err);
      })
    },

    //跳转详情页
    _goDetail(entid,entname,name){
      // 记录点击详情内容
      this.axios.put(this.api.common_history,{
        "productCode": "enterprise-datasource",
        "productName": "企业工商信息查询",
        "functionCode": "detail",
        "functionName": "企业查询",
        "param": "{entname: "+entname+", name: "+name+"}",
        "content": entname+" "+ name
      })
      sessionStorage.removeItem('flays');
      sessionStorage.setItem('tabEnTname',entname);

      this.$router.push({ name: '详情', params: { entid: entid}});

    },
    //国民行业点击事件
    _industryClick(index){
        this.industrySeen = false;
        this.industryVal = this.industry[index].INDUSTRYPHY;
        this.industryName = this.industry[index].INDUSTRYPHYNAME;
        this.selectedArr.push(this.industryName);
        if(this.selectedArr.length == 3){
          this.seen = false;
        }else{
          this.seen = true;
        }
        this._getLists();
        return this.selectedArr;

    },
    //地域省份点击
    _areaClick(index){
        //this.$refs.filterItemArea.style.display="none";
        this.areaSeen = false;
        this.areaVal = this.area[index].AREACODE;
        this.areaName = this.area[index].AREANAME
        this.selectedArr.push(this.areaName);
        if(this.selectedArr.length == 3){
          this.seen = false;
        }else{
          this.seen = true;
        }
        this._getLists();
        return this.selectedArr;
    },
    //经营状态点击
    _statusClick(index){
        //this.$refs.filterItemStatus.style.display="none";
        this.statusSeen = false;
        this.statusVal = this.status[index].STATUS;
        this.statusName = this.status[index].STATUSNAME;
        this.selectedArr.push(this.statusName);
        if(this.selectedArr.length == 3){
          this.seen = false;
        }else{
          this.seen = true;
        }
        this._getLists();
        return this.selectedArr;
    },
    _tabClick(e,index){
        var currentDom = e.currentTarget;
        $(currentDom).remove();
        this.seen = true;
        if(this.selectedArr[index] == this.industryName){
            this.industryVal = "";
            //this.$refs.filterItem.style.display="block";
            this.selectedArr.splice(index,1);
            this.industrySeen = true;
        }
        if(this.selectedArr[index] == this.areaName){
            this.areaVal = "";
            //this.$refs.filterItemArea.style.display="block";
            this.selectedArr.splice(index,1);
            this.areaSeen = true;
        }
        if(this.selectedArr[index] == this.statusName){
            this.statusVal = "";
            this.selectedArr.splice(index,1);
            //this.$refs.filterItemStatus.style.display="block";
            this.statusSeen = true;
        }
        this._getLists();
    }

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
.tip{
      height: 60px;
    line-height: 60px;
    background-color: rgba(255,255,255,1);
    border-left: 3px solid #36c6d3;
    margin-top: 10px;
    padding-left: 10px;
}
  .entry{
    padding-bottom:50px;
    margin-top:20px;
  }
  .search{
    width:100%;
    position: relative;
  }
  .ser{
    position: relative;
  }
  .search-box{
    height:38px;
    -webkit-border-radius:3px 0 0 3px;
    -moz-border-radius:3px 0 0 3px;
    border-radius:3px 0 0 3px;
    margin-right:40px;
  }
  .ser-btn{
    width:40px;
    height: 38px;
    background: #4AA6FF;
    -webkit-border-radius:0 3px 3px 0;
    -moz-border-radius:0 3px 3px 0;
    border-radius:0 3px 3px 0;
    position: absolute;
    top:0px;
    right:0;
    cursor: pointer;
  }
  .ser-btn .icon-ser{
    position: absolute;
    left:12px;
    top:11px;
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
  .count{
    padding:20px 0;
    color: #95A5A6;
  }
  .count span{
    color: #E43A45;
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
  .filter-selected{
    float: left;
  }
.filter-selected span{
  margin-top:16px;
  display:inline-block;
  white-space: nowrap;
  height: 24px;
  line-height:24px;
  padding: 0 10px;
  margin-right:8px;
  padding-right: 20px;
  color: #fff;
  font-size:12px;
  background: #36C6D3 url(../../assets/close.gif) right 9px no-repeat;
  border-radius:2px !important;
  cursor:pointer;
}
.filter-selected span:hover{
  background-position:right -15px;
}
</style>
