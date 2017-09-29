<template>
  <div>
    <div class="row">
      <div class="col-md-3">
        <div class="widget-thumb">
          <h4>在营企业总数</h4>
          <div class="widget-thumb-wrap">
            <i class="bg-green"></i>
            <div class="widget-thumb-body">
              <span class="widget-thumb-subtitle"></span>
              <span class="widget-thumb-body-stat">{{totaInUKEnterprises.ent}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="widget-thumb">
          <h4>在营个体总数</h4>
          <div class="widget-thumb-wrap">
            <i class="bg-red"></i>
            <div class="widget-thumb-body">
              <span class="widget-thumb-subtitle"></span>
              <span class="widget-thumb-body-stat">{{totaInUKEnterprises.ind}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="widget-thumb">
          <h4>统一社会信用代码</h4>
          <div class="widget-thumb-wrap">
            <i class="bg-purple"></i>
            <div class="widget-thumb-body">
              <span class="widget-thumb-subtitle"></span>
              <span class="widget-thumb-body-stat">{{totaInUKEnterprises.code}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-3 padding0">
        <div class="widget-thumb">
          <h4>今年成立企业数</h4>
          <div class="widget-thumb-wrap">
            <i class="bg-blue"></i>
            <div class="widget-thumb-body">
              <span class="widget-thumb-subtitle"></span>
              <span class="widget-thumb-body-stat">{{totaInUKEnterprises.entYear}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <section>
      <grid-layout
          class="grid_layout"
          :layout="layout"
          :col-num="12"
          :row-height="30"
          :is-draggable="true"
          :is-resizable="true"
          :vertical-compact="true"
          :use-css-transforms="true"
    >

        <grid-item
           class="grid_item"
           v-for="(item, index) in layout.slice(0,5)"
           :x="item.x"
           :y="item.y"
           :w="item.w"
           :h="item.h"
           :i="item.i"
           @resized="resizedEvent"
           @moved="movedEvent"
           >

           <div class="gridBlock">
   				   <h2>{{chartOptionsTitle[index]}}</h2>
                <div class="echarts-react">
						      <chart :options="chartOptions[index]" ></chart>
   					    </div>
 			    </div>

        </grid-item>

         <grid-item
           class="grid_item"
           :x="layout[5].x"
           :y="layout[5].y"
           :w="layout[5].w"
           :h="layout[5].h"
           :i="layout[5].i"
           @resized="resizedEvent"
           @moved="movedEvent"
           >

           <div class="gridBlock">
             <div class="gridBlockMap">
               <h2>{{chartOptionsTitle[5]}}</h2>
               <el-tabs v-model="activeName2" type="card" @tab-click="handleClick" style="float:left;margin-top:10px">
                  <el-tab-pane label="监控密度" name="first"></el-tab-pane>
                  <el-tab-pane label="变更密度" name="second"></el-tab-pane>
                  <el-tab-pane label="风险密度" name="third"></el-tab-pane>
              </el-tabs>
             </div>

   					  <div class="echarts-react">
						    <ECharts :options="chartOptions[5]"></ECharts>
   					  </div>
 				   </div>

        </grid-item>
    </grid-layout>
    </section>
  </div>


</template>
<script>
  //引入头部列表
  // import Headers from '../../components/Headers';

  // 引入请求函数
import {
	getLatestChangeStat,
	getRadarMap,

	getMonitorDensity,
	getChangeDensity,
	getRiskDensity,

	getEnterpriseCapitalRegistration,
	getEnterpriseQquantity,
	getEnterpriseRegistrationTime,

	getTotaInUKEnterprises,
} from '../../common/util/dataRequest';
//end 引入请求函数

// 引入构建option的函数
import {
	buildLatestChangeOption,
	buildChangeRadar,

	buildMonitorDensityOption,
	buildChangeDensityOption,
	buildRiskDensityOption,

	buildEnterpriseCapitalRegistrationOption,
	buildEnterpriseQquantityOption,
	buildEnterpriseRegistrationTimeOption,

	buildTotaInUKEnterprisesOption
} from '../../common/util/buildChartOption';
// end 引入构建option的函数

  //布局
  import {GridLayout,GridItem} from 'vue-grid-layout';

  import ECharts from 'vue-echarts/components/ECharts.vue'
  import chart from 'Vue-eCharts';
//绘制图表
  import 'echarts/lib/chart/bar'
  import 'echarts/lib/chart/pie'
  import 'echarts/lib/chart/line'
  import 'echarts/lib/chart/radar'
  import 'echarts/lib/chart/map'
  import 'echarts/lib/component/legend'
  import 'echarts/lib/component/visualMap'
  import 'echarts/lib/component/polar'
  import '../../common/data/china';

  export default {
    components:{
      GridLayout,
      GridItem,
	    chart,
      ECharts
    },
    props:['initOptions'],
    data () {

      if(!this.getUIState()){

      let layoutData = [
              {"x":0,"y":0,"w":6,"h":12,"i":"0"},
              {"x":6,"y":0,"w":6,"h":12,"i":"1"},
              {"x":0,"y":6,"w":6,"h":12,"i":"2"},
              {"x":6,"y":6,"w":6,"h":12,"i":"3"},
              {"x":0,"y":12,"w":6,"h":12,"i":"4"},
    		      {"x":6,"y":12,"w":6,"h":12, "i":"5"}
          ];
        this.setUIState(layoutData);
      }


      return {

        layout: this.getUIState(),

		    totaInUKEnterprises: {
          ent:null,
          ind:null,
          code:null,
          entYear:null
        },

        chartOptions: [],
        chartOptionsTitle:['按行业分类企业数量TOP10','整体概览','企业注册资本','按企业注册时间查询总量','指标概要','变更趋势'],

        activeName2: 'first'
        // autoResize:true
      }

    },
    computed:{


    },
    mounted(){


      this.getLatestChangeStat();
  		this.getRadarMap();

  		this.getMonitorDensity();

  		this.getEnterpriseCapitalRegistration();
  		this.getEnterpriseQquantity();
  		this.getEnterpriseRegistrationTime();

  		this.getTotaInUKEnterprises();
    },
    methods: {
      //调整布局后的回掉函数（大小）
        resizedEvent: function(i, newH, newW, newHPx, newWPx){
          console.log("RESIZED i=" + i + ", H=" + newH + ", W=" + newW + ", H(px)=" + newHPx + ", W(px)=" + newWPx);
      },
      //调整布局后的回掉函数（位置）
        movedEvent: function(i, newX, newY){
            console.log("MOVED i=" + i + ", X=" + newX + ", Y=" + newY);
        },

      //布局数据变化后的回调函数，将变化后的数据本地存储，并更新视图
      	// onLayoutChange(layout, layouts){
      	// 	this.setUIState(layouts);
        //   this.layouts = layouts ;
        //   this.layout = layout;
      	// }

  //获取本地布局参数
      getUIState(){
  		return JSON.parse(localStorage.getItem('uiState'));
  	},
    //设置本地存储 布局参数
    	setUIState(layouts){
    		localStorage.setItem('uiState', JSON.stringify(layouts));
    	},


//密度切换
      handleClick(tab, event) {
        console.log(tab.index, event);
        switch (tab.index) {
          case 0:
            console.log(tab.label);
          break;
          case 1:
            console.log(tab.label);
          break;
          case 2:
            console.log(tab.label);
          break;
          default:
            console.log(tab.label);

        }
      },

//数据请求
      // 整体概览 1
    	getLatestChangeStat(){
    		getLatestChangeStat( ({success, statResult})=>{

    			if(!success) return;


    			this.chartOptions[1] = buildLatestChangeOption(statResult);
          console.log(this.chartOptions[1]);

    		} );
    	},


      // 请求雷达图数据 4
    	getRadarMap(){

    		getRadarMap( ( {data, success} )=>{
    			if(!success) return;

    			this.chartOptions[4] =  buildChangeRadar(data);


    		} );
    	},

    	// 请求监控密度, 5
    	getMonitorDensity(){
    		getMonitorDensity( ({success, statResult,proviceCount})=>{
    				if(!success) return;
    				this.chartOptions[5] = buildMonitorDensityOption(statResult);

    		} );
    	},

    	// 请求变更密度, 5
    	getChangeDensity(){
    		getChangeDensity( ({success, statResult,proviceCount})=>{
    				if(!success) return;
    				this.chartOptions[5] = buildChangeDensityOption(statResult);


    		} );
    	},

    	// 请求风险密度, 5
    	getRiskDensity(){
    		getRiskDensity( ({success, statResult,proviceCount})=>{

    				if(!success) return;
    				this.chartOptions[4] = buildRiskDensityOption(statResult);

    		} );
    	},

      //企业注册资本 2
    	getEnterpriseCapitalRegistration(){

    		getEnterpriseCapitalRegistration(({code,result})=>{
    			if(code!==200) return;
    			this.chartOptions[2] = buildEnterpriseCapitalRegistrationOption(result.pie);

    		})
    	},

      //企业数量 0
    	getEnterpriseQquantity(){

    		getEnterpriseQquantity(({code,result})=>{
    			if(code!==200) return;
    			this.chartOptions[0] = buildEnterpriseQquantityOption(result);

    		})
    	},

      //企业注册时间查询总量 3
    	getEnterpriseRegistrationTime(){

    		getEnterpriseRegistrationTime(({code,result})=>{

    			if(code!==200) return;
    			this.chartOptions[3] = buildEnterpriseRegistrationTimeOption(result);

    		})
    	},

      //在营企业总数
    	getTotaInUKEnterprises(){

    		getTotaInUKEnterprises(({code,result})=>{
    			if(code!==200) return;
    			let totaInUKEnterprises = buildTotaInUKEnterprisesOption(result);
          this.totaInUKEnterprises = totaInUKEnterprises;
          console.log(this.initOptions);
    		})
    	},

    },
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style type="text/css" lang="scss" scoped>
section{
  margin: 0 -10px;
}
.row{
  margin: 0;
  padding:10px;
  background-color: #fff;
}
.col-md-3{
    box-sizing: border-box;
    float: left;
    width: 25%;
		height: 142px;
		overflow: hidden;
    padding: 0 0;
    padding-right: 10px;
    position: relative;
    min-height: 1px;
}
.padding0{
    padding-right: 0;
}
.widget-thumb{
    border: 1px solid #e7ecf1;
    padding: 20px;
    background: #fff;
		overflow: hidden;
    h4{
				height: 18px;
        font-size: 16px;
        font-weight: 600;
        color: #8e9daa;
        margin: 0 0 20px;
        font-family: "Open Sans",sans-serif;
        line-height: 1.1;
        text-transform: uppercase;
				overflow: hidden;
    }
}


.widget-thumb-wrap{
    overflow: hidden;
    i{
        float: left;
        width: 60px;
        height: 60px;
        display: inline-block;
        font-size: 20px;
        line-height: 41px;
        color: #fff;
        text-align: center;
        padding: 10px;
        margin-right: 15px;
        border-radius: 10px;
    }
    .bg-green{
        background: #4DB3A4 url('../../assets/echart_icon/enterprise.png') no-repeat 13px 13px !important;
        background-size: 34px 34px !important;
    }
    .bg-red {
        background: #F36A5A url('../../assets/echart_icon/individual.png') no-repeat 13px 13px !important;
        background-size: 34px 34px !important;
    }
    .bg-purple {
        background: #5B9BD1 url('../../assets/echart_icon/honor.png') no-repeat 13px 13px !important;
        background-size: 34px 34px !important;
    }
    .bg-blue{
        background: #A276A4 url('../../assets/echart_icon/built.png') no-repeat 13px 13px !important;
        background-size: 34px 34px !important;
    }
}
.widget-thumb-body{
    overflow: hidden;

    .widget-thumb-subtitle{
        padding-top: 2px;
        display: block;
				height: 21px;
        font-size: 14px;
        font-weight: 600;
        color: #8e9daa;
    }
    .widget-thumb-body-stat{
        display: block;
        font-size: 20px;
        font-weight: 600;
        color: #3e4f5e;
    }
}
//
  .grid_item{
    background-color: #fff;
  }
.gridBlock{
  margin-bottom: 40px;
  h2{
    height: 56px;
    font: 16px/56px "微软雅黑";
    text-indent: 20px;
    color: #5E7386;
  }
}
.gridBlockMap{
  height: 56px;
  h2{
    float: left;
    margin-right: 50px;
  }

}
.echarts{
  width:100% !important;

  div{
    width:100% !important;
  }
  canvas{
    width:100% !important;
  }
}
</style>
