<!-- MK -->
<template>
  <div class="monitor-change-list">
    <!-- <input v-date-time class="time1" type="text"  placeholder="开始日期" v-model="queryForm.startdate" readonly>
    <input v-date-time class="time2" type="text"  placeholder="结束日期" v-model="queryForm.endDate" readonly> -->
    <!-- <button @click='SDate()'>搜索</button> -->
    <el-date-picker v-model="value1" type="date" placeholder="选择日期" :picker-options="pickerOptions0">
    </el-date-picker>
    <el-date-picker v-model="value2" type="date" placeholder="选择日期" :picker-options="pickerOptions0">
    </el-date-picker>
    <input type="text" placeholder="输入内容" class="input_content" />
    <el-button @click='SDate()'>搜索</el-button>
    <div>
        <table class="table_father">
            <thead>
                <tr>
                    <td>内容</td>
                    <td>产品</td>
                    <td>时间</td>
                </tr>
            </thead>
            <tbody v-if="ta_history.length != 0">
                <tr v-for="(item,index) in ta_history">
                    <td>{{item.content}}</td>
                    <td>{{item.productName}}</td>
                    <td>{{item.logDate}}</td>
                </tr>
                <tr></tr>
            </tbody>
            <tbody v-else>
              <tr><td colspan="3">当前历史为空快快去查询吧~ ~</td></tr>
            </tbody>
        </table>
        <el-button type="primary" :disabled="disLeft" @click='upPage'>上一页</el-button>
        <el-button type="primary" :disabled="disRight" @click='nextPage'>下一页</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
            ta_history:{},//内容
            startDate:'',
            endDate:'',
            queryForm:{},//开始时间、结束时间、搜索内容
            page: 1,//页数
            size: 20,//条数
            value1: '',//时间的第一二个值
            value2: '',
            value3: '',//内容搜索的值
            disLeft: false,//上一页下一页按钮
            disRight: true,
        }
    },
    mounted:function(){
      console.log(456)
        var _this = this;
      _this.axios.get(this.api.common_history).then((res)=>{
            _this.ta_history = res.data.result.historyList;
            if(_this.ta_history.length < 20){
              _this.disLeft = false;
              _this.disRight = false;
            }else{
              _this.disLeft = true;
              _this.disRight = false;
            }
      });
    },
    methods: {
      // 点击时间搜索，分別需要开始时间以及结束时间
        SDate(a){
          console.log(this.queryForm)
          this.value1 = $(".el-input__inner").eq(0).val();
          this.value2 = $(".el-input__inner").eq(1).val();
          this.value3 = $(".input_content").val();
          this.axios.get(this.api.common_history + '?startTime='+this.value1 + '&endTime=' + this.value2 + '&content='+this.value3).then((res)=>{
            console.log(879)
            this.ta_history = res.data.result.historyList;
            console.log(this.ta_history);
            if(this.ta_history.length < 20){
              this.disLeft = true;
              this.disRight = true;
            }else{
              this.disLeft = true;
              this.disRight = false;
            }
          })
        },
        // 上一页获取数据,传输开始时间以及结束时间，还有搜索内容
        upPage(){
          this.page -= 1
          this.axios.get(this.api.common_history + '?page='+this.page+'&size='+this.size+'&startTime='+this.value1 + '&endTime=' + this.value2 + '&content='+this.value3).then((res)=>{
            console.log(879)
            this.ta_history = res.data.result.historyList;
            console.log(this.ta_history);
          }).catch(err=>{
            console.log(err);
          })
          if(this.page <= 1){
              this.disLeft = true;
              this.disRight = false;
              return ;
          }
      },
      // 下一页获取数据，传输开始时间以及结束时间，还有搜索内容
      nextPage(){
          this.page += 1
          console.log(this.page);
          this.axios.get(this.api.common_history + '?page='+this.page+'&size='+this.size+'&startTime='+this.value1 + '&endTime=' + this.value2 + '&content='+this.value3).then((res)=>{
          console.log(879)
          console.log(res);
          this.ta_history = res.data.result.historyList;
            console.log(this.ta_history);
            if(this.ta_history.length < 20){
              this.disLeft = false;
              this.disRight = true;
            }
          }).catch(err=>{
            console.log(err);
        })
      },
      func(texts){
          return function(){
            return texts
          }
      }
    }
  }
</script>

<style lang="scss" type="text/css">
   .table_father{
     width: 100%;
     text-align: center;
     margin: 20px 0;
     td{
        border: solid 1px #777;
        padding: 10px;
     }
     thead{
      background: #ccc;
     }
   }
   .time{
    padding: 5px;
   }
   .el-input__inner{
    margin-right: 20px;
   }
   .input_content{
    height: 36px;
    border: solid 1px #bfcbd9;
    padding: 0 10px;
   }
</style>
