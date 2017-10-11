
import chart from 'Vue-eCharts';
// 最近的更新状态，整体概览

export function buildLatestChangeOption(data) {

	let {change, monitor, newMonitor, risk} = data;

	function resetVal(val) {
		return val < (monitor/100 )? Math.round(monitor/100) : val;
	}

	change = resetVal(change);
	monitor = resetVal(monitor);
	newMonitor = resetVal(newMonitor);
	risk = resetVal(risk);

	let monitorN = `监控数量 ${monitor}`;
	let changeN = `本期变更 ${change}`;
	let newMonitorN = `本期新增 ${newMonitor}`;
	let riskN = `本期风险 ${risk}`;

	return {
		angleAxis: {},

		    radiusAxis: {
		        type: 'category',
		        data: ['监控数量', '本期新增', '本期变更', '本期风险'].reverse(),
		        z: 10
		    },
		    polar: {
					center: ['50%', '40%'],
					radius : '65%',
		    },
				center: ['50%', '40%'],
				radius : '65%',
		    series: [{
		        type: 'bar',
		        data: [monitor, 0,0,0].reverse(),
		        coordinateSystem: 'polar',
		        name: monitorN,
		        stack: 'a'
		    }, {
		        type: 'bar',
		        data: [0, newMonitor, 0, 0].reverse(),
		        coordinateSystem: 'polar',
		        name: newMonitorN,
		        stack: 'a'
		    }, {
		        type: 'bar',
		        data: [0,0,change, 0].reverse(),
		        coordinateSystem: 'polar',
		        name: changeN,
		        stack: 'a'
		    },{
		        type: 'bar',
		        data: [0,0,0, risk].reverse(),
		        coordinateSystem: 'polar',
		        name: riskN,
		        stack: 'a'
		    }

			],

			tooltip: {   //提示框，鼠标悬浮交互时的信息提示
				 show:true,
				 trigger: 'axis'
			},
		    legend: {
		        show: true,
						bottom:12,
		        data: [monitorN, newMonitorN, changeN, riskN]
		    },

				color:[
					'#5B9BD1',
					'#4DB3A4',
					'#A276A4',
			  	'#F36A5A'
			  ]
	}
}

// 合并成echart的option
const renderChangeLineOption = function (xAxisData,changeData,changeAllData) {
		var option = {
		    title: {
		        text: ''
		    },
		    legend: {
		    	right: '8%',
		    	data: ["总体变更率", "本账号变更率"],
		    	y : 20,
		    	textStyle:{
		    		fontFamily:"宋体",
		    		fontSize:'14',
		    	}
		    },
		    grid: {
	        left: '2%',
	        right: '4%',
	        bottom: '16%',
	        containLabel: true
		    },
		    tooltip : {
	    		trigger : "axis",
	    		formatter: function (params) {
    				var tar = params[0];
    				if(!tar.value){
    					tar.value = '-';
    				}
    				var tar1 = params[1];



    				if(tar1){
    					if(!tar1.value){
	    					tar1.value = '-';
	    				}
    					return tar.name + '<br/>' + tar.seriesName + ' : ' + tar.value +'%' +
    								'<br/>' + tar1.seriesName + ' : ' + tar1.value+'%';
    				}else{
    					return tar.name + '<br/>' + tar.seriesName + ' : ' + tar.value +'%' ;
    				}
	    		}
		    },
		    xAxis: [
	    		{
    				type: "category",
    				boundaryGap: false,
    				name: "",
    				splitLine: {show: false},
    				axisLabel:{
  					// rotate:20,
  					interval: 0,
    					textStyle:{
								fontSize:14,
								color:'#333',
								fontFamily:"宋体"
							}
    				},
    				data : xAxisData
	    		}
		    ],
		     yAxis: [
	    		 {
    				type: "value",
    				name: "变更率",
    				axisLabel: {
  						formatter: '{value}%',
  						textStyle:{
								fontSize:14,
								color:'#333',
								fontFamily:"宋体"
							}
    				},
    				axisLine : {
                show : false,
                onZero :false
            },
            // nameLocation  :'middle',
            left  :'left',
            nameGap :20,
            nameTextStyle:{
            	fontSize:16,
            	color:'#333',
            },
	    		 }
		     ],
				dataZoom :[
	        {
            type: 'slider',
           	show: true,
           	xAxisIndex: [0],
           	throttle:100,
           	start:50,
	        }
		    ],
		     // calculable: true,
		    series: [
	    		{
    				name: "总体变更率",
    				type: "line",
    				areaStyle: {
    					normal: {
    						opacity:0.3
    					}
    				},
    				lineStyle:{
    					normal: {
    						color:"#bfeee8"
    					}
    				},
    				data : changeAllData
	    		},
	    		{
    				name: "本账号变更率",
    				type: "line",
    				areaStyle: {
    					normal: {
    						opacity:0.3
    					}
    				},
    				lineStyle:{
    					normal: {
    						color:"#b2d3f6"
    					}
    				},
    				data : changeData
	    		}
		    ],
		    color:['#5ed4c5','#7fb6f0']
		};
		return option;
	};
	// 获取雷达图
	var renderChangeRadar = function () {

		// http://fl.bidata.com.cn:8088/front/stats/radarMap
		summaryService.pointRadar().success(function(result){
			if(result.success){
				var piontAll = result.data;
				var legendData = [];
				var radarData = [];
				var maxConcern = 0;
				var compareArr = [];
				var lengendLen = 0;

				$.each(piontAll,function(key,value){

					var radarDataItem =[];
					legendData.unshift({
						'name':key,
				    'icon':'rect'
				  });


			   	radarDataItem[0] = value.RISK || 0;
			   	radarDataItem[1] = value.ALERT || 0;
			   	radarDataItem[2] = value.CONCERN || 0;

					//获取关注 预警 风险数据
					radarData.push({
            value: radarDataItem,
            name: key,
            symbolSize: 2,
            tooltip: {
               trigger: 'item'
            }
          });
				});

				var timeSort = radarData.reverse().slice(0,6);
				var eleRect = timeSort.reverse();
				legendData = legendData.slice(0,6);
				//数组排序获取最大
				var sortNumber = function(a,b){
					return a
				}
				var getMax = function(arr) {
			    var max = arr[0];
					for(var i=1;i<arr.length;i++){
					  if(max<arr[i])max=arr[i];
					}
					return max;
			  }
				$.each(eleRect,function(i,value){
					var maxTemp = getMax(value.value);
					compareArr.push(maxTemp);
				});
				compareArr.sort(function(a,b){return a-b;});
				var maxRadar = compareArr[compareArr.length -1];
				var chart = echarts.init(document.getElementById('radar-point-panel'));
				var option = _prepareChartOption(legendData,eleRect,maxRadar,maxRadar,maxRadar);
				chart.setOption(option);
			}
		});
	};

