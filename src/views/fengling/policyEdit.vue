<template>
  <div class="person-view">
      <h3 class="policy-title">
        <span v-if="$route.query.policyId && !Number($route.query.policyId)">新建策略</span>
        <span v-if="$route.query.policyId && Number($route.query.policyId)">编辑策略</span>
        <span v-if="!$route.query.policyId">默认策略</span>
      </h3>
      <div class="person-main">
          <div class="list-section">
              <div class="list-item">
                  <h3>经营变更</h3>
                  <div class="item-wrap">
                      <div class="item-tile">企业照面（基本）信息</div>
                      <div class="item-word clearfix">
                          <dl class="clearfix" v-for ="row in policyList.basic">
                              <dt>{{row.title}}</dt>
                              <dd v-if="$route.query.policyId">
                                  <div class="state-item" v-if ="row.id">
                                      <input type="radio" value="RISK" :name="row.id"  v-model="row['alert'+row.id]" >
                                      <label for="">风险</label>
                                  </div>
                                  <div class="state-item" v-if ="row.id">
                                      <input type="radio" value="ALERT" :name="row.id" v-model="row['alert'+row.id]">
                                      <label for="">预警</label>
                                  </div>
                                  <div class="state-item" v-if ="row.id">
                                      <input type="radio" value="CONCERN" :name="row.id" v-model="row['alert'+row.id]">
                                      <label for="">关注</label>
                                  </div>
                              </dd>
                              <dd v-if="!$route.query.policyId">
                                <div class="state-item-des" > 
                                    <span>{{row.alarmLevelLabel}}</span>
                                </div>
                              </dd>
                          </dl>
                      </div>
                  </div>
                  <div class="item-wrap">
                      <div class="item-tile">股东出资</div>
                      <div class="item-word clearfix">
                          <dl class="clearfix" v-for ="row in policyList.shareHolders">
                              <dt>{{row.title}}</dt>
                              <dd v-if="$route.query.policyId">
                                  <div class="state-item" v-if ="row.id">
                                      <input type="radio" value="RISK" :name="row.id" v-model="row['alert'+row.id]" >
                                      <label for="">风险</label>
                                  </div>
                                  <div class="state-item" v-if ="row.id">
                                      <input type="radio" value="ALERT" :name="row.id" v-model="row['alert'+row.id]">
                                      <label for="">预警</label>
                                  </div>
                                  <div class="state-item" v-if ="row.id">
                                      <input type="radio" value="CONCERN" :name="row.id" v-model="row['alert'+row.id]">
                                      <label for="">关注</label>
                                  </div>
                              </dd>
                              <dd v-if="!$route.query.policyId">
                                <div class="state-item-des" > 
                                    <span>{{row.alarmLevelLabel}}</span>
                                </div>
                              </dd>
                          </dl>
                      </div>
                  </div>
                  <div class="item-wrap">
                      <div class="item-tile">主要管理人员</div>
                      <div class="item-word clearfix">
                          <dl class="clearfix" v-for ="row in policyList.priperson">
                              <dt>{{row.title}}</dt>
                              <dd v-if="$route.query.policyId">
                                  <div class="state-item" v-if ="row.id">
                                      <input type="radio" value="RISK" :name="row.id" v-model="row['alert'+row.id]" >
                                      <label for="">风险</label>
                                  </div>
                                  <div class="state-item" v-if ="row.id">
                                      <input type="radio" value="ALERT" :name="row.id" v-model="row['alert'+row.id]">
                                      <label for="">预警</label>
                                  </div>
                                  <div class="state-item" v-if ="row.id">
                                      <input type="radio" value="CONCERN" :name="row.id" v-model="row['alert'+row.id]">
                                      <label for="">关注</label>
                                  </div>
                              </dd>
                              <dd v-if="!$route.query.policyId">
                                <div class="state-item-des" > 
                                    <span>{{row.alarmLevelLabel}}</span>
                                </div>
                              </dd>
                          </dl>
                      </div>
                  </div>
                  <div class="item-wrap">
                      <div class="item-tile">对外投资</div>
                      <div class="item-word clearfix">
                          <dl class="clearfix" v-for ="row in policyList.eInv">
                              <dt>{{row.title}}</dt>
                              <dd v-if="$route.query.policyId">
                                  <div class="state-item" v-if ="row.id">
                                      <input type="radio" value="RISK" :name="row.id" v-model="row['alert'+row.id]" >
                                      <label for="">风险</label>
                                  </div>
                                  <div class="state-item" v-if ="row.id">
                                      <input type="radio" value="ALERT" :name="row.id" v-model="row['alert'+row.id]">
                                      <label for="">预警</label>
                                  </div>
                                  <div class="state-item" v-if ="row.id">
                                      <input type="radio" value="CONCERN" :name="row.id" v-model="row['alert'+row.id]">
                                      <label for="">关注</label>
                                  </div>
                              </dd>
                              <dd v-if="!$route.query.policyId">
                                <div class="state-item-des" > 
                                    <span>{{row.alarmLevelLabel}}</span>
                                </div>
                              </dd>
                          </dl>
                      </div>
                  </div>
                  <div class="item-wrap">
                      <div class="item-tile">法定代表人对外投资</div>
                      <div class="item-word clearfix">
                          <dl class="clearfix" v-for ="row in policyList.ePriPersonInv">
                              <dt>{{row.title}}</dt>
                              <dd v-if="$route.query.policyId">
                                  <div class="state-item" v-if ="row.id">
                                      <input type="radio" value="RISK" :name="row.id" v-model="row['alert'+row.id]" >
                                      <label for="">风险</label>
                                  </div>
                                  <div class="state-item" v-if ="row.id">
                                      <input type="radio" value="ALERT" :name="row.id" v-model="row['alert'+row.id]">
                                      <label for="">预警</label>
                                  </div>
                                  <div class="state-item" v-if ="row.id">
                                      <input type="radio" value="CONCERN" :name="row.id" v-model="row['alert'+row.id]">
                                      <label for="">关注</label>
                                  </div>
                              </dd>
                              <dd v-if="!$route.query.policyId">
                                <div class="state-item-des" > 
                                    <span>{{row.alarmLevelLabel}}</span>
                                </div>
                              </dd>
                          </dl>
                      </div>
                  </div>
                  <div class="item-wrap">
                      <div class="item-tile">法定代表人其他公司任职</div>
                      <div class="item-word clearfix">
                          <dl class="clearfix" v-for ="row in policyList.ePriPersonPosition">
                              <dt>{{row.title}}</dt>
                              <dd v-if="$route.query.policyId">
                                  <div class="state-item" v-if ="row.id">
                                      <input type="radio" value="RISK" :name="row.id" v-model="row['alert'+row.id]" >
                                      <label for="">风险</label>
                                  </div>
                                  <div class="state-item" v-if ="row.id">
                                      <input type="radio" value="ALERT" :name="row.id" v-model="row['alert'+row.id]">
                                      <label for="">预警</label>
                                  </div>
                                  <div class="state-item" v-if ="row.id">
                                      <input type="radio" value="CONCERN" :name="row.id" v-model="row['alert'+row.id]">
                                      <label for="">关注</label>
                                  </div>
                              </dd>
                              <dd v-if="!$route.query.policyId">
                                <div class="state-item-des" > 
                                    <span>{{row.alarmLevelLabel}}</span>
                                </div>
                              </dd>
                          </dl>
                      </div>
                  </div>
                   <div class="item-wrap">
                      <div class="item-tile">组合指标信息</div>
                      <div class="item-word clearfix">
                          <dl class="clearfix" v-for ="row in policyList.combination">
                              <dt>{{row.title}}</dt>
                              <dd v-if="$route.query.policyId">
                                  <div class="state-item" v-if ="row.id">
                                      <input type="radio" value="RISK" :name="row.id" v-model="row['alert'+row.id]" >
                                      <label for="">风险</label>
                                  </div>
                                  <div class="state-item" v-if ="row.id">
                                      <input type="radio" value="ALERT" :name="row.id" v-model="row['alert'+row.id]">
                                      <label for="">预警</label>
                                  </div>
                                  <div class="state-item" v-if ="row.id">
                                      <input type="radio" value="CONCERN" :name="row.id" v-model="row['alert'+row.id]">
                                      <label for="">关注</label>
                                  </div>
                              </dd>
                              <dd v-if="!$route.query.policyId">
                                <div class="state-item-des" > 
                                    <span>{{row.alarmLevelLabel}}</span>
                                </div>
                              </dd>
                          </dl>
                      </div>
                  </div>
              </div>
              <div class="list-item">
                  <h3>事件</h3>
                  <div class="item-wrap">
                      <div class="item-word clearfix">
                          <dl class="clearfix" v-for="row in policyList.events">
                              <dt>{{row.title}}</dt>
                              <dd v-if="$route.query.policyId">
                                  <div class="state-item"  v-if ="row.id">
                                      <input type="radio" value="RISK" :name="row.id" v-model="row['alert'+row.id]" >
                                      <label for="">风险</label>
                                  </div>
                                  <div class="state-item" v-if ="row.id">
                                      <input type="radio" value="ALERT" :name="row.id" v-model="row['alert'+row.id]">
                                      <label for="">预警</label>
                                  </div>
                                  <div class="state-item" v-if ="row.id">
                                      <input type="radio" value="CONCERN" :name="row.id" v-model="row['alert'+row.id]">
                                      <label for="">关注</label>
                                  </div>
                              </dd>
                              <dd v-if="!$route.query.policyId">
                                <div class="state-item-des" > 
                                    <span>{{row.alarmLevelLabel}}</span>
                                </div>
                              </dd>
                          </dl>
                      </div>
                  </div>
              </div>
          </div>
          <div class="save-reset" v-if="$route.query.policyId">
              <button @click="saveSet()">保存设置</button>
          </div>
      </div>
      <div class="alert-window" v-show="layerAlert">
          <div class="write-policy-name">
              <h3 v-if="$route.query.policyId && !Number($route.query.policyId)">新建策略</h3>
              <h3 v-if="$route.query.policyId && Number($route.query.policyId)">编辑策略</h3>
              <p class="policyState">{{policyStateDes}}</p>
              <input class="policy-name-input" name="policyName" :class='{editPolicyName:"read-only"}' type="text" v-model="policyNameWrite" maxlength="20" :disabled ="editPolicyName" placeholder="请输入策略名称"></br>
              <span class="emptyname" style="display: none">策略名称不能为空</span>
              <span class="rename" style="display: none">策略名称已存在，请更改！</span>
          </div>
          <div>
              <button class="cancel" @click="savePolicyCancel()">取消</button>
              <button class="sure" @click="savePolicySure()">确定</button>
          </div>
      </div>
      <div class="layer" v-show="layerAlert"></div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        policyNameWrite : '',
        layerAlert : false,
        temppolicyNameWrite : "",
        loading : false,
        policyId:"",
        policyName:"",
        policyList:[],
        policyStateDes:"",
        editPolicyName:false,
        backBtn:false
      }
    },
    methods:{
      policyDetail(){
        this.loading = true;
        if(Number(this.policyId)){
          this.$get(this.api.fl_policy_edit+"/"+this.policyId,(result)=>{
            
            this.policyName = result.data.name;//
            this.temppolicyNameWrite = result.data.name;//保存策略时修改策略名input所用
            this.policyNameWrite = result.data.name;//
            this.policyList = result.data;//
            this.loading = false;

            $.each(this.policyList,function(i,value){
              if($.isArray( value )){
                if(value.length%2){
                  value.push({});
                }
                $.each(value,function(item,itemData){
                  itemData['alert'+itemData.id] = itemData.alarmLevel;
                });
              }
            });
            
          });
        }else{
          this.$get(this.api.fl_policy_create,(result)=>{
            
            this.policyName = "新建策略";
            this.policyNameWrite = "";
            this.policyList = result.data;//
            this.loading = false;

            $.each(this.policyList,function(i,value){
              if($.isArray( value )){
                if(value.length%2){
                  value.push({});
                }
              }
              $.each(value,function(item,itemData){
                  itemData['alert'+itemData.id] = itemData.alarmLevel;
                  console.log(itemData);
              });
            });
          })
        }
      },
      //设定参数
      resetParams(){
        var params = "";
        var policyIndicatorList = [];
        var name= encodeURIComponent( this.policyNameWrite);
        var index = 0;
        console.log(this.policyList);
        $.each(this.policyList,function(i,value){
          if($.isArray( value )){ // id，name 不是数据需排除
            $.each(value,function(item,itemData){
                if(itemData.id){
                  var indicatorId = itemData.id;
                  var alarmLevel = itemData['alert'+itemData.id];
                  params+="&policyIndicatorList["+index+"].indicatorId="+indicatorId;
                  params+="&policyIndicatorList["+index+"].alarmLevel="+alarmLevel;
                  index++;
                }
            });
          }
        });
        params+="&id="+this.policyId+"&name="+name;
        return params.substring(1,params.length);
      },
      //保存策略控制弹框
      saveSet(){
        this.layerAlert = true;
        if(Number(this.$route.query.policyId)){
          this.policyStateDes = "请输入修改后的策略名称";
        }else{
          this.policyStateDes = "请输入新的策略名称";
        }
      },
      // 保存策略获取数据
      savePolicySure(){
        if(this.policyNameWrite != ""){
          //判断策略名称是否重复
          var policyNameWrite=this.policyNameWrite==undefined?'':this.policyNameWrite;
          if(policyNameWrite != this.temppolicyNameWrite ){
            if(!Number(this.policyId)){
              this.policyId = "";
            }
            this.$getData(this.api.fl_policy_name_is_has,{"id":this.policyId,"name":policyNameWrite},
              (result)=>{
              
                if(result.data.isExist){
                  $(".person-view .rename").show();
                  setTimeout(function(){
                    $(".person-view .rename").hide();
                  },2000);
                }else{

                  var params = this.resetParams();
                  this.$post(this.api.fl_policy_save+"?"+params,{},(result)=>{
                    this.layerAlert = false;
                    if(result.success==true){
                      // $state.go("personListView");
                      this.$router.push({
                        "name":"策略分组"
                      })
                    }

                  });
                } 
            });
          }else{
            var params = this.resetParams();
            this.$post(this.api.fl_policy_save+"?"+params,{},(result)=>{
              this.layerAlert = false;
              if(result.success==true){
                // $state.go("personListView");
                this.$router.push({
                  "name":"策略分组"
                })
              }

            });
          }
          
        }else{
          
          $(".person-view .emptyname").show();
          setTimeout(function(){
             $(".person-view .emptyname").hide();
          },2000);
        }
      },
      //取消策略初始化
      savePolicyCancel(){
        if(this.$route.query.policyId){
          this.policyNameWrite = this.temppolicyNameWrite;
        }else{
          this.policyNameWrite = "";
        }
        this.layerAlert = false;
      }
    },
    mounted(){
      
      var locataionH= window.location.href;
      var n= locataionH.indexOf('#/');
      var pathHref= locataionH.substring(n);
      // console.log(pathHref);
      //传到index页面 
      sessionStorage.setItem('policyEdit',pathHref);

      this.policyId = this.$route.query.policyId==undefined?"":this.$route.query.policyId;
      if(this.$route.query.from == 'policyList'){
        this.backBtn = true;
      }
      if(this.$route.query.from == 'appendMonitor'){
        this.editPolicyName = true;
      }
      this.policyDetail();
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .layer {
      position: fixed;
      top: 0;
      left:0;
      right:0;
      bottom:0;
      height: 100%;
      background: rgba(40,60,86,.5);
  }
  .person-view{
      h3{
        margin:0;
      }
      dl{
        margin-bottom: 0px;
      }
      .policy-title{
        font-size:16px;
        margin-bottom:12px;
      }
      .back-history{
          position: absolute;
          right: 0;
          top: 12px;
          width: 122px;
          height: 40px;
          text-align: center;
          background: #c0c0c0;
          line-height: 40px;
          font-size: 14px;
          color: #fff;
          font-weight:500;
          font-family: "宋体";
          text-decoration: none;
          &:hover{
              color: #fff;
              text-decoration: none;
              background-color:#a0a0a0;
          }
      }
      .person-main{
          .write-policy-name{
              text-align:center;
              margin-top:30px;
              input{
                  padding-left:8px;
                  width:300px;
                  height:30px;
              }
          }
          .list-section{
              padding:20px 20px 20px;
              border:1px solid #ddd;
              background:#fff;
              .list-item{
                  h3{
                    width:100%;
                    height:46px;
                    padding-left:15px;
                    line-height:46px;
                    background:#5B9BD1;
                    font-size:16px;
                    font-weight:bold;
                    color:#fff;
                  } 
                  .item-wrap{
                      .item-tile{
                          width:100%;
                          height:44px;
                          padding-left:15px; 
                          border-top:1px solid #E6E6E6;
                          line-height:44px;
                          font-size:16px;
                          color:#5B9BD1;
                      }
                      .item-word{
                          dl{
                              float: left;
                              width:50%;
                              &:nth-of-type(even){
                                dd{
                                  border-right:1px solid #E6E6E6;
                                }
                              }
                              dt{
                                float: left;
                                width:55%;
                                height:46px;
                                padding-left:15px;
                                background-color:#F9FBFC;
                                line-height: 46px;
                                text-align:left;
                                font-size:14px;
                                color:#323232;
                                font-weight:400;
                                border-top:1px solid #E6E6E6;
                                border-left:1px solid #E6E6E6;
                              }
                              dd{
                                  float: left;
                                  width:45%;
                                  height:46px;
                                  padding:0 26px;
                                  border-top:1px solid #E6E6E6;
                                  border-left:1px solid #E6E6E6;
                                  line-height: 46px;
                                  text-align:center;
                                  font-size:12px;
                                  .state-item{
                                      float: left;
                                      width:33.333%;
                                      height:45px;
                                      line-height:45px;
                                      text-align:center;
                                      div{
                                          display: inline;
                                          width:auto;
                                          span{
                                              display: inline;
                                          }
                                      }
                                      input{
                                          position:relative;
                                          top:3px;
                                       }
                                      label{
                                          display: inline;
                                      }
                                  }
                              }
                          }
                      }
                  } 
                  &:last-child{
                    .item-wrap:last-child{
                      dl:nth-last-of-type(2){
                        border-bottom:1px solid #E6E6E6;
                      }
                      dl:last-child{
                        border-bottom:1px solid #E6E6E6;
                      }
                    }
                  }      
              }
          }    
          .save-reset{
              margin:40px 0 80px;
              text-align: center;
              button{
                  width: 122px;
                  height: 40px;
                  text-align: center;
                  background: #5B9BD1;
                  line-height: 40px;
                  font-size: 14px;
                  color: #fff;
                  font-weight:500;
                  font-family: "宋体";
                  border:none;
                  &:hover{
                    background-color: #1479CC;
                  }
              }
          }
      }
      .alert-window{
          display: block;
          h3 {
              font-weight: 600;
              font-size: 20px;
              margin-bottom: 22px;
              margin-top: 22px;
          }
      }
      .layer{
          display: block;
      }
  }
</style>
