<template>
  <div class="batch-export-monitor">
      <div class="export-monitor">
          <div class="update-file-section">
              <div class="operate-section">
                  <div class="operate-wrapper clearfix">
                      <div class="operate-item operate-update-icon">
                          <div class="operate-item-wrap" @click="exportMonitor()">
                              <span>导入监控</span>
                          </div>
                      </div>
                      <div class="operate-item operate-pull-template">
                          <div class="operate-item-wrap" @click="downloadTemplate()"> 
                              <span>下载模板</span>
                          </div>
                      </div>
                      <div class="operate-item operate-template-case">
                          <div class="operate-item-wrap" @click="previewTemplate()">
                              <span>模板案例</span>
                          </div>
                      </div>
                  </div>
              </div>
              <div class="update-ing"  >
                  <div class="update-ing-center clearfix">
                      <span class="update-file-name" id="update-text"></span>
                      <span class="update-progress">
                          <span class="update-progress-value"></span>
                      </span>
                      <span class="update-time">00:00</span>
                  </div>
              </div>
          </div>
          <div class="table-section">
              <div class="table-head clearfix">
                  <div class="table-head-left">
                      <div class="time-search">
                          <span>筛选：</span>
                          <input class="time" type="text" v-date-time placeholder="开始日期" v-model="queryForm.startDate" readonly>
                           -
                          <input class="time" type="text" v-date-time placeholder="结束日期" v-model="queryForm.endDate" readonly>
                      </div>
                  </div>
              </div>
          </div>
          <table  class="table">
              <thead>
                  <tr>
                      <th width="8%">序号</th>
                      <th width="10%">总条数</th>
                      <th width="10%">成功数</th>
                      <th width="12%">未找到条数</th>
                      <th width="10%">重复条数</th>
                      <th width="12%">上传文件</th>
                      <th width="10%">结果文件</th>
                      <th width="10%">状态</th>
                      <th width="18%">上传时间</th>
                  </tr>
              </thead>
              <tbody v-show ="!isLoading">
                  <tr v-for ="(row,index) in tableData">
                      <td>{{index + 1}}</td>
                      <td>{{row.total}}</td>
                      <td>{{row.successCount}}</td>
                      <td>{{row.notfoundCount}}</td>
                      <td>{{row.repeatCount}}</td>
                      <td><a @click="downloadFile('upload', row.uploadFile, 'upload.xlsx')">下载</a></td>
                      <td>
                          <a v-if="row.status =='COMPLETE'" @click="downloadFile('', row.resultFile, 'import_result.xlsx')" >下载</a>
                          <span v-if="row.status !='COMPLETE'" >下载</span>
                      </td>
                      <!-- <td>{{row.status}}</td> -->
                      <td>{{row.status | fileStatus}}</td>
                      <td>{{row.createdAt}}</td>
                  </tr>
                  <tr v-for ="row in tableLessNum" v-if="tableData.length > 0">
                      <td colspan="9"></td>
                  </tr>
              </tbody>
              <tbody v-show ="isLoading">
                  <tr>
                      <td colspan="9" class="text-center"> 数据加载中 ... </td>
                  </tr>
              </tbody>
               <tbody v-show ="tableData.length == 0 && !isLoading">
                  <tr>
                      <td colspan="9" class="text-center"> 结果为空 </td>
                  </tr>
                  <tr>
                      <td colspan="8" class="text-center"></td>
                  </tr>
                  <tr>
                      <td colspan="9" class="text-center"></td>
                  </tr>
                  <tr>
                      <td colspan="9" class="text-center"></td>
                  </tr>
                  <tr>
                      <td colspan="9" class="text-center"></td>
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
      <div class="sure-layer" v-show ="surePutToMonitorBool"></div>
      <div class="sure-section" v-show ="surePutToMonitorBool">
          <h3>添加</h3>
          <span class="note">*不选择订单策略将自动选为默认策略</span>
          <div class="select" v-show ="policyList.length > 0">
             <div class="select-selected">
                 <span>
                      选择订单策略
                 </span> 
                 <i></i>
             </div>
             <div class="policydetailwrap">
                 <ul>
                      <li  @click="selectPolicy()">默认策略 </li>
                      <li v-for ="row in policyList"  @click="selectPolicy(row)">{{row.name}}</li>
                 </ul>
                <!--  <div class="policyDetail"> 
                      <a target="_blank" @click="policyDetail()"></a>
                      <a  target="_blank" @click="policyDetail(row)" v-for ="row in policyList">编辑</a> 
                 </div> --> 
             </div>
          </div>
          <div class="btn-section">
              <form enctype="multipart/form-data" method="POST" id="aaaa" role="form" target="hidden_frame" >
                  <button class="cancel" @click.prevent="cancelMonitor()">取消</button><button class="sure" @click="putToMonitorAjax()">确认</button>
                  <input name="file" type="file" id="update-file"  @change="updateFileinputChange()"  class="update-file" />
                  <input name="token" type="hidden" id="update-token"  />
              </form>
          </div>
      </div>
      
  </div>
