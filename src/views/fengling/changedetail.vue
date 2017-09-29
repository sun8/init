<template>
  <div class="change-detail">
    <h3 style="margin-bottom:10px;font-size:16px;">{{$route.query.entName}}</h3>
    <div class="tab-content tab-content-clear">
      <div class="tab-pane fade active in states" id="tab_change_info" style="display:block;">
        <div class="state-des" v-if="data.entInfoModels && data.entInfoModels.length">
          <h3 class="change-detail-title" >
            企业照面信息
            <span  class="con-show" >
                收起
            </span>
          </h3>
          <div class="state-des-con">
            <table class="table change-wrap">
              <thead>
                <tr>
                  <th width="25%">变更事项</th>
                  <th width="25%">变更前内容</th>
                  <th width="25%">变更后内容</th>
                  <th width="25%">核准日期</th>
                </tr>
              </thead>
              <tbody border="1">
                <tr v-for ="row in data.entInfoModels" v-if="row.viewType == 'SINGLETABLE'">
                    <td>{{row.title == 'null'?"":row.title}}</td>
                    <td>{{row.oldValue== 'null'?"":row.oldValue}}</td>
                    <td>{{row.newValue== 'null'?"":row.newValue}}</td>
                    <td>{{row.apprDate== 'null'?"":row.apprDate}}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class=" stockList state-des" v-for ="gdgfItem in data.shareholderPriPersonModels" >
          <h3 class="change-detail-title" >
           {{gdgfItem.title}}
            <span class="con-show">
                收起
            </span>
            <span class="approveDate" v-if = "gdgfItem.apprDate">核准日期：{{gdgfItem.apprDate}}</span>
          </h3>         
          <div class="change-wrap  state-des-con clearfix" >
            <div class="change-before">
              <p>变更前</p>
              <table v-if=" gdgfItem.title == '股东股份'">
                <thead>
                  <tr>
                    <th width="1%">
                        股东名称
                    </th>
                    <th width="1%">
                        认缴出资额(万元)
                    </th>
                    <th width="1%">
                        认缴出资额币种
                    </th>
                    <th width="1%">
                        出资日期
                    </th>
                    <th width="1%">
                        出资方式
                    </th>
                    <th width="1%">
                        国别
                    </th>
                    <th width="1%">
                        股东类型
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr  v-for ="row in gdgfItem.oldChangeModel">
                    <td>
                        {{row['股东名称'] || '--'}}
                    </td>
                    <td>
                       {{row['认缴出资额(万元)'] || '--'}} 
                    </td>
                    <td>
                        {{row['认缴出资额币种'] || '--'}}
                    </td>
                    <td>
                        {{row['出资日期'] || '--'}}
                    </td>
                    <td>
                       {{row['出资方式'] || '--'}} 
                    </td>
                    <td>
                       {{row['国别'] || '--'}} 
                    </td>
                    <td>
                        {{row['股东类型'] || '--'}}
                    </td>
                  </tr>
                </tbody>
              </table>
              <table v-if=" gdgfItem.title == '管理人员'">
                <thead>
                  <tr>
                    <th width="1%">
                        人员姓名
                    </th>
                    <th width="1%">
                        性别
                    </th>
                    <th width="1%">
                        职务
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr  v-for ="row in gdgfItem.oldChangeModel">
                    <td>
                        {{row['人员姓名'] || '--'}}
                    </td>
                    <td>
                       {{row['性别'] || '--'}} 
                    </td>
                    <td>
                        {{row['职务'] || '--'}}
                    </td>
                  </tr>
                </tbody>
              </table>
              <table v-if=" gdgfItem.title == '法定代表人其他公司任职'">
                  <thead>
                      <tr>
                          <th width="1%">
                              企业(机构)名称
                          </th>
                          <th width="1%">
                              职务
                          </th>
                          <th width="1%">
                              是否法定代表人
                          </th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr  v-for ="row in gdgfItem.oldChangeModel">

                          <td>
                              {{row['企业(机构)名称'] || '--'}}
                          </td>
                          <td>
                             {{row['职务'] || '--'}} 
                          </td>
                          <td>
                              {{row['是否法定代表人'] || '--'}}
                          </td>
                      </tr>
                  </tbody>
              </table>
              <table v-if=" gdgfItem.title == '法定代表人对外投资'">
                  <thead>
                      <tr>
                          <th width="1%">
                              企业(机构)名称
                          </th>
                          <th width="1%">
                              认缴出资额(万元)
                          </th>
                          <th width="1%">
                              认缴出资币种
                          </th>
                          <th width="1%">
                              出资方式
                          </th>
                          <th width="1%">
                              出资日期
                          </th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr  v-for ="row in gdgfItem.oldChangeModel">

                          <td>
                              {{row['企业(机构)名称'] || '--'}}
                          </td>
                          <td>
                             {{row['认缴出资额(万元)'] || '--'}} 
                          </td>
                          <td>
                              {{row['认缴出资币种'] || '--'}}
                          </td>
                          <td>
                             {{row['出资方式'] || '--'}} 
                          </td>
                          <td>
                              {{row['出资日期'] || '--'}}
                          </td>
                      </tr>
                  </tbody>
              </table>
            </div>
            <div class="change-after">
              <p>变更后</p>
              <table v-if=" gdgfItem.title == '股东股份'">
                  <thead>
                      <tr>
                          <th width="1%">
                              股东名称
                          </th>
                          <th width="1%">
                              认缴出资额(万元)
                          </th>
                          <th width="1%">
                              认缴出资额币种
                          </th>
                          <th width="1%">
                              出资日期
                          </th>
                          <th width="1%">
                              出资方式
                          </th>
                          <th width="1%">
                              国别
                          </th>
                          <th width="1%">
                              股东类型
                          </th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr  v-for ="row in gdgfItem.newChangeModel">

                          <td>
                              {{row['股东名称'] || '--'}}
                          </td>
                          <td>
                             {{row['认缴出资额(万元)'] || '--'}} 
                          </td>
                          <td>
                              {{row['认缴出资额币种'] || '--'}}
                          </td>
                          <td>
                              {{row['出资日期'] || '--'}}
                          </td>
                          <td>
                             {{row['出资方式'] || '--'}} 
                          </td>
                          <td>
                             {{row['国别'] || '--'}} 
                          </td>
                          <td>
                              {{row['股东类型'] || '--'}}
                          </td>

                      </tr>
                  </tbody>
              </table>
              <table v-if=" gdgfItem.title == '管理人员'">
                  <thead>
                      <tr>
                          <th width="1%">
                              人员姓名
                          </th>
                          <th width="1%">
                              性别
                          </th>
                          <th width="1%">
                              职务
                          </th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr  v-for ="row in gdgfItem.newChangeModel">

                          <td>
                              {{row['人员姓名'] || '--'}}
                          </td>
                          <td>
                             {{row['性别'] || '--'}} 
                          </td>
                          <td>
                              {{row['职务'] || '--'}}
                          </td>

                      </tr>
                  </tbody>
              </table>
              <table v-if=" gdgfItem.title == '法定代表人其他公司任职'">
                  <thead>
                      <tr>
                          <th width="1%">
                              企业(机构)名称
                          </th>
                          <th width="1%">
                              职务
                          </th>
                          <th width="1%">
                              是否法定代表人
                          </th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr  v-for ="row in gdgfItem.newChangeModel">

                          <td>
                              {{row['企业(机构)名称'] || '--'}}
                          </td>
                          <td>
                             {{row['职务'] || '--'}} 
                          </td>
                          <td>
                              {{row['是否法定代表人'] || '--'}}
                          </td>
                      </tr>
                  </tbody>
              </table>
              <table v-if=" gdgfItem.title == '法定代表人对外投资'">
                  <thead>
                      <tr>
                          <th width="1%">
                              企业(机构)名称
                          </th>
                          <th width="1%">
                              认缴出资额(万元)
                          </th>
                          <th width="1%">
                              认缴出资币种
                          </th>
                          <th width="1%">
                              出资方式
                          </th>
                          <th width="1%">
                              出资日期
                          </th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr  v-for ="row in gdgfItem.newChangeModel">

                          <td>
                              {{row['企业(机构)名称'] || '--'}}
                          </td>
                          <td>
                             {{row['认缴出资额(万元)'] || '--'}} 
                          </td>
                          <td>
                              {{row['认缴出资币种'] || '--'}}
                          </td>
                          <td>
                             {{row['出资方式'] || '--'}} 
                          </td>
                          <td>
                              {{row['出资日期'] || '--'}}
                          </td>
                      </tr>
                  </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="out-investment state-des stockList " v-for ="columnItem in data.eInvModels">
            <h3 class="change-detail-title">
                对外投资
                <span   class="con-show">
                    收起
                </span>
                <span class="approveDate" v-if = "columnItem.apprDate">核准日期：{{columnItem.apprDate}}</span>
            </h3>         
            <div class="change-wrap state-des-con clearfix">
                <div class="change-before" v-if='columnItem.insertChangeModel.length'>
                    <p>新增</p>
                    <table>
                        <thead>
                            <tr>
                                <th width="1%">
                                    企业(机构)名称
                                </th>
                                <th width="1%">
                                    认缴出资额(万元)
                                </th>
                                <th width="1%">
                                    认缴出资币种
                                </th>
                                <th width="1%">
                                    出资方式
                                </th>
                                <th width="1%">
                                    出资日期
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr  v-for ="row in columnItem.insertChangeModel">

                                <td>
                                    {{row['企业(机构)名称'] || '--'}}
                                </td>
                                <td>
                                    {{row['认缴出资额(万元)'] || '--'}}
                                </td>
                                <td>
                                    {{row['认缴出资币种'] || '--'}}
                                </td>
                                <td>
                                    {{row['出资方式'] || '--'}}
                                </td>
                                <td>
                                    {{row['出资日期'] || '--'}}
                                </td>

                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="change-after" v-if='columnItem.deleteChangeModel.length'>
                    <p>删除</p>
                    <table>
                        <thead>
                            <tr>
                                <th width="1%">
                                    企业(机构)名称
                                </th>
                                <th width="1%">
                                    认缴出资额(万元)
                                </th>
                                <th width="1%">
                                    认缴出资币种
                                </th>
                                <th width="1%">
                                    出资方式
                                </th>
                                <th width="1%">
                                    出资日期
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr  v-for ="row in columnItem.deleteChangeModel">
                                <td>
                                    {{row['企业(机构)名称'] || '--'}}
                                </td>
                                <td>
                                    {{row['认缴出资额(万元)'] || '--'}}
                                </td>
                                <td>
                                    {{row['认缴出资币种'] || '--'}}
                                </td>
                                <td>
                                    {{row['出资方式'] || '--'}}
                                </td>
                                <td>
                                    {{row['出资日期'] || '--'}}
                                </td>

                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div class="state-des" v-if="data.eventsModels && data.eventsModels.length">
            <h3 class="change-detail-title" >
               事件
                <span class="con-show">
                    收起
                </span>
            </h3>         
            <div class="event-sub-section state-des-con change-wrap" v-for ="eventsItem in data.eventsModels" v-if="eventsItem.viewType == 'MULTITABLE'">
                <p class="event-name">{{eventsItem.title}}</p>
                <dl class="clearfix" >
                    <dd v-for ="eventName in eventsItem.eventsModelList">
                       <span class="key">{{eventName.title}}</span>
                       <span class ="value" v-html='eventName.value'></span> 
                    </dd>
                </dl>
            </div>
        </div>
      </div>
    </div>
    <div class="right-time-bar">
      <div id="right-time-bar-inner">
        <div class="right-time-bar-endPointPosition">
          <div class="timeline-rang"></div>
          <i class="end-point"></i>
          <ul>
            <li class="item-time "  v-for ="row in changeDate" @click="getChangeDetailAsDate(row.date,$event)"  >
              <p class="timeline-bar clearfix">
                <em></em>
                <span class="time-line">{{row.date}}</span>
                <span class="change-num">{{row.count}}</span>
              </p>
            </li> 
          </ul>
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
        data:{},
        changeDate:[],
        shareholderActive: false,//股东股份
        managementActive: false,//管理人员
        investmentActive: false,//对外投资
        defaultActive:false
      }
    },
    methods:{
      getChangeDetailData(pripId,date){
        var queryForm = {
          "startDate":date,
          "endDate":date
        };
        if(this.$route.query.from == "monitor"){
          this.$getData(this.api.fl_change_list+"/"+"undefined/"+ pripId + "/detail",queryForm,(result)=>{
            this.data = result.frontChangeModel;
          });
        }else{
          var condition = {
            parentId: this.$route.query.pripid,
            batchDate: this.$route.query.date
          };
          this.$getData(this.api.fl_contact_changeDetail,condition,(result)=>{
            this.data = result.relationChangeModel;
            console.log(result);
          });
        }
        
      },
      getChangeDate(){

        if(this.$route.query.from == "monitor"){
          this.$get(this.api.fl_change_list+"/"+"undefined/"+ this.$route.query.pripid+"/historyDate",(result)=>{
            this.changeDate = (result.changeDate).reverse();
            setTimeout(()=>{
              var timeEle = $(".change-detail .item-time");
              timeEle.removeClass("active");

              //给时间轴加高亮 
              $.each(this.changeDate,(i,value)=>{
                if(value.date == this.$route.query.date){
                  this.defaultActive = true;
                  timeEle.eq(i).addClass("active");
                }
              });
              //如果没匹配时间怎默认第一个--比如刷新时  
              if(!this.defaultActive){
                timeEle.eq(0).addClass("active");
              }

              //设置时间轴滚动条
              $(".change-detail #right-time-bar-inner").slimScroll({ 
                width:"166px",
                height: '475px', 
                alwaysVisible: true, 
              }); 
            },100);
          });
        }else{
          var condition = {
          orderId: this.$route.query.pripid
        }
          this.$getData(this.api.fl_contact_historyDate,condition,(result)=>{
            this.changeDate = (result.changeDate).reverse();
            setTimeout(()=>{
              var timeEle = $(".change-detail .item-time");
              timeEle.removeClass("active");

              //给时间轴加高亮 
              $.each(this.changeDate,(i,value)=>{
                if(value.date == this.$route.query.date){
                  this.defaultActive = true;
                  timeEle.eq(i).addClass("active");
                }
              });
              //如果没匹配时间怎默认第一个--比如刷新时  
              if(!this.defaultActive){
                timeEle.eq(0).addClass("active");
              }

              //设置时间轴滚动条
              $(".change-detail #right-time-bar-inner").slimScroll({ 
                width:"166px",
                height: '475px', 
                alwaysVisible: true, 
              }); 
            },100);
          });
        }
      },
      getChangeDetailAsDate(date,ev){
        var dateEle = $(ev.target).parent().parent();
        var index = dateEle.index();
        $(".change-detail .item-time").removeClass("active");
        dateEle.addClass("active");
        this.getChangeDetailData(this.$route.query.pripid,date);
      }
    },
    mounted:function(){
      
      this.getChangeDetailData(this.$route.query.pripid,this.$route.query.date);
      this.getChangeDate();

      //展开 收起切换
      $(".change-detail").on("click",".con-show",function(){
        var tabEle = $(this).parent().parent().find(".state-des-con");

        if(tabEle.css("display") == "none"){
          tabEle.css("display","block");
          $(this).removeClass("con-hide");
          $(this).html("收起");
        }else{
          tabEle.css("display","none");
          $(this).addClass("con-hide");
          $(this).html("展开");
        }
      });
    }
  }
