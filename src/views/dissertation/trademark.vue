<template>
  <div class="alter trademark">
        <div class="search clearfix">
          <div class="ser">
            <div class="search-box">
              <input type="text" placeholder='请输入 企业名称,企业统一信用代码,企业注册号，商标名称,商标注册号 进行搜索' v-model="entName" @keyup.enter="_getTradeMarkInfo" >
            </div>
            <div class="ser-btn" @click="_getTradeMarkInfo"><i class="icon-ser"></i></div>
          </div>
          <div class="tip" v-show="showhide">搜索无结果</div>
        </div>
    <!--filter-->
    <div class="filter" v-if="TRADEMARKLIST.length != 0"> 
      <div class="filter-hd clearfix">
        <span class="filter-tit fl">智能筛选</span>
        <div class="filter-selected">
          <span v-for="(item,index) in selectedArr" @click="_tabClick($event,index)">{{item.value}}</span>
        </div>
        <span class="filter-toggle fr" @click="_toggleClick" v-if="selectedArr.length != 3">
            <span>{{message}}</span>
            <i class="arrow-down" v-if="arrowFlag"></i>
            <i class="arrow-up" v-if="!arrowFlag"></i>
          </span>
      </div>
      <div class="filter-bd" v-if="seen">
        <div class="filter-item clearfix" ref="filterItem" v-if="industrySeen">
          <div class="filter-item-tit fl">国际分类:</div>
          <div class="filter-item-cont fl">
            <span class="filter-item-base" v-for="(item,index) in filterIndustryList" @click="_industryClick(index)">{{item.UNIONTYPECODE}}类{{item.UNIONTYPE}}<em>({{item.COUNT}})</em></span>
          </div>
          <span class="filter-item-toggle fr" @click="_toggleMore" v-if="flag">
                <span>{{moreMsg}}</span>
                <i class="arrow-up" v-if="moreFlag"></i>
                <i class="arrow-down" v-if="!moreFlag"></i>
              </span>
        </div>
        <div class="filter-item clearfix" ref="filterItemArea" v-if="areaSeen">
          <div class="filter-item-tit fl">商标状态:</div>
          <div class="filter-item-cont fl">
            <span class="filter-item-base" v-for="(item,index) in filterAreaList" @click="_areaClick(index)">{{item.ISINVALID}}<em>({{item.COUNT}})</em></span>
          </div>
        <span class="filter-item-toggle fr" @click="_toggleMoreArea" v-if="areaFlag">
          <span>{{moreMsgStatus}}</span>
          <i class="arrow-up" v-if="moreFlagStatus"></i>
          <i class="arrow-down" v-if="!moreFlagStatus"></i>
        </span>
        </div>
        <div class="filter-item clearfix" ref="filterItemStatus" v-if="statusSeen">
          <div class="filter-item-tit fl">字数:</div>
          <div class="filter-item-cont fl">
            <span class="filter-item-base" v-for="(item,index) in filterLenList" @click="_statusClick(index)">{{item.MARKNAMELEN}}<em>({{item.COUNT}})</em></span>
          </div>
        <span class="filter-item-toggle fr" @click="_toggleMoreLen" v-if="lenFlag">
          <span>{{moreMsgLen}}</span>
          <i class="arrow-up" v-if="moreFlagLen"></i>
          <i class="arrow-down" v-if="!moreFlagLen"></i>
        </span>
        </div>
      </div>
    </div>
    <!--./filter-->
        <div class="count" v-if="TRADEMARKLIST.length != 0">
            共计搜索到<span>{{TOTALCOUNT}}</span>个符合条件的商标
        </div>
        <div class="tradetip" v-if="tipShow">搜索无结果</div>
        <div class="row list-row">
      <!--list-->
          <div class="cards">
            <ul class="list-cards clearfix" v-if="TRADEMARKLIST.length">
              <li class="col-lg-6 col-md-6 col-sm-6 col-xs-12" v-for="(item,index) in TRADEMARKLIST" @click="trademarkDetail(item.MARKCODEKEY)">
                
                <div class="li-inner">
                    <span class="type">{{item.UNIONTYPECODE}}类&nbsp;{{item.UNIONTYPE}}</span>
                   <span class="status">{{item.ISINVALID}}</span>
                    <div class="tadImg">
                    <img :src="'http://tm.bidata.com.cn/'+item.IMGNAME" alt="" :onerror="errorImg" />
                  </div>
                    <div class="tardcenter">
                      <p>申请人名称:<span class="applys" v-html="item.APPERSON"></span></p>
                      <p>商标名:<span class="name" v-html="item.MARKNAME"></span></p>
                      <p>注册号:<span>{{item.MARKCODEKEY}}</span></p>
                      <p>申请日期:<span>{{item.APPDATE}}</span></p>
                    </div>
                </div>
              </li>
            </ul>
          </div>
          <!--list-->
          <div class="page" v-if="TRADEMARKLIST.length != 0">
              <pager
                mode="event"
                :total-page="trademarkAll"
                :init-page="curPage"
                @go-page="_goTrademarkPage">
              </pager>
            </div>  
        </div>
  </div>
