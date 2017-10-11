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
              <span class="widget-thumb-body-stat">{{totaInUKEnterprises.ent}}万</span>
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
              <span class="widget-thumb-body-stat">{{totaInUKEnterprises.ind}}万</span>
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
              <span class="widget-thumb-body-stat">{{totaInUKEnterprises.code}}万</span>
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
              <span class="widget-thumb-body-stat">{{totaInUKEnterprises.entYear}}万</span>
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
           :key="item.i"
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
                <div class="echarts-vue">
                  <i class="el-icon-loading loadingStyle" v-if="loading[index]"></i>

                    <ECharts
                       :options="chartOptions[index]"
                       auto-resize
                       :ref="item.refs"
                       class="vue-echart"
                       v-else

                   ></ECharts>


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

               <el-tabs
               v-model="activeName2"
               type="card"
               @tab-click="handleClick"
               style="float:left;margin-top:10px">
                  <el-tab-pane label="监控密度" name="first">

                  </el-tab-pane>
                  <el-tab-pane label="变更密度" name="second">

                  </el-tab-pane>
                  <el-tab-pane label="风险密度" name="third">

                  </el-tab-pane>
              </el-tabs>
             </div>

   					  <div class="echarts-vue">
                <i class="el-icon-loading loadingStyle" v-if="loading[5]"></i>
						    <ECharts
  						    :options="chartOptions[5]"
  						    auto-resize
  						    :ref="layout[5].refs"
						      v-else
						     ></ECharts>
   					  </div>
 				   </div>

        </grid-item>
    </grid-layout>
    </section>
  </div>


</template>
<script>
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
  import chart from 'Vue-ECharts';
  // import chart from 'vue-echarts/components/ECharts.vue';
