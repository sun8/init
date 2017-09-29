<template>
  <div class="contact-content-enter">
    <div class="contact-tab ">
    	<ul class="contact-tab-hd clearfix">
    		<li @click="tab('contactFrame')" :class="{current:frameshow}">关联监控图</li>
    		<li @click="tab('contactList')" :class="{current:!frameshow}">关联监控表</li>
    	</ul>
    	<div class="contact-tab-bd" v-show="frameshow">
    		<div class="contact-item" id="frameChart">
    			<div class="contact-framecontainer">
    				<div id="chartRelation" :style="{width:'100%',height:'574px'}"></div>
	    		</div>
    		</div>
    	</div>
    	<div class="contact-tab-bd" v-show="!frameshow">
    		<div class="contact-item" :style="{paddingTop:'20px'}">
    			<div class="cont-table default-relation clearfix">
						<div class='cont-table-item relation-list'>
							<div class="tit">企业股东</div>
							<div class="relation-item-wrap">
								<!-- 遍历数据 -->
								<div class="relation-item shareholder clearfix" v-for ="(row,index) in contactEntList.shareholder">
									<div class="enter-name" @click="contactListDetail(row,'bottom','right',index)">
										{{row.name}}
									</div>	
								</div>
								 <!-- 数据为空时显示 -->
								<div class="relation-item  clearfix"  v-for ="(row,index) in nodataList" v-if="contactEntList.shareholder && contactEntList.shareholder.length < 1">
									<div class="nodata" v-if="index == 0">
										暂无企业股东
									</div>	
								</div>
								<div class="relation-item  clearfix"  v-for ="(row,index) in nodataList" v-if="loadding">
									<div class="nodata" v-if="index == 0">
										正在加载···
									</div>	
								</div>
								<!-- 数据不足八个时补数 -->
								<div class="relation-item clearfix"  v-for ="(row,index) in nodataList" v-if="contactEntList.shareholder && contactEntList.shareholder.length != 0 && contactEntList.shareholder.length - 8 < 0 && 8 - contactEntList.shareholder.length > index && !loadding">
								</div>
							</div>
						</div>
						<div class="cont-table-item relation-list">
							<div class="tit" >对外投资企业</div>
							<div class="relation-item-wrap">
								<div class="relation-item investment clearfix" v-for ="(row,index) in contactEntList.entinv">
									<div class="enter-name"  @click="contactListDetail(row,'bottom','right',index)">
										{{row.name}}
									</div>	
									<div class="del"></div>
								</div>
								<div class="relation-item clearfix"  v-for ="(row,index) in nodataList" v-if="contactEntList.entinv&&contactEntList.entinv.length < 1">
									<div class="nodata"  v-if="index == 0">
										暂无对外投资企业
									</div>	
								</div>
								<div class="relation-item  clearfix"  v-for ="(row,index) in nodataList" v-if="loadding">
									<div class="nodata" v-if="index == 0">
										正在加载···
									</div>	
								</div>
								<div class="relation-item clearfix"  v-for ="(row,index) in nodataList" v-if="contactEntList.entinv && contactEntList.entinv.length != 0 && contactEntList.entinv.length - 8 < 0 && 8 - contactEntList.entinv.length > index  && !loadding">
								</div>
							</div>
						</div>
	    			</div>
	    			<div class="cont-table default-relation clearfix">
						<div class='cont-table-item relation-list'>
							<div class="tit">法人代表对外投资企业</div>
							<div class="relation-item-wrap">
								<div class="relation-item LegalPerinvestmentAndOffice clearfix" v-for ="(index,row) in contactEntList.pripersoninv" >
									<div class="enter-name" @click="contactListDetail(row,'bottom','right',index)" >
										{{row.name}}
									</div>
								</div>
								<div class="relation-item   clearfix"  v-for ="(row,index) in nodataList" v-if="contactEntList.pripersoninv && contactEntList.pripersoninv.length < 1">
									<div class=" nodata"  v-if="index == 0">
										暂无法人代表对外投资企业
									</div>	
								</div>
								<div class="relation-item  clearfix"  v-for ="(row,index) in nodataList" v-if="loadding">
									<div class="nodata" v-if="index == 0">
										正在加载···
									</div>	
								</div>
								<div class="relation-item clearfix"  v-for ="(row,index) in nodataList" v-if="contactEntList.pripersoninv && contactEntList.pripersoninv.length != 0 && contactEntList.pripersoninv.length - 8 < 0 && 8 - contactEntList.pripersoninv.length > index && !loadding">
								</div>
							</div>
						</div>
						<div class="cont-table-item relation-list">
							<div class="tit">法人代表在外任职企业</div>
							<div class="relation-item-wrap">
								<div class="relation-item LegalPerinvestmentAndOffice clearfix" v-for ="(index,row) in contactEntList.pripersonposition" >
									<div class="enter-name"  @click="contactListDetail(row,'bottom','right',index)">
										{{row.name}}
									</div>	
								</div>
								<div class="relation-item clearfix"  v-for ="(row,index) in nodataList" v-if="contactEntList.pripersonposition && contactEntList.pripersonposition.length < 1">
									<div class="nodata"  v-if="index == 0">
										暂无法人代表在外任职企业
									</div>	
								</div>
								<div class="relation-item  clearfix"  v-for ="(row,index) in nodataList" v-if="loadding">
									<div class="nodata" v-if="index == 0">
										正在加载···
									</div>	
								</div>
								<div class="relation-item clearfix" v-for ="(row,index) in nodataList" v-if="contactEntList.pripersonposition && contactEntList.pripersonposition.length != 0 && contactEntList.pripersonposition.length - 8 < 0 && 8 - contactEntList.pripersonposition.length > index && !loadding">
								</div>
							</div>
						</div>
	    			</div>
	    			<div class="custom-relation" v-if="jslength != 0">  
	    				<div class="thead-tit">自定义关系</div>
	    				<div class="custom-item-wrap cont-table " id="scroll-hoz">
	    					<div class="custom-item-inner clearfix">
								<div class='relation-list cont-table-item' v-for="(value,key) in contactEntList.other" v-if="value.length">
									<div class="tit">{{key}}</div>
									<div class="relation-item-wrap">
										<div class="relation-item has-data clearfix" v-for = '(row,index) in value' >
											<div class="status" v-if="isDeleteEnt"> 
												<input type="checkbox"  @click="selectDEleteEnter(row,$event)">
					    						<span>已添加</span>
					    					</div>
											<div class="enter-name" :class="{deleWidth:isDeleteEnt}" @click="contactListDetail(row,'bottom','right',index)">
												{{row.name}}
											</div>	
										</div>
										<!-- 不足san个就补数 -->
										<div class="relation-item clearfix"  v-for ="(row,index) in nodataList" v-if="value.length != 0 && value.length - 5 < 0 && 5 - value.length > index && !loadding">
										</div>
									</div>
								</div>
								<div class='relation-list cont-table-item' v-for ="(row,index) in nodataList" v-if="jslength != 0 &&   jslength - 3  < 0 &&  index < 3 - jslength">
									<div class="tit"></div>
									<div class="relation-item-wrap">
										<div class="relation-item clearfix"  v-for ="(row,index) in nodataList" v-if="loadding">
											<div class="nodata" v-if="index == 0">
												正在加载···
											</div>	
										</div>
										<!-- 不足五个就补数 -->
										<div class="relation-item clearfix"  v-for ="(row,index) in nodataList" v-if="index<5">
										</div>
									</div>
								</div>
							</div>
	    				</div>
	    			</div>
    			<div class="contact-bd-head ">
    				<div class="increase-custom-relation">
				    	<h3 class="alert-h3">
				    		自定义关系列表添加 <button class="cancel" @click="addCustomRelationSectionHide()" >取消</button><button class="sure" @click="sendRelationCustom()" >保存</button>
				    	</h3>
				    	<div class="increase-custom-relation-inner">	
					    	<div class="alert-tit clearfix">	
				    			<div class="enter-name">企业名称</div>
				    			<div class="relation-type">关系类型</div>
					    	</div>
					    	<div class="alert-con clearfix">
					    		<div class="select-relation-item clearfix"  v-for ="item in relationNum">
					    			<div class="input-outer">	
						    			<div class="input-wrap">
						    				<div class="input-item">
						    					<input type="text" placeholder="输入企业名称/注册号/社会统一信用代码" class="select-relation-enter">
						    				</div>
						    				<span class="tipLegal"></span>
						    			</div>
					    			</div>
					    			<div class="select-outer">	
						    			<div class="select" >
			                   	<div class="select-selected select-relation" >
			                       <span>
			                            选择关系
			                       </span>
			                       <i></i>
			                   	</div>
			                   	<ul>
			                       <li v-for ="row in relationList" @click="selectRelation(row,$event)" :id='row.id' :name="row.name">{{row.name}}</li>
			                       <li @click="selectOther( 'other',$event)">其它</li>
			                    </ul>
			                </div>
						          <i class="note-i">*</i>
					          </div>
					    		</div>
					    		<!-- 模糊搜索 -->
	    		        <div id="littleEnter" class="little-enter">
	    		          <div>
	    		            <div class="c-custlist-item" v-for ="(row,index) in matchedEnter" @click="goContactListBysearch(row)" :class="{ccustlistitemhover:activeIndex == index+1}" :code="row.pripid" :ename="row.entname" :type="row.type" :regno="row.regno" :creditcode="row.creditcode">
	    		              <div>
	    		                <span class="entNameHttp">{{row.entname}}</span>
	    			              <p>
			                      <span >{{row.name}}</span>
			                      <span> {{row.dom}}</span>
			                    </p>
		                    </div>
	    		            </div>
	    		          </div>
	    		          <div class="loadding" v-if="loadding">加载中...</div>
	    		          <div class="emptyMatchEnt red" v-if="emptyMatchEnt" > 名称不能为空</div>
	    		        </div>
					    		
									<div class="add-custom-btn clearfix" >
							    	<span @click="addMoreRelationEnt()">继续添加</span>
							    	</div>
						    	</div>
						    <!-- <button class="sure" @click="increaseRelation()">添加关系</button> -->
				    	</div>
				    </div>
					<!-- <a class="cont-control-enter" @click="onlyDisplayEnt()">只显示企业</a> -->
					  <div class="contact-list-btn-section clearfix">	
	    				<a class="append-custom-relation" @click="addCustomRelationSectionShow()" :class="{disabled: loadding }">{{ isDeleteEnt | relationBtnDescribe}}</a>
	    				<div class="right">
	    					<a class="append-monitor-enter" @click="addMonitorAlertShow()" v-if="!isDeleteEnt"  :class="{disabled: loadding || hasAddcontactMonitor}">确定</a>
	    					<a class="append-monitor-enter" @click="terminateAlert()" v-if="isDeleteEnt" :class="{disabled: loadding || deleEnterEmpty}">删除</a>
	    				</div>
    				</div>
    			</div>
    		</div>
    	</div>
    </div>
  	<!-- 添加自定义关系弹框 -->
  	<div class="sure-layer" v-if=" customRelationBomb || addToMonitorAlert || detailBool || terminateAlertStatus"></div>
    <div class="contact-alert fixed" v-show="customRelationBomb">
    	<h3 class="alert-tit">
    		添加自定义关系名
    		<i class="close-alert" @click="cancleaddRelationName()"></i>
    	</h3>
    	<div class="alert-con">
    		<div class="select-relation-item clearfix" >
    			<div class="input-wrap">
    				<div class="input-item">
    					<input type="text" placeholder="输入关系名称" class="other-relation-name">
    				</div>
    			</div>
    		</div>
	    	<div class="btn-section clearfix">
		      <button class="cancel" @click="cancleaddRelationName()" >取消</button>
		      <button class="sure" @click="increaseRelation()">添加关系</button>
		    </div>
    	</div>
    </div>
  	<!-- 添加关联监控弹框 -->
    <div class="sure-section" v-if="addToMonitorAlert">
	    <h3>温馨提示</h3>
	    <div class="con">
		    <span class="tip">*只能添加企业，无法关联个人</span>
		    <span class="info">将关联关系下的所有企业添加监控?</span>
	    </div>
	    <div class="btn-section">
	        <button class="cancel" @click="addMonitorAlertHide()" >取消</button><button class="sure" @click="sendContactListBatch()" :disabled="bachLoadding">确认</button>
	    </div>
  	</div>
  	<!-- 取消监控弹框 -->
  	<div class="sure-section del-section" v-if="terminateAlertStatus">
  	    <h3>温馨提示</h3>
  	    <div class="con">
  		    <span class="info">将取消对所选企业的监控</span>
  	    </div>
  	    <div class="btn-section">
  	        <button class="cancel" @click="terminateAlertColse()" >取消</button><button class="sure" @click="terminate()">确认</button>
  	    </div>
  	</div>
  	<!-- 企业详情 -->
  	<div class="ent-detail" v-if="detailBool">
    	<h3>{{detailData.entname}}
    		<span>{{detailData.entstatus}}</span> 
    		<i class="close-detail" @click="contactListDetailClose()"></i>
    	</h3>
    	<table  border="0" cellspacing="0" cellpadding="0">
    		<tr v-if="detailData.name">
    			<td>法人代表：</td>
    			<td>{{detailData.name}}</td>
    		</tr>
    		<tr v-if="detailData.regcap"	>
    			<td>注册资本：</td>
    			<td>{{detailData.regcap}}万人民币</td>
    		</tr>
    		<tr v-if="detailData.esDate">
    			<td>成立时间：</td>
    			<td>{{detailData.esDate}}</td>
    		</tr>
    		<tr v-if="detailData.industryphy">
    			<td>行业门类：</td>
    			<td>{{detailData.industryphyName}}</td>
    		</tr>
    	</table>
    </div>
  </div> 
