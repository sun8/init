<template>
  <div class="contact-enterprise-change">
  	<div class="export-excel-btn">
      <button @click="exportChangeListAsExcel()">导出Excel</button>
    </div>
    <h3>主体情况</h3>
    <table class="table table-main-change">
      <thead>
        <tr>
          <th width="33%">关联监控主体企业</th>
          <th width="33%">主体变更</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td :style="{cursor:'pointer'}" @click="goToDetail('','main')">{{entNameMain}}</td>
          <td>{{(contactMainChangeDetail.columnName || '暂无变更')}}</td>
          <td>
            <span class="table-framework" @click = "goContactListByFrame(conditionParams)">关联监控图</span>
            <span class="table-list" @click="goContactListByList(conditionParams)">关联监控表</span>
          </td>
        </tr>
      </tbody>
    </table>
    <h3>关联监控变更</h3>
    <div class="change-section clearfix">
      <div class="table-section">
        <div class="table-tit table-head clearfix">
          <div class="select">
             <div class="select-selected">
                <span>关联关系</span> 
                <i></i>
             </div>
             <ul>
               <li @click="changeRelationFn('')">全部</li>
               <li v-for = "row in relations" @click="changeRelationFn(row)">{{row.name}}</li>
             </ul>
          </div>
          <div class="select" id="change-contact-columns">
             <div class="select-selected">
                <span>变更事项</span> 
                <i></i>
             </div>
             <div class="column-con clearfix">
                <div class="column-item">
                  <div class="column-item-tit">关注</div>
                  <div class="column-item-con">
                    <p v-for = "row in concernStatus" :value="row.columns" @click="changeItemFn(row)">{{row.title}}</p>
                  </div>
                </div>
                <div class="column-item">
                  <div class="column-item-tit">预警</div>
                  <div class="column-item-con">
                    <p v-for = "row in alertStatus" :value="row.columns" @click="changeItemFn(row)">{{row.title}}</p>
                  </div>
                </div>
                <div class="column-item">
                   	<div class="column-item-tit">风险</div>
                    <div class="column-item-con">
                      <p v-for = "row in riskStatus" :value="row.columns" @click="changeItemFn(row)">{{row.title}}</p>
                    </div>
                </div>
                <li class="selectAll" >
                  <p @click="changeItemFn('')">全选</p>
                </li>
             </div> 
          </div>
          <div class="input-wrap">
            <input type="text" placeholder="查询企业" v-model="queryForm.keyword" @keydown = "changeSearchEnt($event)">
          </div>
        </div>
        <div class="relation-change-con">
          <ul class="relation-change-inner clearfix">
            <li class="chart">
              <div class="chart-change" id="chartRelationChange" :style="{height:'440px'}"></div>
              <div class="bar" @click="slideChangeList()">
                <span>
                  查</br>
                  看</br>
                  列</br>
                  表</br>
                </span>
              </div>
            </li>
            <li>
              <div class="table">
                <div class="thead">
                  <div class="tr clearfix">
                    <div class="th">企业名称</div>
                    <div class="th">变更事项</div>
                    <div class="th">关联关系</div>
                  </div>
                </div>
                <div class="tbody">
                  <div class="tr has-data clearfix " v-for="row in RelationLIstChangeData"  @click="goToDetail(row)">
                  <!-- repeat-finish="renderFinish()" -->
                    <div class="td" :name ="row.name" >
                      {{row.entName}}
                    </div>
                    <div class="td" :name ="row.latestChangeColumnsTitle">{{row.columnName}}
                    </div>
                    <div class="td">
                      {{row.relationName}}
                    </div>
                  </div>
                  <div class="tr clearfix" v-for="(row,$index) in relationListFill" v-if='RelationLIstChangeData.length == 0 && $index < 10'>
                    <div class="td" :style="{width:'100%'}"> 
                      <span v-if="$index ==0">暂无变更数据</span>
                    </div>
                  </div>
                  <div class="tr clearfix" v-for="(row,$index) in relationListFill" v-if='RelationLIstChangeData.length > 0 && RelationLIstChangeData.length < 10 && $index < 10 - RelationLIstChangeData.length'>
                    <div class="td" :style="{width:'100%'}"> 
                      <span></span>
                    </div>
                  </div>
                  <div class="tr clearfix" v-for="(row,$index) in relationListFill" v-if='loadding && $index < 10'>
                    <div class="td" :style="{width:'100%'}"> 
                      <span v-if="$index == 0">正在加载数据</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="bar" @click="slideChangeChart()">
                <span>
                  查</br>
                  看</br>
                  图</br>
                  表</br>
                </span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    	conditionParams:{
    	 	pripid: this.$route.query.pripid || "",
    		name: this.$route.query.entname || "",
    		objectType: this.$route.query.type || "",
    		regNo: this.$route.query.regno || "",
    		creditCode: this.$route.query.creditcode || "",
    		orderId : this.$route.query.orderId || "",
    	},
    	queryForm: {},
    	relationListFill: [1,2,3,4,5,6,7,8,9,0],
    	list: [1,1,1,1,1,1,1,1,1,1,1,1,11,1,1],
    	entNameMain:"",
    	relations:[],
    	concernStatus:[],
    	alertStatus:[],
    	riskStatus:[],
    	RelationLIstChangeData:[],
    	contactMainChangeDetail:{},
    	loadding:false,
    }
  },
  methods:{
		// 变更关系图
		contactChangeMap:function(arr){

			var orderId = this.$route.query.orderId || "";
			var batchDate = this.$route.query.date || "";
			var condition = {
				parentId: orderId,
				batchDate: batchDate
			};
			this.$getData(this.api.fl_contact_changeMap,condition,(result)=>{

				// 处理关系的颜色
				var  chooseColorLine = (links)=>{
					// 不同的关系显示不同的颜色
					var node = [];
					var color = 0;
					var colorFFF = ["#5ed4c5","#8085e9","#7ba4e0","#a2bfe9","#2b60de","#2b60de","#d5f083","#d5f083"];
					for(var i = 0; i<links.length;i++){
						var isRepeatB =  this.isArrRepeat(node,links[i].type);
						if(isRepeatB == "" && isRepeatB != "0"){
							
							links[i].color = colorFFF[color];
							node.push({color:colorFFF[color],type:links[i].type});
							color++;
							if(color == 8){
								color = 0;
							}

						}else{
							links[i].color = node[isRepeatB]['color'];
						}
					}
				}

				this.chartData = result.relationMapModel;
				makeMap(this.chartData);

				function makeMap(data){
					chooseColorLine(data.links);
		    	var chart = null;
	    		chart = new NetChart({
  	        container: document.getElementById("chartRelationChange"),
  	        area: {
  	          height: null
  	        },
           	info:{
	            enabled: true,
	            nodeContentsFunction: function(itemData, item){
	            	if(itemData.type != "RELATION"){
                	return "<div style='margin:auto; width:400px; height:100%; padding': 10px;>" +
                          "<h3 style='font-size: 18px; padding:6px;font-family:microsoft yahei;'>"+ itemData.detail[0].name +"</h3>" +
                          "<p style='font-size: 14px;font-family:microsoft yahei;padding:5px'>" + itemData.detail[0].column + "</p>" +
                     "</div>";
	              }
	            }
			      },
			      data:{
			      	preloaded:data
			      },
		        navigation: {
	            mode: "focusnodes",
	            focusNodeExpansionRadius: 4,
	            numberOfFocusNodes: 4,
	            initialNodes: ["1"]
		        },
		        style: {
		        	nodeDetailMinSize: 5,
		        	node:{display:"image", lineWidth:2, lineColor: "#09c", imageCropping: true},
	            nodeStyleFunction: nodeStyle,
	            linkStyleFunction: linkStyle
		        }
	    	  });
    	  }

				function nodeStyle(node) {
	        var image = null;
	        
	       	if (node.data.type == "RELATION" ) {
	            image = "/static/images/fengling/contact/icon-company-relationship.png";
	            node.label = node.data.detail[0].name;
	            // node.radius = 30;
	        }else if(node.data.type == "ENT"){
	        	image = "/static/images/fengling/contact/icon-company.png";
	        	node.label = node.data.detail[0].name;
	        	// node.radius = 30;
	        }else{
	        	image = "/static/images/fengling/contact/icon-company-main.png";
	        	node.label = node.data.detail[0].name;
	        	// node.radius = 30;
	        }
	        node.lineColor = "#fff";
	        node.fillColor = "#fff";
	        node.image = image;
	      }

		    function linkStyle(link) {
	        link.length = 1;
	        link.fromDecoration = "arrow";
	        link.fillColor = link.data.color;
		    }	

			});
		},
		getListData: function(){

			var condition = {};
			condition.entName = this.changeKeyword;
			condition.parentId = this.$route.query.orderId || "";
			condition.date = this.$route.query.date || "";
			if(this.changeStatusSelect){
				condition.column  = this.changeStatusSelect;
			}
			if(this.changeRelationSelect){
				condition.relationId  = this.changeRelationSelect;
			}

			// 请求关联企业变更信息
			this.loadding = true;
			this.$getData(this.api.fl_contact_change,condition,(result)=>{
				
				this.loadding = false;	
				this.RelationLIstChangeData = result.children;
				this.contactMainChangeDetail = result.parent[0] || {};
				this.entNameMain = result.entName;
			});
		},
		//筛选变更事项
	  changeColumn: function(){

			var ele = $('#change-contact-columns');

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
		initRequest: function(){
			
			this.getListData();
			this.contactChangeMap();
			// 获取变更事项
			this.$getData(this.api.fl_contact_changeItem,{},(result)=>{

				var changeItem = result.monitorIndicator;
				this.riskStatus = [];
				this.alertStatus = [];
				this.concernStatus = [];

				$.each(changeItem,(i,value)=>{
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

				this.changeColumn();

			});

			// 获取关联关系
			this.$getData(this.api.fl_contact_addRelation,{},(result)=>{
				this.relations = result.relations;
			});
			
		},
		// 导出按钮点击事件
    exportChangeListAsExcel: function() {
    	var token = window.localStorage.getItem("tokenF");
      var url = this.api.fenglingBase + "/changeRelations/export/xls?token=" + token;
    
      if (this.queryForm.keyword && this.queryForm.keyword != "") {
        url += "&entName=" + this.changeKeyword;
      }
      if (this.changeStatusSelect && this.changeStatusSelect != "") {
        url += "&column=" + this.changeStatusSelect;
      }
      if (this.changeRelationSelect && this.changeRelationSelect != "") {
        url += "&relationId=" + this.changeRelationSelect;
      }

      url += "&parentId=" + this.$route.query.orderId;
      url += "&date=" + this.$route.query.date;
      
      window.location = url;

    }, 
    // 筛选关系
    changeRelationFn: function(row){
    	if(row){
    		this.changeRelationSelect = row.id;
    	}else{
    		this.changeRelationSelect = "";
    	}
			this.getListData();
		},
    changeItemFn: function(row){
			this.changeStatusSelect = row.name;
			this.getListData();
		},
		changeSearchEnt: function(ev){
			if(ev.keyCode == 13){
				this.changeKeyword = this.queryForm.keyword;
				this.getListData();
			}
		},
		// 进入删除关联企业列表
		goContactListByList: function(row){
			this.$router.push({
				name:"关联监控内容",
				query:{
					pripid:row.pripid,
					entname:row.name,
					state:'delete',
					type: row.type,
					regno: row.regNo,
					creditcode: row.creditCode,
					orderId: row.orderId
				}
			});
		},
		// 进入删除关联企业列表
		goContactListByFrame: function(row){
			this.$router.push({
				name:"关联监控内容",
				query:{
					pripid:row.pripid,
					entname:row.name,
					state:'delete',
					type: row.type,
					regno: row.regNo,
					creditcode: row.creditCode,
					orderId: row.orderId,
					tab:'frame'
				}
			});
		},
		goToDetail: function(row,role){
			// 判断对象是否为空
			function isEmptyObj(obj){
				for(var i in obj){
					return false;
				}
				return true;
			}

			var mainEmpty = isEmptyObj(this.contactMainChangeDetail);
			if(role == 'main' && mainEmpty){
				swal({
          title: "确认",
            text: "主体未发生变更，无法搜索详情！",
            type: "info",
            showCancelButton: false,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "确认",
            cancelButtonText: "取消",
            closeOnConfirm: false,
            closeOnCancel: true
        });
				return;
			}
			if(role == 'main'){
				row = this.contactMainChangeDetail;
			}
			window.open("/#/changeDetail?pripid="+row.orderId+"&date="+ row.date+"&from=relation");
			

			// window.open("/portal/index.html#/contact/contactDetail?orderId="+row.orderId+"&date="+row.date);
			return false;
		},

		slideChangeChart: function(){
			$(".relation-change-inner").animate({'marginLeft':'0'});
		},

		slideChangeList: function(){
			$(".relation-change-inner").animate({'marginLeft':'-100%'});
		},

		// 数组去重
		isArrRepeat: function(arr,str){
			for(var i = 0; i<arr.length;i++){
				if(arr[i].type == str){
					return i
				}
			}
			return "";
		},
		//设置滚动条
		renderFinish: function(){
	    $(".contact-enterprise-change .table .tbody").slimScroll({ 
	    	height: '400px', 
	    	alwaysVisible: true, 
	    });
		}
  },
  mounted(){
  	this.mySelect(".select");
  	this.initRequest();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
	.contact-enterprise-change{
	    position:relative;
	    border-left:1px solid #eee;
	    border-right: 1px solid #eee;
	    input,button{
				border:none;
			}
	    .select{
		    	margin-left:0;
		    	margin-right:30px;
	        .column-con{
	            display:none;
	            position: absolute;
	            left: 0;
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
	                // border-right:1px solid #eee;
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
	                            color:#feb872;
	                        }
	                    }

	                }

	            }
	            .selectAll{
	                position: absolute;
	                right:120px;
	                bottom:40px;
	                font-size:12px;
	                list-style:none;
	            }
	        }
	    }
	    h3{
	        width:100%;
	        height:50px;
	        padding-left:24px;
	        border-top:2px solid #5B9BD1;
	        font:normal 18px/50px 'Hiragino Sans GB' ,'microsoft yahei';
	        font-weight:bold;
	        background:#fff;
	    }
	    .table-main-change{
	        th{
	          height:44px;
	          background:#5B9BD1;
	          color:#fff;
	        }
	        td{
	           height:44px;
	        }
	        span{
	            margin: 0 20px;
	            padding:10px 30px;
	            cursor:pointer;
	            &.table-framework{
	                background: url("/static/images/fengling/icon-contact-picture.png") no-repeat 0 center;;
	                background-size:26px;
	                &:hover{
	                    color:#f59639;
	                    background: url("/static/images/fengling/icon-contact-picture-mouseon.png") no-repeat 0px center;
	                    background-size:26px;
	                }
	            }
	            &.table-list{
	                background: url("/static/images/fengling/icon-contact-list.png") no-repeat 0 center;;
	                background-size:26px;
	                &:hover{
	                    color:#f59639;
	                    background: url("/static/images/fengling/icon-contact-list-mouseon.png") no-repeat 0px center;
	                    background-size:26px;
	                }
	            }
	        }
	    }
	    .change-section{
	        min-height:420px;
	        border-top:1px solid #ddd;
	        border-bottom:1px solid #ddd;
	        .table-tit{
	            padding:12px 10px 8px 0px;
	            .select{
	                margin-right: 26px;
	            }
	            .input-wrap{
	                float: left;
	                margin-left:16px;
	                width:300px;
	                height:30px;
	                background:#F0F3F7 url("/static/images/fengling/search-enterprise-icon.png") no-repeat 10px  center;
	                padding-left:30px;
	                input{
	                    width:100%;
	                    height:30px;
	                    background:#F0F3F7;
	                    color:#999;
	                }
	            }
	        }
	        .relation-change-con{
	            width:100%;
	            overflow: hidden;
	            border-top:1px solid #ddd;
	            .relation-change-inner{
	                width:200%;
	                margin-left:-100%;
	            }
	            li{
	                position:relative;
	                float:left ;
	                width:50%;
	                height:440px;
	                .bar{
	                    position:absolute;
	                    top:0;
	                    left:0;
	                    width:40px;
	                    height:440px;
	                    background:#4DB3A4;
	                    text-align:center;
	                    display: table;
	                    color:#fff;
	                    span{
	                        display:table-cell;
	                        vertical-align: middle;
	                    }

	                }

	                &.chart{
	                    .bar{
	                        left:auto;
	                        right:0;
	                    }
	                }
	            }
	        }
	        .table{
	                
	            .th{
	                float: left;
	                height:40px;
	                background: #5B9BD1;
	                border: none;
	                border-right: 1px solid #f7f7f7;
	                font-size: 14px;
	                font-weight: 700;
	                text-align: center;
	                line-height:40px;
	                color: #fff;
	                &:last-of-type{
	                    border: none;
	                }
	                &:nth-of-type(1){
	                    width:40%;
	                }
	                &:nth-of-type(2){
	                    width:30%;
	                }
	                &:nth-of-type(3){
	                    width:30%;
	                }
	            }
	            .tbody{
	                position:relative;
	                .tr{
	                    &.has-data{
	                        cursor:pointer;
	                        &:hover{
	                            background-color:#eff7ff !important;
	                        }
	                    }
	                    &:nth-of-type(even){
	                        background:#f7f7f7;
	                    }
	                    .td{
	                        position:relative;
	                        float: left;
	                        height:40px;
	                        line-height: 40px;
	                        text-align:center;
	                        border:none;
	                        font-size:12px;
	                        white-space:nowrap;
	                        text-overflow: ellipsis;
	                        overflow: hidden;
	                        &:nth-of-type(1){
	                            width:40%;
	                        }
	                        &:nth-of-type(2){
	                            width:30%;
	                        }
	                        &:nth-of-type(3){
	                            width:30%;
	                        }
	                            }
	                        }
	               
	            }
	            
	            .operate-monitor{
	                padding:6px 0;
	                padding-left:26px;
	                margin:0 8px;
	                color:#ccc;
	                cursor:pointer;
	                &.operate-monitor-recover{
	                    background: url("/static/images/fengling/icon-recover.png") no-repeat 0 2px;;
	                    background-size:20px;
	                    &:hover{
	                        color:#f59639;
	                        background: url("/static/images/fengling/icon-recover-hover.png") no-repeat 1px 1px;
	                        background-size:20px;
	                    }
	                }
	                &.operate-monitor-pause{
	                    background: url("/static/images/fengling/icon-pause.png") no-repeat 0 center;
	                    background-size:20px;
	                    &:hover{
	                        color:#f59639;
	                        background: url("/static/images/fengling/icon-pause-hover.png") no-repeat 0 center;
	                        background-size:20px;
	                    }

	                }
	                &.operate-monitor-stop{
	                    background: url("/static/images/fengling/icon-end.png") no-repeat 0 center;
	                    background-size:20px;
	                    &:hover{
	                        color:#f59639;
	                        background: url("/static/images/fengling/icon-end-hover.png") no-repeat 0 center;
	                        background-size:20px;
	                    }
	                }
	                &.operate-monitor-modify-policy{
	                    background:url("/static/images/fengling/icon-policy.png") no-repeat 0 center;
	                    background-size:22px;
	                    &:hover{
	                        color:#f59639;
	                        background: url("/static/images/fengling/icon-policy-mouseon.png") no-repeat 0 center;
	                        background-size:22px;
	                    }
	                }
	           }
	        }
	    }
	}
</style>