//绘制图表
  // import 'echarts/lib/chart/bar'
  // import 'echarts/lib/chart/pie'
  // import 'echarts/lib/chart/line'
  // import 'echarts/lib/chart/radar'
  // import 'echarts/lib/chart/map'
  // import 'echarts/lib/component/legend'
  // import 'echarts/lib/component/visualMap'
  // import 'echarts/lib/component/polar'
  import 'echarts/lib/chart/bar'
  import 'echarts/lib/chart/line'
  import 'echarts/lib/chart/pie'
  import 'echarts/lib/chart/map'
  import 'echarts/lib/chart/radar'
  import 'echarts/lib/chart/scatter'
  import 'echarts/lib/chart/effectScatter'
  import 'echarts/lib/component/tooltip'
  import 'echarts/lib/component/polar'
  import 'echarts/lib/component/geo'
  import 'echarts/lib/component/legend'
  import 'echarts/lib/component/title'
  import 'echarts/lib/component/visualMap'
  // built-in theme
  import 'echarts/theme/dark'
  // Map of China
  import chinaMap from '../../common/data/china.json'
  import theme from '../../common/data/theme.json'

  // registering map data
  ECharts.registerMap('china', chinaMap)
  export default {
    components:{
      GridLayout,
      GridItem,
	    chart,
      ECharts
    },
    data () {

      if(!this.getUIState()){

      let layoutData = [
              {"x":0,"y":0,"w":6,"h":12,"i":"0","refs":"bar"},
              {"x":6,"y":0,"w":6,"h":12,"i":"1","refs":"polar"},
              {"x":0,"y":12,"w":6,"h":12,"i":"2","refs":"pie"},
              {"x":6,"y":12,"w":6,"h":12,"i":"3","refs":"line"},
              {"x":0,"y":18,"w":6,"h":12,"i":"4","refs":"radar"},
    		      {"x":6,"y":18,"w":6,"h":12, "i":"5","refs":"map"}
          ];
        this.setUIState(layoutData);
      }


      return {

        layout: this.getUIState(),

		    totaInUKEnterprises: {
          ent:0,
          ind:0,
          code:0,
          entYear:0
        },
        loading:[true,true,true,true,true,true],
        chartOptions: [{}, {}, {}, {}, {},{}],
        chartOptionsTitle:['按行业分类企业数量TOP10','整体概览','企业注册资本','按企业注册时间查询总量','指标概要','变更趋势'],

        activeName2: 'first',
        mapData:{
          monitor:{},
          change:{},
          risk:{}
        },
        timer:null
        // autoResize:true
      }

    },
    computed:{


    },
    created(){
    },
    mounted(){
      this.getLatestChangeStat();
  		this.getRadarMap();

  		this.getMonitorDensity();
      this.getChangeDensity();
      this.getRiskDensity();

  		this.getEnterpriseCapitalRegistration();
  		this.getEnterpriseQquantity();
  		this.getEnterpriseRegistrationTime();

  		this.getTotaInUKEnterprises();

    },
    //数据更新完的回掉函数，执行定时器
    updated(){
      //饼图定时器
      if(!this.chartOptions.length)return
      let dataIndex = -1;
      let pie = this.$refs.pie;
      if(!pie)return;
      let dataLen = pie[0].options.series[0].data.length;
      clearInterval(this.timer)
      this.timer = setInterval(() => {
        pie[0].dispatchAction({
          type: 'downplay',
          seriesIndex: 0,
          dataIndex
        })
        dataIndex = (dataIndex + 1) % dataLen
        pie[0].dispatchAction({
          type: 'highlight',
          seriesIndex: 0,
          dataIndex
        })
      }, 1000)

    },
    //组件卸载后关闭定时器
    destroyed(){
      clearInterval(this.timer)
    },
    methods: {


    //调整布局后的回掉函数（大小缩放）
      resizedEvent(i, newH, newW, newHPx, newWPx){
  			// 根据实际的容器的宽高走
        let ele = this.layout[i].refs;
        if(ele==='map'){
          this.$refs.map.resize({width: newWPx, height:newHPx-56})
        }else {
          this.$refs[ele][0].resize({width: newWPx, height:newHPx-56})
        }
        // console.log("MOVED i=" + i + ", H=" + newH + ", W=" + newW);

        this.layout[i].w = newW;
        this.layout[i].h = newH;
        this.setUIState(this.layout);
    },
    //调整布局后的回掉函数,本地存储（位置）
      movedEvent(i, newX, newY){
          this.layout[i].x = newX;
          this.layout[i].y = newY;
          this.setUIState(this.layout);
            // console.log("MOVED i=" + i + ", X=" + newX + ", Y=" + newY);
        },

  //获取本地布局参数
      getUIState(){
  		return JSON.parse(localStorage.getItem('uiState'));
  	},
    //设置本地存储 布局参数
    	setUIState(layouts){
    		localStorage.setItem('uiState', JSON.stringify(layouts));
    	},


//密度切换
      handleClick(tab) {
        switch (tab.label) {
          case "监控密度":
            this.chartOptions[5] = this.mapData.monitor;
          break;
          case "变更密度":
            this.chartOptions[5] = this.mapData.change;
          break;
          case "风险密度":
            this.chartOptions[5] = this.mapData.risk;
          break;
          default:
            this.chartOptions[5] = this.mapData.monitor;
        }
      },

//图表数据请求

      //标题，在营企业总数
      getTotaInUKEnterprises(){
        getTotaInUKEnterprises(({code,result})=>{
          if(code!==200) return;
          let totaInUKEnterprises = buildTotaInUKEnterprisesOption(result);
          for (var key in totaInUKEnterprises){
            totaInUKEnterprises[key] = Math.round(totaInUKEnterprises[key]/10000)
          }
          this.totaInUKEnterprises = totaInUKEnterprises;
        })
      },

      //企业数量 0
      getEnterpriseQquantity(){
        getEnterpriseQquantity(({code,result})=>{
          if(code!==200) return;
          this.chartOptions[0] = buildEnterpriseQquantityOption(result);
          this.loading[0] = false;
        })
      },

      // 整体概览 1
    	getLatestChangeStat(){
    		getLatestChangeStat( ({success, statResult})=>{
    			if(!success) return;
    			this.chartOptions[1] = buildLatestChangeOption(statResult);
          this.loading[1] = false;
    		} );
    	},

      //企业注册资本 2
      getEnterpriseCapitalRegistration(){
        getEnterpriseCapitalRegistration(({code,result})=>{
          if(code!==200) return;
          this.chartOptions[2] = buildEnterpriseCapitalRegistrationOption(result.pie);
          this.loading[2] = false;
        })
      },

      //企业注册时间查询总量 3
      getEnterpriseRegistrationTime(){
        getEnterpriseRegistrationTime(({code,result})=>{
          if(code!==200) return;
          this.chartOptions[3] = buildEnterpriseRegistrationTimeOption(result);
          this.loading[3] = false;
        })
      },

      // 请求雷达图数据 4
    	getRadarMap(){
    		getRadarMap( ( {data, success} )=>{
    			if(!success) return;
    			this.chartOptions[4] =  buildChangeRadar(data);
          this.loading[4] = false;
    		} );
    	},

    	// 请求监控密度, 5
    	getMonitorDensity(){
    		getMonitorDensity( ({success, statResult,proviceCount})=>{
    				if(!success) return;
            this.chartOptions[5] = this.mapData.monitor = buildMonitorDensityOption(statResult);
            this.loading[5] = false;
    		} );
    	},

    	// 请求变更密度, 5
    	getChangeDensity(){
    		getChangeDensity( ({success, statResult,proviceCount})=>{
    				if(!success) return;
            this.mapData.change = buildChangeDensityOption(statResult);
            this.loading[5] = false;
    		} );
    	},

    	// 请求风险密度, 5
    	getRiskDensity(){
    		getRiskDensity( ({success, statResult,proviceCount})=>{
    				if(!success) return;
            this.mapData.risk = buildRiskDensityOption(statResult);
            this.loading[5] = false;
    		} );
    	}

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
        font-weight: 800;
        color: #5E7386;
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
  height: auto;
  h2{
    height: 56px;
    font:800 16px/56px "微软雅黑";
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
.echarts-vue{
  text-align: center;
	position: absolute;
  top: 56px;
  bottom: 0;
  left: 0;
  right: 0;
}
.vue-echart{
  position: relative;
  height: 100%;
  width: 100%;
}
.loadingStyle{
  line-height: 8;
  color: #14A480;
  font-size: 46px;
  font-weight: 900;
}
</style>
