<template>
  <div class="single-guy">
      <h3 class="addmonitor-title">风铃添加监控查询</h3>
      <div class="search-section" >
        <div class="input-search">
          <input type="text" id="s-query-text" placeholder="输入企业名称/注册号" v-model="queryParams.keyword" 
          @keyup="blurSearchInput($event)" />
        </div>
      </div>  
      <div class="match-enterprise-wrap" >
          <div class="match-enterprise-top">
              <div class="match-right-btn">
                  <button class="export-excel-btn"  type="button" @click="putToMonitorDouble()">批量添加</button>
              </div>
          </div>
          <div class="match-enterprise">
              <table class="table">
                <tbody id="s-selected-custs-panel">
                  <tr v-for="row in waitEnterprise" :ename="row.entname" :code="row.pripid" :objectType="row.type" :regno ="row.regno" :creditcode = "row.creditcode"  :areacode = "row.areacode">
                    <td>
                      <input type="checkbox" disabled="row.hasMonitor"  v-if="row.hasMonitor">
                      <input type="checkbox" checked="true" v-if="!row.hasMonitor">
                    </td>
                    <td @click="goDetail(row.pripid,row.entname,row.creditcode,row.regno)">
                     <!--  -->
                      <h4>{{row.entname}} </h4>
                      <p>{{row.name}} {{row.dom}}</p> 
                    </td>
                    <td>
                      <span v-if="row.hasMonitor">已添加</span>
                      <i v-if="!row.hasMonitor" class="one-addMonitor" @click ="putToMonitorSingle(row)"></i>
                    </td>
                  </tr>
                </tbody>
              </table>
          </div>
      </div>
      <div id="littleEnter" class="little-enter" v-show="matchSectionWrap">
          <div style="position: absolute; top: 0px; width: 100%; background-color: rgb(247, 247, 247);">
              <div class="c-custlist-item" v-for="(row,index) in matchedEnter"  @click="enterMonitorTable(row)" :class="{ccustlistitemhover:matchItemIndex == index+1}"  @mouseover="changeMatchItemIndex(index)">
                  <div style="width:100%;float:left;">
                      <span class="entNameHttp">{{row.entname}}</span>
                      <p style="margin-top: 4px;">
                          <span >{{row.name}}</span>
                          <span> {{row.dom}}</span>
                      </p>
                  </div>
                  <div class="c-add-cust-btn" style="width:45px;float:right;"></div>
              </div>
              <div v-if="matchNoResult " style=" padding: 6px 20px;">目标企业不存在</div>
              <a class='searchGt' v-if="searchGt" style='float: right;margin-right:24px; height: 28px; width: 100px; line-height: 28px; text-decoration: underline; background: #7fb6f0; text-align: center; color: #fff;' @click="searchGtEnt()">查个体</a>
          </div>

          <div class="loadding-search" v-show="loadding">加载中...</div>
          <div class="emptyMatchEnt red" v-if="emptyMatchEnt" > 名称不能为空</div>
          
      </div>

      <div class="sure-layer" v-if ="surePutToMonitorBool"></div>
      <div class="sure-section" v-if ="surePutToMonitorBool">
          <h3>添加</h3>
          <span class="note">*不选择订单策略将自动选为默认策略</span>
          
          <div class="select" v-if ="policyList.length > 0">
              <div class="select-selected">
                 <span>
                      选择策略分组
                 </span> 
                 <i></i>
              </div>
              <div class="policydetailwrap">
                  <ul>
                      <li  @click="selectPolicy()">默认策略 </li>
                      <li v-for="row in policyList"  @click="selectPolicy(row)">{{row.name}}</li>
                  </ul>
                  <!-- <div class="policyDetail"> 
                      <a target="_blank" @click="policyDetail()"></a>
                      <a  target="_blank" @click="policyDetail(row)" v-for="row in policyList">编辑</a> 
                  </div> -->
              </div>
          </div>
          <div class="btn-section">
              <button class="cancel" @click="cancelMonitor()">取消</button>
              <button class="sure" @click="putToMonitorAjax()">确认</button>
          </div>
      </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        queryParams:{},
        waitEnterprise:[],
        selectedPripid: null,
        selectedEntName: null,
        loadding: false,
        emptyMatchEnt: false,
        searchGt: false,
        matchSectionWrap: true,
        entListTable: false,
        matchedEnter: [],
        surePutToMonitorBool: false, //添加监控弹框是否显示
        sureMonitorIsSingeOrDouble: "",
        policyId: 0,
        policyList: [],
        matchNoResult: false,
        matchSectionWrap:[],
        addMonitorSingleId:{},
        matchItemIndex:1,
        searchTimer:null
      }
    },
    methods:{
      //模糊匹配结果  
      blurSearchInput(ev){
        
        if(ev.keyCode == 38){
          this.matchItemIndex--;
          if(this.matchItemIndex == 0){
            this.matchItemIndex = this.matchedEnter.length;
          }
        }else if(ev.keyCode == 40){
          this.matchItemIndex++;
          if(this.matchItemIndex == this.matchedEnter.length+1){
            this.matchItemIndex = 1;
          }
        }else if(ev.keyCode == 13){
          // this.queryParams.keyword = this.matchedEnter[this.matchItemIndex-1].entname;
          // setTimeout(()=>{
          //   // this.goContactListBysearch(this.matchedEnter[this.matchItemIndex-1]);
          //   // this.matchedEnter = [];
          // },100);

        }else{
          clearTimeout(this.searchTimer);
          this.searchTimer = setTimeout(()=>{
            this.matchItemIndex = 1;
            if(this.queryParams.keyword && this.queryParams.keyword.length >2){
              var noChar = this.check_special_characters(this.queryParams.keyword);
              if(noChar){
                setTimeout(function(){
                  window.swal({
                     title: "提示",
                     text: "目标企业不存在",
                     type: "info",
                     showCancelButton: false,
                     confirmButtonColor: "#DD6B55",
                     confirmButtonText: "确认",
                     cancelButtonText: "取消",
                     closeOnConfirm: true,
                     closeOnCancel: true
                  });
                },30);
                return;
              }else{
                var condition = {
                  "keyword": encodeURI(this.queryParams.keyword),
                };
                
                this.loadding = true;
                this.emptyMatchEnt = false;
                this.matchedEnter = [];
                this.matchSectionWrap = true;
                this.searchGt = false;

                if(this.queryParams.keyword == "" || !this.queryParams.keyword){
                  this.emptyMatchEnt = true;
                  this.searchGt = false;
                  this.loadding = false;
                  $("#s-query-text").blur();
                }else{
                  this.matchNoResult = false; 
                  var reg = /^\d{5,}$/;
                  if(reg.test(this.queryParams.keyword)){

                    this.$getData(this.api.fl_queryEnterprisesByRegNo,condition,(response)=>{
                      this.searchEnterKind(response);
                    },function(){
                      this.loadding = false;
                    });
                   
                  }else{

                    this.$getData(this.api.fl_queryEnterprises,condition,(response)=>{
                      this.searchEnterKind(response,"GT");
                    },function(){
                      this.loadding = false;
                    });
                   
                  }
                }
              }

            }

          },500);
        }

      },
      changeMatchItemIndex: function(index){
        this.matchItemIndex = index + 1;
      },
      check_special_characters(str){
        var pattern = new RegExp("！|!");
        if(pattern.test(str)){
            var ss = '输入数据有误!';
            console.log("输入数据有误!");
            return true;
        }
        return false;
      },
      //检索结果去重
      abandonSame(row,arr){
        for(var i=0;i<arr.length;i++){
          if(row.pripid == arr[i].pripid){
            return true;
          }
        }
        return false;
      },
      // 模糊查询完结果处理
      searchEnterKind(response,gt){
        if(response.success){
          this.matchedEnter =  response.result;
          if(this.matchedEnter.length == 0){
            this.matchNoResult = true;
          }
          this.loadding = false;
          if(gt){
            this.searchGt = true;
          }else{
            this.searchGt = false;
          }
        }else{
          window.swal({
             title: "提示",
             text: "目标企业不存在",
             type: "info",
             showCancelButton: false,
             confirmButtonColor: "#DD6B55",
             confirmButtonText: "确认",
             cancelButtonText: "取消",
             closeOnConfirm: true,
             closeOnCancel: true
          });
        }
      },
      //查个体
      searchGtEnt(){
        var condition = {
          "keyword": encodeURI(this.queryParams.keyword),
        };
        this.matchNoResult = false;
        this.matchItemIndex = 1;
        this.loadding = true;
        this.matchedEnter = [];
        $("#s-query-text").focus();
        this.$getData(this.api.fl_queryEnterprisesGT,condition,(response)=>{
          this.searchEnterKind(response);
        });
      },
      // 模糊匹配点开的结果  
      enterMonitorTable(item){
        // 判断有没有某一项 如果有提示已打开
        void 0;
        var samePrid = this.abandonSame(item,this.waitEnterprise);

        if(!samePrid){
          this.matchedEnter = [];

          this.$getData(this.api.fl_isMonitorEnter,{"pripid" : item.pripid},(result)=>{

            this.matchSectionWrap = false;
            
            if(result.hasMonitor){
              item.hasMonitor = true;
            }else{
              item.hasMonitor = false;
            }

            this.waitEnterprise.unshift(item);

            $(".single-guy").addClass("add-match-enter-search");
            $(".single-guy .search-section").addClass("match-left-search");
            $(".single-guy .add-monitor-main").hide();
            $(".single-guy .match-enterprise-wrap").show();
          });

        }else{
          window.swal({
             title: "确认",
             text: "该企业已存在",
             type: "info",
             showCancelButton: false,
             confirmButtonColor: "#DD6B55",
             confirmButtonText: "确认",
             cancelButtonText: "取消",
             closeOnConfirm: true,
             closeOnCancel: true
          });
        }

      },
      //单个添加监控
      putToMonitorSingle(row){
        // _this.policyId = 0;
        this.sureMonitorIsSingeOrDouble = "single";

        $(".single-guy .sure-section .select-selected span ").html("选择订单策略");
        
        
        this.$getData(this.api.fl_isMonitorEnter,{"pripid" : row.pripid},(data)=>{
          if(data.isExist){
            window.swal({
               title: "确认",
               text: "你已添加",
               type: "info",
               showCancelButton: false,
               confirmButtonColor: "#DD6B55",
               confirmButtonText: "确认",
               cancelButtonText: "取消",
               closeOnConfirm: true,
               closeOnCancel: true
             });
          }else{
            if(this.policyList.length>0){
              this.surePutToMonitorBool = true;
              setTimeout(()=>{
                this.mySelect(".select");

                var condition = {
                  "name" : row.entname,
                  "policyId":this.policyId,
                }
                if(!row.entname){
                  condition.name = row.regno;
                }
                if(!row.entname && !row.regno){
                  condition.name = row.creditcode;
                }
                // ,
                //   "objectType":row.type,
                //   "policyId":_this.policyId,
                //   "regNo":row.regno,
                //   "creditCode":row.creditcode,
                //   "areaCode":row.areacode,
                this.addMonitorSingleId = condition;
              },60);
            }else{
              window.swal({
                title: "确认",
                text: "确认添加监控吗？",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "确认",
                cancelButtonText: "取消",
                closeOnConfirm: true,
                closeOnCancel: true
              },(confirm)=>{
                if(confirm){
                  var condition = {
                  "name" : row.entname,
                  "policyId":this.policyId,
                  }
                  if(!row.entname){
                    condition.name = row.regno;
                  }
                  if(!row.entname && !row.regno){
                    condition.name = row.creditcode;
                  }
                  this.addMonitorSingleId = condition;
                  this.putToMonitorAjax();
                }
              });
            }
            
            
          }
        });
      },
      // 多个添加监控
      putToMonitorDouble(){
        // _this.policyId = 0;
        $(".single-guy .sure-section .select-selected span ").html("选择订单策略");
        this.sureMonitorIsSingeOrDouble = "double";
        this.mySelect(".select");

        var exportEnterCheck = $(".single-guy .match-enterprise input[type='checkbox']:checked");
        if(exportEnterCheck.length == 0){
          window.swal({
            title: "确认",
            text: "添加企业不能为空",
            type: "warning",
            showCancelButton: false,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "确认",
            cancelButtonText: "取消",
            closeOnConfirm: true,
            closeOnCancel: true
          });
          return;
        }

        if(this.policyList.length>0){
          this.surePutToMonitorBool = true;
          setTimeout(()=>{
            this.mySelect(".select");
          },60);
        }else{
          window.swal({
            title: "确认",
            text: "确认添加监控吗？",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "确认",
            cancelButtonText: "取消",
            closeOnConfirm: true,
            closeOnCancel: true
          },(confirm)=>{
            if(confirm){
              this.putToMonitorAjax();
            }
          });
        }
      },
      putToMonitorAjax(){
        if(this.sureMonitorIsSingeOrDouble == "single"){

          var tempwaitEnterprise = this.waitEnterprise;
          this.addMonitorSingleId.policyId = this.policyId;
          var condition = JSON.stringify(this.addMonitorSingleId);
          this.$post(this.api.fl_putToMonitorListSingle,condition,(result)=>{
            this.surePutToMonitorBool = false;
            if(result.success){
              for(var i = 0; i<tempwaitEnterprise.length;i++ ){
                if(this.addMonitorSingleId.ename == tempwaitEnterprise[i].ename ){
                  tempwaitEnterprise.splice(i,1);
                }
              }
              setTimeout(()=>{
                window.swal({
                   title: "确认",
                   text: "添加成功",
                   type: "success",
                   showCancelButton: false,
                   confirmButtonColor: "#DD6B55",
                   confirmButtonText: "确认",
                   cancelButtonText: "取消",
                   closeOnConfirm: true,
                   closeOnCancel: true
                });
              },30);

              setTimeout(()=>{
                this.waitEnterprise = tempwaitEnterprise;
                if($(".single-guy tr").length == 0){
                  $(".single-guy").removeClass("add-match-enter-search");
                  $(".search-section").removeClass("match-left-search");
                  $(".single-guy .add-monitor-main").show();
                  $(".single-guy .match-enterprise-wrap").hide();
                }
              },60);
            }else{
              window.swal({
                 title: "提示",
                 text: result.message,
                 type: "info",
                 showCancelButton: false,
                 confirmButtonColor: "#DD6B55",
                 confirmButtonText: "确认",
                 cancelButtonText: "取消",
                 closeOnConfirm: true,
                 closeOnCancel: true
              });
            }
            
          });
        }else if(this.sureMonitorIsSingeOrDouble == "double"){
          var exportEnterCheck = $(".single-guy .match-enterprise input[type='checkbox']:checked");
          var monitorArr =[];
          var eleArr = [];
          for(var i = 0; i<exportEnterCheck.length;i++){

            var ele = exportEnterCheck.eq(i).parent().parent();
            // var eleData = {name:ele.attr("ename"),pripid:ele.attr("code"),objectType: ele.attr("objectType"),policyId:_this.policyId,regNo:ele.attr("regno"),creditCode:ele.attr("creditcode"),areaCode:ele.attr("areacode")};
            var eleData;
            if(ele.attr("ename")){
              eleData = ele.attr("ename");
            }else if(ele.attr("creditcode")){
              eleData = ele.attr("creditcode");
            }else if(ele.attr("regno")){
              eleData = ele.attr("regno");
            }

            monitorArr.push(eleData);
            eleArr.push(ele);
          }

          var condition = JSON.stringify({orders:monitorArr,policyId:this.policyId});
          this.$post(this.api.fl_putToMonitorList,condition,(result)=>{
            this.surePutToMonitorBool = false;
            if(result.success){
              var tempwaitEnterprise = this.waitEnterprise;
                for(var i = 0; i<exportEnterCheck.length;i++ ){

                  for(var j =0;j<tempwaitEnterprise.length;j++ ){

                    if($(exportEnterCheck[i]).parent().parent().attr("code") == tempwaitEnterprise[j].pripid ){
                      
                      tempwaitEnterprise.splice(j,1);
                      break;
                    }
                  }
                  
                }
                
              setTimeout(function(){
                window.swal({
                   title: "确认",
                   text: "添加成功",
                   type: "success",
                   showCancelButton: false,
                   confirmButtonColor: "#DD6B55",
                   confirmButtonText: "确认",
                   cancelButtonText: "取消",
                   closeOnConfirm: true,
                   closeOnCancel: true
                }); 
                // alert("添加成功");

                this.waitEnterprise = tempwaitEnterprise;
                if($(".single-guy tr").length == 0){
                  $(".single-guy").removeClass("add-match-enter-search");
                  $(".search-section").removeClass("match-left-search");
                    
                  $(".single-guy .add-monitor-main").show();
                  $(".single-guy .match-enterprise-wrap").hide();
                }
              },30);
            }else{
              window.swal({
                 title: "提示",
                 text: result.message,
                 type: "info",
                 showCancelButton: false,
                 confirmButtonColor: "#DD6B55",
                 confirmButtonText: "确认",
                 cancelButtonText: "取消",
                 closeOnConfirm: true,
                 closeOnCancel: true
              });
            }
          });
        }
        
      },
      cancelMonitor(){
        this.surePutToMonitorBool = false;
      },
      selectPolicy: function(row){
        if(row){
          this.policyId = row.id;
        }else{
          this.policyId = 0;
        }
      },
      //跳转详情页
      goDetail(entid,entname,creditcode,regno){
        this.$router.push({ name: '详情', params: { entid: entid},query:{entname:entname,creditcode:creditcode,regno:regno,state:"fengling"}});
      },
    },
    mounted:function(){
      // 获取策略列表
      this.$get(this.api.fl_policy_name_list,(result)=>{
        if(result.success){
          this.policyList = result.data;
        }
      });

      var locataionH= window.location.href;
      var n= locataionH.indexOf('#/');
      var pathHref= locataionH.substring(n);
      // console.log(pathHref);
      //传到index页面 
      sessionStorage.setItem('addMonitor',pathHref);
      
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  /*----------------添加监控------------*/
 
  .addmonitor-title{
    margin-top:150px;
    margin-bottom:0;
    padding-bottom: 38.25px;
    color: #666;
    font-size: 38px;
    font-family: "microsoft yahei";
    font-weight: 400;
    text-align: center;
  }
  .single-guy{
      position: relative;
      background: #fff;
      min-height: 580px;
      border-top: 2px solid #6d9add;
      line-height: 1;
      .c-query-text{
          height:30px;
          width:400px;
          line-height: 30px;
          padding-left:10px;
          padding-right:10px;
          border:#aaa solid 1px;
          color:#ccc;
          font-style: italic;
      }
      .c-query-text-unempty{
          font-style: normal;
          color:#000;
          background: #fff;
      }
      font{
          line-height: 36px;
          padding-left:10px;
          height:36px;
      }
      .c-custlist-item{
          // line-height: 36px;
          border-bottom: #eee solid 1px;
          cursor: pointer;
          padding:6px 36px;
          height:52px;

          i{
             padding:8px;
          }
          p{
              font-size:12px;
              color:#666;
              margin:0;
          }
      }
      .ccustlistitemhover{
          background-color: #00AEFF;
          color: #fff;
          p{
              color:#fff;
          }
      }
      .c-add-cust-btn{
          color:#00AEFF;
      }
      .ccustlistitemhover .c-add-cust-btn{
          color:#fff;
      }
      
      .c-delete-cust-btn{
          background-color: #ff0000;
          text-align: center;
          cursor: pointer;
      }
      
      .c-checked-item{
          background-color: #8BC34A;
          color: #fff;
          margin-top:3px;
          padding-left:10px;
          line-height: 25px;
          font-size: 12px;
      }
      #littleEnter{
          width:78%;
          position:absolute;
          top:320px;
          left:11%;
          z-index:1000;
          .emptyMatchEnt{
              line-height:28px;
              padding-left:20px;
              color:rgb(255, 0, 0);
              background:rgb(247, 247, 247);
          }
          .loadding-search{
              line-height:28px;
              padding-left:20px;
              background:rgb(247, 247, 247);
          }
      }
      &.add-match-enter-search{
          .addmonitor-title{
            margin-top: 40px;
          }
          #littleEnter{
              width:500px;
              position:absolute;
              top: 164px;
              left: 56px;
              z-index:1000;
          }
      }
      .mon-ion{
          text-align:center;
          img{
              width:113px;
          }
      }
      .search-section{
          width:78%;
          height:80px;
          margin:auto;
          margin-top:20px;
          padding:15px 15px;
          .input-search{
              width:100%;
              height:50px;
              border:1px solid #6d9add;
              padding-left:52px;
              background:#fff url("/static/images/fengling/icon-monitoring-search.png") no-repeat 0 center;
              input{
                  width:100%;
                  height:26px;
                  margin-top:12px;
                  line-height:26px;
                  border:none;
                  outline: none;
                  border-left:1px solid #6d9add;
                  font-size:14px;
                  font-family: "宋体";
                  color:#999;
                  text-indent:14px;
              }
          }
      }
      .match-left-search{
          position:absolute;
          width:600px;
          height:30px;
          margin-top:0;
          padding:0;
          padding-left:5%;
          padding-top:15px;
          background:none;
          z-index:1001;
          .input-search{
              width:100%;
              height:30px;
              border:none;
              padding-left:0;
              background:none;
              input{
                  width:500px;
                  height:30px;
                  margin-top:0;
                  border:none;
                  line-height:30px;
                  padding-left:28px;
                  background:#F0F3F7 url("/static/images/fengling/icon-search.png") no-repeat 2px center;
                  font-size:14px;
                  font-family: "宋体";
                  color:#999;
              }
          }
          
      }
      .add-monitor-main{
          position:relative;
          width:78%;
          margin:auto;
         
          .relation-section{
              .relation-left,.relation-right{
                  width:48%;
                  margin-top:55px;
                  h3{
                      position:relative;
                      text-align:center;
                      font-family: 'Hiragino Sans GB' ,'microsoft yahei';
                      font-size:16px;
                      color:#7fb6f0;
                      em{
                          position:absolute;
                          top:50%;
                          left:0;
                          width:100%;
                          height:0;
                          border-top:1px solid #6d9add;
                          z-index:1;
                      }
                      span{
                          display: inline-block;
                          width:94px;
                          background:#fff;
                          position:relative;
                          // left:50%;
                          // margin-left:-52px;
                          z-index:2;
                      }
                  }
                  ul{
                     width:100%; 
                     height:auto;
                     margin-top:15px;
                      li{
                          float: left;
                          width:50%;
                          padding:0px 15px;
                          line-height:24px;
                          font-family: "宋体";
                          color:#999;
                          font-size:12px;
                          text-overflow: ellipsis;
                          white-space: nowrap;
                          overflow: hidden;
                      }
                  }
                  .loading-hot-industry{
                      margin-top:40px;
                      text-align:center;
                      color:#999;
                      font-size:12px;
                  }
              }
              .relation-right{
                  .delete-hot-enterprise{
                      text-align:center;
                      span{
                          display: inline-block;
                          margin-top:20px;
                          line-height:24px;
                          color:#999;
                          font-family: "宋体";
                          font-size:12px;
                          padding-left:30px;
                          background:#fff url("/static/images/fengling/icon-delete-normal.png") no-repeat 0 center;
                          cursor:pointer;
                      }
                  }
              }
          }
      }

      
      .some-exportbtn{
           display: none;
           .some-export{
              position:absolute;
              top:25px;
              right:5%;
              background: #00baff;
              color:#fff;
              &:hover{
                  background: #0094cb;
              }
          }
      }
      .match-enterprise-wrap{
          display: none;
          .match-enterprise-top{
              position: relative;
              width:100%;
              height:60px;
              padding:15px 80px;
              border-bottom:1px solid #ddd;
              .match-left-search{
                  width:600px;
                  height:30px;
                  input{
                      width:500px;
                      height:30px;
                      padding-left:40px;
                      background:#f0f0f0 url("/static/images/fengling/icon-search.png") no-repeat 2px center;
                      font-size:14px;
                      color:#999;

                  }
              }
              .match-right-btn{
                  width:100%;
                  button{
                      position:absolute;
                      top:15px;
                      right:5%;
                      width:120px;
                      height:30px;
                      line-height:28px;
                      background:#7fb6f0;
                      &:hover{
                          background-color:#6d9add;
                      }
                  }
              }
          }
          .match-enterprise{
              width:100%;
              padding: 24px 5%;
              table{
                  tr{
                      width:100%;
                      height:65px;
                      cursor: pointer;
                      
                      &:nth-of-type(odd){
                          background-color:#f8f8f8;
                      }
                      &:nth-of-type(even){
                          background-color:#fff;
                      }
                      &:hover{
                          background: #eaf3fc;
                      }
                      td{
                          text-align: left;
                          border:none;
                          &:nth-of-type(1){
                              width:54px;
                              text-align: center;
                          }
                          &:nth-of-type(2){
                              padding:10px 6px;
                              h4{
                                  margin:0;
                                  font-size: 14px;
                                  line-height: 24px;
                                  font-family: "宋体";
                                  color:#333;
                              }
                              p{
                                  margin:0;
                                  font-size: 12px;
                                  line-height: 24px;
                                  color:#333;
                              }

                          }
                          &:nth-of-type(3){
                              width:100px;
                              text-align:center;
                              i{
                                  padding:18px;
                                  background:url("/static/images/fengling/icon-add-monitor.png") no-repeat 0 center;
                                  background-size: 28px;
                              }
                              span{
                                  color: #888;
                                  font-size: 14px;
                              }
                          }
                         
                          
                      }
                  }
              }
          }
      }
  }

  @media screen and (min-width:1500px){
      .single-guy{
        .addmonitor-title{
          margin-top:250px;
        }
        #littleEnter{
          top: 424px;
        }
        &.add-match-enter-search{
          #littleEnter{
            left:76px;
          }
        }
        min-height:740px;
          .two-menu{
              .row{
                  margin:0;
              }
              .right-con{
                  #littleEnter{
                      width:78%;
                      position:absolute;
                      top:228px;
                      left:11%;
                      z-index:1000;
                  }
                  &.add-match-enter-search{
                      #littleEnter{
                          width:500px;
                          position:absolute;
                          top:45px;
                          left:80px;
                          z-index:1000;
                      }
                  }
                  .mon-ion{
                      text-align:center;
                      img{
                          width:113px;
                      }
                  }
                  .search-section{
                      width:78%;
                      height:80px;
                      padding:15px 15px;
                      background:#eaf3fc;
                      .input-search{
                          width:100%;
                          height:50px;
                          border:1px solid #6d9add;
                          padding-left:52px;
                          background:#fff url("/static/images/fengling/icon-monitoring-search.png") no-repeat 0 center;
                          input{
                              width:100%;
                              height:26px;
                              margin-top:12px;
                              line-height:26px;
                              border:none;
                              outline: none;
                              border-left:1px solid #6d9add;
                              font-size:14px;
                              font-family: "宋体";
                              color:#999;
                              text-indent:14px;
                          }
                      }
                  }
                  .match-left-search{
                      position:absolute;
                      width:600px;
                      height:30px;
                      margin-top:0;
                      padding:0;
                      padding-left:5%;
                      padding-top:15px;
                      background:none;
                      z-index:1001;
                      .input-search{
                          width:100%;
                          height:30px;
                          border:none;
                          padding-left:0;
                          background:none;
                          input{
                              width:500px;
                              height:30px;
                              margin-top:0;
                              border:none;
                              line-height:30px;
                              padding-left:40px;
                              background:#f0f0f0 url("/static/images/fengling/icon-search.png") no-repeat 2px center;
                              font-size:14px;
                              font-family: "宋体";
                              color:#999;
                          }
                      }
                      
                  }
                  .add-monitor-main{
                      position:relative;
                      width:78%;
                      margin:auto;
                     
                      .relation-section{
                          .relation-left,.relation-right{
                              width:48%;
                              margin-top:55px;
                              h3{
                                  position:relative;
                                  text-align:center;
                                  font-family: 'Hiragino Sans GB' ,'microsoft yahei';
                                  font-size:16px;
                                  color:#7fb6f0;
                                  em{
                                      position:absolute;
                                      top:50%;
                                      left:0;
                                      width:100%;
                                      height:0;
                                      border-top:1px solid #6d9add;
                                      z-index:1;
                                  }
                                  span{
                                      display: inline-block;
                                      width:94px;
                                      background:#fff;
                                      position:relative;
                                      // left:50%;
                                      // margin-left:-52px;
                                      z-index:2;
                                  }
                              }
                              ul{
                                 width:100%; 
                                 height:auto;
                                 margin-top:15px;
                                  li{
                                      float: left;
                                      width:50%;
                                      padding:0px 15px;
                                      line-height:24px;
                                      font-family: "宋体";
                                      color:#999;
                                      font-size:12px;
                                      text-overflow: ellipsis;
                                      white-space: nowrap;
                                      overflow: hidden;
                                  }
                              }
                              .loading-hot-industry{
                                  margin-top:40px;
                                  text-align:center;
                                  color:#999;
                                  font-size:12px;
                              }
                          }
                          .relation-right{
                              .delete-hot-enterprise{
                                  text-align:center;
                                  span{
                                      display: inline-block;
                                      margin-top:20px;
                                      line-height:24px;
                                      color:#999;
                                      font-family: "宋体";
                                      font-size:12px;
                                      padding-left:30px;
                                      background:#fff url("/static/images/fengling/icon-delete-normal.png") no-repeat 0 center;
                                  }
                              }
                          }
                      }
                  }

                  
                  .some-exportbtn{
                       display: none;
                       .some-export{
                          position:absolute;
                          top:25px;
                          right:5%;
                          background: #00baff;
                          color:#fff;
                          &:hover{
                              background: #0094cb;
                          }
                      }
                  }
                  .match-enterprise-wrap{
                      // display: none;
                      .match-enterprise-top{
                          position: relative;
                          width:100%;
                          height:60px;
                          padding:15px 80px;
                          border-bottom:1px solid #ddd;
                          .match-left-search{
                              width:600px;
                              height:30px;
                              input{
                                  width:500px;
                                  height:30px;
                                  padding-left:40px;
                                  background:#f0f0f0 url("/static/images/fengling/icon-search.png") no-repeat 2px center;
                                  font-size:14px;
                                  color:#999;

                              }
                          }
                          .match-right-btn{
                              width:100%;
                              button{
                                  position:absolute;
                                  top:15px;
                                  right:5%;
                                  width:120px;
                                  height:30px;
                                  line-height:28px;
                                  background:#7fb6f0;
                                  &:hover{
                                      background-color:#6d9add;
                                  }
                              }
                          }
                      }
                      .match-enterprise{
                          width:100%;
                          padding: 24px 5%;
                          table{
                              tr{
                                  width:100%;
                                  height:65px;
                                  cursor: pointer;
                                  
                                  &:nth-of-type(odd){
                                      background-color:#f8f8f8;
                                  }
                                  &:nth-of-type(even){
                                      background-color:#fff;
                                  }
                                  &:hover{
                                      background: #eaf3fc;
                                  }
                                  td{
                                      text-align: left;
                                      border:none;
                                      &:nth-of-type(1){
                                          width:54px;
                                          text-align: center;
                                      }
                                      &:nth-of-type(2){
                                          padding:10px 6px;
                                          h4{
                                              margin:0;
                                              font-size: 14px;
                                              line-height: 24px;
                                              font-family: "宋体";
                                              color:#333;
                                          }
                                          p{
                                              margin:0;
                                              font-size: 12px;
                                              line-height: 24px;
                                              color:#333;
                                          }

                                      }
                                      &:nth-of-type(3){
                                          width:100px;
                                          text-align:center;
                                          i{
                                              padding:18px;
                                              background:url("/static/images/fengling/icon-add-monitor.png") no-repeat 0 center;
                                              background-size: 28px;
                                          }
                                          span{
                                              color: #888;
                                              font-size: 14px;
                                          }
                                      }
                                     
                                      
                                  }
                              }
                          }
                      }
                  }
                  
              }
          }
      }
  }
  .sure-layer{
    position:fixed;
    top:0;
    left:0;
    width:100%;
    height:100%;
    background:rgba(40,60,86,.8);
    z-index:10000;
}
.sure-section,.fixed{
    position:fixed;
    top:50%;
    left:50%;
    -ms-transform:translate(-50%,-50%);
    -moz-transform:translate(-50%,-50%);
    -webkit-transform:translate(-50%,-50%);
    -o-transform:translate(-50%,-50%);
    transform:translate(-50%,-50%);
    width:480px;
    border:8px solid #6d9add;
    background:#fff;
    z-index:10000;
    h3{
        width:100%;
        height:50px;
        padding-left:66px;
        border-bottom:1px solid #7fb6f0;
        line-height:48px;
        font-size:18px;
        background:url("/static/images/fengling/alert-info.png") no-repeat 24px center;


    }
    .note{
        position:absolute;
        top:56px;
        left:0;
        width:100%;
        font-size:12px;
        color:#c30;
        text-align:center;
    }
    .tip{
        display:block;
        margin-top:30px;
        font-size:12px;
        color:#c30;
        text-align:center;
    }
    .select,.select-after{
        position:relative;
        width:264px;
        height:30px;
        margin:auto;
        margin-top:50px;
        // margin-bottom:88px;
        cursor: pointer;
        &.select-operate-category{
            margin-top:30px;
            margin-bottom:20px;
        }
        &.select-operate-policy{
            margin-top:0;
            margin-bottom:56px;
        }
        .select-selected{
            span{
                float: left;
                width:234px;
                height:30px;
                padding:0 5px;
                line-height:30px;
                background:#6d9add;
                text-align:center;
                color:#fff;
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;
            }
            i{
                float: left;
                margin-left:1px;
                width:29px;
                height:30px;
                background:#6d9add url("/static/images/fengling/select-arrow.png") no-repeat center ;
            }
           
        }
        .policydetailwrap{
            width: 262px;
            height: 120px;
            overflow-y: scroll;
            position: absolute;
            left: 0;
            top: 31px;
            z-index:1000;
            display: none;
            border: 1px solid #6d9add;
             ul{
                width:100%;
                font-size:14px;
                background:#fff;
                z-index:1000;
                li{
                    width:100%;
                    height:30px;
                    line-height: 30px;
                    color:#333;
                    padding-left:32px;
                    padding-right:36px;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    overflow: hidden;
                    text-align:left;
                    border-bottom: 1px solid #6d9add;
                    margin-top: -1px;
                    &:hover{
                        background:#7fb6f0;
                        color:#fff;
                    }    
                }
            }
            .policyDetail{
                position:absolute;
                top:2px;
                right:16px;
                z-index:1000;
                a{
                    display: block;
                    height:30px;
                    line-height:30px;
                }

            }
        }
       
    }
    .btn-section{
        width:268px;
        margin:auto;
        margin-top:88px;
        margin-bottom:36px;
        button{
            width:122px;
            height:40px;
            background:#7fb6f0;
            font-size:14px;
            color:#fff;
            border:none;
            outline:none;
            &.cancel{
                background:#a0a0a0;
                margin-right:18px;
            }
        }
    }

}
</style>
