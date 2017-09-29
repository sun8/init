<template>
  <div class="entRelation">
    <div class="header" @click="closeCata($event)" id="relation_header"> 
      {{ $route.query.type | netDes}}&nbsp;&nbsp;<p class="companyName_size">{{companyName}}</p>
      <div class="user_info" @click="controlCata($event)" id="user_info_id">
        <p class="userName">{{userName}}，您好</p>
        <span class="userIc"></span>
      </div>
    </div>
    <div class="header_icon" @click="controlSidebar()"></div>
    <!-- <div class="mode_ent" v-show="isshowMode">
      <p class="dynamic" @click="updateOption('dynamic')" title="雪花图" id="dynamic"></p>
      <p class="hierarchy" @click="updateOption('hierarchy')" title="组织结构图" id="hierarchy"></p>
    </div> -->
    <div class="legend" v-show="isshowlegend">
      <ul class="legend_ul">
        <li v-if="$route.query.type == 'risk'"><p class="revoke"></p>吊销公司</li>
        <li v-if="$route.query.type == 'risk'"><p class="cancel_company"></p>注销公司</li>
        <li v-if="$route.query.type == 'risk'"><p class="revoke_company"></p>违约失信</li>
        <li v-if="$route.query.type == 'contrlway'||$route.query.type == 'essence'"><p class="last_contrl"></p>最终控股</li>
        <li v-if="$route.query.type == 'contrlway'"><p class="center_contrl"></p>控制节点</li>
        <li><p class="enquire_company"></p>查询公司</li>
        <li v-if="!($route.query.type == 'contrlway')"><p class="line"></p>疑似关系</li>
        <li v-if="$route.query.type == 'risk'||$route.query.type == 'contrlway'"><p class="line_contrl"></p>关系路径</li>
        <li v-if="$route.query.type == 'overall'||$route.query.type == 'multi'"><p class="tips_company"></p>疑似公司地址</li>
        <li v-if="$route.query.type == 'overall'||$route.query.type == 'multi'||$route.query.type == 'risk'"><p class="tips_phone"></p>疑似电话</li>
        <li v-if="$route.query.type == 'essence'"><p class="tips_home"></p>疑似人员地址</li>
      </ul>
    </div>
    <div class="network-content">
      <div class="chartRelation" id="chartRelation" v-bind:style="{width:chartWidth+'px',height:chartHeight+'px'}"></div>
    </div>
    <div class="slidebar" id="slidebar_id">
      <div class="slidebar-outter" v-bind:class="{ sideclose: $store.state.entrelation.sidebarStatus }">
        <ul class="slidebar-inner" @click="controlSidebar1()" id="slidebar-inner">
          <li class="sub-title" v-bind:class="{ closedown: $store.state.entrelation.sidebarStatus || closeDropdown.ent }" v-if="$route.query.type == 'overall'||$route.query.type == 'risk'">
            <p @click="dropdownSlide('ent','relation')" id="company_relation_id">
              <img src="static/images/relations/icon-company_relationship.png">
              企业关系
              <i class="arrow arrow-btn"></i>
            </p>
            <ul class="submenu">
              <li>
                <label class="label-checkbox" id="entShareholder_id">
                  企业股东
                  <div class='chekcbox-wrap'>
                    <i class="checkbox checkbox-entShareholder" :class="{disabled:investDisabled}"></i>
                    <input type="checkbox" name="" value="entShareholder"  v-model="checkedNames" :disabled="investDisabled">
                  </div>
                </label>
              </li>
              <li>
                <label class="label-checkbox" id="entOutInvest_id">
                  企业对外投资
                  <div class='chekcbox-wrap'>
                    <i class="checkbox checkbox-entOutInvest" :class="{disabled:investDisabled}" ></i>
                    <input type="checkbox" name="" value="entOutInvest" v-model="checkedNames" :disabled="investDisabled">
                  </div>
                </label>
              </li>
            </ul>
          </li>
          <li class="sub-title"  v-bind:class="{ closedown: $store.state.entrelation.sidebarStatus || closeDropdown.ent }" v-if="$route.query.type == 'overall'||$route.query.type == 'risk'">
            <p  @click="dropdownSlide('person','relation')" id="person_relation_id">
              <img src="static/images/relations/icon-person_relationship.png">
              人员关系
              <i class="arrow arrow-btn"></i>
            </p>
            <ul class="submenu">
              <li>
                <label class="label-checkbox" id="personShareholder_id">
                  自然人股东
                  <div class='chekcbox-wrap'>
                    <i class="checkbox checkbox-personShareholder" :class="{disabled:investDisabled}"></i>
                    <input type="checkbox" name="" value="personShareholder" v-model="checkedNames" :disabled="investDisabled">
                  </div>
                </label>
              </li>
              <li>
                <label class="label-checkbox" id="personManager_id">
                  管理人员
                  <div class='chekcbox-wrap'>
                    <i class="checkbox checkbox-personManager" :class="{disabled:managerDisabled}"></i>
                    <input type="checkbox" name="" value="personManager" v-model="checkedNames" :disabled="managerDisabled">
                  </div>
                </label>
              </li>
            </ul>
          </li>
          <li class="sub-title" v-bind:class="{ closedown: $store.state.entrelation.sidebarStatus || closeDropdown.suspected}" v-if="$route.query.type == 'overall'||$route.query.type == 'risk'">
            <p @click="dropdownSlide('suspected','relation')" id="doubt_relation_id">
              <img src="static/images/relations/icon-Suspected_relationship.png">
              疑似关系
              <i class="arrow arrow-btn"></i>
            </p>
            <ul class="submenu">
              <li>
                <label class="label-checkbox" id="samedom_id">
                  相同办公地址
                  <div class='chekcbox-wrap'>
                    <i class="checkbox checkbox-samedom" :class="{disabled:samedomDisabled}"></i>
                    <input type="checkbox" name="" value="samedom" v-model="checkedNames" :disabled="samedomDisabled">
                  </div>
                </label>
              </li>
              <li>
                <label class="label-checkbox" id="sametel_id">
                  相同电话
                  <div class='chekcbox-wrap'>
                    <i class="checkbox checkbox-sametel" :class="{disabled:sametelDisabled}"></i>
                    <input type="checkbox" name="" value="sametel" v-model="checkedNames" :disabled="sametelDisabled">
                  </div>
                </label>
              </li>
            </ul>
          </li>
          <li class="sub-title" v-bind:class="{ closedown: $store.state.entrelation.sidebarStatus || closeDropdown.operate}">
            <p @click="dropdownSlide('operate','operate')" id="operate_relation_id">
              <img src="static/images/relations/icon_operation.png">
              操作
              <i class="arrow arrow-btn"></i>
            </p>
            <ul>
              <li v-on:click="exportImageAll()" id="exportImageAll_id">导出全景图</li>
              <!-- <li v-on:click="saveNet()" id="saveNet_id" >保存图谱</li> -->
            </ul>
          </li>
        </ul>
      </div>
    </div>
    <div class="searchbar clearfix w_b" style="position:fixed;width:auto;">
      <div class="location-inner ">
        <input type="text" name="" placeholder="输入名称快速定位" v-model.trim="searchLocationName"  @keyup="choose_event($event)" id="quickSearch_id">
        <i class='search-icon' @click="selectedEntByLocation(searchLocationName)" id="selectedEntByLocation_id"></i>
      </div>
      <item-list class="ess_list_type" v-if="$store.state.showlist" @itemZhi="getLocationCompany"></item-list>
    </div>
    <!-- 测试start -->
    <!-- <div class="fullscreen" @click="fullscreen"></div> -->
    <!-- 测试end -->
    <!-- 联动文本框 start-->
    <div class="nlContent" id="nlContent" v-bind:class="{ nl_close: nl_Status }" >
    </div>
    <p class="nlbt" v-bind:class="{ nlbt_close: nl_Status }" @click="contrNl()" id="contrNl_id"></p>
    <!-- end -->
    <div class="save-net-outter" v-if="netLayer">
      <div class="save-net">
        <div class="title">保存族谱</div>
        <div class="content">
          <div class="tip">保存的族谱名称不能为空</div>
          <div class="item clearfix">
            <span>名称：</span> <input type="text" name="" placeholder="不超过20个字符" v-model="saveTitle" id="saveTitle_id">
          </div>
          <div class="item clearfix">
            <span>说明：</span> <textarea placeholder="不超过80个字符" v-model="saveDes" id="saveDes_id"></textarea>
          </div>
          <div class="item item-btn">
            <a class="btn btn-default" @click="closeNet()" id="closeNet_id">取消</a>
            <a class="btn btn-default" @click="saveNetSure()" id="saveNetSure_id">确认</a>
          </div>
        </div>
      </div>
    </div>
    <div class="loadding" v-if="loadding">
      <img src="static/images/relations/loading.gif" alt="loading">
    </div>
    <div class="footer_title">2017 © 北京中数智汇科技股份有限公司</div>
    <div class="norelation" v-if="norelation.length">
      <h3>无关联企业</h3>
      <p v-for="item in norelation">
        {{item}}
      </p>
    </div>
  </div>
</template>