const renderChangeRectOption = function (xAxisData,concernData,alertData,riskData,maxXAxis) {
	var option = {
		tooltip : {
			backgroundCOlor:"rgba(255,255,255,0.7)",
			trigger: 'axis'
		},
		title: {
		 	text: "",
		 	x: "center",
		 	textStyle:{
				fontWeight:"normal"
		 	}
		},
		legend: {
			data:[
				{name:'风险',icon:'rect'},
				{name:'预警',icon:'rect'},
				{name:'关注',icon:'rect'},
			],
			right:'10%',
			y : 20,
			textStyle:{
				fontFamily:"宋体",
				fontSize:'14',
			}
		},
		grid: {
	    left: '6%',
	    right: '2%',
	    bottom: '16%',
	    containLabel: true
		},
		calculable : true,
		xAxis : [
			{
				type : 'category',
				data : xAxisData,
				axisLabel:{
					// rotate:20,
					interval: 0,
					textStyle:{
						fontSize:14,
						color:'#333',
						fontFamily:"宋体"
					}
				},
				name : ''
			}
		],
		dataZoom :[
    {
      type: 'slider',
     	show: true,
     	xAxisIndex: [0],
     	throttle:100,
     	start:50,
    }
    ],
		yAxis : [
			{
				type : 'value',
				name: "企业数量",
				axisLine : {
        show : false,
        onZero :false
      },
      left  :'left',
      nameGap :20,
      nameTextStyle:{
      	fontSize:16
      },
				axisLabel: {
					formatter: function(data){
						if(maxXAxis==800){
							if(data==0){
									return data;
							}else{
									return data+'万';
							}
						}else{
							return data;
						}
					},
					textStyle:{
						fontSize:14,
						color:'#333',
						fontFamily:"宋体"
					}
				}
			}
		],
		series : [
			{
				name:'风险',
				type:'bar',
				stack: '警告',
				barWidth:20,
				data : riskData
			},
			{
				name:'预警',
				type:'bar',
				stack: '警告',
				barWidth:20,
				data : alertData
			},
			{
				name:'关注',
				type:'bar',
				stack: '警告',
				barWidth:20,
				data : concernData
			},
		],
		color:['#ff8962','#ffba76','#fde1ab']
	};
	return option;
};
// 构建雷达图参数
export const buildChangeRadar = function (data) {
			var piontAll = data;
			var legendData = [];
			var radarData = [];
			var maxConcern = 0;
			var compareArr = [];
			var lengendLen = 0;

			for ( let key in piontAll){
				let value = piontAll[key];
				let radarDataItem =[];
				legendData.unshift({
						'name': key,
				    	'icon':'rect'
				  });


			   	radarDataItem[0] = value.RISK || 0;
			   	radarDataItem[1] = value.ALERT || 0;
			   	radarDataItem[2] = value.CONCERN || 0;

				//获取关注 预警 风险数据
				radarData.push({
			        value: radarDataItem,
			        name: key,
			        symbolSize: 2,
			        tooltip: {
			           trigger: 'item'
			        }
			      });

			}

			var timeSort = radarData.reverse().slice(0,6);
			var eleRect = timeSort.reverse();
			legendData = legendData.slice(0,6);
			//数组排序获取最大
			var sortNumber = function(a,b){
				return a
			};

			var getMax = function(arr) {
			    var max = arr[0];

				for(var i=1;i<arr.length;i++){
				  if(max<arr[i])max=arr[i];
				}

				return max;
		  	};

			eleRect.forEach( (value,i)=>{
				var maxTemp = getMax(value.value);
				compareArr.push(maxTemp);
			} );

			compareArr.sort(function(a,b){return a-b;});
			var maxRadar = compareArr[compareArr.length -1];

			return renderChartOption(legendData,eleRect,maxRadar,maxRadar,maxRadar);


};
// 合并雷达图参数
const renderChartOption = function(legend,seriesData,maxC,maxA,maxR) {
	let option = { //可以去官网上根据每个案例不同的option去写各种图形
	  title: {   //标题
	     text: ''
	  },
	  tooltip: {   //提示框，鼠标悬浮交互时的信息提示
	     show:true,
	     trigger: 'axis'
	  },
	  grid:{
	  	top:'10%'
	  },
	  center: ['0%', '0%'],
	  legend: {    //图例，每个图表最多仅有一个图例
	    left: 'center',
	    data: legend,
			bottom:12,
	  },
	  radar: [{    //极坐标
	    indicator: [
				{name: '风险',max:maxR},
	      {name: '预警',max:maxA},
	      {name: '关注',max:maxC}
	    ],
	    name:{
	    	textStyle:{
	    		fontSize:14,
	    		color:'#666'
	    	}
	    },
	    startAngle: 90,   // 改变雷达图的旋转度数
	  }],
	  series: [{         // 驱动图表生成的数据内容数组，数组中每一项为一个系列的选项及数据
	    name: '指标',
	    type: 'radar',
	    // radarIndex: 6,
	    itemStyle: {//图形样式，可设置图表内图形的默认样式和强调样式（悬浮时样式）：
	      normal: {
	        areaStyle: {
	            type: 'default'
	        }
	      }
	    },
	    symbol :'rect',
	    data: seriesData
	  }],
		color:['#5B9BD1','#4DB3A4','#A276A4','#F36A5A','#CAC12C','#4C5667'].reverse()
	};
	return option;
}