</template>

<script>
import Pager from '../../components/pager.vue'
export default {
  data () {
    return {
       industryVal:'',
      areaVal:'',
      statusVal:'',
      selectedArr:[],
      industrySeen:true,
      areaSeen:true,
      statusSeen:true,
      flag:false,
      areaFlag:false,
      message:'收起筛选',
      arrowFlag:true,
      seen:true,
      moreMsg:'更多',
      isMore:false,
      moreFlag:true,
      moreMsgStatus:'更多',
      isMoreStatus:false,
      moreFlagStatus:true,
      lenFlag:false,
      moreMsgLen:'更多',
      moreFlagLen:true,
      isMoreLen:false,
      industry:[],//国际分类
      limitNum:6,
      area:[],//状态
      limitAreaNum:6,
      status:[],//长度
      limitLenNum:10,
      errorImg:'this.src="' + require('../../assets/errorImg.png') + '"',
      entName: '',
      TRADEMARKLIST:[],
      showhide:false,
      TOTALCOUNT:0,
      trademarkAll:0,
      curPage: 1,
      pagesize:10,
      uniontypecode:'',//国际分类code
      isivnalidcode:'',//是否有效code
      marknamelencode:'',//长度code
      tipShow:false,
    }
  },
  components:{
    Pager
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
    },
    filterLenList(){
        if(this.status){
            return this.status.slice(0,this.limitLenNum);
        }
    }
  },
  mounted(){
    this.zquery();
  },
  methods:{

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
        this.limitNum = 6;

      }
      this.isMore = !this.isMore;
    },
    _toggleMoreArea(){

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
    _toggleMoreLen(){
        if(this.isMoreLen == false){
            this.moreMsgLen = "收起";
            this.moreFlagLen = false;
            this.limitLenNum = this.status.length;
        }
        if(this.isMoreLen == true){
            this.moreMsgLen = "更多";
            this.moreFlagLen = true;
            this.limitLenNum = 10;
        }
        this.isMoreLen = !this.isMoreLen;
    },
    _goTrademarkPage(data){
        this.curPage = data.page;
        this._getTradeMarkInfo();
    },
    zquery(){
      if(window.sessionStorage.getItem('tradMkName')){
        this.entName = window.sessionStorage.getItem('tradMkName')
        this._getTradeMarkInfo()
      }
    },
    trademarkDetail(code){
        sessionStorage.setItem('tradMkName',this.entName);
        this.$router.push({ name: '商标详情', params: { code: code}})
    },
    _getTradeMarkInfo(){
        this.tipShow = false;
      //console.log(this.entName)
        if(this.entName == ''){
          this.showhide = true
          this.TRADEMARKLIST = null
          this.TOTALCOUNT = 0;
        }else{
          this.showhide = false
          this.axios.get(this.api.entBase+'/trademark/list?key='+ encodeURIComponent(this.entName)+"&mask=1000000"+"&page="+this.curPage+"&size="+this.pagesize+"&enableAggregate=true"+"&uniontypecode="+encodeURIComponent(this.uniontypecode)+"&isinvalidcode="+encodeURIComponent(this.isivnalidcode)+"&marknamelen="+encodeURIComponent(this.statusVal)+"&highlight=true").then((res)=>{
          this.TRADEMARKLIST = res.data.TRADEMARKLIST;
          if(res.data.TRADEMARKLIST.length === 0){
                this.tipShow = true;
          }else{
              if(res.data.TOTALCOUNT >=1000){
                  this.TOTALCOUNT = res.data.TOTALCOUNT + '+'
              }else{
                  this.TOTALCOUNT = res.data.TOTALCOUNT
              }
              this.industry = res.data.UNIONTYPECOUNT; //国际分类
              this.area = res.data.ISINVALIDCOUNT;    //状态
              this.status = res.data.MARKNAMELENCOUNT; //长度
              console.log(this.industry.length);
              if(this.industry.length > this.limitNum){
                  this.flag = true;
                  console.log(this.flag);
              }else{
                  console.log(this.industry.length);
                  this.flag = false;
                  console.log("0")
              }
              if(this.area.length > this.limitAreaNum){
                  this.areaFlag = true;
                  console.log(this.areaFlag);
              }else{
                  this.areaFlag = false;
                  console.log("1")
              }
              console.log(this.status.length);
              if(this.status.length > this.limitLenNum){
                  console.log(this.lenFlag);
                  this.lenFlag = true;
              }else{
                  this.lenFlag = false;
                  console.log("2")
              }
              this.trademarkAll = Math.ceil(res.data.TOTALCOUNT/this.pagesize);
              //console.log(this.trademarkAll)
          }



        }).catch(err => {
            console.log(err);
        })
        }
        
      },
      //国际
      _industryClick(index){
          //console.log(this.industry[index].INDUSTRY);
          // this.$refs.filterItem.style.display="none";
          this.industrySeen = false;
          this.curPage = 1;
          var industryObj = {'value':'','code':''};
          this.industryVal = this.industry[index].UNIONTYPE;
          this.uniontypecode = this.industry[index].UNIONTYPECODE;
          //console.log(this.industryVal);
          industryObj.value = this.industryVal;
          industryObj.code = this.uniontypecode;
          this.selectedArr.push(industryObj);
          console.log(this.selectedArr);
          if(this.selectedArr.length == 3){
              this.seen = false;
          }else{
              this.seen = true;
          }
          this._getTradeMarkInfo();
          console.log(this.selectedArr);
          return this.selectedArr;

      },
      //状态
      _areaClick(index){
          //this.$refs.filterItemArea.style.display="none";
          this.areaSeen = false;
          this.curPage = 1;
          var areaObj = {'value':'','code':''};
          this.areaVal = this.area[index].ISINVALID;
          this.isivnalidcode = this.area[index].ISINVALIDCODE;
          //console.log(this.areaVal);
          areaObj.value = this.areaVal;
          areaObj.code = this.isivnalidcode;
          this.selectedArr.push(areaObj);

          if(this.selectedArr.length == 3){
              this.seen = false;
          }else{
              this.seen = true;
          }
          console.log(this.selectedArr);
          this._getTradeMarkInfo();
          return this.selectedArr;
      },
      //字数
      _statusClick(index){
          this.statusSeen = false;
          this.curPage = 1;
          var statusObj = {'value':'','code':''};
          this.statusVal = this.status[index].MARKNAMELEN;
          this.marknamelencode = '';
          statusObj.value = this.statusVal;
          statusObj.code = this.marknamelencode;
          this.selectedArr.push(statusObj);

          if(this.selectedArr.length == 3){
              this.seen = false;
          }else{
              this.seen = true;
          }
          console.log(this.selectedArr);
          this._getTradeMarkInfo();
          return this.selectedArr;
      },
      _tabClick(e,index){
          var currentDom = e.currentTarget;
          console.log(currentDom);
          $(currentDom).remove();
          this.curPage = 1;
          this.seen = true;

          if(this.selectedArr[index].code == this.uniontypecode && this.selectedArr[index].value == this.industryVal){
              this.industryVal = "";
              this.uniontypecode = "";
              this.selectedArr.splice(index,1);
              this.industrySeen = true;
//              this._getTradeMarkInfo();
          }else if(this.selectedArr[index].code == this.isivnalidcode && this.selectedArr[index].value == this.areaVal){
              this.isivnalidcode = "";
              this.areaVal = "";
              this.selectedArr.splice(index,1);
              this.areaSeen = true;
              console.log(this.areaSeen);
//              this._getTradeMarkInfo();
          }else if(this.selectedArr[index].value == this.statusVal && this.selectedArr[index].code == this.marknamelencode){
              //console.log("进来了")
              this.statusVal = "";
              this.marknamelencode = "";
              this.selectedArr.splice(index,1);
              this.statusSeen = true;
              //console.log(this.statusSeen);
//              this._getTradeMarkInfo();
          }
          console.log(this.selectedArr);
          this._getTradeMarkInfo();
      },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.trademark .count{
    padding:20px 0;
    color: #95A5A6;
  }
.trademark .count span{
    color: #E43A45;
  }
.trademark .tadImg{
  width: 120px;
  overflow: hidden;
  position: relative;
}
.trademark .tadImg img{
  display: block;
  width: 100%;
  position: absolute;
    top: 50%;
  transform: translateY(-50%);
 }
.panel{
  display: flex;
      margin-bottom: 20px;
    background-color: #fff;
    width: 40%;
    float: left;
    margin-left: 10%;
    border: 1px solid transparent;
    border-radius: 4px;
    -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, .05);
    box-shadow: 0 1px 1px rgba(0, 0, 0, .05);
}
.center{
  width: 100%;
}
.trademark .tip{
      height: 60px;
    line-height: 60px;
    background-color: rgba(255,255,255,1);
    border-left: 3px solid #36c6d3;
    margin-top: 10px;
    padding-left: 10px;
}
.trademark .ser{
    position: relative;
  }
