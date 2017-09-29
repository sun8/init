<template>
  <div class="monitor-list"> 
    <div class="table-section">
      <div class="table-head clearfix">
        <div class="table-head-left">
          <div class="time-search">
            <span>筛选：</span>
            <input class="time" type="text" v-date-time placeholder="开始日期" v-model="queryForm.startDate" readonly>
             -
            <input class="time" type="text"  v-date-time placeholder="结束日期" v-model="queryForm.endDate" readonly> 
          </div>
          <div class="search-enterprise">
            <input type="text" class=" search-name" placeholder="输入名称" v-model="queryForm.keyword" @keydown.enter ="searchEnter($event)"> 
          </div>
        </div>
        <div class="table-head-right">
            <div class="select select-common " id="monitor-columns">
             <div class="select-selected">
               <span>
                监控状态
               </span> 
               <i></i>
             </div>
             <ul>
               <li  v-for="(value, display) in monitorStates"  @click="selectState(display)">{{value}}</li>
             </ul>
            </div>
            <div class="select select-common " id="monitor-policy">
              <div class="select-selected">
                <span>
                  策略分组
                </span> 
                <i></i>
              </div>
              <ul>
                <li @click="selectPolicyMonitorList('all')">全选</li>
                <li @click="selectPolicyMonitorList('0')">默认策略</li>
                <li v-for="row in policyList"  @click="selectPolicyMonitorList(row)">{{row.name}}</li>
              </ul>
            </div>
        </div>
        <div style="float:right;">
          <div class="export-excel-btn">
            <button @click="exportMonitorListExcel()">导出Excel</button>
          </div>
          <router-link to="/addMonitor">
            <button class="export-btn">添加监控</button>
          </router-link>
        </div>
        
      </div>
      <table class="table">
        <thead>
        <tr>
          <th width="6%">序号</th>
          <th width="26%">名称</th>
          <th width="14%">监控时间</th>
          <th width="12%">最后变更日期</th>
          <th width="14%">监控策略</th>
          <th width="28%">操作</th>
        </tr>
        </thead>
        <tbody v-if="!isLoading">
            <tr  v-for="(row,index) in tableData"  :class="{'disable': !row.lastChangeDate,'gray':row.monitorStatus == 'INACTIVE',hasword:row.lastChangeDate,'remove':row.remove}">
              <td  @click="row.lastChangeDate ? goChangeDetail(row): ''">{{ index+1 }} </td>
              <td @click="row.lastChangeDate ? goChangeDetail(row): ''" >{{row.name}}</td>
              <td @click="row.lastChangeDate ? goChangeDetail(row): ''" >{{row.createdAt}}</td>
              <td @click="row.lastChangeDate ? goChangeDetail(row): ''">{{row.lastChangeDate}}</td>
              <td>
                {{row.policyName}}
                  <div class="select-after"  v-if="policyGroupIndex == index ">
                    <div class="select-selected">
                      <span>策略</span> 
                      <i></i>
                    </div>
                    <ul>
                            <li  @click="modifyPolicyGroupSingle('',row)">默认策略</li>
                            <li  v-for="rowPolicy in policyList"  @click="modifyPolicyGroupSingle(rowPolicy,row)">{{rowPolicy.name}}</li>
                        </ul>
                  </div>
              </td>
              <td>
                <span  class="operate-monitor operate-monitor-recover  " @click="recovery(row)" v-if="row.monitorStatus == 'INACTIVE'">恢复</span>
                <span  class="operate-monitor operate-monitor-pause" @click="pause(row)" v-if="row.monitorStatus == 'ACTIVE'">暂停</span>
                <span  class="operate-monitor operate-monitor-stop" @click="terminate(row)">终止</span>
                <span class="operate-monitor operate-monitor-modify-policy" @click="modifyPolicyGroup(index)">策略</span>
              </td>
            </tr>
            <tr v-for="row in tableLessNum" ng-if="tableLessNum.length>0" class="spaceWord">
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </a>
        </tbody>
        <tbody v-if="isLoading ">
          <tr>
            <td colspan="6" class="text-center"> 数据加载中 ... </td>
          </tr>
        </tbody>
        <tbody v-if="tableData.length == 0 && !isLoading">
          <tr>
            <td colspan="6" class="text-center"> 结果为空 </td>
          </tr>
          <tr>
            <td colspan="6" class="text-center"></td>
          </tr>
           <tr>
            <td colspan="6" class="text-center"></td>
          </tr>
          <tr>
            <td colspan="6" class="text-center"></td>
          </tr>
           <tr>
            <td colspan="6" class="text-center"></td>
          </tr>
        </tbody>
      </table>
      <div class="my-pagination">
          <div class="pagintion-left">
              <span class=" pulll-left">
                  每页
                  <div class="select select-pagination">
                      <div class="select-selected">
                          <span>
                              10
                          </span> 
                          <i></i>
                      </div>
                      <ul >
                          <li v-for="item in settings.pagerOptions"  @click="changePageSize(item)">{{item}}</li>
                      </ul>
                  </div>
                  条记录
              </span>
              <span>
                  共 {{totalItemCount}} 条记录
              </span>
          </div>
          <div class="pagintion-right">
              <div class="tcdPageCode"></div>
          </div>
      </div>  
    </div> 
  </div>
