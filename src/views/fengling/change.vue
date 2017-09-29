<template>
  <div class="monitor-change-list left-right">
    <div class="table-section">
      <div class="table-head clearfix">
        <div class="table-head-left">
          <div class="time-search">
            <span>筛选：</span>
            <input v-date-time class="time" type="text"  placeholder="开始日期" v-model="queryForm.startDate" readonly>
            -
            <input v-date-time class="time" type="text" placeholder="结束日期" v-model="queryForm.endDate" readonly> 
          </div>
          <div class="search-enterprise">
            <input type="text" class=" search-name" placeholder="输入名称" v-model="queryForm.keyword" @keydown.enter="searchEnter($event)"> 
          </div>
        </div>
        <div class="table-head-right">
          <div class="select select-common" id="alert-state-change">
            <div class="select-selected">
              <span>
                  风险分类
              </span> 
              <i></i>
            </div>
            <ul >
              <li v-for="(value, display) in monitorStates" @click="alertStatusSelectFn(display)">{{value}}</li>
            </ul>
          </div>
          <div class="select select-column   select-common" id="change-columns">
            <div class="select-selected">
              <span>
                  变更事项
              </span> 
              <i></i>
            </div>
            <div class="column-con clearfix">
             <div class="column-item">
               <div class="column-item-tit">
                   关注
               </div>
               <div class="column-item-con">
                  <p v-for = "row in concernStatus" @click="changeItemFn(row)">{{row.title}}</p>
               </div>
             </div>
             <div class="column-item">
               <div class="column-item-tit">
                   预警
               </div>
               <div class="column-item-con">
                  <p v-for = "row in alertStatus" @click="changeItemFn(row)">{{row.title}}</p>
               </div>
             </div>
             <div class="column-item">
                <div class="column-item-tit">
                   风险
                </div>
                <div class="column-item-con">
                  <p v-for = "row in riskStatus"  @click="changeItemFn(row)">{{row.title}}</p>
                </div>
             </div>
              <li class="selectAll" @click="changeItemFn('')" >
                <p>全选</p>
              </li>
            </div> 
          </div>
          <div class="select select-common" id="monitor-policy">
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
        <div class="export-excel-btn">
          <button @click="exportChangeListAsExcel()">导出Excel</button>
        </div>
      </div>
      <table class="table" >
        <thead>
            <tr>
                <th width="8%">序号</th>
                <th width= "26%">名称</th>
                <th width="40%">变更事项</th>
                <th width="14%">最后变更日期</th>
                <th width="12%">风险分类</th>
            </tr>
        </thead>
        <tbody v-if="!isLoading" border="1">
            <tr class="hasNum" v-for="(row,index) in tableData" @click="goDetail(row)">
                <td>{{ index + 1}}</td>
                <td>{{row.name}}</td>
                <td>{{row.latestChangeColumnsTitle}}</td>
                <td>{{row.lastChangeDate}}</td>
                <td>
                    <span class="label label-sm alert-state-btn" v-bind:class="{'alert' : row.latestAlarmLevel == 'ALERT', 'concern' : row.latestAlarmLevel == 'CONCERN', 'risk' : row.latestAlarmLevel == 'RISK'}">{{row.latestAlarmLevel | gradeStatus}}</span>
                </td>
            </tr>
            <tr v-for="row in tableLessNum" v-if="tableData.length >0" class="spaceWord">
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
        </tbody>
        <tbody v-if="isLoading">
            <tr>
                <td colspan="5" class="text-center"> 数据加载中 ... </td>
            </tr>
        </tbody>
        <tbody v-if="tableData.length == 0 && !isLoading" class="empty">
          <tr >
              <td></td>
              <td></td>
              <td>结果为空</td>
              <td></td>
              <td></td>
          </tr>
          <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
          </tr>
          <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
          </tr>
          <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
          </tr>
          <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
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
    name: 'hello',
    data () {
      return {
        queryForm: {},
        monitorStates:[],
        concernStatus:[],
        alertStatus:[],
        riskStatus:[],
        policyList:[],
        currentPage:1,
        tableLessNum:[],
        tableData:[],
        isLoading: false,
        monitorStates : {
          "":"全选",
          "RISK": "风险",
          "ALERT": "预警",
          "CONCERN": "关注"
        },
        totalItemCount:10,
        pageSizeSelect:10,
      }
    },

    methods:{
      searchEnter(event) {
        if(!this.queryForm.keyword){
          return;
        }
        this.getListData(1,this.pageSizeSelect,this.pagination);
        this.alertStatusSelect = "";//
        this.changeStatusSelect = "";
        // _this.monitorallSection = false;
        this.policyIdyMonitorList = 'all';
        $(".monitor-change-list .section-sheng span").removeClass("active");  
        $(".monitor-change-list #alert-state-change .select-selected span").text("风险分类");
        $(".monitor-change-list #change-columns .select-selected span").text("变更事项");
        $(".monitor-change-list #monitor-policy .select-selected span").text("策略");
        
      },
      // 表格操作数据获取
      getListData(targetPage, pageSize,callback){
        var condition = this.getQueryCondition(targetPage,pageSize);
        var dateSizeBool = this.getDateSize(condition.startDate ,condition.endDate);
        if(!dateSizeBool){
            return; 
        }
        this.isLoading = true;

        this.$getData(this.api.fl_change_list,condition,(result)=>{
            this.totalItemCount = result.total;
            if(result.totalPage){
              this.totalItemPage = result.totalPage;
            }else{
              this.totalItemPage = 1;
            }
            this.currentPage = result.targetPage;
            if(result.changeList){
              this.tableData = result.changeList;
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
        $(".monitor-change-list  .tcdPageCode").createPage({
            pageCount:totalPage,
            current:targetPage,
            backFn:(page)=>{
              this.getListData(page,this.pageSizeSelect);
            }
        });
      },
      getQueryCondition(targetPage, pageSize) {
        this.queryForm.startDate = $(".monitor-change-list .time").eq(0).val();
        this.queryForm.endDate = $(".monitor-change-list .time").eq(1).val()
        var condition = this.queryForm;
        condition.column = this.changeStatusSelect;
        condition.alarmLevel = this.alertStatusSelect;
        if(this.policyIdyMonitorList != 'all'){
          condition.policyId = this.policyIdyMonitorList;
        }else{
          condition.policyId = "";
        }
        
        condition.targetPage = targetPage;
        condition.pageSize = pageSize;
        return condition;
      },
      changePageSize(item) {
        this.pageSizeSelect =  item;
        this.getListData(1,this.pageSizeSelect,this.pagination);
      },
      alertStatusSelectFn(value){
        this.queryForm.keyword = "";
        this.changeStatusSelect = "";
        this.alertStatusSelect = value;
        $("#change-columns .select-selected span").text("变更事项");
        
        this.getListData(1,this.pageSizeSelect,this.pagination);
      },
      changeItemFn(row){
        this.queryForm.keyword = "";
        this.alertStatusSelect = "";//
        this.changeStatusSelect = row.columns;
        $("#alert-state-change .select-selected span").text("风险分类");
        
        this.getListData(1,this.pageSizeSelect,this.pagination);
      },
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
      getColumn(){
        // 请求变更事项
        this.$get(this.api.fl_change_column_list,(result)=>{
          if(result.success){
            this.changeItem = result.monitorIndicator;
            this.riskStatus = [];
            this.alertStatus = [];
            this.concernStatus = [];
            $.each(this.changeItem,(i,value)=>{
              
              if(value.alarmLevel == "RISK"){
                this.riskStatus.push(value);
              }
              if(value.alarmLevel == "ALERT"){
                this.alertStatus.push(value);
              }
              if(value.alarmLevel == "CONCERN"){
                this.concernStatus.push(value);
              }
            });
            setTimeout(this.changeColumn,60);
          }
        });
      },
      changeColumn(){

        var ele = $('#change-columns');

        ele.find(".select-selected").click(function(){
          var ul = ele.find(".column-con");
          if( ul.css("display") == "none"){
            ul.slideDown("fast");
          }else{
            ul.slideUp("fast");
          }
          return false;
        });
        ele.on("click",".column-con p",function(){
          var txt = $(this).text();
          ele.find(".select-selected span").html(txt);
          var value = $(this).attr("selectid");
          ele.attr("selectid",value);
          ele.find(".column-con").hide();
          return false;
        });
        
        $(document).click(function(){
          var ele = $('#change-columns');
          ele.find(".column-con").hide();
        });
      },
      goDetail(row){
        
        window.open("/#/changeDetail?pripid="+row.pripid+"&date="+ row.lastChangeDate+"&entName="+row.name+"&from=monitor");
        return false;
      },
      toDouble(num){
        if(num < 10){
          return '0' + num;
        }else{
          return num;
        }
      },
      exportChangeListAsExcel: function() {
        var token = window.localStorage.getItem("tokenF");
        var url = this.api.fenglingBase + "/order/changes/export/xls?token=" + token;

        if (this.queryForm.keyword) {
          url += "&keyword=" + this.queryForm.keyword;
        }
        if (this.queryForm.startDate) {
          url += "&startDate=" + this.queryForm.startDate.replace(/-/g, "");
        }
        if (this.queryForm.endDate) {
          url += "&endDate=" + this.queryForm.endDate.replace(/-/g, "");
        }
        if(this.alertStatusSelect){
          url += "&alarmLevel=" + this.alertStatusSelect;
        }
        if(this.changeStatusSelect){
          url += "&column=" + this.changeStatusSelect;
        }
        if(this.policyIdyMonitorList != 'all' ){    
            url += "&policyId=" + this.policyIdyMonitorList;
        }
        window.location = url;

      } 
    },
    filters: {
      gradeStatus : function(value, discount){
        var gradeStatus = {
          "NORMAL": "  ",
          "CONCERN": "关注",
          "ALERT": "预警",
          "RISK": "风险"
        };
        return gradeStatus[value]
      }
    },
    mounted:function(){
      // 获取策略列表
      this.$get(this.api.fl_policy_name_list,(result)=>{
        if(result.success){
          this.policyList = result.data;
        }
      });
      // console.log("change");

      this.getColumn();//获取变更事项
      this.getListData(1,this.pageSizeSelect,this.pagination);
      this.mySelect(".select");
      this.selectTimeAll(".monitor-change-list",()=>{//选开始时间
         this.getListData(1,this.pageSizeSelect,this.pagination);
      }); 
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/css">
  .monitor-change-list{
    .export-excel-btn{
      float: right;
      position:static;
      margin-top:12px;
    }
    .table-section{
      min-width:1000px;
      .table-head{
        .table-head-right{
          margin-left:10px;
          .select{
            margin-left:16px;
          }
          .select-column .column-con{
            display:none;
            position: absolute;
            right: 0;
            top: 31px;
            width: 500px;
            padding:20px;
            font-size: 14px;
            background: #fff;
            z-index: 1000;
            border: 1px solid #5B9BD1;
            .column-item{
              float: left;
              width:33.33%;
              height:100%;
              padding:0 10px;
              &:nth-last-of-type(1){
                  border-right:none;
              }
              .column-item-tit{
                  font-size:16px;
                  font-family: 'Hiragino Sans GB' ,'microsoft yahei';
                  margin-bottom:10px;
              }
              .column-item-con{
                  font-size:12px;
                  line-height:28px;
                  p{
                      width:100%;
                      overflow:hidden;
                      white-space:nowrap;
                      text-overflow:ellipsis;
                      &:hover{
                          color:#666;
                      }
                  }

              }
            }
            .selectAll{
              list-style:none;
              position: absolute;
              right:120px;
              bottom:40px;
              font-size:12px;
            }
          }
        }
      }
    }
    .table-head .table-head-right .select-industry{
        background:#fff;
        ul{
            width:500px;
            left:auto;
            right:0;
            padding:20px;
            li{
                float: left;
                width:50%;
                padding:0;
                p{
                    width:100%;
                    line-height:32px;
                    font-size:12px;
                }
                &:hover{
                    background:#fff;
                    color:#feb872;
                }
                &.selectAll{
                    float: right;
                    text-decoration: underline;
                }

            }
        }
    }
    .table-head .table-head-right .select-section{
        color:#333;
        margin-left:16px;
        ul{
            right:0;
            left:auto;
            width:750px;
            .section-wrap{
                width:100%;
                height:auto;
                &:hover{
                    background:#fff;
                    color:#333;
                }
                .section-left{
                    float: left;
                    width:600px;
                    height:475px;
                    #mapSection{
                        width:600px;
                        height:475px;
                    }
                }
                .section-right{
                    float: left;
                    width:110px;
                    font-size:12px;
                    color:#888;
                    padding-bottom:10px;
                    .section-sheng{
                        width:110px;
                        height:20px;
                        line-height:20px;
                        margin-top:10px;
                        span{
                            float: left;
                            width:50px;
                            text-align:center;
                            background:#f0f0f0;
                            margin-bottom:5px;
                            &.all{
                                width:110px;
                            }
                            &:nth-of-type(odd){
                                margin-right:10px;
                            }
                            &:nth-of-type(even){
                                margin-right:0;
                            }
                            &.province{
                                &:nth-last-of-type(1){
                                    width:110px;
                                    margin-left:0;
                                    margin-right:0;
                                    
                                }
                                &:nth-last-of-type(2){
                                    width:110px;
                                    margin-left:0;
                                    margin-right:0;
                                }
                                &:nth-last-of-type(3){
                                    width:110px;
                                    margin-left:0;
                                    margin-right:0;
                                }
                                &:nth-last-of-type(4){
                                    width:110px;
                                    margin-left:0;
                                    margin-right:0;
                                }
                                &:nth-last-of-type(5){
                                    width:110px;
                                    margin-left:0;
                                    margin-right:0;
                                }
                            }
                            &.active{
                                background:#feb872;
                                color:#fff;
                            }
                            
                        }
                    }
                }
            }
            button{
                position:absolute;
                top:10px;
                right:162px;
                width:72px;
                height:20px;
                text-align:center;
                background: #f0f0f0;
                color:#888;
                font-size:12px;
                &:hover{
                    background-color: #f59639;
                    color:#fff;
                }
            }
        }
    }
    .table{
      border-collapse: separate;
      tbody {
        tr {
          td{
            .risk{
              color:#F36A5A;
            }
            .alert{
              color:#A276A4;
            }
            .concern{
              color:#4DB3A4 ;
            }
          }
        }
      }
    } 
  }
  @media screen and (min-width : 1650px){
      .monitor-change-list{
          .table-head .table-head-left .search-enterprise{
              margin-left:40px;
          }
          .table-head .table-head-right{
              margin-left:80px;
          }
          .table-head .table-head-right .select{
              margin-left:35px;
          }
          .table-head .table-head-right .select-industry{
              ul{
                  li{
                      font-size:12px;
                      p{
                          height:35px;
                          padding:0 8px;
                          line-height:16px;
                      }
                      

                  }
              }
          }
          .table-head .table-head-right .select-section{
              margin-left:16px;
              ul{
                  right:0;
                  left:auto;
                  width:750px;
                  .section-wrap{
                      width:100%;
                      height:auto;
                      .section-left{
                          width:600px;
                          height:475px;
                          #mapSection{
                              width:600px;
                              height:475px;
                          }
                      }
                      .section-right{
                          width:122px;
                          font-size:12px;
                          padding-bottom:10px;
                          .section-sheng{
                              width:122px;
                              height:20px;
                              line-height:20px;
                              margin-top:10px;
                              span{
                                  float: left;
                                  width:56px;
                                  margin-bottom:5px;
                                  &.all{
                                      width:122px;
                                  }
                                  &:nth-of-type(odd){
                                      margin-right:10px;
                                  }
                                  &:nth-of-type(even){
                                      margin-right:0;
                                  }
                                  &.province{
                                      &:nth-last-of-type(1){
                                          width:122px;
                                          margin-left:0;
                                          margin-right:0;
                                      }
                                      &:nth-last-of-type(2){
                                          width:122px;
                                          margin-left:0;
                                          margin-right:0;
                                      }
                                      &:nth-last-of-type(3){
                                          width:122px;
                                          margin-left:0;
                                          margin-right:0;
                                      }
                                      &:nth-last-of-type(4){
                                          width:122px;
                                          margin-left:0;
                                          margin-right:0;
                                      }
                                      &:nth-last-of-type(5){
                                          width:122px;
                                          margin-left:0;
                                          margin-right:0;
                                      }
                                  }
                                  
                              }
                          }
                      }
                  }
                  button{
                      top:10px;
                      right:162px;
                      width:72px;
                      height:20px;
                      font-size:12px;
                  }
              }
          }
      }
  }
</style>