</script>
<style lang="scss">
  .change-detail{
      position:relative;
      width:100%;
      min-height: 554px;
      padding-right:166px;
      border:none;
      overflow:hidden;
      td{
          padding:0 8px;
      }
      .change-detail-title{
          width:100%;
          height:50px;
          margin:0;
          line-height:48px;
          // border-top:2px solid #F59639;
          background:#FFF;
          font-size: 16px;
          font-weight:bold;
          color:#5E7386 ;
          .no-data{
              font-weight:normal;
              font-family: "宋体";
              font-size:12px;
              color:#888;
              margin-left:10px;

          }
          .con-show,.nodata-icon{
              float: right;
              padding-right:15px;
              padding-left:30px;
              font-size:14px;
              font-weight:normal;
              color:#9EACB4;
              cursor: pointer;
              background:url("/static/images/fengling/monitor-detail/icon-down-detail.png") no-repeat 4px center;
              background-size:16px 16px;
              &.con-hide{
                  background:url("/static/images/fengling/monitor-detail/icon-up-detail.png") no-repeat 4px center;
                  background-size:16px 16px;
              }
             
          }
          .nodata-icon{
              color:#9EACB4;
              background:url("/static/images/fengling/monitor-detail/icon-down-gray.png") no-repeat 0 center;;
          }
          .approveDate{
              font-size:12px;
              font-family:"宋体";
              color:#666;
              float: right;
              font-weight:500;
              margin-right:22px;
          }

      }
      .state-des{
        background:#fff;
        padding:0 15px;
        margin-bottom:14px;
      }
      table{
          width:100%;
          font-size:14px;
          font-family:"宋体";
          margin: 0;
          thead{
              tr{
                  background:#5B9BD1;
                  color:#fff;
                  font-size:14px;
                  font-family:"宋体";
                  font-weight:bold;
                  th{
                      height:45px;
                      line-height:20px;
                      vertical-align: middle;
                      text-align:center;
                      border:none;
                      font-weight:600;
                      padding:4px;
                      color:#fff;
                  }
              }
          }
          tbody{
              tr{
                  background:#fff;
                  border-top: 1px solid #E6E6E6;
                  td{
                      color:#666;
                      height:45px;
                      line-height:20px;
                      vertical-align: middle;
                      background:#fff;
                      font-size:12px;
                      text-align:center;

                  }

              }
          }
      }
      
      .event-name{
          color:#333;
          margin:0;
          height:45px;
          line-height:45px;
          border-top: 1px solid #e6e6e6;
          background:#fff;
          font-size:16px;
          color:#5B9BD1;
          font-family:'Hiragino Sans GB' ,'microsoft yahei';

      }
      dl{
          
          &:nth-of-type(n+1){
              // margin-top:5px;
          }    
          dd{
              width:100%;
              display: table;
              height:45px;
              span{
                  display: table-cell;
                  height:100%;
                  vertical-align: middle;
                  font-size:14px;
                  font-family:"宋体";
                  text-align:center;
                  // line-height:20px;
                  &.key{
                      width:40%;
                      padding: 0 10px;
                      background:#5B9BD1;
                      font-weight:bold;
                      color:#FFF;
                      border:none;
                      font-weight:600;
                      border-bottom:1px solid #fff;

                  }
                  &.value{
                      width:60%;
                      padding: 0 15px;
                      color:#666;
                      line-height:20px;
                      border-top: 1px solid #e6e6e6;
                      background:#fff;
                      font-size:12px;
                  }

              }
              &:last-of-type .key{
                  border-bottom:none;
              }
          }
      }
      .stockList{
          .change-before,.change-after{
              // float:left;
              // width:50%;
              // border-top: 1px solid #E6E6E6;
              p{
                 color:#5B9BD1;
                 margin:0;
                 height:45px;
                 line-height:45px;
                 border-top: 1px solid #E6E6E6;
                 background:#fff;
                 font-size:16px;
                 font-family:'Hiragino Sans GB' ,'microsoft yahei'; 
              }
          }
          .change-after{
              p{
                  color:#333;
              }
              table{
                  th{
                      &:nth-of-type(1){
                          // border-left:1px solid #fff;
                      }
                  }
                  // td{
                  //     &:nth-of-type(1){
                  //         border-left: 1px solid #e6e6e6;
                  //     }
                  // }
              }
          }
          
      }
      .right-time-bar-endPointPosition{
          position:relative;
          top:0;
          right:0;
      }    
      .right-time-bar{
          position:absolute;
          top: 8px;
          right:0px;    
          width:166px;
          // height:475px
          padding-left:6px ;
          .timeline-rang{
              margin-left:20px;
              width:10px;
              height:100%;
              position:absolute;
              top:8px;
              left:0px;
              background:url("/static/images/fengling/monitor-detail/timeline.png") repeat-y 0 10px;
          }
          .end-point{
              position:absolute;
              left: 20px;
              bottom: -10px;
              width: 4px;
              height: 4px;
              background: #BEC8D4;
              border-radius:50%;
          }
          ul{
              list-style-type: none;
              padding-top:6px;
              .item-time{
                  position:relative;
                  width:100%;
                  padding-left:20px;
                  padding-bottom:70px;
                  cursor:pointer;
                  .timeline-bar{
                      margin:0;
                      &:first-child{
                        &:before{
                          position:absolute;
                          top:0;
                          left:16px;
                          width:18px;
                          height:18px;
                          background:#e9ecf3;
                        }
                      }
                      em{
                          position: absolute;
                          top: 0;
                          left: 16px;
                          width: 14px;
                          height: 14px;
                          margin-top: 6px;
                          background:#BEC8D4; 
                          border-radius:50%;
                         
                      }
                      span{
                          color:#fff;
                          font-weight:bold;
                          font-size:12px;
                          font-family:"宋体";
                      }
                      .time-line{
                          float: left;
                          width: 102px;
                          margin-left: 12px;
                          height:25px;
                          line-height: 25px;
                          padding-left:24px;
                          background-image:url("/static/images/fengling/monitor-detail/timeline-table-normal-time.png");
                          background-repeat:no-repeat;
                          background-position:9px 0;
                          background-size:100% 100%;
                      }
                      .change-num{
                          float: left;
                          width: 25px;
                          margin-left: 1px;
                          height:25px;
                          line-height: 25px;
                          text-align:center;
                          background:#ADCDE8;
                      }
                      p{
                          margin:0;
                      }
                  }
                  &:hover{
                      em{
                          left: 6px;
                          margin-top: -4px;
                          width: 32px;
                          height: 32px;
                          background-image:url("/static/images/fengling/monitor-detail/timeline-cir-active.png");
                          background-size:32px 32px;; 
                         
                      }
                      .time-line{
                          background-image:url("/static/images/fengling/monitor-detail/timeline-table-active-time.png");
                        
                      }
                      .change-num{
                          background:#5B9BD1 ;
                      }
                      .timeline-des{
                          display: block;
                      }
                  }
                  &.active{
                      em{
                          left: 6px;
                          margin-top: -4px;
                          width: 32px;
                          height: 32px;
                          background-image:url("/static/images/fengling/monitor-detail/timeline-cir-active.png");
                          background-size:32px 32px;; 
                         
                      }
                      .time-line{
                          background-image:url("/static/images/fengling/monitor-detail/timeline-table-active-time.png");
                        
                      }
                      .change-num{
                          background:#5B9BD1 ;
                      }
                      .timeline-des{
                          display: block;
                      }
                  }
              }
          }
      }
     
      .tab-content-clear{
          width: 100%;
          float: left;
          overflow: hidden;
          .tab-pane{
              display: none;
          }
      }


      .back-list{
          position:absolute;
          top:15px;
          right:0;
          width:120px;
          height:40px;
          text-align:center;
          line-height:40px;
          background:#c0c0c0;
          border:none;
          color:#fff;
          font-size:14px;
          font-family:"宋体";
          &:hover{
              background:#a0a0a0;
          }

      }
      .expore-excel{
          right:130px;
          background-color: #c0c0c0;
          &:hover{
              background:#a0a0a0;
          }
      }
      .show-time-bar{
          right:260px;
          background-color: #7fb6f0;
      }

      .close-time-bar{
          
          background-color: #a0a0a0;
      }
      
  }
</style>