// 密度

export const buildMonitorDensityOption = (data)=>{
	return createDensityOption('监控密度',data, 10000);

}
export const buildChangeDensityOption = (data)=>{
	return createDensityOption('变更密度',data, 1000);
}

export const buildRiskDensityOption = (data)=>{
	return createDensityOption('风险密度',data, 1000);
}

const createDensityOption = (seectionName,data, ratio) => {


	let datas = [];
console.log(data,'请求数据');

	let areaMap = {
		"110000": "北京",
		"120000": "天津",
		"130000": "河北",
		"140000": "山西",
		"150000": "内蒙古",
		"210000": "辽宁",
		"220000": "吉林",
		"230000": "黑龙江",
		"310000": "上海",
		"320000": "江苏",
		"330000": "浙江",
		"340000": "安徽",
		"350000": "福建",
		"360000": "江西",
		"370000": "山东",
		"410000": "河南",
		"420000": "湖北",
		"430000": "湖南",
		"440000": "广东",
		"450000": "广西",
		"460000": "海南",
		"500000": "重庆",
		"510000": "四川",
		"520000": "贵州",
		"530000": "云南",
		"540000": "西藏",
		"610000": "陕西",
		"620000": "甘肃",
		"630000": "青海",
		"640000": "宁夏",
		"650000": "新疆",
		"710000": "台湾",
		"810000": "香港",
		"820000": "澳门"
	};

	//转换数据为地图所需要的数据
	var _wrapper = function(data) {
		var result = [];
		for(var item in data) {
			if(item !== '100000'){
				result.push({
					"name" : areaMap[""+item] || item,
					"value" : data["" + item]
				})
			}


		}
		return result;
	};


	datas = _wrapper(data);
console.log(datas,'处理后的数据');
	return renderDensityOption(seectionName, datas, ratio);

}