</template>
<script>
  export default {
    data () {
      return {
        queryForm: {},
        currentPage:1,
        monitorStates: {
          "":"全选",
          "ACTIVE": "监控中",
          "INACTIVE": "已暂停"
        },
        totalItemCount:10,
        monitorStatusSelect: "",//选择监控状态
        tableData: [], // 表格数据
        isLoading: true, // 数据加载中的标志
        pageSizeSelect: 10, // 默认显示每页显示记录的条数
        policyChangeSelect: false,
        policyIdyMonitorList: "all",
        policyList:[],
        policyGroupIndex:-1
      }
    },

    methods:{
      // 查询企业名称操作
      searchEnter(event){
        // var _this = this;
          // 判断开始日期与终止日期的大小
        if(!this.queryForm.keyword){
          return;
        }

        this.monitorStatusSelect = "";//选择监控状态
        this.monitorallSection = false; 
        this.policyIdyMonitorList = 'all';
        $(".monitor-list #monitor-columns .select-selected span").text("监控状态");
        $(".monitor-list #monitor-policy .select-selected span").text("策略");
        this.getListData(1,this.pageSizeSelect,this.pagination);
      },
      // 表格操作数据获取
      getListData(targetPage, pageSize,callback){
         // 判断开始日期与终止日期的大小  
        // var _this = this;
        var condition = this.getQueryCondition(targetPage,pageSize);
        var dateSizeBool = this.getDateSize(condition.startDate ,condition.endDate);
        if(!dateSizeBool){
          return; 
        }

        this.isLoading = true;
        this.$getData(this.api.fl_monitor_list,condition,(result)=>{
          this.totalItemCount = result.total;
          if(result.totalPage){
              this.totalItemPage = result.totalPage;
          }else{
              this.totalItemPage = 1;
          }
          this.currentPage = result.targetPage;
          if(result.orders){
            this.tableData = result.orders;
          }
          this.isLoading = false;
          this.tableLessNum = [];
          if(this.tableData.length > 0 && this.tableData.length < 5){
            this.tableLessNum = this.myTableLessNum(5,this.tableData.length);
          }
          //监控列表分页
          if(callback){
            callback(this.currentPage,this.totalItemPage);
          }
        });
      },
      pagination(targetPage,totalPage){
        $(".monitor-list  .tcdPageCode").createPage({
          pageCount:totalPage,
          current:targetPage,
          backFn:(page)=>{
            this.getListData(page,this.pageSizeSelect);
          }
        });
      },
      // 获取查询条件
      getQueryCondition(targetPage, pageSize) {
          this.queryForm.startDate = $(".monitor-list .time").eq(0).val();
          this.queryForm.endDate = $(".monitor-list .time").eq(1).val();
          var condition = this.queryForm;
          if(this.monitorStatusSelect){
              condition.monitorStatus = this.monitorStatusSelect;
          }else{
            condition.monitorStatus = "";
          }
          
          // if(_this.monitorindustrySelect){
          //     condition.industryphy = _this.monitorindustrySelect;
          // }
          if(this.policyIdyMonitorList != 'all'){
            condition.policyId = this.policyIdyMonitorList;
          }else{
            condition.policyId = "";
          }
          
          condition.targetPage = targetPage;
          condition.pageSize = pageSize;
          return condition;
      },
      // 操作：切换每页显示记录数
      changePageSize(item) {
        this.pageSizeSelect  = item;
        this.getListData(1,this.pageSizeSelect,this.pagination);
      },
      //监控状态搜索
      selectState(row){
        this.queryForm.keyword = "";
        this.monitorStatusSelect = row;
        this.getListData(1,this.pageSizeSelect,this.pagination);
      },
      // 策略筛选
      selectPolicyMonitorList(row){
        this.queryForm.keyword = "";
        if(row == 'all'){
           this.policyIdyMonitorList = 'all';
        }else if(row == '0'){
            this.policyIdyMonitorList = 0;
        }else{
            this.policyIdyMonitorList = row.id;
        }
        this.getListData(1,this.pageSizeSelect,this.pagination);
      },
      // 操作：暂停监控
      pause(data) {
          window.swal({
              title: "确认",
              text: "请确认暂停监控所选企业?",
              type: "info",
              showCancelButton: true,
              confirmButtonColor: "#DD6B55",
              confirmButtonText: "确认",
              cancelButtonText: "取消",
              closeOnConfirm: false,
              closeOnCancel: true
          }, (isConfirm)=>{
              if (isConfirm) {
                this.$put(this.api.fl_monitor_orderOperate +"/"+ data.id + "/pause",{},function(){
                  data.monitorStatus = 'INACTIVE';
                  window.swal({
                    title: "成功",
                    text: "暂停监控成功！",
                    type: "success",
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "确认",
                    closeOnConfirm: true,
                  });
                })
              }
          });
      },
      // 操作：恢复监控
      recovery(data) {
          window.swal({
              title: "确认",
              text: "请确认恢复监控所选企业?",
              type: "info",
              showCancelButton: true,
              confirmButtonColor: "#DD6B55",
              confirmButtonText: "确认",
              cancelButtonText: "取消",
              closeOnConfirm: false,
              closeOnCancel: true
          }, (isConfirm)=> {
              if (isConfirm) {
                this.$put(this.api.fl_monitor_orderOperate +"/"+ data.id + "/recovery",{},function(){
                  data.monitorStatus = 'ACTIVE';
                  window.swal({
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
      terminate(data) {
       
        window.swal({
              title: "确认",
              text: "请确认终止监控所选企业?",
              type: "info",
              showCancelButton: true,
              confirmButtonColor: "#DD6B55",
              confirmButtonText: "确认",
              cancelButtonText: "取消",
              closeOnConfirm: false,
              closeOnCancel: true
          }, (isConfirm)=>{
              if (isConfirm) {
                this.$put(this.api.fl_monitor_orderOperate +"/"+ data.id + "/terminate",{},()=>{
                  // location.reload()
                  this.getListData(1,this.pageSizeSelect);
                  window.swal({
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
      // selectPolicy: function(row){
      //   var _this = this;
      //   if(row){
      //     _this.policyId = row.id;
      //   }else{
      //     _this.policyId = 0;
      //   }
          
      // },
      // modifyPolicyChange: function(){
      //   var _this = this;
      //   _this.operteCategory = "modifyPolicyChange";
      //   _this.policyChangeSelect = true;
      //   publicService.mySelect(".monitor-list .sure-section .select-after");
      //   $(".monitor-list .sure-section .select-after .select-selected span").html("策略");
      // },
      // 单个修改策略
      modifyPolicyGroup(index){
        // var _this = this;
        $(".monitor-list .table .select-after .select-selected span").html("策略");
        if(this.policyGroupIndex == index) {
          this.policyGroupIndex = -1;

        }else{
          this.policyGroupIndex = index;
        }
        setTimeout(()=>{
          this.mySelect(".monitor-list .table .select-after");
        },60);
      },
      // 修改策略为相应的策略名
      modifyPolicyGroupSingle(rowPolicy,row){
        // var _this = this;
        var PolicyId;
        if(rowPolicy == ""){
          PolicyId = 0;
        }else{
          PolicyId = rowPolicy.id;
        }
        
        this.$put(this.api.fl_monitor_orderOperate +"/"+row.id+"/"+PolicyId+"/updateOrderMonitorPolicy",{},()=>{

          if(rowPolicy.name){
            row.policyName = rowPolicy.name;
          }else{
            row.policyName = "默认策略";
          }
          
          this.policyGroupIndex = -1;
          window.swal({
              title: "成功",
              text: "策略分组修改成功！",
              type: "success",
              confirmButtonColor: "#DD6B55",
              confirmButtonText: "确认",
              closeOnConfirm: true,
          });
        });
      },
      // 点击名称跳转到变更详情
      goChangeDetail(row) {
        window.open("/#/changeDetail?pripid="+row.pripid+"&date="+ row.lastChangeDate+"&entName="+row.name+"&from=monitor");
        return false;
        // window.open("/#/changeDetail/"+row.pripid+"/"+ row.lastChangeDate+"/"+row.name);
        // return false;
      },
      // 导出按钮点击事件
      exportMonitorListExcel: function() {
        var token = window.localStorage.getItem("tokenF");
        var url = this.api.fenglingBase + "/order/monitor_list/export/xls?token=" + token;
        if (this.queryForm.startDate && this.queryForm.startDate != "") {
            url += "&startDate=" + this.queryForm.startDate;
        }
        if (this.queryForm.endDate && this.queryForm.endDate != "") {
            url += "&endDate=" + this.queryForm.endDate;
        }
        if (this.queryForm.keyword && this.queryForm.keyword != "") {
            url += "&keyword=" + this.queryForm.keyword;
        }
        if (this.monitorStatusSelect && this.monitorStatusSelect != "") {
            url += "&monitorStatus=" + this.monitorStatusSelect;
        }
        if(this.policyIdyMonitorList != 'all' ){    
            url += "&policyId="+this.policyIdyMonitorList;
        }
        window.location = url;

    }

    },
    mounted:function(){
        // 获取策略列表
        this.$get(this.api.fl_policy_name_list,(result)=>{
          if(result.success){
            this.policyList = result.data;
          }
        });

        this.getListData(1,this.pageSizeSelect,this.pagination);
        this.mySelect(".select");
        this.selectTimeAll(".monitor-list",()=>{//选开始时间
          this.getListData(1,this.pageSizeSelect,this.pagination);
        });
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
/*---------------- 监控列表样式------------*/
.monitor-list{
    .export-excel-btn{
      float: right;
      position:static;
      margin-left:10px;
      margin-top:12px;
    }
    .export-btn{
        float: right;
        margin:12px 15px 0 0;
        width: 100px;
        height: 40px;
        padding-left:30px;
        border: none;
        font-size: 14px;
        text-align:left;
        color: #fff;
        background:#4DB3A4 url("/static/images/fengling/enter-add-monitor.png") 10px 11px no-repeat;
        background-size: 16px 16px;
        &:hover{
          background: #FFF url("/static/images/fengling/enter-add-monitor-mouseon.png") 10px 11px no-repeat;
          background-size: 16px 16px;
          border:1px solid #4DB3A4;
          color:#4DB3A4;
        }
    }
    .table-section{
      min-width:1000px;
    }
    // .table-head .table-head-right .select ul {
    //     border-color:#6d9add;
    // }
    // .table-head .table-head-right .select ul li:hover{
    //     background-color:#7fb6f0;
    // }

    //  .table-head .table-head-right .select-industry{
    //     background:#fff;
    //     ul{
    //         width:500px;
    //         left:auto;
    //         right:0;
    //         padding:20px;
    //         li{
    //             float: left;
    //             width:50%;
    //             padding:0;
    //             p{
    //                 width:100%;
    //                 line-height:32px;
    //                 font-size:12px;
    //             }
    //             &:hover{
    //                 background:#fff;
    //                 color:#6d9add;
    //             }
    //             &.selectAll{
    //                 float: right;
    //                 text-decoration: underline;
    //             }

    //         }
    //     }
    // }
    // .table-head .table-head-right .select-section{
    //     color:#333;
    //     ul{
    //         right:0;
    //         left:auto;
    //         width:750px;
    //         .section-wrap{
    //             width:100%;
    //             height:auto;
    //             &:hover{
    //                 background:#fff;
    //                 color:#333;
    //             }
    //             .section-left{
    //                 float: left;
    //                 width:600px;
    //                 height:475px;
    //                 #mapSection{
    //                     width:600px;
    //                     height:475px;
    //                 }
    //             }
    //             .section-right{
    //                 float: left;
    //                 width:110px;
    //                 font-size:12px;
    //                 color:#888;
    //                 padding-bottom:10px;
    //                 .section-sheng{
    //                     width:110px;
    //                     height:20px;
    //                     line-height:20px;
    //                     margin-top:10px;
    //                     span{
    //                         float: left;
    //                         width:50px;
    //                         text-align:center;
    //                         background:#f0f0f0;
    //                         margin-bottom:5px;
    //                         &.all{
    //                             width:110px;
    //                         }
    //                         &:nth-of-type(odd){
    //                             margin-right:10px;
    //                         }
    //                         &:nth-of-type(even){
    //                             margin-right:0;
    //                         }
    //                         &.province{
    //                             &:nth-last-of-type(1){
    //                                 width:110px;
    //                                 margin-left:0;
    //                                 margin-right:0;
                                   
    //                             }
    //                             &:nth-last-of-type(2){
    //                                 width:110px;
    //                                 margin-left:0;
    //                                 margin-right:0;
    //                             }
    //                             &:nth-last-of-type(3){
    //                                 width:110px;
    //                                 margin-left:0;
    //                                 margin-right:0;
    //                             }
    //                             &:nth-last-of-type(4){
    //                                 width:110px;
    //                                 margin-left:0;
    //                                 margin-right:0;
    //                             }
    //                             &:nth-last-of-type(5){
    //                                 width:110px;
    //                                 margin-left:0;
    //                                 margin-right:0;
    //                             }
    //                         }
    //                         &.active{
    //                             background:#7fb6f0;
    //                             color:#fff;
    //                         }
                            
    //                     }
    //                 }
    //             }
    //         }
    //         button{
    //             position:absolute;
    //             top:10px;
    //             right:162px;
    //             width:72px;
    //             height:20px;
    //             text-align:center;
    //             background: #f0f0f0;
    //             color:#888;
    //             font-size:12px;
    //             &:hover{
    //                 background-color: #6d9add;
    //                 color:#fff;
    //             }
    //         }
    //     }
    // }
    
    .table{
       tbody{
           tr{
              &.hasword{
                  &:hover{
                      background-color:#eaf3fc;
                  }
              }
               &.remove{
                color:#999;
               }
               td{
                    position:relative;
                   border:none;
                   a{
                       font-family: "宋体";
                       &:hover{
                           text-decoration:underline;
                           color:#cc3300;
                       }
                   }
                   .operate-monitor{
                        padding:6px 0;
                        padding-left:28px;
                        margin:0 10px;
                        color:#ADC2D0;
                        cursor:pointer;
                        &.operate-monitor-recover{
                            background: url("/static/images/fengling/icon-recover.png") no-repeat 0 2px;;
                            background-size:20px;
                            &:hover{
                                color:#5B9BD1;
                                background: url("/static/images/fengling/icon-recover-hover.png") no-repeat 1px 1px;
                                background-size:20px;
                            }
                        }
                        &.operate-monitor-pause{
                            background: url("/static/images/fengling/icon-pause.png") no-repeat 0 center;
                            background-size:20px;
                            &:hover{
                                color:#5B9BD1;
                                background: url("/static/images/fengling/icon-pause-hover.png") no-repeat 0 center;
                                background-size:20px;
                            }

                        }
                        &.operate-monitor-stop{
                            background: url("/static/images/fengling/icon-end.png") no-repeat 0 center;
                            background-size:20px;
                            &:hover{
                                color:#5B9BD1;
                                background: url("/static/images/fengling/icon-end-hover.png") no-repeat 0 center;
                                background-size:20px;
                            }
                        }
                        &.operate-monitor-modify-policy{
                            background:url("/static/images/fengling/icon-policy.png") no-repeat 0 center;
                            background-size:22px;
                            &:hover{
                                color:#5B9BD1;
                                background: url("/static/images/fengling/icon-policy-mouseon.png") no-repeat 0 center;
                                background-size:22px;
                            }
                        }
                   }

               }
           }
        }
        .select-after{
            position:absolute;
            top:6px;
            width:124px;
            height:30px;
            margin:auto;
            cursor: pointer;
            .select-selected{
                span{
                    float: left;
                    width:94px;
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
            ul{
                position:absolute;
                left:0;
                top:31px;
                display: none;
                width:100%;
                font-size:14px;
                background:#fff;
                z-index:1000;
                border:1px solid #6d9add;
                li{
                    width:100%;
                    height:30px;
                    line-height: 30px;
                    color:#333;
                    padding-left:6px;
                    padding-right:36px;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    overflow: hidden;
                    text-align:center;
                    &:hover{
                        background:#7fb6f0;
                        color:#fff;
                    }    
                }
            }
        }
    }
}
</style>
