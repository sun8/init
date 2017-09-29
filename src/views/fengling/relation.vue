<template>
  <div class="contact-monitor">
    <h3 class="addmonitor-title">风铃添加监控查询</h3>
    <div class="search-section " >
      <div class="input-search">
        <input type="text" id="s-query-text" placeholder="输入企业名称/注册号" v-model="queryParams.keyword" @keyup="matchEnterprise($event)" />
      </div>
      <div id="littleEnter" class="little-enter">
        <div>
          <div class="c-custlist-item" v-for ="(row,index) in matchedEnter" @click="goContactListBysearch(row)" :class="{ccustlistitemhover:matchItemIndex == index+1}" @mouseover="changeMatchItemIndex(index)">
              <div>
                <span class="entNameHttp">{{row.entname}}</span>
                <p>
                  <span >{{row.name}}</span>
                  <span> {{row.dom}}</span>
                </p>
              </div>
          </div>
        </div>
       <!--  <div class="loadding" v-if="isLoading">加载中...</div>
        <div class="emptyMatchEnt red" v-if="emptyMatchEnt" > 名称不能为空</div> -->
      </div>
      </div>
      <div class="table-head clearfix">
      <div class="table-head-left">
         <div class="time-search">
           <span>创建日期：</span>
           <input class="time" type="text" v-date-time placeholder="开始日期" v-model="queryForm.startDate" readonly>
           -
           <input class="time" type="text"  v-date-time placeholder="结束日期" v-model="queryForm.endDate" readonly> 
         </div>
         <div class="search-enterprise">
           <input type="text" class=" search-name" placeholder="查询主体企业" v-model="queryForm.keyword" @keydown ="selectEnterName($event)"> 
         </div>
       </div>
       <div class="table-head-right">
          <div class="select">
           <div class="select-selected">
             <span id="changeStatusDes">
              变更状态
             </span> 
             <i></i>
           </div>
           <ul>
             <li @click="selectChangeStatus('')">全选</li>
             <li @click="selectChangeStatus(1)">有变更</li>
             <li @click="selectChangeStatus(0)">无变更</li>
           </ul>
          </div>
            <div class="select" >
             <div class="select-selected">
               <span id="monitorStatusDes">
                监控状态
               </span> 
               <i></i>
             </div>
             <ul>
                <li @click="selectMonitorStatus('')">全选</li>
                <li @click="selectMonitorStatus('ACTIVE')">监控中</li>
                  <li @click="selectMonitorStatus('INACTIVE')">已暂停</li>
             </ul>
            </div>
      </div>
    </div>
    <div class="monitor-content clearfix">
      <div class="item"  v-for ="row in tableData">
        <div class="contact-enterprise">
          <table>
            <thead>
              <tr>
                <th>
                  <a  @click='goContactListByList(row)'>监控 {{row.monitorCount }}</a>
                  <!-- | changeThreeDigit -->
                </th>
                <th>
                  <a  @click = "goContactListByChange(row)">变更 {{row.changeCount }}</a>
                  <!-- | changeThreeDigit -->
                </th>
                <th class="time">
                  <div class="select">
                      <div class="select-selected">
                       <span v-if="!row.batchDates.length">
                        变更时间
                       </span> 
                       <span v-for ="(index,item) in row.batchDates" v-if="index == 0" > {{item}}</span>
                      </div>
                      <ul v-if="row.batchDates.length">
                       <li v-for ="item in row.batchDates" @click="monitorMsgAsDate(row,row.id,item)">{{item}}</li>
                      </ul>
                      </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr class="enterprise-name">
                <td colspan ='3' >
                  <div class="enterprise-w">
                    <span class="icon" :class="{'alert-icon':row.highestLevel =='ALERT','risk-icon':row.highestLevel =='RISK','concern-icon':row.highestLevel =='CONCERN'}"></span>
                    <span class="name">{{row.name}}</span>
                  </div>
                </td>
              </tr>
              <tr class="enterprise-status" >
                <td colspan ='3' class="" :class="{'change-alert': row.highestLevel == 'ALERT','change-risk': row.highestLevel == 'RISK','change-concern':row.highestLevel == 'CONCERN'}">
                  {{row.highestLevel | contactAlertStauts }}
                </td>
              </tr>
              <tr class="enterprise-operate ">
                <td colspan ='3 '>
                  <span class="operate-monitor pause" v-if="row.monitorStatus == 'ACTIVE'" @click="pause(row)">暂停</span>
                  <span class="operate-monitor recovery" v-if="row.monitorStatus == 'INACTIVE'" @click="recovery(row)">恢复</span>
                  <span class="operate-monitor stop" @click="terminate(row)">终止</span>
                  <span class="create-time">创建于 {{row.createdAt }}</span>
                  <!-- | timeToCalendar -->
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    
    </div>
    <div class="loadding" :style="{textAlign:'center',marginBottom:'20px'}" v-if="totalList">
      <!-- <button class="btn" @click="loadListData();">点击加载更多</button> -->
      <img src="/static/images/fengling/contact/gif-loading.gif" alt="" >
    </div>
    <div :style="{textAlign:'center',lineHeight:'60px',marginBottom:'40px'}" v-if="totalPage == 0">
      无搜索结果
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      queryForm : {},
      queryParams:{},
      matchedEnter :[],
      changeStatusSelect : '',
      current : 1,
      totalList : true,
      isLoading:true,
      // emptyMatchEnt:false,
      tableData:[],
      totalPage:1,
      monitorStatusSelect:"",
      pageSizeSelect:10,
      matchItemIndex:1,
      searchTimer:null
    }
  },
  methods:{
    getListData(targetPage, pageSize){
      var condition = this.getQueryCondition(targetPage,pageSize);
      var dateSizeBool = this.getDateSize(condition.startDate,condition.endDate);
      if(!dateSizeBool){
          return; 
      }
      this.isLoading = true;
      this.$getData(this.api.fl_contact,condition,(result)=>{
          
          this.tableData = result.orderMonitorRelations;
          this.totalPage = result.totalPage;

          if(targetPage == result.totalPage || result.totalPage == 0){
            this.totalList = false;
          }
          
          this.targetPage = result.targetPage;
          $.each(this.tableData,function(i,value){
            value.currentDate = value.batchDates[0];
          })
          this.isLoading = false;
          setTimeout(()=>{
            this.mySelect(".select");
          },30);
          
      });
    },
    getQueryCondition(targetPage, pageSize) {
      this.queryForm.startDate = $(".contact-monitor .time").eq(0).val();
      this.queryForm.endDate = $(".contact-monitor .time").eq(1).val();

      var condition = this.queryForm;
      condition.isChanged = this.changeStatusSelect;
      condition.targetPage = targetPage;
      if(this.monitorStatusSelect){
        condition.monitorStatus = this.monitorStatusSelect;
      }
      return condition;
    },
    // 按变更状态筛选
    selectChangeStatus: function(row){
      
      this.changeStatusSelect = row;
      this.getListData(1,this.pageSizeSelect);
      this.queryForm.keyword = '';
    },
    // 按监控状态筛选
    selectMonitorStatus: function(row){
      this.monitorStatusSelect = row;
      this.getListData(1,this.pageSizeSelect);
      this.queryForm.keyword = '';
    },
    // 按企业名搜索
    selectEnterName: function(event){
      if(event.keyCode == 13){

        this.getListData(1,this.pageSizeSelect);
        this.changeStatusSelect = '';
        this.monitorStatusSelect = '';
        $(".contact-monitor #monitorStatusDes").html("监控状态");
        $(".contact-monitor #changeStatusDes").html("变更状态");
      }
    },
    // 进入关联监控内容列表
    goContactListByList: function(row){
      this.$router.push({
        name:"关联监控内容",
        query:{
          pripid:row.pripid,
          entname:row.name,
          state:'delete',
          type: row.objectType,
          regno: row.regNo,
          creditcode: row.creditCode,
          orderId: row.id
        }
      });
    },
    // 进入关联监控变更列表
    goContactListByChange: function(row){
      if(row.changeCount == 0){
        swal({
            title: "确认",
            text: "暂无变更数据，无法进行跳转",
            type: "info",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "确认",
            cancelButtonText: "取消",
            closeOnConfirm: false,
            closeOnCancel: true
        });
        return;
      }
      this.$router.push({
        name:"关联监控变更",
        query:{
          pripid:row.pripid,
          entname:row.name,
          type: row.objectType,
          regno: row.regNo,
          creditcode: row.creditCode,
          orderId: row.id,
          date: row.currentDate
        }
      });
    },
    // 操作：暂停监控
    pause : function(data) {
        swal({
          title: "确认",
          text: "请确认暂停监控所选企业及其关联企业?",
          type: "info",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",
          confirmButtonText: "确认",
          cancelButtonText: "取消",
          closeOnConfirm: false,
          closeOnCancel: true
        },(isConfirm)=> {
            if (isConfirm) {
              this.$put(this.api.fl_contact+"/"+data.id+"/pause",{},function(){
                data.monitorStatus = 'INACTIVE';
                swal({
                    title: "成功",
                    text: "暂停监控成功！",
                    type: "success",
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "确认",
                    closeOnConfirm: true,
                });
              });
            }
        });
    },
    // 操作：恢复监控
    recovery : function(data) {
        swal({
            title: "确认",
            text: "请确认恢复监控所选企业及其关联企业?",
            type: "info",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "确认",
            cancelButtonText: "取消",
            closeOnConfirm: false,
            closeOnCancel: true
        }, (isConfirm)=> {
            if (isConfirm) {
              this.$put(this.api.fl_contact+"/"+data.id+"/recovery",{},function(){
                // contactService.recoveryContactMonitor(data.id).success(function() {
                    data.monitorStatus = 'ACTIVE';
                    swal({
                        title: "成功",
                        text: "恢复监控成功！",
                        type: "success",
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "确认",
                        closeOnConfirm: true,
                    });
                });
            }
        });
    },
    // 操作：终止监控
    terminate : function(data) {
        swal({
            title: "确认",
            text: "请确认终止监控所选企业及其关联企业?",
            type: "info",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "确认",
            cancelButtonText: "取消",
            closeOnConfirm: false,
            closeOnCancel: true
        },(isConfirm)=> {
            if (isConfirm) {
              this.$put(this.api.fl_contact+"/"+data.id+"/terminate",{},function(){
                // contactService.terminateContactMonitor(data.id).success(function() {
                    this.getListData();
                    location.reload()
                    swal({
                        title: "成功",
                        text: "终止监控成功！",
                        type: "success",
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "确认",
                        closeOnConfirm: true,
                    });

                });

            }
        });
    },
    //按批次时间筛选
    monitorMsgAsDate : function(row,orderId,date){
      var condition = {};
      condition.orderId = orderId;
      condition.date = date;
      this.$getData(this.api.fl_contact_batchTime,condition,function(result){
        row.changeCount  = result.orderMonitorRelations.changeCount;
        row.highestLevel  = result.orderMonitorRelations.level;
        row.currentDate = date;
      });
    },
    // 加载更多
    loadListData: function(){
      this.current++;
      console.log(this.current);
      if(this.current > this.totalPage){
        return;
      }
      this.getListData(this.current, this.pageSizeSelect)
    },
    matchEnterprise: function(ev){
      var condition = {
        "keyword": encodeURIComponent(this.queryParams.keyword)
      };
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
        this.queryParams.keyword = this.matchedEnter[this.matchItemIndex-1].entname;
        setTimeout(()=>{
          this.goContactListBysearch(this.matchedEnter[this.matchItemIndex-1]);
          this.matchedEnter = [];
        },100);

      }else{
        clearTimeout(this.searchTimer);
        this.searchTimer = setTimeout(()=>{
          this.matchItemIndex = 1;
          if(this.queryParams.keyword && this.queryParams.keyword.length>2){

            this.$getData(this.api.fl_queryEnterprises,condition,(response)=>{
              this.matchedEnter =  response.result;
            },function(){
              this.loadding = false;
            });
          }
        },500);
      }
    },
    changeMatchItemIndex: function(index){
      this.matchItemIndex = index + 1;
    },
    goContactListBysearch:function(row){
      var condition =  {};
      condition.pripid = row.pripid || "";
      condition.name = row.entname || "";
      condition.objectType = row.type || "";
      condition.creditCode = row.creditcode || "";
      condition.regNo = row.regno || "";
      this.$getData(this.api.fl_contact_isExist,condition,(result)=>{
        if(result.orderId == ""){
          this.$router.push({
            name:"关联监控内容",
            query:{
              pripid:row.pripid,
              entname:row.entname,
              type: row.objectType,
              regno: row.regNo,
              creditcode: row.creditCode,
              orderId: ""
            }
          });
        }else{
          this.$router.push({
            name:"关联监控内容",
            query:{
              pripid:row.pripid,
              entname:row.entname,
              state:'delete',
              type: row.objectType,
              regno: row.regNo,
              creditcode: row.creditCode,
              orderId: result.orderId
            }
          });
        }
      });
    }
  },
  mounted:function(){
     
    this.getListData(1,this.pageSizeSelect);
    this.mySelect(".select");
    this.selectTimeAll(".contact-monitor",()=>{//选开始时间
       this.getListData(1,this.pageSizeSelect);
    }); 
    var clientH = document.documentElement.clientHeight || document.body.clientHeight;
      // 瀑布流
    window.onscroll=  ()=>{
      var scrollTop=document.documentElement.scrollTop || document.body.scrollTop;
      if (document.body.scrollHeight - 140 <= scrollTop + clientH){
        if(!this.isLoading){
          this.loadListData();
        }
      }
    }
  },
  filters:{
    contactAlertStauts(value){
      var riskLevel = {
        "none": "暂无关联监控变更",
        "RISK": "风险等级",
        "ALERT": "预警等级",
        "CONCERN": "关注等级"
      };
      return riskLevel[value];
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
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
  .contact-monitor{
    border:1px solid #eee;
    // border-top:2px solid #5B9BD1;
    background:#fff;
    .logo-wrap{
      position: relative;
      width:78%;
      padding:0 10px;
      margin:104px auto 0;
      .line{
        width:100%;
        border-top:2px solid #eaf3fc;
      }
      .img-wrap{
        position:absolute;
        top:-36px;
        left:50%;
        width:162px;
        height:auto;
        // padding:0 32px;
        margin-left:-80px;
        background:#fff;
        text-align:center;
      }
    }
    .search-section{
      position:relative;
      width:78%;
      height:80px;
      margin:auto;
      margin-top:68px;
      padding:15px 15px;
      .input-search{
        width:100%;
        height:50px;
        border:1px solid #5B9BD1;
        padding-left:52px;
        background:#fff url("/static/images/fengling/icon-monitoring-search.png") no-repeat 0 center;
        input{
          width:100%;
          height:26px;
          margin-top:12px;
          line-height:26px;
          border:none;
          outline: none;
          border-left:1px solid #5B9BD1;
          font-size:14px;
          font-family: "宋体";
          color:#999;
          text-indent:14px;
        }
      }
      .little-enter{
        z-index: 100;
        position:absolute;
        top:80px;
        left:0;
        width:100%;
        background-color: rgb(247, 247, 247);
        .emptyMatchEnt{
          line-height:28px;
          padding-left:20px;
          color:rgb(255, 0, 0);
          background:rgb(247, 247, 247);
        }
        .loadding{
          line-height:28px;
          padding-left:20px;
          background:rgb(247, 247, 247);
        }
        .c-custlist-item{
          border-bottom: #eee solid 1px;
          cursor: pointer;
          padding:6px 36px;
          height:52px;

          i{
             padding:8px;
          }
          p{
              margin-top:4px;
              font-size:12px;
              color:#666;
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
      }
    }
    .table-head{
      margin-top:128px;
      background:#fff;
      height:auto;
      .table-head-left{
        padding-left:44px;
        .search-enterprise{
          width:280px;
        }
        .time-search input.time{
          text-align:center;
        }
      }
    }
    .monitor-content{
      padding:14px 14px 44px 44px;
      // border-top:1px solid #ddd;
      .item{
        float:left;
        width:33.3%;
        padding-right:30px;
        margin-top:30px;
        .contact-enterprise{
          table{
            width:100%;
            border:1px solid #5B9BD1;
          }
          thead{
            th{
                width:33%;
                height:40px;
                border-right:1px solid #fff;
                background:#5B9BD1;
                line-height:40px;
                font-size:14px;
                color:#fefefe;
                text-align:center;
                cursor: pointer;
                font-size:12px;
                a{
                    display: block;
                    color:#fff;
                }
                &:hover{
                    background:#3d89c9;
                }
                &:nth-of-type(1){
                    width:34%;
                }
                &.time{
                    position:relative;
                    .select{
                        width:100%;
                        margin:0;
                    }
                    &:before{
                       content: "";
                       position:absolute;
                       bottom:-8px;
                       right:-8px;
                       width:0px;
                       height:0px;
                       border:8px solid transparent;
                       border-left-color:#c30;
                       -webkit-transform:rotate(45deg);
                       -ms-transform:rotate(45deg);
                       -o-transform:rotate(45deg);
                       -moz-transform:rotate(45deg);
                       transform:rotate(45deg);
                       z-index:10;
                    }
                }
                &:last-child{
                    border:none;
                }
                .select .select-selected span{
                    background:none;
                }
                .select ul{
                    top:35px;
                    border-right:none;

                }
                .select ul li{
                    padding-right:6px;
                }
            }
          }
          td{
              height:40px;
              text-align:left;
              border-bottom:1px solid #5B9BD1;
          }
          .enterprise-name{
              font-size:12px;
              td{
                  position:relative;
              }
              .enterprise-w{
                  padding-left:48px;
                  .name{
                      display: inline-block;
                      padding:0 10px;
                  }
              }
              .icon{
                  position:absolute;
                  top:8px;
                  left:0;
                  width:48px;
                  height:24px;
                  background:url("/static/images/fengling/contact/icon-contact-monitor.png") no-repeat center;
                  background-size:40px;
                  border-right:1px solid #d0d0d0;
                  &.alert-icon{
                      background:url("/static/images/fengling/contact/icon-contact-alert.png") no-repeat center;
                      background-size:40px;
                      border-right:1px solid #feb872;
                  }
                  &.risk-icon{
                      background:url("/static/images/fengling/contact/icon-contact-risk.png") no-repeat center;
                      background-size:40px;
                      border-right:1px solid #fe9e7f;
                  }
                  &.concern-icon{
                      background:url("/static/images/fengling/contact/icon-contact-concern.png") no-repeat center;
                      background-size:40px;
                      border-right:1px solid #77e6d8;
                  }

              }
              
          }
          .enterprise-status{
              td{
                  height: 44px;
                  font:bold 18px/40px microsoft yahei;
                  text-align:center;
                  color:#d0d0d0;
                  letter-spacing: 4px;
                  line-height: 44px;
                  border-bottom:none;
                  &.no-change{
                      color:#d0d0d0;
                  }
                  &.change-alert{
                      color:#feb872;
                  }
                  &.change-risk{
                      color:#fe9e7f;
                  }
                  &.change-concern{
                      color:#77e6d8;
                  }
              }
              
          }
          .enterprise-operate{
              font-size:12px;
              color:#ADC2D0;
              background:#F0F3F7;
              td{
                  padding:0 10px;
              }
              .operate-monitor{
                   padding:6px 0;
                   padding-left:22px;
                   margin-right:10px;
                   cursor:pointer;
                   &.recovery{
                       background: url("/static/images/fengling/contact/icon-recover.png") no-repeat 0 center;;
                       background-size:18px;
                       &:hover{
                           color: #5B9BD1;
                           background: url("/static/images/fengling/contact/icon-recover-hover.png") no-repeat 0 center;
                           background-size:18px;
                       }
                   }
                   &.pause{
                       background: url("/static/images/fengling/contact/icon-pause.png") no-repeat 0 center;
                       background-size:18px;
                       &:hover{
                           color: #5B9BD1;
                           background: url("/static/images/fengling/contact/icon-pause-hover.png") no-repeat 0 center;
                           background-size:18px;
                       }

                   }
                   &.stop{
                       background: url("/static/images/fengling/contact/icon-end.png") no-repeat 0 center;
                       background-size:18px;
                       &:hover{
                           color: #5B9BD1;
                           background: url("/static/images/fengling/contact/icon-end-hover.png") no-repeat 0 center;
                           background-size:18px;
                       }
                   }
              }
              .create-time{
                  float: right;
              }
          }
        }
      }
    } 
  }
</style>