const renderDensityOption = (seectionName,datas,max) => {
	console.log(max);
	var option = {
	    title: {
	        text: '',
	        subtext: '',
	        left: 'center'
	    },
	    tooltip : {
    		trigger: 'item',
				// show:true,
    		formatter: function(params,ticket,callback) {
    				if(params.value) {
    						return params.name + ": " + params.value;
    				}
    				return params.name + ": 无数据";
    		}
	    },
	    legend: {
	        orient: 'vertical',
	        left: 'left'
	    },
	    grid:{
	    	left:'4%'
	    },
	    visualMap: {
	        min: 0,
	        max: max,
	        left: '20',
	        top: 'bottom',
	        text: ['高','低'],           // 文本，默认为数值文本
	        calculable: true,
					color:[
						'#075da6',
						'#EEF5FA'
					]
	    },
	    toolbox: {
	        show: false,
	        orient: 'vertical',
	        left: 'right',
	        top: 'center',
	        feature: {
	            dataView: {},
	            restore: {},
	            saveAsImage: {}
	        }
	    },

		series : [
			{
				name: seectionName,
				type: 'map',
				mapType: 'china',
				roam: false,
				showLegendSymbol:false,
				label: {
           normal: {
              show: false
           },
           emphasis: {
                show: true,
           }
	      },
				data : datas
			}
		]
	};
	console.log(option,'构建好的视图option');

	return option;
}

// end 密度

//企业注册资本统计
export const buildEnterpriseCapitalRegistrationOption  = (data) =>{
	let option = {
		title : {
			text: '',
			left:'center'
		},
		tooltip : {
			trigger: 'item',
			formatter: "{a} <br/>{b} : {c} ({d}%)"
		},
		legend: {
			// orient: 'vertical',
			//  top: 'middle',
			left:'center',
			bottom:12,
			data:[...data]
		},
		series : [
			{
				name:'查询总量',
				type:'pie',
				selectedMode: 'single',
				radius : '55%',
				center: ['50%', '40%'],
				data:[...data],

				itemStyle: {
					emphasis: {
						shadowBlur: 10,
						shadowOffsetX: 0,
						shadowColor: 'rgba(0, 0, 0, 0.5)'
					}
				}
			}
		],
		color:['#5B9BD1','#4DB3A4','#A276A4','#F36A5A','#CAC12C','#4C5667']
	}

	return option
}


//企业数量
export const buildEnterpriseQquantityOption = (data) =>{
	let { xData , yData } = data ;
	let option = {
		    title: {
		        text: '',
		        subtext: ''
		    },
		    tooltip: {
		        trigger: 'axis',
		        axisPointer: {
		            type: 'shadow'
		        }
		    },
		    grid: {
		        left: '2%',
		        containLabel: true,

						y:40,

						y2:40,
		    },
		    xAxis: {
		        type: 'value'
		    },
		    yAxis: {
		        type: 'category',
		        data: [...yData]
		    },
		    series: [{
		        name: '企业数量',
		        type: 'bar',
						barWidth : 8,
						data: [...xData]
		    }
			],
				color:['#5B9BD1']
		}

		return option
}


//企业注册时间查询总量
export const buildEnterpriseRegistrationTimeOption = (data) =>{
	let {count,year} = data;
	let option = {
    title: {
        text: '',
        subtext: ''
    },
    tooltip: {
        trigger: 'axis'
    },
    toolbox: {
        show: true,
				right: '90',
        feature: {
            // dataZoom: {
            //     yAxisIndex: 'none'
            // },

            dataView: {readOnly: false},
            magicType: {type: ['line', 'bar']},
            restore: {},
            saveAsImage: {}
        }
    },
    xAxis:  {
        type: 'category',
        boundaryGap: false,
        data: [...year]
    },
    yAxis: {
        type: 'value',
        axisLabel: {
            formatter: '{value}'
        }
    },
		grid: {
			 x:10,
			 x2:90,
			 y:80,
			 y2:30,
			 containLabel: true
	 	},
    series: [
        {
            name:'最高数量',
            type:'line',
            data:[...count],
            markLine: {
                data: [
                    {type: 'average', name: '平均值'}
                ]
            }
        }

    ],
		color:['#5B9BD1']
};
	return option
}

//在营企业总数
export const buildTotaInUKEnterprisesOption = (data) =>{
	return data
}
