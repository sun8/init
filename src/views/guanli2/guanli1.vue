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
           v-for="item in layout"
           :x="item.x"
           :y="item.y"
           :w="item.w"
           :h="item.h"
           :i="item.i"
           >

           <div class="gridBlock">
   					<h2>{{item.title}}</h2>
   					<div class="echarts-react">
   						<!-- <ReactEcharts
   							option={latestChangeOption}
   							{...{
   								style: {
   									position: 'absolute',
   									top: 52,
   									left: 0,
   									right: 0,
   									bottom: -30
   								}
   							}}
   						/> -->
   					</div>

 				   </div>

        </grid-item>
        <!-- <grid-item
           class="grid_item"
           :x="layoutMap.x"
           :y="layoutMap.y"
           :w="layoutMap.w"
           :h="layoutMap.h"
           :i="layoutMap.i"
           >

           <div class="gridBlock">
   					<h2>{{layoutMap.i}}</h2>
   					<div class="echarts-react">

   					</div>

 				   </div>

        </grid-item> -->
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

	getEnterprise,
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

	buildEnterpriseOption,
	buildEnterpriseCapitalRegistrationOption,
	buildEnterpriseQquantityOption,
	buildEnterpriseRegistrationTimeOption,

	buildTotaInUKEnterprisesOption
} from '../../common/util/buildChartOption';
// end 引入构建option的函数

  //布局
  import {GridLayout,GridItem} from 'vue-grid-layout';


  var testLayout = [
          {"x":0,"y":0,"w":6,"h":12,"i":"0","title":"按行业分类企业数量TOP10"},
          {"x":6,"y":0,"w":6,"h":12,"i":"1","title":"整体概览"},
          {"x":0,"y":6,"w":6,"h":12,"i":"2","title":"企业注册资本"},
          {"x":6,"y":6,"w":6,"h":12,"i":"3","title":"按企业注册时间查询总量"},
          {"x":0,"y":12,"w":6,"h":12,"i":"4","title":"指标概要"}
      ];

  var testLayoutMap = {"x":6,"y":12,"w":6,"h":12,"i":"变更趋势"};

  export default {
    components:{
      GridLayout,
      GridItem,
    },
    data () {
      return {
        layout: testLayout,
        layoutMap:testLayoutMap,

				totaInUKEnterprises: {
          ent:null,
          ind:null,
          code:null,
          entYear:null
        },
        chartOptions: {
  				latestChangeOption: null,
  				radarMapOption: null,

  				densityOption: null,

  				enterpriseCapitalRegistrationOption: null,
  				enterpriseQquantityOption: null,
  				enterpriseRegistrationTimeOption:null

  			}
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

      // 整天概况
    	getLatestChangeStat(){

    		getLatestChangeStat( ({success, statResult})=>{
    			if(!success) return;


    			let latestChangeOption = buildLatestChangeOption(statResult);

    			let {chartOptions} = this;
          this.chartOptions = {
    					...chartOptions,
    					latestChangeOption
    				}
    		} );
    	},


      // 请求雷达图数据
    	getRadarMap(){

    		getRadarMap( ( {data, success} )=>{
    			if(!success) return;

    			let radarMapOption =  buildChangeRadar(data);
          let {chartOptions} = this;
    			this.chartOptions = {
    					...chartOptions,
    					radarMapOption
    				}
    		} );
    	},

    	// 请求监控密度,
    	getMonitorDensity(){
    		getMonitorDensity( ({success, statResult,proviceCount})=>{
    				if(!success) return;
    				let densityOption = buildMonitorDensityOption(statResult);
            let {chartOptions} = this;
      			this.chartOptions = {
      					...chartOptions,
      					densityOption
      				}
    		} );
    	},

    	// 请求变更密度,
    	getChangeDensity(){
    		getChangeDensity( ({success, statResult,proviceCount})=>{
    				if(!success) return;
    				let densityOption = buildChangeDensityOption(statResult);
            let {chartOptions} = this;
      			this.chartOptions = {
      					...chartOptions,
      					densityOption
      				}

    		} );
    	},

    	// 请求风险密度,
    	getRiskDensity(){
    		getRiskDensity( ({success, statResult,proviceCount})=>{

    				if(!success) return;
    				let densityOption = buildRiskDensityOption(statResult);
            let {chartOptions} = this;
      			this.chartOptions = {
      					...chartOptions,
      					densityOption
      				}

    		} );
    	},

      //企业注册资本
    	getEnterpriseCapitalRegistration(){

    		getEnterpriseCapitalRegistration(({code,result})=>{
    			if(code!==200) return;
    			this.EnterpriseRegistrationTimerNum = result.pie.length;
    			let enterpriseCapitalRegistrationOption = buildEnterpriseCapitalRegistrationOption(result.pie);
          let {chartOptions} = this;
          this.chartOptions = {
              ...chartOptions,
              enterpriseCapitalRegistrationOption
            }
    		})
    	},

      //企业数量
    	getEnterpriseQquantity(){

    		getEnterpriseQquantity(({code,result})=>{
    			if(code!==200) return;
    			let enterpriseQquantityOption = buildEnterpriseQquantityOption(result);
          let {chartOptions} = this;
          this.chartOptions = {
              ...chartOptions,
              enterpriseQquantityOption
            }
    		})
    	},

      //企业注册时间查询总量
    	getEnterpriseRegistrationTime(){

    		getEnterpriseRegistrationTime(({code,result})=>{

    			if(code!==200) return;
    			let enterpriseRegistrationTimeOption = buildEnterpriseRegistrationTimeOption(result);
          let {chartOptions} = this;
          this.chartOptions = {
              ...chartOptions,
              enterpriseRegistrationTimeOption
            }
    		})
    	},

      //在营企业总数
    	getTotaInUKEnterprises(){

    		getTotaInUKEnterprises(({code,result})=>{
    			if(code!==200) return;
    			let totaInUKEnterprises = buildTotaInUKEnterprisesOption(result);
          this.totaInUKEnterprises = totaInUKEnterprises;
    		})
    	},

    },
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style type="text/css" lang="scss" scoped>
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

</style>
