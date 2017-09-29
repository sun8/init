<template>
  <div class="person-list-view">
      <div class="btn-operate">
        <div class="operate-item">
          <router-link to="/policyEdit"> 
            <a class="seeDefault" >查看默认策略</a>
          </router-link>
        </div>
        <div class="operate-item">
          <div class="save-reset">
              <button @click="gotoPersonView()">添加策略</button>
          </div>
        </div>
        
      </div>
      <div class="person-main">
          <div class="items">
              <table class="table">
                  <thead>
                      <tr >
                          <th width="8%">序号</th>
                          <th width="24%">策略名称</th>
                          <th width="24%">建立日期</th>
                          <!-- <th width="16%">状态</th> -->
                          <th width="28%">操作</th>
                      </tr>
                  </thead>
                  <tbody v-show="!isLoading">
                      <tr v-for ="(row,index) in policyList" class="hasNum">
                          <td>{{index + 1}}</td>
                          <td>{{row.name}}</td>
                          <td>{{row.createdAt}}</td>
                          <!-- <td ng-class="{'red':row.status=='ACTIVE'}">{{row.status | policyStatus}}</td> -->
                          <td class="pulse-off-operation" >
                              <!-- <span ng-class="{startOperation:row.status == 'INACTIVE',startOffOperation:row.status == 'ACTIVE'}" @click ="modifyState(row)" >{{row.status | policyStatusBtn}}</span> -->
                              <span class="edit-operation" @click ="gotoPersonView(row)">编辑</span>
                              <span class="remove-operation" @click ="deletePolicy(row)">移除</span>
                          </td>
                      </tr>
                      <tr v-for ="item in tableLessNum" v-if ="policyList.length > 0">
                          <td></td>
                          <td></td>
                          <!-- <td></td> -->
                          <td></td>
                          <td></td>
                      </tr>
                  </tbody>
                  <tbody v-show="isLoading">
                      <tr>
                          <td colspan="4" class="text-center"> 数据加载中 ... </td>
                      </tr>
                  </tbody>
                  <tbody v-show="policyList.length == 0 && !isLoading" class="empty">
                      <tr >
                          <td colspan="4" class="text-center"> 结果为空 </td>
                      </tr>
                      <tr>
                          <td colspan="4"></td>
                      </tr>
                      <tr>
                          <td colspan="4"></td>
                      </tr>
                      <tr>
                          <td colspan="4"></td>
                      </tr>
                      <tr>
                          <td colspan="4"></td>
                      </tr>
                  </tbody>
              </table>
             
          </div>
         
      </div>
      
  </div>
</template>

<script>
  export default {
    data () {
      return {
       isLoading:true,
       policyList:[],
       tableLessNum:[],
       pageSizeSelect:10,
      }
    },
    methods:{
      gotoPersonView(row) {
        if(row){
          this.$router.push({"name":"策略详情",query:{
            "policyId":row.id,
            "from":"policyList"
          }});
        }else{
          if(this.policyList.length >= 10){
            swal({
               title: "确认",
               text: "策略最多只能添加十个",
               type: "info",
               showCancelButton: false,
               confirmButtonColor: "#DD6B55",
               confirmButtonText: "确认",
               closeOnConfirm: true,
            });
          }else{
            this.$router.push({"name":"策略详情",query:{
              "policyId":"no",
              "from":"policyList"
            }});
          }
         }
      },
      search(){
        var pageSize = Number(this.pageSizeSelect);
        this.isLoading = true;
        this.$get(this.api.fl_policy_name_list,(result)=>{

          this.policyList = result.data.slice(0,10);
          this.isLoading = false;
          if(this.policyList.length >0){
              this.tableLessNum = this.myTableLessNum(5,this.policyList.length);
          }
        })
      },
      deletePolicy(row){
        this.$get(this.api.fl_policy_is_has+row.id,(result)=>{
        // personViewService.ifHasOrderUsing(row.id).success(function(result){
          var policyId = row.id;
          if(result.ifDelete){
            swal({
              title: "确认",
              text: "确认删除策略吗？",
              type: "info",
              showCancelButton: true,
              confirmButtonColor: "#DD6B55",
              confirmButtonText: "确认",
              cancelButtonText: "取消",
              closeOnConfirm: true,
              closeOnCancel: true
              },(isConfirm)=> {
                if (isConfirm) {
                  this.$get(this.api.fl_policy_delete+policyId,(result)=>{
                    this.policyList = result.data;
                  });
                }
              });
          }else{
            swal({
               title: "确认",
               text: "有订单正在使用该策略,无法删除",
               type: "info",
               showCancelButton: true,
               confirmButtonColor: "#DD6B55",
               confirmButtonText: "确认",
               cancelButtonText: "取消",
               closeOnConfirm: true,
               closeOnCancel: true
             });
            return false;
          }
        });
      }
    },
    mounted(){
      this.search();
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .person-list-view{
    .person-main{
      padding:20px;
      background:#fff;
    }
    table{
      tbody{
        tr{
          td{
            &.red{
              color:#cc3300;
            }
            &.pulse-off-operation{
              span{
                margin:0 4.6%;
                color:#ADC2D0;
                padding:4px 0;
                padding-left:24px;
                cursor: pointer;
                &.startOperation{
                  background:url("/static/images/fengling/icon-play-normal.png") no-repeat 0 center;
                  background-size: 24px;
                  &:hover{
                    color:#6d9aDD;
                    background:url("/static/images/fengling/icon-play-mouseon.png") no-repeat 0 center;
                    background-size: 24px;
                  }
                }
                &.startOffOperation{
                  background:url("/static/images/fengling/icon-stop.png") no-repeat 0 center;
                  background-size: 24px;
                  cursor:default;
                }
                &.edit-operation{
                  background:url("/static/images/fengling/icon-edit-normal.png") no-repeat 0 center;
                  background-size: 24px;
                  &:hover{
                    color:#5B9BD1;
                    background:url("/static/images/fengling/icon-edit-mouseon.png") no-repeat 0 center;
                    background-size: 24px;
                  }
                }
                &.remove-operation{
                  background:url("/static/images/fengling/icon-delete-normal.png") no-repeat 0 center;
                  background-size: 24px;
                  &:hover{
                    color:#5B9BD1;
                    background:url("/static/images/fengling/icon-delete-mouseon.png") no-repeat 0 center;
                    background-size: 24px;
                  }
                }
              }
            }
          }
        }
      }
    }
    .btn-operate{
      height:40px;
      margin-bottom:10px;
      .operate-item{
        float: right;
        a{
          display:block;
        }
      }
    }

    .save-reset {
      float: right;
      width: 100px;
      height: 40px;
      button{
        width: 100px;
        height: 40px;
        padding-left:30px;
        border: none;
        font-size: 14px;
        text-align:left;
        color: #fff;
        background:#4DB3A4 url("/static/images/fengling/enter-add-monitor.png") 10px 11px no-repeat;
        background-size:16px 16px;
        &:hover{
          background: #FFF url("/static/images/fengling/enter-add-monitor-mouseon.png") 10px 11px no-repeat;
          background-size:16px 16px;
          border:1px solid #4DB3A4;
          color:#4DB3A4;
        }
      }
    }
    .seeDefault{
      width: 114px;
      height: 40px;
      margin-left:20px;
      background: #5B9BD1;
      line-height: 40px;
      font-size: 14px;
      text-align: center;
      color: #fff;
      font-family: "宋体";
      &:hover{
        background-color: #1479CC;
      }
    }
  }
</style>