</template>

<script>
export default {
  data () {
    return {
    	customRelationBomb: false, // 添加自定义关系名弹框显示与否
    	addToMonitorAlert: false,// 添加监控弹框提示
    	isDeleteEnt: false, // 判断是否为删除企业页面
    	deleteEnter: [],  //批量删除的企业
    	deleEnterEmpty: true, //控制删除按钮的颜色 没有选择企业时为不可点
    	nodataList: [1,2,3,4,5,6,7,8], // 没数时补空格的数组
    	// exhibitionOtherPage: {}, // 页面显示自定义列表数据
    	exhibitionOtherRequest: [], // 往后台传天机的自定义企业数据
    	matchedEnter: [],
    	relationNum: [ // 默认显示五个选择关系的文本框
				{name:""},
				{name:""},
				{name:""},
				{name:""},
				{name:""}
			],
			loadding:true,
			frameshow:false,
			contactEntList:[],
			jslength:0,
			bachLoadding:false,
			relationList:[],
			emptyMatchEnt:false,
			detailBool:false,
			terminateAlertStatus:false,
			jslength:0,
			hasAddcontactMonitor:false,
			activeIndex:1
    }
  },
  methods:{
  		// tab切换
  		tab: function(obj){
  			if(obj == "contactFrame"){
  				this.frameshow = true;
  				this.readRelationMap();
  			}
  			if(obj == "contactList"){
  				this.frameshow = false;
  			}
  		},
  		// 关系图
  		readRelationMap:function(){
  			if(this.$route.query.state == 'delete'){
  				var orderId = this.$route.query.orderId || "";
  				this.$getData(this.api.fl_contact_enterprise,{parentId :orderId},(result)=>{
  					this.chartData = result.relationMapModel;
  			    makeMap(this.chartData);
  				});
  			}else{

  				if(this.contactEntList){
  					var condition = this.contactEntList;
  				}
  				this.$post(this.api.fl_contact_mapBefore,condition,(result)=>{
  					this.chartData = result.relationMapModel;
  			    makeMap(this.chartData);
  				});
  			}
  			// 处理关系的颜色
  			var chooseColorLine =  (links)=>{
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

  			function makeMap(data){
  				chooseColorLine(data.links);
		    	var chart = null;
	    		chart = new NetChart({
  	        container: document.getElementById("chartRelation"),
  	        area: {
  	          height: null
  	        },
  	        navigation: {
	            mode: "focusnodes",
	            focusNodeExpansionRadius: 2,
	            numberOfFocusNodes: 2,
	            initialNodes: ["1"]
  	        },
  	        data:{
  	        	preloaded:data
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
	        node.width = 100;
	        node.height = 100;
	       	if (node.data.type == "MAIN") {
	            image = "/static/images/fengling/contact/icon-company-main.png";
	        }else{
	        	image = "/static/images/fengling/contact/icon-company.png";
	        }
	        
	        node.label = node.data.detail[0].name;
	        node.image = image;
	        node.lineColor = "#fff";
	        node.fillColor = "#fff";
		    }

		    function linkStyle(link) {
	        link.length = 2;
	        link.radius = 1;
	        link.fromDecoration = "arrow";
          link.label = link.data.type;
          if(link.data.color){
          	link.fillColor = link.data.color;
          }else{
          	link.fillColor = "#5ed4c5";
          }
		    }	
  		},
  		// 得到关联企业数据
  		getRelationEntData: function(){
  			var condition ={
  			 	pripid: this.$route.query.pripid || "",
  				name: this.$route.query.entname || "",
  				objectType: this.$route.query.type || "",
  				regNo: this.$route.query.regno || "",
  				creditCode: this.$route.query.creditcode || "",
  				orderId : this.$route.query.orderId || ""
  			}
  			this.contactEntList = [];
  			this.loadding = true;	

  			if(this.$route.query.state == 'delete'){
  				this.isDeleteEnt = true; 
  				this.$getData(this.api.fl_contact_childOrdered,condition,(result)=>{
  					this.getSuccess(result);
  				});
  			}else{
  				this.$getData(this.api.fl_contact_child,condition,(result)=>{
  					this.getSuccess(result);
  				});
  			}
  		},
  		getSuccess:function(result){
  			this.loadding = false;	
  			this.contactEntList = result.orderMonitorRelations;
  			this.jslength=0;
  			if(result.orderMonitorRelations.main && result.orderMonitorRelations.main[0].orderId){
  				this.orderId = result.orderMonitorRelations.main[0].orderId;
  			}

  			if(result.orderMonitorRelations.other){
  				$.each(result.orderMonitorRelations.other,function(i,value){
  					if(value.length>0){
  						this.jslength++;
  					}
  				});
  				
  			}

  			setTimeout(()=>{
  				this.renderFinish();
  				if(this.contactEntList.other){
  					if(this.jslength >= 3){
  						var width = $("#scroll-hoz").eq(0).outerWidth()/3 * this.jslength;
  						$("#scroll-hoz .custom-item-inner").css({"width":width +"px"});
  						$("#scroll-hoz .custom-item-inner .relation-list").css({"width":$("#scroll-hoz").eq(0).outerWidth()/3 +"px"});
  						$(document).ready(function ($) {
				        $('#scroll-hoz').perfectScrollbar();
				     	});
  					}
  				}
  			},30);
  		},
  		// 判断企业是否已经添加监控-- 维护自定义页面全添加监控 ，主要判断添加自定义关系页面
  		isAddContactMonitor: function(row){
  			//显示企业列表
  			var condition ={
  			 	pripid: this.$route.query.pripid || "",
  				name: this.$route.query.entname || "",
  				objectType: this.$route.query.type || "",
  				regNo: this.$route.query.regno || "",
  				creditCode: this.$route.query.creditcode || ""
  			}
  			this.$getData(this.api.fl_contact_isExist,condition,function(result){
  		  	if(!result.orderId){
  			        this.hasAddcontactMonitor = false;
  				}else{
  					this.hasAddcontactMonitor = true;
  				}
  		       
  		  });
  		},
  		// 请求自定义关系列表
  		queryRationList: function(){
  			this.$getData(this.api.fl_contact_relationOther,{},(result)=>{
  				this.relationList = result.relations;
  				setTimeout(()=>{
  					this.mySelect(".select");
  				},100);
  			});
  		},
  		// 请求企业详情
  		contactListDetail: function(row,pos,heng,index){
  			this.$getData(this.api.fl_contact_entDetail,{keyword:row.pripid},(result)=>{
  				this.detailBool = true;
  				this.detailData = result.result;
  			});
  		},
  		// 关闭企业详情弹框
  		contactListDetailClose: function(){
  			this.detailBool = false;
  		},
  		//企业 添加监控确认弹框显示
  		addMonitorAlertShow: function(){
  			if(this.loadding){
  				this.addToMonitorAlert = false;
  				swal({
  					 title: "提示",
  					 text: "该关联企业还未加载完成，请稍等片刻",
  					 type: "info",
  					 showCancelButton: false,
  					 confirmButtonColor: "#DD6B55",
  					 confirmButtonText: "确认",
  					 cancelButtonText: "取消",
  					 closeOnConfirm: false,
  					 closeOnCancel: true
  				});
  			}else if(this.hasAddcontactMonitor){
  				this.addToMonitorAlert = false;
  				swal({
  					 title: "提示",
  					 text: "该关联企业已添加关联监控",
  					 type: "info",
  					 showCancelButton: false,
  					 confirmButtonColor: "#DD6B55",
  					 confirmButtonText: "确认",
  					 cancelButtonText: "取消",
  					 closeOnConfirm: false,
  					 closeOnCancel: true
  				});
  			}else{
  				this.addToMonitorAlert = true;
  			}
  		},
  		//企业添加监控确认弹框关闭
  		addMonitorAlertHide: function(){
  			this.addToMonitorAlert = false;
  		},
  	  // 关联企业添加监控
  		sendContactListBatch: function(){
  			if(this.contactEntList){
  				this.contactEntList.other =  this.exhibitionOtherRequest;
  				var condition = JSON.stringify(this.contactEntList);
  				this.$post(this.api.fl_contact_monitor,condition,(result)=>{
  				// contactService.contactListRelationEntBatch(this.contactEntList).success(function(result){
  					this.addToMonitorAlert = false;
  					this.hasAddcontactMonitor = true;
  					if(result.success){
  						swal({
  							title: "提醒",
  							text: "添加成功",
  							type: "success",
  							confirmButtonColor: "#DD6B55",
  							confirmButtonText: "确定",
  							closeOnConfirm: true
  						},(confirm)=>{
	  						if(confirm){
	  							this.$router.push({name:"关联监控"});
	  						}
	  					});
  					}
  				});
  			}
  		},
  		// 添加自定义关系下的企业区域显示
  		addCustomRelationSectionShow: function(){
  			
  				this.relationNum = [
  					{name:""}, // 默认选择关系为五种
  					{name:""},
  					{name:""},
  					{name:""},
  					{name:""}
  				];  
  				//	
  				var oInput = $(".increase-custom-relation .select-relation-enter");
  				var tipLegalEle = $(".increase-custom-relation .tipLegal");
  				var selectRelation = $(".increase-custom-relation .select");

  				// 默认初始化添加自定义关系图表数据
  				tipLegalEle.hide(); 
  				$.each(oInput,function(i,value){

  					$(value).attr({"pripid":'',"type":'',regNo:'',creditCode:''});
  					$(value).val("");
  					selectRelation.eq(i).attr({"id":''});
  					selectRelation.eq(i).attr({"name":''});
  					selectRelation.find("span").html("选择关系");
  					
  				});	

  				$(".contact-list-btn-section").hide();
  				$(".increase-custom-relation").animate({"height":"418px"});

  				this.increaseEventInputBlur();
  			
  		},
  		// 添加文本框聚焦事件
  		increaseEventInputBlur: function(){
  			// 自定义关系企业失去焦点时，验证企业是否合法
  				var oInput = $(".increase-custom-relation .select-relation-enter");
  				oInput.unbind("blur");
  				var _this = this;	
  				oInput.bind("blur",function(ev){
  					var inputEle  = $(this);

  					if(_this.matchedEnter.length <= 0){
  						setTimeout(()=>{
  							var inputVal  = inputEle.val();
  							if(inputVal == ''){
  								inputEle.parent().next().hide();
  								return;
  							}
  							var condition ={
				  				keyword:inputVal
				  			};
  							_this.$getData(this.api.fl_queryEnterprisesByRegNo,condition,(result)=>{
  								var res = result.result[0];
  								
  								if(res.pripid == this.$route.query.pripid ){
  									swal({
  										 title: "提示",
  										 text: "该企业是主体企业无法添加",
  										 type: "info",
  										 showCancelButton: false,
  										 confirmButtonColor: "#DD6B55",
  										 confirmButtonText: "确认",
  										 cancelButtonText: "取消",
  										 closeOnConfirm: false,
  										 closeOnCancel: true
  									});

  									return false;
  								}
  								
  								inputEle.attr({"pripid":res.pripid,"type":res.type,regNo:res.regno,creditCode:res.creditcode,name:res.entname});

  								this.hasNoLegal = false;	
  								inputEle.parent().next().show();

  							}).error(function(result){

  								_this.hasNoLegal = true;

  							});
  						},60);
  					}
  				});
  		},
  		// 添加模糊搜索
  		blurSearchInput: function(){
  			var oInput = $(".increase-custom-relation .select-relation-enter");
  			var _this = this;
  			$(document).on("keydown",".increase-custom-relation .select-relation-enter",function(event){
  				var oInputEle = $(this);
  				_this.inputSearch = oInputEle;
  				var currentVal = oInputEle.val();
  				var index = oInputEle.parent().parent().parent().parent().index();
  				var top = 0;
  				if(index <= 0){
  					top = 55;
  				}else{
  					top = 55 + (index) *40;
  				}
  				$(".contact-content-enter #littleEnter").css({'top':top + 'px'});

  				if(event.keyCode == 13){
  					var condition = {
  						"keyword": currentVal,
  					};

  					_this.loadding = true; //搜索正在加载
  					_this.matchedEnter = [];

  					if(!currentVal ){
  						_this.loadding = false;
  						$("#s-query-text").blur();

  					}else{
  						_this.$getData(_this.api.fl_queryEnterprises,condition,function(response){
  							_this.searchEnterKind(response);
  							
  						},function(){
  							_this.loadding = false;
  						});
  					}
  				}

  			})

  		},
  		// 模糊查询完结果处理
  		searchEnterKind: function(response){

  			$("#s-query-text").blur();
  			if(response.success){
  				if( response.result && response.result.length >0 ){

  					this.matchedEnter =  response.result || [];
  				}else{
  					swal({
  						 title: "提示",
  						 text: "目标企业不存在",
  						 type: "info",
  						 showCancelButton: false,
  						 confirmButtonColor: "#DD6B55",
  						 confirmButtonText: "确认",
  						 cancelButtonText: "取消",
  						 closeOnConfirm: true,
  						 closeOnCancel: true
  					});
  				}
  			}else{
  				swal({
  					 title: "提示",
  					 text: "目标企业不存在",
  					 type: "info",
  					 showCancelButton: false,
  					 confirmButtonColor: "#DD6B55",
  					 confirmButtonText: "确认",
  					 cancelButtonText: "取消",
  					 closeOnConfirm: true,
  					 closeOnCancel: true
  				});
  			}

  			this.loadding = false;
  		},
  		goContactListBysearch: function(row){
  			this.inputSearch.val(row.entname);
  			this.matchedEnter = [];
  			var condition ={
  				keyword:row.entname
  			}
  			this.$getData(this.api.fl_queryEnterprisesByRegNo,condition,(result)=>{
  				var res = result.result[0];
  				
  				if(res.pripid == this.$route.query.pripid ){
  					swal({
  						 title: "提示",
  						 text: "该企业是主体企业无法添加",
  						 type: "info",
  						 showCancelButton: false,
  						 confirmButtonColor: "#DD6B55",
  						 confirmButtonText: "确认",
  						 cancelButtonText: "取消",
  						 closeOnConfirm: false,
  						 closeOnCancel: true
  					});
  					return false;
  				}
  				
  				this.inputSearch.attr({"pripid":res.pripid,"type":res.type,regNo:res.regno,creditCode:res.creditcode,name:res.entname});
  				this.hasNoLegal = false;	
  				this.inputSearch.parent().next().show();
  			},function(result){
  				this.hasNoLegal = true;
  			});
  			
  		},
  		// 添加自定义关系下的企业区域收起
			addCustomRelationSectionHide: function(){
				$(".increase-custom-relation").animate({"height":"0"});
				$(".contact-list-btn-section").show();
			},
			// 添加更多的自定义关系
			addMoreRelationEnt: function(){
				this.relationNum.push({name:""});
				var height = $(".increase-custom-relation").outerHeight() + 40;
				$(".increase-custom-relation").css({"height":height+"px"});
				this.increaseEventInputBlur();
				setTimeout(()=>{
					this.mySelect(".select");
				},100);
			},
			// 选择其他
			selectOther: function(str,event){
				setTimeout(function(){
					$(event.currentTarget).parent().parent().parent().find(".select span").html("选择关系");
				},60);
				if(str = 'other'){
					this.customRelationBomb = true;
				}
			},
			// 关闭添加自定义关系弹框	
			cancleaddRelationName: function(){
				this.customRelationBomb = false;
			},
			// 添加自定义关系名
			increaseRelation: function(){
				var oInput = $(".contact-alert .other-relation-name");
				var entName = oInput.eq(0).val();
				// 添加自定义关系名
				var condition = JSON.stringify({name:entName});
				this.$post(this.api.fl_contact_addRelation,condition,(result)=>{

					// 请求自定义关系数据
					this.queryRationList();
					this.customRelationBomb = false;
					swal({
						title: "提醒",
						text: "自定义关系添加成功",
						type: "success",
						confirmButtonColor: "#DD6B55",
						confirmButtonText: "确定",
						closeOnConfirm: true
					});

				});
			},
			// 添加自定义企业
			sendRelationCustom: function(){
				var inputVilidateenterEmpty = true;//添加的个数
				var oInput = $(".increase-custom-relation .select-relation-enter");

				// 有输入数据时进行存储	
				for(var i = 0; i < oInput.length; i++){

					var enterName = oInput.eq(i).attr('name');
					var objectType = oInput.eq(i).attr('type');
					var regNo = oInput.eq(i).attr('regNo');
					var creditCode = oInput.eq(i).attr('creditCode');
					var pripid = oInput.eq(i).attr('pripid');
					var relationId = oInput.eq(i).parent().parent().parent().next().find('.select').attr("id");
					var relationName = oInput.eq(i).parent().parent().parent().next().find('.select').attr("name");

					if(enterName && enterName != ''){
						inputVilidateenterEmpty = false;
						if(!relationId){
							this.exhibitionOtherRequest = [];
							swal({
		            title: "确认",
		            text: "所填写的企业请选择相应的关系！",
		            type: "info",
		            showCancelButton: false,
		            confirmButtonColor: "#DD6B55",
		            confirmButtonText: "确认",
		            cancelButtonText: "取消",
		            closeOnConfirm: false,
		            closeOnCancel: true
			        });
			        return false;
						}

						for(var j =0; j<this.exhibitionOtherRequest.length;j++ ){
							if(pripid == this.exhibitionOtherRequest[j].pripid && relationId == this.exhibitionOtherRequest[j].relationId){
						
								this.exhibitionOtherRequest = [];
								swal({
                  title: "确认",
                  text: "同一关系下不可以添加同一企业！",
                  type: "info",
                  showCancelButton: false,
                  confirmButtonColor: "#DD6B55",
                  confirmButtonText: "确认",
                  cancelButtonText: "取消",
                  closeOnConfirm: false,
                  closeOnCancel: true
                });
                return false;
							}
						}

						this.exhibitionOtherRequest.push({
							name:enterName,
							relationId:relationId,
							pripid: pripid,
							objectType: objectType,
							regNo: regNo,
							creditCode: creditCode,
							parentId  : this.$route.query.orderId || "",
						});
					}
				}

				//输入是否为空	
				if(inputVilidateenterEmpty){
					swal({
            title: "确认",
            text: "请先填写数据再保存",
            type: "info",
            showCancelButton: false,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "确认",
            cancelButtonText: "取消",
            closeOnConfirm: false,
            closeOnCancel: true
	        });
	        return false;
				}

				if(this.$route.query.state == 'delete'){

					// 维护自定义关系 -------关系往后台请求成功后再在页面插入
					var condition = JSON.stringify(this.exhibitionOtherRequest);
					this.$post(this.api.fl_contact_monitorEdit,condition,(result)=>{

						for(var j= 0; j < oInput.length; j++){
							oInput.eq(j).attr({'name':'','type':'','regNo':'','creditCode':'','pripid':''})
						}
						this.exhibitionOtherRequest = [];

						setTimeout(()=>{
	        		this.getRelationEntData();
	        	},100);
            swal({
                title: "成功",
                text: "成功！",
                type: "success",
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "确认",
                closeOnConfirm: true,
            });

            $(".increase-custom-relation").animate({"height":"0"});
						$(".contact-list-btn-section").show();

	        },function(result){
	        	this.exhibitionOtherRequest = [];
	        });
				}else {
					this.setPageRelationCustom();
				}
			},
			// 页面自定义关系显示格式
			setPageRelationCustom: function(){

				var oInput = $(".increase-custom-relation .select-relation-enter");

				for(var i = 0; i < oInput.length; i++){

					var enterName = oInput.eq(i).attr("name");
					var objectType = oInput.eq(i).attr('type');
					var regNo = oInput.eq(i).attr('regNo');
					var creditCode = oInput.eq(i).attr('creditCode');
					var pripid = oInput.eq(i).attr('pripid');
					
					var relationId = oInput.eq(i).parent().parent().parent().next().find('.select').attr("id");
					var relationName = oInput.eq(i).parent().parent().parent().next().find('.select').attr("name");

					if(enterName && enterName != '' && relationId){
						var isRepeatBool = this.isRepeat(this.exhibitionOtherPage,relationName);
						if(isRepeatBool){
							this.exhibitionOtherPage[relationName].push({
								name:enterName,
								relationId:relationId,
								pripid:pripid
							});
						}else{

							this.exhibitionOtherPage[relationName] = [];
							this.exhibitionOtherPage[relationName].push({name:enterName,relationId:relationId,pripid:pripid});
						}

					}

				}
				this.contactEntList.other = this.exhibitionOtherRequest;

				// 判断自定义个数	
				this.jslength=0;
				if(this.exhibitionOtherPage){
					$.each(this.exhibitionOtherPage,function(i,value){
						if(value.length > 0){
							this.jslength++;
						}
					});
				}

				setTimeout(()=>{
					this.renderFinish();
					if(this.exhibitionOtherPage){
						if(this.jslength >= 3){
							var width = $("#scroll-hoz").eq(0).outerWidth()/3 * this.jslength;
							$("#scroll-hoz .custom-item-inner").css({"width":width +"px"});
							$("#scroll-hoz .custom-item-inner .relation-list").css({"width":$("#scroll-hoz").eq(0).outerWidth()/3 +"px"});
							$(document).ready(function ($) {
				        $('#scroll-hoz').perfectScrollbar();
				      });
						}
						
					}
				},30);
					// 判断添加自定义关系后的数据是否为空
				// this.isOtherHasData = jQuery.isEmptyObject(this.exhibitionOtherPage);
				for(var j= 0; j < oInput.length; j++){
					oInput.eq(j).attr({'name':'','type':'','regNo':'','creditCode':'','pripid':''})
				}
				$(".increase-custom-relation").animate({"height":"0"});
				$(".contact-list-btn-section").show();
			},
			// 选择关系	
			selectRelation: function(row){
	    	this.relationId = row.id;
	    },
		   // 去重 	
			isRepeat: function(json,relationName){
				for(var j in json){
					if(j == relationName){
						return j
					}
				}
				return false;
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
			// 选择要删除的关联企业
			selectDEleteEnter: function(row,event){ 
	        var action = event.target
	        if(action.checked){//选中，就添加
	            this.deleteEnter.push(row.orderId);
	        }else{
	        	
	        	for(var i=0; i<this.deleteEnter.length; i++){
	        		if(row.orderId  == this.deleteEnter[i]){
	        			this.deleteEnter.splice(i,1);
	        		}
	        	}
	           
	        }

	        if(this.deleteEnter.length == 0){
	        	this.deleEnterEmpty = true;
	        }else{
	        	this.deleEnterEmpty = false;
	        }
	    },
	    // 确认要删除企业 	
	    terminateAlert: function(){
	    	if(this.deleEnterEmpty){
	    		return;
	    	}else {
		       this.terminateAlertStatus = true;
	        }
	    },
	   	// 删除弹框关闭	 	
	    terminateAlertColse: function(){
	    	this.terminateAlertStatus = false;

	    },
	    // 操作：终止监控
	    terminate: function() {
	    	var condition = JSON.stringify({orderIds:this.deleteEnter});
	      this.$put(this.api.fl_contact_batchTerminate,condition,()=>{    
        	this.getRelationEntData();
        	this.deleteEnter = []; //  所要取消监控的企业
        	this.deleEnterEmpty = true; //判断取消监控按钮是否高亮
        	this.terminateAlertStatus = false;
          swal({
              title: "成功",
              text: "成功！",
              type: "success",
              confirmButtonColor: "#DD6B55",
              confirmButtonText: "确认",
              closeOnConfirm: true,
          });
        });
	    },
			//设置竖向滚动条
			renderFinish: function(){
				
			    $(".default-relation .relation-item-wrap").slimScroll({ 
			    	height: '320px', 
			    	alwaysVisible: true, 
			    });

			     $(".custom-relation .relation-item-wrap").slimScroll({ 
			    	height: '200px', 
			    	alwaysVisible: true, 
			    });
			},
	    init: function(){

				if(this.$route.query.tab == 'frame'){
					this.frameshow = true;
					var orderId = this.$route.query.orderId || "";
					this.readRelationMap(orderId);

				}else{
					this.frameshow = false;
				}
				// 如果再添加自定义关系页面判断是否添加了监控	
				if(this.$route.query.state != 'delete'){
					this.isAddContactMonitor();
				}
				this.getRelationEntData();
				this.queryRationList();
				this.blurSearchInput(); 
		}
  },
  mounted(){
  	//	移入移出效果
  	$("body").on("mouseover",".contact-content-enter .c-custlist-item",function(event){
  		$(".c-custlist-item").removeClass('ccustlistitemhover');
  		$(this).addClass('ccustlistitemhover');
  	});

  	this.init();
  },
  filters:{
  	relationBtnDescribe(value){
  		var newBtnName ;
  		if(value){
  		    newBtnName = '维护自定义关系';
  		}else{
  		    newBtnName = '添加自定义关系';
  		}
  		return newBtnName
  	}
  }
}
</script>
<style lang="scss" scoped>
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
      border-bottom:1px solid #5B9BD1;
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
              background:#5B9BD1;
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
        background:#5B9BD1;
        font-size:14px;
        color:#fff;
        &.cancel{
          background:#a0a0a0;
          margin-right:18px;
        }
      }
    }
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
	.contact-content-enter{
    border:1px solid #ddd;
    border-top:none;
    position:relative;
    button{
    	border:none;
    }
    .select{
      position:relative;
      float: left;
      width:124px;
      height:30px;
      margin-left:20px;
      cursor: pointer;
      .select-selected{
        span{
          float: left;
          width:94px;
          height:30px;
          padding:0 5px;
          line-height:30px;
          background:#5B9BD1;
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
          background:#5B9BD1 url("/static/images/fengling/select-arrow.png") no-repeat center ;
        }
      }
      ul{
        position:absolute;
        left:0;
        top:31px;
        display: none;
        width:100%;
        font-size:14px;
        background:#fff;
        z-index:1000;
        border:1px solid #6d9add;
        height: 122px;
        overflow-y: scroll;
        li{
          width:100%;
          height:30px;
          line-height: 30px;
          color:#333;
          padding-left:6px;
          padding-right:36px;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          text-align:center;
          &:hover{
            background:#5B9BD1;
            color:#fff;
          }    
        }
      }
    }
    .contact-tab{
        .contact-tab-hd{
          li{
            float: left;
            width:50%;
            height:48px;
            border-top:2px solid #ccc;
            background:#ccc;
            font:normal 18px/48px 'Hiragino Sans GB' ,'microsoft yahei';
            color:#fff;
            text-align:center;
            cursor: pointer;
            &.current{
              border-top:2px solid #6d9add;
              background:transparent;
              color:#333;
            }
          }
        }
        .contact-tab-bd{
          background:#fff;
          &:nth-of-type(1){
            .contact-item.full{
               background:#1b2e47;
            }
          }
          .contact-framecontainer{
            position: relative;
            width:100%;
            height:574px;
            overflow:hidden;
          }
        }
        .contact-bd-head{
          width:100%;
          padding:0 32px;
          .contact-list-btn-section{
            height:60px;
          }
          .right{
            float: right;
          }
          a{
            display: inline-block;
            width:120px;
            height:40px;
            font:normal 14px/40px '宋体';
            text-align:center;
            color:#fff;
            margin:10px 0 0 16px;
            &.cont-control-enter{
              background:#f59639;
              margin-left:0;
            }
            &.append-monitor-enter{
              background:#5B9BD1;
            }
            &.cancel-monitor-enter{
              background:#a0a0a0;
            }
            &.append-custom-relation{
              background:#4DB3A4;
              &:hover{
								background:#fff;
								border:1px solid #4DB3A4;
								color:#4DB3A4;
              }
              &.disabled{
                  background:#a0a0a0;
              }
            }

            &.contact-right-excel{
              float: right;
              margin-top:10px;
              background:#5B9BD1;
            }
            &.disabled{
              background:#a0a0a0;
            }
          }
        }
        .increase-custom-relation{
          width:100%;
          height:0;
          margin:auto;
          overflow:hidden;
          .alert-h3{
            position:relative;
            padding:20px 0;
            background:none;
            font-size:18px;
            border-bottom:1px solid #5B9BD1;
            button{
              position:absolute;
              top:10px;
              right: 0;
              margin:0 10px;
              width: 122px;
              height: 40px;
              background: #5B9BD1;
              font-size: 14px;
              color: #fff;
              &.cancel{
                background:#a0a0a0;
              }
               &.sure{
                right:150px;
              }
            }
          }
          .increase-custom-relation-inner{
              width:760px;
              margin: 0 auto;
              padding-top:18px;

          }
           width:100%;
           margin:auto;    
          .alert-tit{
              .enter-name{
                  float: left;
                  width:50%;;
                  text-align:center;
              }
              .relation-type{
                  float: left;
                  width:50%;
                  text-align:center;
              }
          }
          .alert-con{
              position:relative;
              padding:14px 44px 40px;
              font-size:12px;
              .select-relation-item{
                  width:100%;
                  margin-top:10px;
                  .select-outer{
                      position:relative;
                      float: left;
                      width:50%;
                      .select{
                          width:150px;
                          margin:0 auto !important;
                          float: none;
                          .select-selected span{
                              width:120px;
                          }

                      }
                      i.note-i{
                          display: none;
                          position:absolute;
                          top:0px;
                          right:76px;
                          line-height:30px;
                          color:#c30;
                      }
                  }
                  .input-outer{
                      float: left;
                      width:50%;
                      .input-wrap{
                          position:relative;
                          width:338px;
                          margin:0 auto;
                          .input-item{
                              position:relative;
                              &:nth-of-type(2){
                                  margin-top:10px;
                              }
                          }
                          input{
                              border:1px solid #5B9BD1;
                              width:338px;
                              height:30px;
                              text-indent:8px;
                              color:#888;
                          }
                        
                          .tipLegal{
                              display: none;
                              position:absolute;
                              top:0;
                              right:-28px;
                              width:20px;
                              height:30px;
                              background:url("/static/images/fengling/contact/icon-yes.png") no-repeat 0 center;
                              z-index:10;

                          }
                      }

                  }
              }
              .add-custom-btn{
                  margin-top:20px;
                    span{
                      float: right;
                      width:auto;
                      height:30px;
                      padding:0 6px 0 36px;
                      background:url("/static/images/fengling/contact/contact-append-custom.png") no-repeat left 0;
                      font:normal 12px/30px  "宋体";
                      color:#999;
                      cursor:pointer; 
                    }  
              }
              .btn-section{
                  
              }
              .little-enter{
                  z-index: 100;
                  position:absolute;
                  top: 55px;
                  left: 44px;
                  width: 580px;
                  background-color: rgb(247, 247, 247);
                  .emptyMatchEnt{
                      line-height:28px;
                      padding-left:20px;
                      color:rgb(255, 0, 0);
                      background:rgb(247, 247, 247);
                  }
                  .loadding{
                      line-height:28px;
                      padding-left:20px;
                      background:rgb(247, 247, 247);
                  }
                  .c-custlist-item{
                      border-bottom: #eee solid 1px;
                      cursor: pointer;
                      padding:6px 36px;
                      height:52px;

                      i{
                         padding:8px;
                      }
                      p{
                          margin-top:4px;
                          font-size:12px;
                          color:#666;
                      }
                      .entNameHttp{

                      }
                  }
                  .ccustlistitemhover{
                      background-color: #00AEFF;
                      color: #fff;
                      p{
                          color:#fff;
                      }
                  }
                  .c-add-cust-btn{
                      color:#00AEFF;
                  }
                  .ccustlistitemhover .c-add-cust-btn{
                      color:#fff;
                  }
                  
                  .c-delete-cust-btn{
                      background-color: #ff0000;
                      text-align: center;
                      cursor: pointer;
                  }
                  
                  .c-checked-item{
                      background-color: #8BC34A;
                      color: #fff;
                      margin-top:3px;
                      padding-left:10px;
                      line-height: 25px;
                      font-size: 12px;
                  }

              }
          }
            
        }
        .cont-table{
          .cont-table-item{
            float: left;
            width:50%;
            border-right:1px solid #ddd;
            border-bottom:none;
            &:last-child{
              border-right:none;
            }
            .relation-item{
              width:100%;
              height:40px;
              border-bottom:1px solid #ddd;
              font:normal 12px/40px "宋体";
              cursor: pointer;
              .status{
                float:left;
                width:(218/800)*100%;
                height:40px;
                padding:0 10px 0 30px;
                input{
                  vertical-align: top;
                  margin-top:14px;
                }
                span{
                  margin-left:24px;
                }
              }
              .enter-name{
                float: left;
                width:100%;
                height:40px;
                text-align:center;
              }
              .nodata{
                color:#666;
                text-align:center;
              }
            }
            
            .tit{
                width:100%;
                height:40px;
                background:#5B9BD1;
                font:normal 14px/40px "宋体";
                color:#fff;
                text-align:center;
            }
            .relation-item-wrap{
                // height:200px;
                overflow: hidden;
            }
          }
          &.default-relation{
            .relation-list{
              height:360px;
            }
            .shareholder{
              &:hover{
                background:#edfffd;
              }
            }
            .investment{
                &:hover{
                    background:#fff7ef;
                }
                
            }
            .LegalPerinvestmentAndOffice{
                &:hover{
                    background:#f9f0ff;
                }
                
            }
          }
        }
        .custom-relation {
          .thead-tit{
            width:100%;
            height:48px;
            padding-left:24px;
            border-top:2px solid #5B9BD1;
            font:normal 18px/48px 'Hiragino Sans GB' ,'microsoft yahei';
          }
          .cont-table{
              &.custom-item-wrap{
                  position:relative;
                  width:100%;
                  height:240px;
                  font-size:0;
                  white-space: nowrap;
                  overflow:hidden;
                  .custom-item-inner{
                      // width:1200px;
                      height:240px;
                  }
              }
              .relation-list{
                  width:33.33%;
                  font-size:12px;
                  white-space: normal;
                  border: none;
              }
              .relation-list{
                  border-right:1px solid #ddd;
                  //&:nth-of-type(3){
                      //border-right:none;
                  //}
                  .relation-item{
                      &.has-data{
                          &:hover{
                              background:#e1f0ff;
                          }
                      }
                      .status{
                          width:(150/450)*100%;
                      }
                      .enter-name{
                          width:100%;
                          &.deleWidth{
                              width:(300/450)*100%;
                          }
                      }

                  }
              }
          }
        }
    }
    .ent-detail{
        position:fixed;
        top:50%;
        left:50%;
        width:454px;
        // height:266px;
        margin-left: -226px;
        margin-top:-100px;
        border: 8px solid #6d9add;
        background:#fff;
        color:#333;
        z-index:10000;
        // @include myTranslate;
        h3{
            position:relative;
            width:100%;
            // height: 50px;
            // line-height: 50px;
            padding: 14px 44px 14px 14px;
            background:#fff;
            border-bottom:none;
            font-size:18px;
            span{
                margin-left:12px;
                font-size:14px;
                color:#c30;
            }
            .close-detail{
                position:absolute;
                top:14px;
                right:20px;
                width:20px;
                height:20px;
                background: url("/static/images/fengling/contact/icon-close-normal.png") no-repeat center;
                cursor: pointer;
            }

        }
        table{
            width:100%;
            tr{
                
                td{
                    height:40px;
                    height:40px;
                    text-align:center;
                    vertical-align: middle;
                    border-top: 1px solid #6d9add;
                    border-right:1px solid #6d9add;
                    ;outline:none;
                    &:nth-of-type(1){
                        width:(165/520)*100%;

                    }
                    &:nth-of-type(2){
                        width:(355/520)*100%;
                        
                    }
                }
            }
        }
    }
    .contact-alert{
        width:600px;
        .alert-tit{
            position:relative;
            padding-left:40px;
            background:none;
            .close-alert{
                position:absolute;
                top:12px;
                right:12px;
                width:25px;
                height:25px;
                background:url("/static/images/fengling/contact/icon-close-normal.png") no-repeat center;
                z-index:10000;
                cursor:pointer;
                
            }
        }
        .alert-con{
            padding:14px 44px 20px;
            font-size:12px;
            .select-relation-item{
                width:100%;
                margin-top:10px;
                .input-wrap{
                    width:338px;
                    margin:auto;
                    .input-item{
                        position:relative;
                        &:nth-of-type(2){
                            margin-top:10px;
                        }
                    }
                    input{
                        border:1px solid #5B9BD1;
                        width:338px;
                        height:30px;
                        text-indent:8px;
                        color:#888;
                    }
                }

            }
            .btn-section{
                width:100%;
                margin:30px auto 0;
                button{
                    float: right;
                    margin-left:20px;
                }
            }
        }
        
    }
    .sure-section{
        .con{
            display: table-cell;
            width:480px;
            height:116px;
            text-align:center;

        }
        .info{
            display:block;
            font:normal 16px 'Hiragino Sans GB' ,'microsoft yahei';
            text-align:center;

        }
        .tip{
            margin-bottom:10px;
        }
        .btn-section{
            margin:0px auto 34px;
        } 
    }
    .del-section{
      .con{
        vertical-align: middle;
        .info{
          display: inline;
        }
      }
    }
	}
</style>