</template>

<script>
  export default {
    data () {
      return {
        queryForm : {},
        tableLessNum :[],//表格补数
        tableData : [], // 表格数据
        pageSizeSelect:10, // 默认显示每页显示记录的条数
        updateProgressShow : false,//正在上传文件区域
        surePutToMonitorBool : false,
        policyId : 0,
        updateTimer : null,
        time: 0,
        updateFileinputValue : "",
        currentPage:1,
        isLoading:false,
        totalItemCount:0,
        policyList:[]
      }
    },
    methods:{
        getQueryCondition(targetPage, pageSize) {
          this.queryForm.startDate = $(".batch-export-monitor .time").eq(0).val();
          this.queryForm.endDate = $(".batch-export-monitor .time").eq(1).val()
          var condition = this.queryForm;
          condition.targetPage = targetPage;
          condition.pageSize = pageSize;
          return condition;
        },
        //请求数据
        getListData(targetPage, pageSize,callback){
          var condition = this.getQueryCondition(targetPage,pageSize);
          var dateSizeBool = this.getDateSize(condition.startDate ,condition.endDate);
          if(!dateSizeBool){
              return; 
          }
          this.isLoading = true;
          this.$getData(this.api.fl_batchmonitor_history,condition,(result)=>{

            this.totalItemCount = result.total;
            if(result.totalPage){
              this.totalItemPage = result.totalPage;
            }else{
              this.totalItemPage = 1;
            }
            this.tableData = result.historyList;
            this.currentPage = result.targetPage;
            this.isLoading = false;
            this.tableLessNum = []; 
            if(this.tableData.length > 0  && this.tableData.length < 5){
              this.tableLessNum = this.myTableLessNum(5,this.tableData.length);
            }

            //监控列表分页
            if(callback){
              callback(this.currentPage,this.totalItemPage);
            }
          });
        },
        pagination(targetPage,totalPage){
          $(".batch-export-monitor  .tcdPageCode").createPage({
              pageCount:totalPage,
              current:targetPage,
              backFn:(page)=>{
                this.getListData(page,this.pageSizeSelect);
              }
          });
        },
        //选择每页多少条时使用
        changePageSize(item) {
          this.pageSizeSelect =  item;
          this.getListData(1,this.pageSizeSelect,this.pagination);
        },
        /* -------------------下载模板---------------*/ 
        downloadTemplate() {
          window.open(this.api.fl_batchmonitor_templete + "?token=" + localStorage.getItem("tokenF"));
        },
        // 模板案例
        previewTemplate() {
          window.open(this.api.fl_batchmonitor_preview  + "?token=" + localStorage.getItem("tokenF"));
        },
        //下载excel文件
        downloadFile(type, fileName, displayName) {
          window.open(this.api.fl_batchmonitor_download + "?type=" + type + "&fileName=" + fileName + "&displayName=" + displayName + "&token=" + localStorage.getItem("tokenF"));
        },
        exportMonitor(){
          this.policyId = 0;
          $(".batch-export-monitor .sure-section .select-selected span ").html("选择订单策略");
          this.surePutToMonitorBool = true;
          console.log(this.surePutToMonitorBool);

        },
        cancelMonitor(){
          this.surePutToMonitorBool = false;

        }, 
        selectPolicy(row){
          if(row){
            this.policyId = row.id;
          }else{
            this.policyId = 0;
          }
        },
        //文件上传--选择文件时的行为
        updateFileinputChange(){

          
          this.file = $(".batch-export-monitor #update-file").val();
          var arr = this.file.split("\\");
          this.fileName =arr[arr.length-1];
          clearInterval(this.updateTimer);
          this.surePutToMonitorBool = false;
          $(".batch-export-monitor .update-ing").show();
          $(".batch-export-monitor .update-time").html("00:00");
          $(".batch-export-monitor .update-progress-value").removeClass("active");
          $(".batch-export-monitor #update-text").html(this.fileName);
          
          var upLoadType = '.xls,.xlsx';//['.jpg','.gif','.bmp','.png']; //可上传的格式
          var fileExt = this.file.substr(this.file.lastIndexOf(".")).toLowerCase(); //从字符串中抽出最后一次出现.之后的字符，并且转换成小写
          var result = upLoadType.indexOf(fileExt);
          if (result < 0) {
                swal({
                title: "提示",
                text: "文件格式只能是xls或xlsx",
                type: "warning",
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "确定",
                closeOnConfirm: true
              });
              return ;
            } 

            
            this.updateFileName(this.fileName);
        }, 
        //文件上传--文件上传时的行为
        updateTime(){
          this.time = 0;
          clearInterval(this.updateTimer);
          this.updateTimer = setInterval(()=>{
            this.time =  this.time + 1;
            var minute = parseInt(this.time / 60);
            if(minute<10){
              minute = "0" + minute;
            }
            var second =this.time%60;
            if(second<10){
              second = "0" + second;
            }
            $(".update-time").html(minute+":"+second);
          },1000);
        },
        //文件上传--文件上传时的行为
        updateFileName(filename){
          // var prefix = Constants.apiServer;
          var requestUrl = this.api.fl_batchmonitor_upload; //导入excel接口 
          var token = localStorage.getItem("tokenF");
          $(".batch-export-monitor #update-token").val(token);
          
          this.updateTime();

          $(".batch-export-monitor .update-progress-value").addClass("active");

          $(".batch-export-monitor #aaaa").ajaxSubmit({
            type: 'post',  
            url: requestUrl,   
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            data: {
              'file': filename,
              'policyId': this.policyId
            },   
            success:(data)=> { 
              
              var data  = JSON.parse(data);
              if(data.success) {

                this.updderFileSuccess();
                this.fileName ='';
              } else {
                $(".batch-export-monitor .update-progress-value").removeClass("active");
                clearInterval(this.updateTimer);
                 swal({
                    title: "提示",
                    text: "上传失败，错误码：" + status,
                    type: "warning",
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "确定",
                    closeOnConfirm: true
                 });
                
              }
            }  
          });  
        },
        //文件上传--文件上传时的行为
        updderFileSuccess(){
          
          setTimeout(()=>{
            clearInterval(this.updateTimer);
            $(".update-time").html("00:00");
            // this.updateProgressShow = false;
            $(".batch-export-monitor .update-ing").hide();
            swal({
              title: "提醒",
              text: "上传成功",
              type: "success",
              confirmButtonColor: "#DD6B55",
              confirmButtonText: "确定",
              closeOnConfirm: true
            });
            this.getListData(1,this.pageSizeSelect,this.pagination);

          },30);
        },
        policyDetail(row){
          
          window.open('/portal/index.html#personView?policyId='+row.id+'&from=appendMonitor');
          return false;
        }
    },
    filters:{
      fileStatus(value,discount){
        var gradeStatus = {
            "WAIT": "等待",
            "PROCESSING": "正在处理",
            "COMPLETE": "处理完成",
            "FAIL": "失败",
            "DELETED": "删除"
        };
        return gradeStatus[value] || value;
      }
    },
    mounted(){
      // 获取策略列表
      this.$get(this.api.fl_policy_name_list,(result)=>{
        if(result.success){
          this.policyList = result.data;
        }
      });

      this.getListData(1,this.pageSizeSelect,this.pagination);
      this.mySelect(".select");
      this.selectTimeAll(".batch-export-monitor",()=>{//选开始时间
         this.getListData(1,this.pageSizeSelect,this.pagination);
      }); 
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
/*---------------- 监控列表样式------------*/
/*---------------- 导入监控------------*/
.batch-export-monitor{
    border-top:2px solid #6d9add;
    .update-file-section{
        border-bottom:2px solid #6d9add;
        background:#fff;
        .operate-section{
            width:870px;
            padding:75px 0;
            margin:auto;
            .operate-wrapper{
                .operate-item{
                    float: left;
                    width:33.3333%;
                    padding:0 40px;
                    .operate-item-wrap{
                        position:relative;
                        width:219px;
                        height:219px;
                        text-align:center;
                        cursor: pointer;
                        span{
                            display: inline-block;
                            margin-top:78%;
                            color:#fff;
                            font-size:18px;
                            font-family: 'Hiragino Sans GB' ,'microsoft yahei';
                        }
                    }
                    &.operate-update-icon{
                        .operate-item-wrap{
                            background:#fe9e7f url("/static/images/fengling/icon-export-monitor.png") no-repeat center;
                            background-size:cover;
                        }
                    }
                    &.operate-pull-template{
                        .operate-item-wrap{
                            background:#7fb6f0 url("/static/images/fengling/icon-pull-template.png") no-repeat center;
                            background-size:cover;
                        }
                    }
                    &.operate-template-case{
                        .operate-item-wrap{
                            background:#7fb6f0 url("/static/images/fengling/icon-template.png") no-repeat center;
                            background-size:cover;
                        }
                    }
                }
            }
        }
        .update-ing{
            display: none;
            width:100%;
            height:72px;
            border-top:1px solid #ddd;
            background:#eaf3fc;
            font-size:12px;
            color:#666;
            text-align:center;
            span{
                display: inline-block;
                &.update-file-name{
                    text-align:left;
                    // width:250px;
                    height:30px;
                    padding-left:26px;
                    line-height:30px;
                    margin-top:21px;
                    background: url("/static/images/fengling/icon-attachment.png") no-repeat 0 center;


                }
                &.update-progress{
                    position:relative;
                    top:2px;
                    display: inline-block;
                    width:250px;
                    height:10px;
                    margin:31px 12px 0px 12px;
                    text-align:left;
                    span.update-progress-value{
                        display: block;
                        width:100%;
                        height:8px;
                        background: #6d9add;
                        &.active{
                            background: #6d9add url(/static/images/fengling/progress.gif) no-repeat center;
                            background-size:120%  120%;
                        }
                        
                    }
                }
                &.update-time{
                    margin-top:26px;
                    height:20px;
                    line-height:20px;
                }
                &.ing-update{

                }
            }

        }
    }
    .table-head{
        border:none;
    }
    .table{
        th{
            border-right:1px solid #f7f7f7;
            background:#7fb6f0;
            font-weight:bold;
            &:last-of-type{
                border:none;
            }
        }
        tbody{
            tr{
                &:nth-of-type(odd){
                    background:#f7f7f7;
                }
                &:nth-of-type(even){
                    background:#fff;
                }
                td{
                    border:none;
                    a{
                        color:#333;
                        font-family: "宋体";
                        &:hover{
                            text-decoration:underline;
                            color:#cc3300;
                        }
                    }
                }
            }
        }
    }
    .add-history{
        display: none;

    }
    .update-file{
        position:absolute;
        bottom: 36px;
        right: 106px;
        width: 122px;
        height: 40px;
        background:rgba(0,0,0,.4);
        opacity: 0;
        font-size:50px;
        filter:alpha(opacity=0);
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
            width:264px;
            margin:auto;
            margin-top:88px;
            margin-bottom:36px;
            button{
                width:122px;
                height:40px;
                background:#7fb6f0;
                font-size:14px;
                color:#fff;
                &.cancel{
                    background:#a0a0a0;
                    margin-right:18px;
                }
            }
        }

    }
}
</style>