.trademark .search-box{
    height:38px;
    -webkit-border-radius:3px 0 0 3px;
    -moz-border-radius:3px 0 0 3px;
    border-radius:3px 0 0 3px;
    margin-right:40px;
  }
.trademark .ser-btn{
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
.trademark .ser-btn .icon-ser{
    position: absolute;
    left:12px;
    top:9px;
    width:16px;
    height: 16px;
    background: url(../../assets/search_icon.png) no-repeat;
  }
.trademark .search-box input[type="text"]{
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
.trademark .tardDetai{
    margin-left: 20px;
        margin-top: 44px;
  }
.trademark .tardDetai p{
    margin-top: 5px;
  }
.trademark .cards{
    min-height: 320px;
    position: relative;
  }
.trademark .list-loading{
    position: absolute;
    left:50%;
    top:50%;
    margin:-6px 0 0 -40px;
  }
.trademark .row{
    margin-top:-10px;
    padding-bottom: 30px;
  }
.trademark .list-cards li{
    height: 185px;
    margin-top: 20px;
    position: relative;
  }
.trademark .sqName{
    position: absolute;
    left: 50px;
    bottom: 20px;
  }
.trademark .list-cards  .li-inner{
    height: 100%;
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
    display: flex;
  }
.trademark .list-cards .li-inner .name{
    font-size:16px;
    font-weight:bold;
    margin-bottom:28px;
    max-width: 80%;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
.trademark .list-cards .li-inner p{
    margin: 0px !important;
    padding: 0px !important;
    margin-bottom:16px !important;
  }
.trademark .list-cards .li-inner p:last-child{
    margin-bottom:0;
  }
.trademark .list-cards .li-inner .status,.trademark .list-cards .li-inner .type{
    position: absolute;
    top:-5px;
    right:10px;
    padding:10px 5px;
    min-width:80px;
    background: #3BD2A2;
    text-align: center;
    box-shadow: 0 5px 10px 0 rgba(0,0,0,0.10);
    font-size:12px;
    color: #fff;
  }
.trademark .list-cards .li-inner .type{
    background: #4AA6FF;
    right:100px;
}
.trademark .tardcenter{
        margin-top: 15px;
    margin-left: 20px;
  }

.trademark .filter{
    background-color: #fff;
    box-shadow: 0 2px 5px 0 rgba(0,0,0,0.05);
    margin-top:20px;
  }
.trademark .filter-hd{
    padding:0 25px;
    height:56px;
    line-height:56px;
  }
.trademark .filter-tit{
    font-size:16px;
    width: 120px;
  }
.trademark .filter-toggle{
    color: #a0a0a0;
    cursor: pointer;
  }
.trademark .filter-toggle span{
    margin-right:8px;
  }
.trademark .filter-toggle .arrow-down,.trademark .filter-item-toggle .arrow-down{
    display:inline-block;
    position: relative;
    top: 1px;
    left: -3px;
    width:14px;
    height: 14px;
    background:url(../../assets/turn_icon.png) no-repeat center center;
  }
.trademark .filter-toggle .arrow-up,.trademark .filter-item-toggle .arrow-up{
    display:inline-block;
    position: relative;
    top: 1px;
    left: -3px;
    width:14px;
    height: 14px;
    background:url(../../assets/open_icon.png) no-repeat center center;
  }
.trademark .filter-bd{
    margin: 0 25px 0 25px;
    padding-bottom:20px;
    border-top: 1px solid #e6e6e6;
    padding-top:30px;
  }
.trademark .filter-item{
    line-height: 36px;
    overflow: hidden;
    position: relative;
    /*margin-right:100px;*/
  }
.trademark .filter-item-tit{
    width:90px;
    color: #a0a0a0;
    position: absolute;
    left:0;
    top:0;
  }
.trademark .filter-item-toggle {
    width: 100px;
    color: #a0a0a0;
    cursor: pointer;
    text-align: right;
    position: absolute;
    top:0;
    right:0;
  }
.trademark .filter-item-toggle span{
    margin-right:8px;
  }
.trademark .filter-item-cont {
    overflow: hidden;
    /*max-width:900px;*/
    padding:0 100px;
  }
.trademark .filter-item-base {
    display: block;
    color: #323232;
  }
.trademark .filter-item-base em{
    color: #4AA6FF;
  }
.trademark .filter-item-cont span {
    float: left;
    cursor: pointer;
    margin-right: 16px;
    color: #323232;
  }
.trademark .filter-item-base:hover{
    color: #000;
  }
.trademark .filter-selected{
    float: left;
}
.trademark .filter-selected span{
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
.trademark .filter-selected span:hover{
    background-position:right -15px;
}
.trademark strong{
    color: #E43A45 !important;
    font-weight:bold !important;
}
.tradetip{
    height: 60px;
    line-height: 60px;
    background-color: rgba(255,255,255,1);
    border-left: 3px solid #36c6d3;
    margin-top: 10px;
    padding-left: 10px;
}
</style>