<script >
  export default{
    data() {
      return {
        saveDes:"",
        saveTitle:"",
        test:false,
        selectNodeIdArr:[],
        initialNodes:[],
        hideNodes :[],
        startNodeId: "",
        searchLocationName:"",
        checkedNames: [],
        company: "",
        currentQuery: [],// 二次筛选
        currentOrderId: "",
        netLayer: false,
        // sidebarStatus:true,
        chartWidth:0,
        chartHeight:0,
        closeDropdown:{
          ent:false,
          person:false,
          suspected:false,
          operate:false,
          node:true,
          currentQuery:false
        },
        initLoad: true,
        loadding:false,
        jsonSort_node:{},
        jsonSort_link:{},
        investDisabled: false,
        managerDisabled: false,
        samedomDisabled: false,
        sametelDisabled: false,
        net:{},
        norelation: [],
        alreadyClick : false,
        //面板详情和鼠标移上事件的切换
        change_tab : false ,
        nl_Status:true,
        userName:"",
        relationAttrs:[],
        isuser_cata:false,
        stop_list : true,
        item0:true,
        isshowMode:false,
        isshowlegend:true,
        // 控制多次按回车
        is_enter:false,
        // 原数据
        initial_Array:{},
        // 原始数据的节点字典序
        initial_Array_nodes:{},
        // 原始数据的线字典序
        initial_Array_links:{},
        // 风险视图数据请求条件
        riskArray:[],
        // 风险视图利用的合并线之后的数据
        net_Array:{},
        companyName:"",
        net_ArrayInitial:{}
      }
    },
    methods: {
      fullscreen:function(){
        $(".network-content").css("z-index",10001)
        this.chart.fullscreen(true)
      },
      myFunction:function(){
        alert("333")
      },
      outLogin:function(){
        this.$router.push({path:'/login'})
        // var token = window.localStorage.getItem('token')
        // var _this = this
        // var _token = {token:token}
        // var Json_token = JSON.stringify(_token);
        // this.$ajax({url:_this.api.out_login,Json_token,type:"delete",success:function(data){
        //   if(data.code == 200){
        //     localStorage.removeItem("psw");
        //     localStorage.removeItem("ftime");
        //     window.localStorage.removeItem("token");
        //     localStorage.removeItem("usrName");
        //     localStorage.removeItem("usr");
        //     localStorage.removeItem("usrId");
        //     _this.$router.push({path:'/login'})
        //   }
        // }})
      },
      closeCata:function(event){
        this.isuser_cata =false
        event.cancelBubble = true
      },
      controlCata:function(event){
        this.isuser_cata = !this.isuser_cata
        event.cancelBubble = true;
      },
      contrNl:function(){
        this.nl_Status = !this.nl_Status

        $("#nlContent").empty();
        $("#nlContent").html("<p class='tip_content'>各个节点和关系的详情面板</br>请点击需要查看的节点或关系</p>")
        this.change_tab = !this.change_tab

      },
      makeMap: function(data){
        var _this = this;
        _this.chart = new NetChart({
          container: document.getElementById("chartRelation"),
          interaction: {
            resizing: {
              enabled: false
            },
            zooming: {
              initialAutoZoom:false,
              doubleClickZoom:3,
              zoomExtent: [0.1, 2],
            },
          },
          navigation: {
            // 谁为目标节点,分多节和单节点
            initialNodes: _this.initialNodes,
            mode: "focusnodes" ,
            // initialNodes: null,
            // mode: "showall" ,
            focusNodeExpansionRadius: 1060000000000,
            focusNodeTailExpansionRadius: 0.3,
            numberOfFocusNodes: 6,
            // autoUnfocus:false,
            // autoZoomOnFocus:true
            // expandOnClick: true

          },
          data: {
                preloaded:data
            },
          layout: {
            mode: "dynamic",
            // incrementalLayoutMaxTime:1,
            // initialLayoutMaxTime:10,
            // layoutFreezeMinTimeout:5,
            globalLayoutOnChanges:false,
            nodeSpacing:26,
            layoutFreezeTimeout:5
          },
          style: {
            // nodeAutoScaling:"logaritmic",
            // nodeRadiusExtent:[100,150],
            nodeLabelScaleBase:10,
            node:{
              display:"text",
              imageCropping: true
            },
            nodeDetailMinSize:0,
            linkDecorationMinSize:0.1,
            linkDecorationScale:6,
            nodeDetailMinZoom:0,
            selection:{
              fillColor:"#9aabeb",//颜色//022ccc
              sizeConstant:5 ,
              shadowColor: "transparent"
            },
            // nodeHovered:{
            //   shadowColor:"#3f51b5"
            // },
            // nodeSelected:{
            //   shadowColor:"#3f51b5",
            //   shadowBlur:20
            // },
            // linkHovered:{
            //   shadowColor:"#666"
            // },
            // linkSelected:{
            //   shadowColor:"#666"
            // },
            nodeStyleFunction: _this._nodeStyle,
            linkStyleFunction: _this._linkStyle,
            nodeLabel:{
              textStyle:{
                fillColor: '#444',
                font: "36px 微软雅黑"
              },
              borderRadius: 0,
              maxWidth: 200,
              align:"center",
              aspectRatio:6,
              scaleWithZoom:true
            },
            nodeRadiusExtent:[0,200],
            link: {
              toDecoration:"arrow",//箭头
              fromDecoration:"",//箭头
            },
            linkLabel:{
              padding: 2,
              textStyle:{
                font:"12px 宋体",
                fillColor: "#666"
              },
              backgroundStyle:{
                fillColor:"#fff",
                lineColor:"#fff"
              }
            }
          },
          // // 导出excel表格
          // advanced:{
          //   dataExportFunction:function(data){
          //     alert("111")
          //   }
          // },
          info:{
            enabled: true,
            nodeContentsFunction: function(itemData, item){
              if(_this.change_tab){
                return;
              };
              var type = itemData.type;
              var html;
              var empty = "--";
              // 企业
              if(type == 1){
                html = "<div class='net-hover'>" +
                      "<h3>"+ itemData.properties.name +"</h3><p>"
                if(itemData.properties.entstatus == 1){
                  html += "在营</br>"
                }else if(itemData.properties.entstatus == 2){
                  html += "吊销</br>"
                }else if(itemData.properties.entstatus == 3){
                  html += "注销</br>"
                }else if(itemData.properties.entstatus == 4){
                  html += "迁出</br>"
                }else if(itemData.properties.entstatus == 5){
                  html += "撤销</br>"
                }else if(itemData.properties.entstatus == 6){
                  html += "临时(个体工商户使用)</br>"
                }
                html+="注册号："+(itemData.properties.regno || empty) + "</br>"+
                      "统一信用代码："+(itemData.properties.creditcode|| empty)  +"</br>"+
                      "成立日期："+(itemData.properties.esdate || empty)  + "</br>"+
                      "注册资本："+(itemData.properties.regcap || empty)  +" (万元）</br>"+
                      "行业："+(itemData.properties.industryphy_desc || empty)  +"</br>"+
                      (itemData.properties.riskinfo||'')  +
                      "</p>" +
                 "</div>";
              }
              // 人员
              if(type == 2){
                html = "<div class='transition-layer'>" +
                  "<p>"+ itemData.properties.name +"</p>" +
                  // "<p style='word-break:break-all;'>"+
                  // "人员标识："+itemData.properties.zsid +"</br>"+
                  (itemData.properties.riskinfo||'')  +
                "</div>";
              }
              // 疑似关系
              if(type == 3 || type == 4 || type == 5&&itemData.properties){
                html =  "<div class='transition-layer'>"+
                        "<p>"+itemData.properties.samevalue+"</p>"
                        "</div>";
              }else if(type == 3 || type == 4 || type == 5&&!itemData.properties){
                html =  "<div class='transition-layer'>"+
                        "<p>--</p>"
                        "</div>";
              }
              if(itemData.properties&&itemData.properties.pathLength){
                html += "风险系数："+itemData.properties.pathLength+"</br>"
                        
              }
              return html;
            },
            linkContentsFunction: function(itemData, item){
              // console.log(itemData.id)
              if(_this.change_tab){
                return;
              };
              // console.log(itemData)
              var type = itemData.type;
              var html = "";
              var empty = "--";

              if(itemData.type == 3 || itemData.type == 4 || itemData.type == 5){

                html += "<div class='transition-layer'>";
                html += "<p> "+item.from.label+"</p>";
                if(itemData.type == 3){
                  html += "<p class='relation'>同一联系方式</p>";
                }
                if(itemData.type == 4){
                  html += "<p class='relation'>同一办公地址</p>";
                }
                if(itemData.type == 5){
                  html += "<p class='relation'>同一疑似地址</p>";
                }

                var sameMsg = [];// 同一住宅地址，办公地址，电话企业或人员id
                if(_this.jsonSort_node[itemData.to].type == 3 || _this.jsonSort_node[itemData.to].type == 4 || _this.jsonSort_node[itemData.to].type == 5 ){
                  for(var i = 0;i<_this.net.links.length;i++){
                    if(_this.net.links[i].to == itemData.to){
                      sameMsg.push(_this.net.links[i].from);
                    }
                  }
                }
                for(var i = 0;i<sameMsg.length;i++){
                  if(_this.jsonSort_node[sameMsg[i]].name != item.from.label){
                    html += "<p> "+ _this.jsonSort_node[sameMsg[i]].name+"</p>";
                  }
                }
                html += "</div>";
                return html;
              }
              html += "<div class='net-hover'>";
              html += "<p>"+item.from.label + "</br>";
              if(itemData.type== 1){
                html += "投资</br>";
              }
              if(itemData.type==2){
                html += "任职</br>";
              }
              if((itemData.type.toString()).indexOf("1") != -1&&(itemData.type.toString()).indexOf("2") != -1){
                html += "任职，投资</br>";
              }
              if(itemData.type==6){
                html += "控股</br>";
              }
              if((itemData.type.toString()).indexOf("6") != -1&&(itemData.type.toString()).indexOf("7") == -1&&(itemData.type.toString()).indexOf("2") != -1){
                html += "任职，控股</br>";
              }
              if(itemData.type == 7){
                html += "参股</br>";
              }
              if((itemData.type.toString()).indexOf("6") == -1&&(itemData.type.toString()).indexOf("7") != -1&&(itemData.type.toString()).indexOf("2") != -1){
                html += "任职，参股</br>";
              }
              if((itemData.type.toString()).indexOf("6") != -1&&(itemData.type.toString()).indexOf("7")!= -1&&(itemData.type.toString()).indexOf("2") == -1){
                html += "控股</br>";
              }
              if((itemData.type.toString()).indexOf("6") != -1&&(itemData.type.toString()).indexOf("7")!= -1&&(itemData.type.toString()).indexOf("2") != -1){
                html += "任职，控股</br>";
              }
              html += item.to.label + "</br>";

              var labelConprop = (itemData.properties.conprop*100).toFixed(1);
              // 投资下的属性
              if((itemData.type.toString()).indexOf("1") != -1){
                html += "认缴出资日期："+(itemData.properties.condate || empty)  +"</br>";
                html += "认缴出资额："+(itemData.properties.subconam || empty)  + " (万元）</br>";
                html += "出资占比："+(labelConprop || empty)  +"%</br>";
              }

              if(itemData.properties.position_desc){
                html += "职位："+ (itemData.properties.position_desc || empty)  +"</br>";
              }

              if(itemData.properties.legal){
                html += "担任法人代表</br>";
              }
              html +=  "</p>" ;
              html += "</div>";
              return html;
            }
          },
          nodeMenu:{
            buttons:["hide","expand"]   //dynaminc
          },
          localization:{
            menu:{
              hide:"隐藏",
              collapse:"合并",
              expand:"展开隐藏节点"
            },
            toolbar:{
              fitTitle:"适合屏幕",
              rearrangeTitle:"重新排列元素",
              unfreezeTitle:"解锁全部",
              freezeTitle:"全部锁定",
              backTitle:"撤销上一步操作",
              fullscreenTitle: "切换全屏模式"
            }
          },
          linkMenu:{
            enabled:false
          },
          advanced:{
            pointer:{
              scrollIntoView:false
            }
          },
          events:{
            onClick:_this.clickEvent,
            onDoubleClick:_this.doubleClickEvent
          },
          toolbar:{
            location: "inside",
            fullscreen:false
            // zoomControl:false,
            // align:"right"
            // exportOptions:["xlsx"],
          }
        });
      },
      _nodeStyle: function(node) {
        var _this = this;
        node.label = node.data.name;
        node.labelStyle.padding = 20;
        // node.labelStyle.borderRadius=3
        node.fillColor = "#fff";
        node.lineColor = "#666";
        node.lineWidth = 1;
        node.display = 'text';
        var min = 20;
        var max = 55;
        _this.initNode(node);
      },
      _linkStyle: function(link) {

        // console.log(link.from.id); // 有关系没节点时找对应的节点
        // console.log(link.to.id);
        var _this = this;
        var linkColors = {
            "friend":"orange",
            "family":"green",
            "acquaintance":"grey"
        };
        link.length = .5;
        link.radius = 1;
        // link.fromDecoration = "circle";
        link.toDecoration = "arrow";
        if(link.data.properties.conprop && link.data.properties.conprop != "null"){
          var labelConprop = (link.data.properties.conprop*100).toFixed(1);
          // link.label = (link.data.properties.conprop * 100).toFixed(2) + "%";
          if(labelConprop <= 0){
            link.label = "";
          }else if(labelConprop < 1){
            link.label = "<1%";
          }else{
            link.label = labelConprop + "%";
          }
          if((link.data.type.toString()).indexOf("6") != -1&&(link.data.type.toString()).indexOf("7") == -1){
            link.label +=",控股"
          }
          if((link.data.type.toString()).indexOf("6") == -1&&(link.data.type.toString()).indexOf("7") != -1){
            link.label +=",参股"
          }
          if((link.data.type.toString()).indexOf("6") != -1&&(link.data.type.toString()).indexOf("7") != -1){
            link.label +=",控股"
          }
          if(link.data.properties.position_desc && link.label){
              link.label += "，"+link.data.properties.position_desc
          }
          if(link.data.properties.legal){
            link.label += "，法人</br>";
          }
        }else if(link.data.properties.position_desc&&link.data.properties.legal){
          link.label = link.data.properties.position_desc
          if(link.data.properties.legal){
              link.label += "，法人</br>";
          }
        }else if(link.data.properties.position_desc&&!link.data.properties.legal){
          link.label = link.data.properties.position_desc
        }else if(!link.data.properties.position_desc&&link.data.properties.legal){
          link.label = "法人</br>";
        }

        _this.initLink(link);
      },
      // 线恢复初始化
      initLink: function(link){
        link.radius = 1;
        if(link.data.type == 3 || link.data.type == 4 || link.data.type == 5){
          link.fillColor = '#719cc7';
        }else{
          link.fillColor = '#666';
        }
        if(link.data.color==true){
          link.fillColor = '#67d4c6';
          link.radius = 4;
        }
        if(this.$route.query.type=="contrlway"){
          if(link.data.properties.middlelink&& link.data.properties.middlelink== "middle"){
            link.fillColor = "#67d4c6"
            link.radius = 3;
          }
        }
      },
      // 节点恢复初始化
      initNode: function(node){
        var _this = this;
        var type = node.data.type;
        // console.log(node.data)
        // 判断节点类型
        if(type == 1){// 企业
          node.radius = 18;
        }else if(type == 2){ // 个人
          node.display = 'roundtext';
          node.radius = 30;
        }else if(type == 3){ // 同一电话
          node.display = 'circle';
          node.image = "../../static/images/relations/relation_shape_phone.png";
          node.imageSlicing = [0,0,60,60];
        }else if(type == 4){ //同一公司地址
          node.display = 'circle';
          node.image = "../../static/images/relations/relation_shape_company.png";
          node.imageSlicing = [0,0,60,60];
        }else if(type == 5){ //同一住宅地址
          node.display = 'circle';
          node.image = "../../static/images/relations/relation_shape_home.png";
          node.imageSlicing = [0,0,60,60];
        }
        // 输入节点
        if(node.data.innode){
          node.fillColor = "#70e6d7";
          node.lineWidth = 0;
          node.lineColor = "#70e6d7";
        }
        // 控制路径
        if(_this.$route.query.type=="contrlway"){
          if(node.data.properties.topnode&& node.data.properties.topnode== "top"){
            node.fillColor = "#c2c1ff";
            node.lineWidth = 0;
            node.lineColor = "#c2c1ff";
          }
          if(!node.data.innode&&node.data.properties.middlenode&& node.data.properties.middlenode== "middle"){
            node.fillColor = "#c1eebd";
            node.lineWidth = 0;
            node.lineColor = "#c1eebd";
          }
        }
        if(!(_this.$route.query.type=="essence")){
          if(node.data.properties.entstatus == 2){//吊销
            node.lineColor = '#ff0000'
          }
          if(node.data.properties.entstatus == 3&&!node.data.innode){//注销
            node.lineColor = '#e4e4e4'
            node.fillColor = '#e4e4e4'
          }
          if(node.data.properties.riskinfo){//违约失信
            node.lineColor = '#ff9900'
          }
        }
        if(_this.$route.query.type=="essence"){
          if(node.data.properties&&node.data.properties.topnode == "top"){
            // node.lineColor = "#ffcf40";
            node.fillColor = "#c2c1ff";
            node.lineWidth = 0;
          }
        }
      },
      updateStyle:function(){
        var _this = this
          setTimeout(function(){
              _this.chart.updateStyle();
          },500)
        },
      updateOption:function(type){
        // console.log(111)
        if("hierarchy"==type){
          this.chart.updateSettings({layout:{
             mode:"hierarchy",//环形结构
             rowSpacing:120,
             nodeSpacing: 10
          }});
        }else{
          this.chart.updateSettings({layout:{
              mode:"dynamic",//环形结构
              rowSpacing:80,
              nodeSpacing: 40
          }});
          this.chart.updateStyle();
          $(".DVSL-bar-btn-rearrange  p").click();
        }
      },
      nodeCFunction: function(itemData, item){
        var _this = this
        $(document).on("click",".tab_change",function(){
          _this.change_tab = false
          _this.nl_Status = true
          $("#nlContent").empty();
        });
        var type = itemData.type;
        var html;
        var empty = "--";

        // 企业
        if(type == 1){
          html = "<div >" +
                "<div class='nodeHeader'><span class='sp'></span><p class='com_info'>公司信息</p><a class='tab_change' >切换至页面弹框显示</a></div>"+
                "<div class='nodeBody'>" +
                  "<p class='com_title'>"+ itemData.properties.name +"</p>"
          if(itemData.properties.entstatus == 1){
            html += "<p class='com_status'>在营</p>"
          }else if(itemData.properties.entstatus == 2){
            html += "<p class='com_status'>吊销</p>"
          }else if(itemData.properties.entstatus == 3){
            html += "<p class='com_status'>注销</p>"
          }else if(itemData.properties.entstatus == 4){
            html += "<p class='com_status'>迁出</p>"
          }else if(itemData.properties.entstatus == 5){
            html += "<p class='com_status'>撤销</p>"
          }else if(itemData.properties.entstatus == 6){
            html += "<p class='com_status'>临时(个体工商户使用)</p>"
          }
            html+="<p class='com_detail'>"+
                  "注册号："+(itemData.properties.regno || empty) + "</br>"+
                  "统一信用代码："+(itemData.properties.creditcode|| empty)  +"</br>"+
                  "成立日期："+(itemData.properties.esdate || empty)  + "</br>"+
                  "注册资本："+(itemData.properties.regcap || empty)  +" (万元）</br>"+
                  "行业："+(itemData.properties.industryphy_desc || empty)  +"</br>"+
                  (itemData.properties.riskinfo||'')  +
                  "</p>" +
                "</div>"+
           "</div>";
        }
        // 人员
        if(type == 2){
          html = "<div>" +
            "<div class='nodeHeader'><span class='sp sp_p'></span><p class='com_info'>人员姓名</p><a class='tab_change' >切换至页面弹框显示</a></div>"+
            "<div class='nodeBody'>" +
              "<p class='com_title'>"+ itemData.properties.name +"</p>" +
              "<p class='com_title'>"+ (itemData.properties.riskinfo||'') +"</p>" +
            "</div>"+
          "</div>";
        }
        // 疑似关系
        if(type == 3 || type == 4 || type == 5){
          html ="<div class='nodeHeader'><span class='sp sp_ys'></span><p class='com_info'>疑似关系</p><a class='tab_change' >切换至页面弹框显示</a></div>"+
          "<div class='nodeBody'>"+
                  "<p class='com_detail'>"+itemData.properties.samevalue+"</p>"
                  "</div>";
        }
        if(itemData.properties.pathLength){
          html += "风险系数："+itemData.properties.pathLength+"</br>"
                  
        }
        return html;
      },
      linkCFunction: function(itemData, item){
        $(document).on("click",".tab_change",function(){
          _this.change_tab = false
          _this.nl_Status = true
          $("#nlContent").empty();
        });
        var type = itemData.type;
        var html = "";
        var empty = "--";
        var _this = this;
        if(itemData.type == 3 || itemData.type == 4 || itemData.type == 5){

          html += "<div>";
          html += "<div class='nodeHeader'><span class='sp sp_ys'></span><p class='com_info'>疑似关系</p><a class='tab_change' >切换至页面弹框显示</a></div>";
          html += "<div class='nodeBody'>" ;
          html += "<p class='com_title'> "+item.from.label+"</p>";
          if(itemData.type == 3){
            html += "<p class='com_detail'>同一联系方式</p>";
          }
          if(itemData.type == 4){
            html += "<p class='com_detail'>同一办公地址</p>";
          }
          if(itemData.type == 5){
            html += "<p class='com_detail'>同一住宅地址</p>";
          }

          var sameMsg = [];// 同一住宅地址，办公地址，电话企业或人员id
          if(_this.jsonSort_node[itemData.to].type == 3 || _this.jsonSort_node[itemData.to].type == 4 || _this.jsonSort_node[itemData.to].type == 5 ){
            for(var i = 0;i<_this.net.links.length;i++){
              if(_this.net.links[i].to == itemData.to){
                sameMsg.push(_this.net.links[i].from);
              }
            }
          }
          for(var i = 0;i<sameMsg.length;i++){
            if(_this.jsonSort_node[sameMsg[i]].name != item.from.label){
              html += "<p  class='com_title'> "+ _this.jsonSort_node[sameMsg[i]].name+"</p>";
            }
          }
          html += "</div>";
          html += "</div>";
          return html;
        }
        html += "<div>";
        html += "<div class='nodeHeader'><span class='sp sp_company'></span><p class='com_info'>关系信息</p><a class='tab_change' >切换至页面弹框显示</a></div>";
        html += "<div class='nodeBody'>" ;
        html += "<p class='com_title'>"+item.from.label + "</br></p>";
        if((itemData.type.toString()).indexOf("1") != -1){
          html += "<p class='com_status'>投资</br></p>";
        }
        if((itemData.type.toString()).indexOf("2") != -1){
          html += "<p class='com_status'>任职</br></p>";
        }
        html += "<p class='com_detail'>"+item.to.label + "</br>";

        // 投资下的属性
        if((itemData.type.toString()).indexOf("1") != -1){
          html += "认缴出资日期："+(itemData.properties.condate || empty)  +"</br>";
          html += "认缴出资额："+(itemData.properties.subconam || empty)  + " (万元）</br>";
          html += "出资占比："+(itemData.properties.conprop*100 || empty)  +"%</br>";
        }
        if(itemData.properties.position_desc){
          html += "职位："+ (itemData.properties.position_desc || empty)  +"</br>";
        }
        if(itemData.properties.legal){
          html += "担任法人代表</br>";
        }
        html +=  "</p>" ;
        html += "</div>";
        html += "</div>";
        return html;
      },
      doubleClickEvent:function(event){
        var _this = this
        if(_this.$route.query.type=="risk"){
          if(event.clickNode){
            // console.log(event.clickNode)
            // 清空数组
            _this.riskArray = [];
            _this.chart.replaceData(_this.net_ArrayInitial);
            if(event.clickNode.data.innode||event.clickNode.data.type == 3){
              return
            }else{
              var relationRisk = (_this.$route.query.attrIds).split(";");
              if(event.clickNode.data.type == 1){
                _this.riskArray.push(_this.$route.query.name,event.clickNode.label)
              }else if(event.clickNode.data.type == 2){
                _this.riskArray.push(_this.$route.query.name,event.clickNode.data.properties.palgorithmid)
              }
              var riskConditions={
                "entmark":_this.riskArray.join(","),
                "layer":_this.$route.query.model,
                "relations":relationRisk
                // "columns":[]
              }
              // console.log(_this.riskArray)
              var riskJson = JSON.stringify(riskConditions);
              _this.axios.post(_this.api.risk_relation,riskJson).then(res=>{
                // console.log(res.data.result)
                if(res.data.code == 200){
                  if(res.data.result.nodes.length == 0||res.data.result.links.length == 0){
                    alert('无数据');
                    return
                  }
                  var risklink = []
                  for(var i = 0 ; i<_this.net_Array.links.length;i++){
                    _this.net_Array.links[i]["color"] = false
                    for(var j = 0 ;j<res.data.result.links.length;j++){
                      if(_this.net_Array.links[i].id == res.data.result.links[j].id){
                        risklink.push(_this.net_Array.links[i])
                      }
                    }
                  }
                  // console.log(risklink)
                  for(var i = 0 ;i<risklink.length;i++){
                    risklink[i]["color"] = true
                  }
                  // console.log(_this.net_Array.nodes)
                  // 属性合并
                  for(var i =0 ;i<_this.net_Array.nodes.length ; i++){
                    for(var j =0;j<res.data.result.nodes.length;j++){
                      if(_this.net_Array.nodes[i].id == res.data.result.nodes[j].id&&!_this.net_Array.nodes[i].innode){
                        _this.net_Array.nodes[i].properties = $.extend( true, _this.net_Array.nodes[i].properties, res.data.result.nodes[j].properties );
                        // console.log(_this.net_Array.nodes[i].properties)
                      }
                    }
                  }
                  _this.chart.replaceData(_this.net_Array);
                }
              }).catch(err=>{
                alert("网络错误")
              })
            }
          }else{
            return
          }
        }else{
          return
        }
      },
      clickEvent:function(event){
        var _this = this;
        if(_this.nl_Status) return;
        if(event.clickNode){
          // console.log(event.clickNode)
          this.chart.getNode(event.clickNode.id);
          this.logClickEvent(this.nodeCFunction(event.clickNode.data),event)
        }else if(event.clickLink){
          this.logClickEvent(this.linkCFunction(event.clickLink.data,event.clickLink),event)
        }else{
          this.logClickEvent("<p class='tip_content'>各个节点和关系的详情面板</br>请点击需要查看的节点或关系</p>",event)
        }
      },
      logClickEvent:function(name, event){
        this.addToLog(name);
      },
      addToLog:function(text){
        // var theParent = document.getElementById("nlContent");
        // var theKid = document.createElement("p");
        $("#nlContent").empty()
        $("#nlContent").html(text)
        // theKid.innerHTML = text;
        // theParent.appendChild(theKid);
      },
      
      // 导出全景图
      exportImageAll: function(){
        var _this = this;
        // 获得图谱类型
        var buType;
        if(_this.$route.query.type == 'overall'){
          buType ="全貌族谱"
        }else if(_this.$route.query.type == 'multi'){
          buType ="多节点族谱"
        }else if(_this.$route.query.type == 'risk'){
          buType ="风险视图"
        }else if(_this.$route.query.type == 'contrlway'){
          buType ="控制路径"
        }else if(_this.$route.query.type == 'essence'){
          buType ="实质关联"
        }
        // 获得名字
        var all_title=_this.saveTitle
        // 获得时间
        var iTime=new Date();
        var month =iTime.getMonth()<9?'0'+(iTime.getMonth()+1) : ''+(iTime.getMonth()+1)
        var day =iTime.getDate()<10?'0'+iTime.getDate() : ''+iTime.getDate()
        var hours =iTime.getHours()<10?'0'+iTime.getHours() : ''+iTime.getHours()
        var minutes =iTime.getMinutes()<10?'0'+iTime.getMinutes() : ''+iTime.getMinutes()
        var seconds =iTime.getSeconds()<10?'0'+iTime.getSeconds() : ''+iTime.getSeconds()
        var imgFileName = buType+"-"+_this.saveTitle+iTime.getFullYear()+month+day+hours+minutes+seconds
        var nodesArrNew = _this.chart.nodes();
        if(nodesArrNew.length<=0){
          this.alert({
            title:"提示:",
            content:"没有图谱数据可供导出图片!"
          })
          return;
        }
        var demo = $("#chartRelation");
        var heightMark = demo.css("height");
        var widthMark = demo.css("width");
        demo.css("height","8000px");
        demo.css("width","8000px");
        //恢复一下，防止下载后的图片中节点左侧和顶部越界
        $(".DVSL-bar-btn-fit  p").click();//恢复一下，防止节点越界
        _this.loadding = true
        _this.isshowMode =false
        //延迟2s执行绘图
        setTimeout(function () {
          //重新获取新图谱的宽高，并进行绘图，继而导出
            var nodesArrNew = _this.chart.nodes();
            // console.log(nodesArrNew)
            var maxX=0,minX=0,maxY=0,minY=0;//定义四个初始变量。
            if(nodesArrNew && nodesArrNew.length>0){
              for(var i=0;i<nodesArrNew.length;i++){
                var x = nodesArrNew[i].x;
                var y = nodesArrNew[i].y;
                // console.log(x,y)
                if(x>0){
                  maxX = maxX < x?x:maxX;
                }else{
                  minX = minX > x?x:minX;
                }
                if(y>0){
                  maxY = maxY < y?y:maxY;
                }else{
                  minY = minY > y?y:minY;
                }
              }
            }
            heightMark = Number(heightMark.replace("px",""));
            widthMark = Number(widthMark.replace("px",""));
            var newHeight = (maxY-minY)>heightMark?(maxY-minY):heightMark;
            var newWidth = (maxX-minX)>widthMark?(maxX-minX):widthMark;
            //3.设置新图谱的宽高
            demo.css("height",newHeight+"px");
            demo.css("width",newWidth+"px");
            //4.恢复一下，防止节点左侧和顶部越界
            $(".DVSL-bar-btn-fit p").click();//恢复一下，防止节点越界
            _this.loadding = true
            _this.isshowMode =false
            //导出图片，执行一次
            setTimeout(function () {
              //3.导出图谱
              _this.chart.exportAsString("png",function(datas){
                // console.log(datas)
                if(datas.length<10){
                //4.先恢复图谱的宽高
                  demo.css("height",$(window).height());
                  demo.css("width",$(window).width());
                  //5.恢复一下，防止节点左侧和顶部越界--默认导出图谱后，显示一样初始化样式。
                  $(".DVSL-bar-btn-fit  p").click();//恢复一下，防止节点越界
                  $(".bottom-icon").css("margin-top",($(window).height()-22)+"px");//重新定位图谱左下角功能区位置
                  _this.loadding = false
                  _this.alert({
                    title:"提示:",
                    content:"节点过多，请删除一些节点后再试！"
                  })
                  return;
                }
                var exportImgCondition = {
                  "imgFileName":encodeURIComponent(imgFileName),
                  "imgFileType":"png",
                  "imgStr":datas.replace("data:image/png;base64,", "")
                }
                var exportImgparam = JSON.stringify(exportImgCondition);
                _this.axios.post(_this.api.export_img,exportImgparam).then(res=>{
                  var data = res.data;
                  if(data.code == 200){
                    _this.loadding = false
                    _this.isshowMode = true
                    //4.先恢复图谱的宽高
                    demo.css("height",$(window).height());
                    demo.css("width",$(window).width());
                    //5.恢复一下，防止节点左侧和顶部越界--默认导出图谱后，显示一样初始化样式。
                    $(".DVSL-bar-btn-fit  p").click();//恢复一下，防止节点越界
                    $(".bottom-icon").css("margin-top",($(window).height()-22)+"px");//重新定位图谱左下角功能区位置
                    var token = window.localStorage.getItem('token');
                    var tmp = data.result;
                    window.location.href=_this.api.export_img_l+"/"+tmp+"?xToken="+token;
                  }
                })
              },false);
            }, 5000);
        },5000);
      },
      // 保存图谱弹层
      saveNet: function(){
        var _this = this;
        _this.netLayer = true;
      },
      // 保存图谱
      saveNetSure: function(){
        var _this = this;
        _this.netLayer = false;
        _this.loadding = true
        var temp_relation = {}
        var tempid_yuan = []
        var tempid_shan = []
        var temp = []; //临时数组1
        var temparray = [];//临时数组2
        var relation = _this.chart.exportData(true,true);
        if(_this.initial_Array.nodes.length == relation.nodes.length){
          temp_relation = _this.initial_Array
        }else{
          for(var i = 0 ;i<relation.nodes.length;i++){
            tempid_shan.push(relation.nodes[i].id)
          }
          for(var i = 0 ;i<_this.initial_Array.nodes.length;i++){
            tempid_yuan.push(_this.initial_Array.nodes[i].id)
          }
          // 找出删除节点的id
          for(var i = 0 ; i<tempid_shan.length;i++){
            temp[tempid_shan[i]] = true
          }
          for(var i = 0 ;i<tempid_yuan.length;i++){
            if(!temp[tempid_yuan[i]]){
              temparray.push(tempid_yuan[i].toString())
            }
          }
          // console.log(temparray)
          for(var i = 0 ; i<temparray.length;i++){
            for(var j = _this.initial_Array.nodes.length-1;j>0;j--){
              if(_this.initial_Array.nodes[j].id == temparray[i]){
                _this.initial_Array.nodes.splice(j,1)
              }
            }
          }
          for(var i = 0 ;i<temparray.length;i++){
             for(var j =_this.initial_Array.links.length-1;j>0;j--){
              if(_this.initial_Array.links[j].from == temparray[i]||_this.initial_Array.links[j].to == temparray[i]){
                _this.initial_Array.links.splice(j,1)
              }
            }
          }
          var links = _this.initial_Array.links;
          var nodes = _this.initial_Array.nodes;
          temp_relation = {
            links,
            nodes
          }
        }
        var buType;
        if(_this.$route.query.type == 'overall'){
          buType ="全貌"
        }else if(_this.$route.query.type == 'multi'){
          buType ="多节点"
        }else if(_this.$route.query.type == 'risk'){
          buType ="风险视图"
        }else if(_this.$route.query.type == 'contrlway'){
          buType ="控制路径"
        }else if(_this.$route.query.type == 'essence'){
          buType ="实质关联"
        }
        // console.log(temp_relation)
        var param = {
          uid:"guzhandong",
          buType:buType,
          title:_this.saveTitle,
          desc:_this.saveDes,
            // 把节点和线传过去
          result:temp_relation
        }
        if(!_this.saveTitle){
          $(".tip").show();
          return;
        }else{
          $(".tip").hide();
        }
        var relationData = JSON.stringify(param);
        _this.axios.post(_this.api.save_relation,relationData).then(res=>{
          if(res.data.code == 200){
            _this.netLayer = false;
            _this.loadding = false
            _this.alert({
              title:"提示:",
              content:"保存成功，请到我的图谱页面进行查看！"
            })
          }
        }).catch(err=>{
          console.log(err)
        })
      },
      // 关闭图谱弹层
      closeNet: function(){
        var _this = this;
        _this.netLayer = false;
      },
      // * 返回所有的节点和线[包括隐藏]
      getNodes: function(){
        return this.chart.exportData(false,true);
      },
      // * 返回所有的视图内的节点和线
      getViewNode: function(){
        return this.chart.exportData(true,true);
      },
      // 快速定位企业
      selectedEntByLocation: function(nodeIds){
        var _this = this;
        setTimeout(function () {   //页面点绘制完后，方可执行
          var nodesArr = _this.chart.nodes();
          // console.log(nodesArr)
          var selectArr = [];
          //进行完全比较，否则模糊匹配会有错乱。
          var arrNodes = nodeIds.split("；");
          for(var k=0;k<arrNodes.length;k++){
            var tarNode = arrNodes[k];
            for (var i = 0; i < nodesArr.length; i++) {
                  var data = nodesArr[i].data;
                  if (tarNode && tarNode ==data.name) {
                      selectArr.push(nodesArr[i]);//设置为选中状态
                      // console.log(nodesArr[i])
                  }
              }
          }
          if(selectArr && selectArr.length>0){
            // 进行选择
            _this.chart.selection(selectArr);
            // 进行快速拉近
            _this.chart.zoom(2,false);
            // 进行元素选择
            _this.chart.zoomIn(selectArr,false );
            _this.stop_list = true
            _this.item0 = true
          }
        }, 200);
      },
      // 二次过滤
      filterNode: function(condition,url){
        // console.log(condition);
        var _this = this;
        var json = {
          "entmark":_this.$route.query.name || "",
          "layer":_this.$route.query.model || 1,
          "uid":_this.$route.query.username || "",
          // "relations":["invest","samedom","sameaddr","sametel","manager"],
          "columns":condition
        };
        var relationData = JSON.stringify(json);

        _this.loadding = true;
        // _this.api.second_filter_overview
        _this.axios.post(url,relationData).then(res=>{
          var data = res.data
          var temp_links_array = [] , temp_nodes_array = [];
          // console.log(data.result.links)
          for(var k in _this.initial_Array_links){
            for(var i = 0 ;i<data.result.links.length;i++){
              if(data.result.links[i].id==k){
                temp_links_array.push(_this.initial_Array_links[k])
              }
            }
          }
          for(k in _this.initial_Array_nodes){
            for(var i = 0; i<data.result.nodes.length;i++){
              if(data.result.nodes[i].id == k){
                temp_nodes_array.push(_this.initial_Array_nodes[k])
              }
            }
          }
          var tempJson={nodes:temp_nodes_array,links:temp_links_array}
          var net = _this.deepC1(tempJson);
          _this.loadding = false;
          if(!data.result.nodes.length){
            _this.alert({
              title:"提示:",
              content:"未查询到相关企业！"
            })
            return;
          }
          if(net.nodes.length > 3000){
            _this.alert({
              title:"提示:",
              content:"节点过多无法显示"
            })
            return;
          }
          var selectArr = [];
          var linksAfterMerge = [];

          // 合并线
          $.each(net.links,function(i,value){
            var link = value;
            if(!_this.repeat(linksAfterMerge,link)){
              linksAfterMerge.push(link);
            }
          });
          net.links = linksAfterMerge;
          _this.net_Array = _this.deepC1(net);
          _this.net_ArrayInitial = _this.deepC1(net);
          // 清除原来的
         setTimeout(function(){
            _this.chart.remove();
            _this.makeMap(net);
          },200);
        }).catch(err=>{
          console.log(err)
        })
      },
      // 当前查询企业下通过orderId获取族谱数据
      singleEntNet:function(orderId){
        var _this = this;
        _this.loadding = true;
        if(_this.currentOrderId != orderId){
          _this.getNetByOrder(orderId);
        }else{
          _this.loadding = false;
        }
      },
      // 历史订单
      postHistory:function(url,condition){
        var _this = this;
        _this.axios.put(url,condition).then(res=>{
          console.log("历史成功")
        }).catch(err => {
          console.log(err+"订单历史返回的错误报告")
        })
      },
      getNet: function(url,condition,type,subType){
        var _this = this;
        _this.loadding = true;
        var NotBattalion = [];
        // alert(222)
        // 异步请求数据
        _this.axios.post(url,condition).then(res=>{
          var data = res.data
          var params =  JSON.parse(condition);
          if(data.code == 200){
            _this.initLoad = false; // 判断是否为初进入
            _this.initial_Array = data.result //最原始的非合并的节点和线
            // 非合并的字典序
            $.each(_this.initial_Array.nodes,function(i,value){
              _this.initial_Array_nodes[value.id] = value
            })
            $.each(_this.initial_Array.links,function(i,value){
              _this.initial_Array_links[value.id] = value
            })
            // 控制路径不用切换雪花
            if(_this.$route.query.type == 'contrlway'){
              _this.isshowMode = false
            }
            var net = _this.deepC1(data.result);
            // 多节点无关联企业将进行展示
            if(data.result.noRelationMks && data.result.noRelationMks.length>0){
              _this.norelation = data.result.noRelationMks;
            }

            _this.net = net;
            // 获得输入企业的id
            for(var i = 0;i<net.nodes.length;i++){
              if(net.nodes[i].innode){
                _this.initialNodes.push(net.nodes[i].id.toString())

              }
            }
            _this.loadding = false;
            if(data.result.nodes.length > 6000){
              window.swal({
                title: "确认",
                text: "节点过多无法显示!",
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
            if(!data.result.nodes.length){
              _this.isshowMode =false
              _this.isshowlegend = false
              // alert("无相关企业");
              window.swal({
                title: "确认",
                text: "未查到相关企业!",
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

            var selectArr = [];
            var linksAfterMerge = [];

            // 合并线
            $.each(net.links,function(i,value){
              var link = value;
              if(!_this.repeat(linksAfterMerge,link)){
                linksAfterMerge.push(link);
              }
            });
            net.links = linksAfterMerge;
            // 把将合并后的节点和线转化为字典序
            _this.jsonSort_node = {};
            $.each(net.nodes,function(i,value){
              if(value.innode == true){
                _this.saveTitle = value.name
              }
              var node = value;
              _this.jsonSort_node[value.id] = value;
            });
            _this.jsonSort_link = {};
            $.each(net.links,function(i,value){
              _this.jsonSort_link[value.id] = value
            })
            // console.log(net)
            _this.net_ArrayInitial = _this.deepC1(net);
            _this.net_Array = _this.deepC1(net)
            if(data.result.nodes.length<30){
              setTimeout(function(){
                _this.makeMap(net);
                _this.chart.updateSettings({layout:{
                  nodeSpacing:140,
                  radius:80
                }});
                _this.isshowMode =true
                _this.isshowlegend = true
                if(_this.$route.query.type=="contrlway"){
                  _this.isshowMode =false
                  _this.chart.updateSettings({layout:{
                    mode:"hierarchy",//环形结构
                    rowSpacing:230,
                    nodeSpacing: 80
                  }});
                }
              },200);
              return;
            }
            // zoomchart添加数据
            setTimeout(function(){
              _this.makeMap(net);
              _this.isshowMode =true
              _this.isshowlegend = true
              if(_this.$route.query.type=="contrlway"){
                _this.isshowMode =false
                _this.chart.updateSettings({layout:{
                  mode:"hierarchy",//环形结构
                  rowSpacing:230,
                  nodeSpacing: 40
                }});
              }
            },200);
          }
        }).catch(err=>{
          if(err.data.code == 403){
            _this.loadding = false;
            window.swal({
              title: "确认",
              text: "未开通该模块权限",
              type: "info",
              showCancelButton: false,
              confirmButtonColor: "#DD6B55",
              confirmButtonText: "确认",
              cancelButtonText: "取消",
              closeOnConfirm: false,
              closeOnCancel: true
            });
          }else if(err.data.code == 400){
            _this.loadding = false;
            window.swal({
              title: "确认",
              text: "未查到相关企业",
              type: "info",
              showCancelButton: false,
              confirmButtonColor: "#DD6B55",
              confirmButtonText: "确认",
              cancelButtonText: "取消",
              closeOnConfirm: false,
              closeOnCancel: true
            });
          }
          else{
            console.log(err.data.code)
          }
        })
      },
      // 侧边栏效果
      controlSidebar: function(){
        var _this = this;
        _this.$store.state.entrelation.sidebarStatus = !_this.$store.state.entrelation.sidebarStatus;
      },
      controlSidebar1: function(){
        var _this = this;
        _this.$store.state.entrelation.sidebarStatus = false;
      },
      dropdownSlide: function(attribute){
        var _this = this;
        _this.closeDropdown[attribute] = !_this.closeDropdown[attribute];
      },
      getLocationCompany : function(msg){
        this.searchLocationName = msg;
        this.stop_list = false
        this.item0 = false
        this.$store.state.showlist=false;
        $(".location").focus()
      },
      choose_event : function(e){
          var _this = this;
          if(e.keyCode == 13){
            // console.log(this.$store.state.mohuIndex)
            if(this.$store.state.mohuIndex == 0&&this.$store.state.item.length>0&&this.item0&&this.is_enter){
              this.searchLocationName = this.$store.state.item[0];
              this.$store.state.showlist=false;
              this.stop_list = false
              this.item0 = false
            }else if(!this.item0){
              this.selectedEntByLocation(this.searchLocationName);
              this.stop_list = true
              this.item0 = true
              this.is_enter = false
            }else if(this.$store.state.mohuIndex != 0){
              this.searchLocationName = this.$store.state.item[this.$store.state.mohuIndex-1];
              this.stop_list = false
              this.item0 = false
            }
          }else if(e.keyCode == 40){
            if(this.$store.state.item.length!=0){
              this.$store.state.mohuIndex++;
              // 验收
              if(this.$store.state.mohuIndex>this.$store.state.item.length){
                this.$store.state.mohuIndex = 1;
              }
              $("ul.list li").eq(this.$store.state.mohuIndex-1).addClass("cur").siblings().removeClass("cur");
            }
          }else if(e.keyCode == 38){
            if(this.$store.state.item.length!=0){
              this.$store.state.mohuIndex--;
              // 验收
              if(this.$store.state.mohuIndex<=0){
                  this.$store.state.mohuIndex = this.$store.state.item.length;
              }
              $("ul.list li").eq(this.$store.state.mohuIndex-1).addClass("cur").siblings().removeClass("cur");
            }
          }
      }
    },
    mounted() {
      var _this = this;
      if(!(_this.$route.query.type == 'multi')){
        _this.companyName = _this.$route.query.name
      }else{
        var names = (_this.$route.query.name).split(";")
        _this.companyName = names[0]+"、"+names[1]+"..."
      }
      this.$store.state.isshowIndex = false
      this.userName = localStorage.getItem("username")
      $("#nlContent").empty()
      this.$store.state.showlist=false;
      this.isshowMode =false
      this.isshowlegend = false
      _this.chartHeight = document.body.clientHeight - 75;
      _this.chartWidth = document.body.clientWidth;
      $(window).resize(function() {
        _this.chartHeight = document.body.clientHeight - 75;
        _this.chartWidth = document.body.clientWidth;
      });
      if(!(_this.$route.query.type == 'essence')){
        var relationAttrs = (_this.$route.query.attrIds).split(";");
      }
      // console.log(relationAttrs)
      _this.relationAttrs = relationAttrs;
      if(_this.$route.query.type == 'overall'||_this.$route.query.type == 'risk'){
        var json = {
          "entmark":_this.$route.query.name,
          "layer":_this.$route.query.model || 1,
          "uid":_this.$route.query.username || "",
          "relations":relationAttrs,
          "targetname":["http"]
          // "columns":[]
        };

        var relationData = JSON.stringify(json);
        /*****
          checkbox 初始化状态
          如选择投资时则默认选择投资的各项
          如不选择，该投资下面细分的项不可点击
        *****/
        if(_this.$repeat("invest",relationAttrs)){
          _this.checkedNames.push("entShareholder","entOutInvest","personShareholder");
          $(".checkbox-entShareholder,.checkbox-entOutInvest,.checkbox-personShareholder").addClass('active');
        }else{
          _this.investDisabled = true;
        }
        if(_this.$repeat("manager",relationAttrs)){
          _this.checkedNames.push("personManager");
          $(".checkbox-personManager").addClass('active');
        }else{
          _this.managerDisabled = true;
        }
        if(_this.$repeat("samedom",relationAttrs)){
          _this.checkedNames.push("samedom");
          $(".checkbox-samedom").addClass('active');
        }else{
          _this.samedomDisabled = true;
        }
        if(_this.$repeat("sametel",relationAttrs)){
          _this.checkedNames.push("sametel");
          $(".checkbox-sametel").addClass('active');
        }else{
          _this.sametelDisabled = true;
        }
        $(".label-checkbox").click(function(event) {
          $(".checkbox").removeClass('active');
          for(var i = 0; i<_this.checkedNames.length; i++){
            $(".checkbox-"+ _this.checkedNames[i]).addClass('active');
          }
        });
        if(_this.$route.query.type == 'overall'){
          _this.getNet(_this.api.base+"/relation/genealogy",relationData);
          var historyJson = {
            "productCode":"relations",
            "productName":"关联关系3.1",
            "functionCode":"genealogy",
            "functionName":"族谱",
            "param":relationData,
            "content":JSON.stringify({"entname":_this.$route.query.name,"layer":_this.$route.query.model,"type":"全貌族谱"})
          }
          var historyData = JSON.stringify(historyJson);
          _this.postHistory(_this.api.common_history,historyData)
        }else if(_this.$route.query.type == 'risk'){
          _this.getNet(_this.api.base+"/relation/risk_graph_show",relationData);
        }
      }else if(_this.$route.query.type == 'multi'){
        var names = (_this.$route.query.name).split(";")
        var layer = _this.$route.query.model
        var json = {
          "mks":names,
          "layer":layer,
          "relations":relationAttrs,     //暂时请求不用设置值，正常取值是RelationsEnum 枚举见下部说明
          // "uid":"guzhandong",
          "targetname":["http"]
        };

        var relationData = JSON.stringify(json);
        // _this.getNetMore(_this.api.pre+"/asyn/many_relation",relationData);
        _this.getNet(_this.api.base+"/relation/muti_nodes",relationData);
        var historyJson = {
          "productCode":"relations",
          "productName":"关联关系3.1",
          "functionCode":"muti_nodes",
          "functionName":"多节点关联",
          "param":relationData,
          "content":JSON.stringify({"entname":names,"layer":_this.$route.query.model,"type":"多节点关联"})
        }
        var historyData = JSON.stringify(historyJson);
        _this.postHistory(_this.api.common_history,historyData)
      }else if(_this.$route.query.type == 'contrlway'){
        var condition = {
          "entmark":_this.$route.query.name || "",
          "relations":relationAttrs
        };
        condition = JSON.stringify(condition);
        _this.getNet(_this.api.contrl_relation,condition);
        var historyJson = {
          "productCode":"relations",
          "productName":"关联关系3.1",
          "functionCode":"control_path",
          "functionName":"控制路径",
          "param":condition,
          "content":JSON.stringify({"entname":_this.$route.query.name,"type":"控制路径"})
        }
        var historyData = JSON.stringify(historyJson);
        _this.postHistory(_this.api.common_history,historyData)
      }else if(_this.$route.query.type == 'essence'){
        var condition = {
          "entmark":_this.$route.query.name || ""
        };
        condition = JSON.stringify(condition);
        _this.getNet(_this.api.essence_relation,condition);
        var historyJson = {
          "productCode":"relations",
          "productName":"关联关系3.1",
          "functionCode":"real_relation",
          "functionName":"实质关联",
          "param":condition,
          "content":JSON.stringify({"entname":_this.$route.query.name,"type":"实质关联"})
        }
        var historyData = JSON.stringify(historyJson);
        _this.postHistory(_this.api.common_history,historyData)
      }
    },
    watch:{
      checkedNames(curVal){
        var _this = this;
        if(!_this.initLoad){
          if(_this.$route.query.type == 'overall'){
            _this.filterNode(_this.checkedNames,_this.api.second_filter_overview);
          }else if(_this.$route.query.type == 'risk'){
            _this.filterNode(_this.checkedNames,_this.api.second_filter_risk);
          }
        }
      },
      searchLocationName(curval){
        if(curval.length>=1&&this.stop_list){
            this.is_enter = true
            this.nl_Status = true
            this.change_tab = false
            this.$store.state.mohuIndex = 0;
            this.$store.state.showlist=false;
            // 清零
            var _this = this ;
            _this.$store.state.item = [];
            if(this.net.nodes && this.net.nodes.length>0){
              for(var i = 0;i<this.net.nodes.length;i++){
                var current = this.net.nodes[i].name;
                if(current){
                  if(current.indexOf(curval) != -1){
                    _this.$store.state.showlist=true;
                    if(_this.$store.state.item.length < 6){
                      _this.$store.state.item.push(this.net.nodes[i].name);
                    }
                  }
                }
              }
              if(_this.$store.state.item.length==0){
                _this.$store.state.showlist=true;
                _this.$store.state.item[0] = "未找到“"+curval+"”"
              }
            }else{
              window.swal({
                title: "确认",
                text: "数据未加载完，或无节点数据",
                type: "info",
                showCancelButton: false,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "确认",
                cancelButtonText: "取消",
                closeOnConfirm: false,
                closeOnCancel: true
              });
              this.$store.state.showlist=false;
            }
        }else{
          this.$store.state.showlist=false;
          this.is_enter = false;
        }
      },
    },
    filters:{
      netDes:function(value){
        switch (value){
          case "overall":
            return "企业全貌族谱查询";
          case "essence":
            return "企业实质关联族谱";
          case "risk":
            return "企业风险关联视图";
          case "contrlway":
            return "企业控制路径";
          case "multi":
            return "多节点关联查询";
          case "change":
            return "族谱变更监控";
        }
      },
      date: function (value) {
        return value.slice(0,10);
      }
    },
    updated(){
      var _this =this;
      // console.log(_this.chart)
    }
  }
</script>

<style lang="scss">
.entRelation{
  p,h3{
    margin:0;
  }
  .legend{
    position: fixed;
    right:10px;
    bottom: 2px;
    width: 234px;
    overflow: hidden;
    z-index: 1999;
    .legend_ul{
      width: 278px;
      li{
        float: left;
        width: 106px;
        height:22px;
        margin-right: 30px;
        padding-left: 30px;
        font-size: 12px;
        position: relative;
        .last_contrl{
          position: absolute;
          left: 6px;
          top:1px;
          width: 20px;
          height: 10px;
          border-radius: 5px;
          background-color:#c2c1ff ;
        }
        .revoke_company{
          position: absolute;
          left: 6px;
          top:6px;
          width: 20px;
          height: 10px;
          border-radius: 5px;
          border:1px solid #ff9900;
        }
        .revoke{
          position: absolute;
          left: 6px;
          top:6px;
          width: 20px;
          height: 10px;
          border-radius: 5px;
          border:1px solid #ff0000;
        }
        .cancel_company{
          position: absolute;
          left: 6px;
          top:6px;
          width: 20px;
          height: 10px;
          border-radius: 5px;
          background: #e4e4e4;
        }
        .enquire_company{
          position: absolute;
          left: 6px;
          top:1px;
          width: 20px;
          height: 10px;
          border-radius: 5px;
          background-color:#70e6d7 ;
        }
        .line{
          position: absolute;
          left: 6px;
          width: 20px;
          height: 11px;
          top:1px;
          background: url(/static/images/relations/line.png) no-repeat;
          background-position: -17px 0;
        }
        .line_contrl{
          position: absolute;
          left: 6px;
          width: 20px;
          height: 11px;
          top:1px;
          background: url(/static/images/relations/piv.png) no-repeat;
          background-position: -17px 0;
        }
        .tips_company{
          position: absolute;
          left: 6px;
          width: 20px;
          height: 20px;
          top:-3px;
          background: url(/static/images/relations/tips-company.png) no-repeat;
          background-size: cover;
        }
        .tips_phone{
          position: absolute;
          left: 6px;
          width: 20px;
          height: 20px;
          top:-3px;
          background: url(/static/images/relations/tips-phone.png) no-repeat;
          background-size: cover;
        }
        .tips_home{
          position: absolute;
          left: 6px;
          width: 20px;
          height: 20px;
          top:-3px;
          background: url(/static/images/relations/tips-home.png) no-repeat;
          background-size: cover;
        }
        .center_contrl{
          position: absolute;
          left: 6px;
          top:1px;
          width: 20px;
          height: 10px;
          border-radius: 5px;
          background-color:#c1eebd ;
        }
      }
    }
  }
  .mode_ent{
    position: fixed;
    left:168px;
    bottom:0;
    width: 100px;
    height: 30px;
    overflow: hidden;
    z-index:6000;
    .dynamic{
      float: left;
      width: 20px;
      height: 14px;
      background:url(/static/images/relations/dynamic.png) bottom;
      margin-right: 16px;
      position: relative;
      top:8px;
      cursor: pointer;
    }
    .hierarchy{
      float: left;
      width: 20px;
      height: 14px;
      background:url(/static/images/relations/hierarchy.png) bottom;
      position: relative;
      top:8px;
      cursor: pointer;
    }
  }
  .searchbar{
    position: fixed;
    right:10px;
    top:80px;
    width: 300px;
    height:45px;
    color:#a7a7a7;
    z-index:1000;
    -moz-box-shadow:0px 1px 15px rgba(7,1,2,0.1);
    -webkit-box-shadow:0px 1px 15px rgba(7,1,2,0.1);
    box-shadow:0px 1px 15px rgba(7,1,2,0.1);
    .location-inner{
      width:100%;
      height:100%;
    }
    input{
      float: left;
      width:255px;
      height: 45px;
      padding: 0 10px;
      background: #fff;
      border:none;
      color:#666;
      font-family:"宋体";
    }
    i.search-icon{
      float: left;
      width:45px;
      height:45px;
      background: #3e51b5 url(/static/images/relations/icon-Location.png) center no-repeat;
      background-size:27px
    }
  }
  .searchbar.w_b .item_list.ess_list_type{
    width:300px;
    top:45px;
    background-color: #fafafa; 
  }
  .item_list.ess_list_type ul.list li.cur{
    background-color: #eceefb;
    cursor: pointer;
    color:#666;
  }
  .item_list.ess_list_type ul.list li:hover{
    background-color: #eceefb;
    cursor: pointer;
    color:#666;
  }
  .nlContent{
    position: fixed;
    right:10px;
    top:158px;
    width: 300px;
    height:356px;
    color:#a7a7a7;
    z-index:2000;
    -moz-box-shadow:0px 1px 15px rgba(7,1,2,0.2);
    -webkit-box-shadow:0px 1px 15px rgba(7,1,2,0.2);
    box-shadow:0px 1px 15px rgba(7,1,2,0.2);
    background-color: #fff;
    transition: width .2s;
    -ms-transition: width .2s;
    -moz-transition: width .2s;
    &.nl_close{
      width: 4px;
      overflow: hidden;
    }
    .tip_content{
      width: 200px;
      height:50px;
      text-align: center;
      margin: auto;
      margin-top:150px;
    }
  }
  .nlbt{
    position: absolute;
    right:310px;
    top:184px;
    width: 30px;
    height: 136px;
    /*margin-top: -68px;*/
    z-index: 999;
    background: url(/static/images/relations/nlbt_pull.png) center no-repeat;
    transition: right .2s;
    -ms-transition: right .2s;
    -moz-transition: right .2s;
    &.nlbt_close{
      background: url(/static/images/relations/nlbt_push.png) center no-repeat;
      right:12px;
    }
  }
  .network-content{
    position: fixed;
    top:75px;
    left:0;
    right:0px;
    bottom:0px;
    z-index: 10;
    background-color:#fff;
    .chartRelation{
      width:100%;
      height:100%;
    }
  }
  .slidebar{
    position:fixed;
    top:104px;
    left:22px;
    background:#7fb6f0;   
    z-index:1000;
    color:#fff;
    .slidebar-outter{
      width:230px;
      height:100%;
      overflow:hidden;
      transition: width .2s;
      -ms-transition: width .2s;
      -moz-transition: width .2s;
      &.sideclose{
        width:55px;
      }
      .slidebar-inner{
        width:230px;
        height:100%;
        /*overflow-y:scroll;*/
        .sub-title{
          width:100%;
          height:auto;
          &:nth-of-type(4){
            padding-bottom:16px;
          }
          p{
            width:100%;
            height:60px;
            padding:0 18px;
            line-height:56px;
            font-size:16px;
            font-family:"microsoft yahei";
            color:#fff;
          }
          img{
            position:relative;
            top:-2px;
            margin-right:12px;
            vertical-align: middle;
          }
          i.arrow{
            float: right;
            margin-top:24px;
            border-width:5px;
          }
          i.arrow-btn{
            border-color: transparent;
            border-top-color:  #fff;
          }
          &.closedown {
            ul{
              display: none;
            }
            i.arrow-btn{
              border-color: transparent;
              border-bottom-color:  #fff;
            }
          }
          ul{
            width:100%;
            display: inline-block;
            li{
              /*line-height:44px;*/
              padding:0 20px 0 56px;
              font: 14px/44px "宋体";
              &:hover{
                background:#bbd8f5;
                color:#5b9bd1;
              }
              label{
                display: block;
                width:100%;
              }
              .chekcbox-wrap{
                float: right;
                .checkbox{
                  display: block;
                  width: 12px;
                  height:12px;
                  margin-top:15px;
                  background:url(/static/images/relations/choose_fff.png) no-repeat center;
                  &.active{
                    background:url(/static/images/relations/choosed_fff.png) no-repeat center;
                  }
                  &.disabled{
                    opacity: .2;
                    filter: alpha(opacity=20);
                  }
                }
                input{
                  display: none;
                }
              }
              input{
                float: right;
                margin-top:16px;
              }
            }
          }
        }
      }
    }
  }
  .header{
    position:fixed;
    top:10px;
    left:0;
    width:100%;
    height:56px;
    min-width:1000px;
    z-index:99999;
    text-align: center;
    color:#333;
    font:18px/56px "microsoft yahei";
    font-size:24px;
    font-weight:400;
    .companyName_size{
      display: inline-block;
      font-size: 16px;
    }
    .user_info{
      position: fixed;
      top:0;
      right: 0;
      width: 260px;
      height:75px;
      overflow: hidden;
      cursor: pointer;
      .userName{
        float: left;
        line-height: 75px;
        font-size: 14px;
        color:#7FB0DA;
        font-weight: bold;
        font-family: "microsoft yahei";
        margin-left: 106px;
      }
      .userIc{
        float: left;
        margin-left: 10px;
        margin-top: 16px;
        width: 42px;
        height: 42px;
        border-radius: 50% !important;
        background: url(/static/images/relations/icon_user.jpg) no-repeat;
        background-size: cover;
      }
    }
  }
  .save-net-outter{
    position:fixed;
    top:0%;
    left:0%;
    width:100%;
    height:100%;
    background-color:rgba(0,6,36,0.4);
    z-index:100000;
    .save-net{
      position:absolute;
      top:50%;
      left:50%;
      width:340px;
      height:280px;
      margin-top:-120px;
      margin-left:-170px;
      background:#ededed;
      .tip{
        display: none;
        color:#c30;
        font-size:12px;
      }
      .title{
        width:100%;
        height:40px;
        padding:0 15px;
        line-height:40px;
        color:#fff;
        background:#3e51b5;
        .close{
          margin-top:10px;
          margin-right:10px;
          color:#fff;
        }
      }
      .content{
        padding:10px 30px;
        .item{
          margin-top:12px;
          span{
            float: left;
            width:60px;
          }
          input{
            float: left;
            width:220px;
            height:30px;
            padding: 0 10px;
            background: #eaeaea;
            border:1px solid #ddd;
          }
          textarea{
            float: left;
            width:220px;
            height:60px;
            padding: 0 10px;
            background: #eaeaea;
            resize:none;
            border:1px solid #ddd;
          }
        }
        .item-btn{
          display: block;
          margin-top:20px;
          text-align:center;
          .btn{
            width:100px;
            margin: 0 10px;
          }
        }
      }
    }
  }
  .loadding{
    position:fixed;
    top:0;
    left:0;
    right:0;
    bottom:0;
    text-align:center;
    vertical-align: middle;
    background:#fff;
    z-index:100;
    img{
      position:absolute;
      top:50%;
    }
  }
  .net-hover{
    width:220px;
    background:#F9FBFC;
    font-size:12px;
    color:#323232;
    border-radius:8px;
    h3{
      width:220px;
      line-height:20px;
      color:#fff;
      /*min-height:40px;*/
      background:#ABB6C4;
      font-weight:400;
    }
    p{
      width:220px;
      padding:4px 16px 14px;
      line-height:24px;
      word-break:break-all; 
      word-wrap:break-word;
    }
  }
  .transition-layer{
    width:220px;
    padding:16px 0;
    background:#F9FBFC;
    font-size:12px;
    color:#323232;
    /*box-shadow: 6px 6px 13px rgba(68,68,68,.26);*/
    // border-radius:8px;
    p{
      width:220px;
      padding:0px 16px;
      line-height:24px;
      word-break:break-all;
      word-wrap:break-word;/*支持IE，chrome，FF*/
    }
  }
  .norelation{
    position: fixed;
    left: 266px;
    top: 102px;
    color: #a7a7a7;
    background:#fff;
    z-index: 100;
    h3{
      margin-bottom:10px;
    }
  }
  .nodeHeader{
    margin:21px 0 30px 24px;
    height: 16px;
    .sp{
      float: left;
      width: 4px;
      height:16px;
      background-color:#7aa2dd;
      position: relative;
      top:3px;
      margin-right: 13px;
      &.sp_p{
        background-color:#b46bc5;
      }
      &.sp_company{
        background-color:#91dc8a;
      }
      &.sp_ys{
        background-color:#D8BE33;
      }
    }
    .com_info{
      float: left;
      font-family: "宋体";
      font-size: 14px;
      color:#333;
    }
    .tab_change{
      float: right;
      font-family: "宋体";
      font-size: 14px;
      color:#5ed4c5;
      text-decoration: underline;
      cursor: pointer;
      position: relative;
      left: -8px;
    }
  }
  .nodeBody{
    padding: 0 40px;
    .com_title{
      font-family: "微软雅黑";
      font-size: 16px;
      color:#7aa2dd;
      line-height: 24px;
    }
    .com_status{
      margin: 20px 0 ;
      display: inline-block;
      /*min-width: 40px;
      max-width: 80px;*/
      padding: 0 9px 0 9px;
      height:20px;
      background-color: #7aa2dd;
      font-family: "宋体";
      font-size: 12px;
      color:#fff;
      text-align: center;
      line-height: 20px;
    }
    .com_detail{
      font-family: "宋体";
      font-size: 12px;
      color:#666;
      line-height: 30px;
    }
  }
  .header_icon{
    position: fixed;
    z-index: 100000;
    top:36px;
    left:230px;
    width: 20px;
    height: 14px;
    background: url(/static/images/relations/ent_icon.png);
    cursor: pointer;
  }
  .footer_title{
    position: fixed;
    width: 212px;
    height:16px;
    left:50%;
    margin-left: -106px;
    line-height:16px;
    z-index: 1999;
    bottom:5px;
    font-size:12px;
  }
  @media screen and (max-width: 1440px){
    .searchbar{
      width: 258px;
      height:34px;
    }
    .searchbar input{
      width:224px;
      height: 34px;
      padding: 0 10px;
    }
    .searchbar i.search-icon{
      width:34px;
      height:34px;
      background: #3e51b5 url(/static/images/relations/icon-Location.png) center no-repeat;
      background-size:22px
    }
    .nlContent{
      width: 258px;
    }
    .nlContent .nodeHeader{
      margin:16.8px 0 24px 19.2px;
    }
    .nlContent .nodeHeader .sp{
      margin-right: 10.4px;
    }
    .nlContent .nodeBody{
      padding: 0 24px;
    }
    .nlbt{
      right:268px;
    }
    .searchbar.w_b .item_list.ess_list_type{
      width: 258px;
      top: 34px;
      background-color: #fafafa; 
    }
    .item_list.ess_list_type ul.list li.cur{
      background-color: #eceefb;
      cursor: pointer;
      color:#666;
    }
    .item_list.ess_list_type ul.list li:hover{
      background-color: #eceefb;
      cursor: pointer;
      color:#666;
    }

  }
  
  @media screen and (max-width: 1440px){
    .slidebar .slidebar-inner .sub-title p{
      height: 38px;
    }
  }
}
  
  
  
</style>