<template>
  <div>
    <div class="conter">
      <!--search-->
      <div class="search clearfix">
        <div class="ser">
          <div class="search-box">
            <input type="text" placeholder='请输入企业名称，如"小米科技"' ref="inputValue" v-model="query" @focus="_timeflash" v-on:input="_timeflash" @keyup.enter="_goList(query)"  @keydown="_timeflash" @blur="_closeSearch">
          </div>
          <div class="ser-btn" @click="_goList(query)"><i class="icon-ser"></i></div>
        </div>

        <!--<div class="tip" v-if="tipShow">搜索无结果</div>-->
        <ul class="search-results" v-show="showing && query">
          <li v-for="(item,index) in serList"  @click="_goList(item.ENTNAME)">{{item.ENTNAME}}</li>
        </ul>
      </div>
      <!--./search-->
      <div class="conHeader">
        <p class="conHeaderName" v-if="BASIC.ENTNAME">{{BASIC.ENTNAME}}</p>
        <ul class="conHeaderList clearfix">
          <li v-if="BASIC.TEL">电话：<span>{{BASIC.TEL}}</span></li>
          <li v-if="BASIC.EMAIL">邮箱：<span>{{BASIC.EMAIL || '未公开'}}</span></li>
        </ul>
        <p class="conHeaderAdd" v-if="BASIC.DOM">地址：<span>{{BASIC.DOM}}</span></p>
        <div class="btn-group pull-right ng-scope">
            <span v-if="!addMonitorState" class=" monitor-btn" type="button " @click="appendMointorCurrent()">
              添加监控
            </span>
            <span v-if="addMonitorState" class="already-monitor-btn monitor-btn ng-hide" type="button ">
              添加监控
            </span>
        </div>
      </div>
      <div class="conListTab">
        <ul class="contabList clearfix">
          <li class="active">基本信息</li>
          <li @click="fengxianxinxiAjax">风险信息</li>
          <li @click="_knowledgeClick">知识产权</li>
          <li @click="_yearReportClick">企业年报</li>
        </ul>
        <!--工商信息-->
        <div class="contabListDiv" style="display: block;">
          <div class="gongshangList">
            <ul class="clearfix">
              <li @click="gongshangTo" class="gongshangActive">照面信息</li>
              <li @click="gaoguanTo">主要高管 <span>{{personCount}}</span></li>
              <li @click="gudunTo">股东信息 <span>{{shareCount}}</span></li>
              <li @click="lishiTo">历史变更 <span>{{alterCount}}</span></li>
              <li @click="fenzhiTo">分支机构 <span>{{filiationCount}}</span></li>
              <li @click="duiwaiTo">对外投资 <span>{{entinvcount}}</span></li>
              <li @click="farenduiwaiTo">法定代表人对外投资 <span>{{FRINV.length}}</span></li>
              <li @click="farenGduiwaiTo">法定代表人其他公司任职 <span>{{FRPOSITION.length}}</span></li>
            </ul>
          </div>
          <div class="gongshangInof">
            <p class="gongshangInofH2 gongshangto">照面信息</p>
            <ul class="gongshangInofList clearfix">
              <li><p><span>企业名称：</span><span class="spanCloer" v-if="BASIC.ENTNAME">{{BASIC.ENTNAME}}</span></p></li>
              <li><p><span>联系电话：</span><span class="spanCloer" v-if="BASIC.ENTNAME">{{BASIC.TEL}}</span></p></li>
              <li><p><span>统一社会信用代码：</span><span class="spanCloer" v-if="BASIC.CREDITCODE">{{BASIC.CREDITCODE || "未公开"}}</span></p></li>
              <li><p><span>工商注册号：</span><span class="spanCloer" v-if="BASIC.REGNO">{{BASIC.REGNO}}</span></p></li>
              <li><p><span>经营状态：</span><span v-if="BASIC.ENTSTATUS">{{BASIC.ENTSTATUS}}</span></p></li>
              <li><p><span>企业机构类型：</span><span class="spanCloer" v-if="BASIC.ENTTYPE">{{BASIC.ENTTYPE}}</span></p></li>
              <li><p><span>成立日期：</span><span v-if="BASIC.ESDATE">{{BASIC.ESDATE}}</span></p></li>
              <li><p><span>法定代表人：</span><span class="spanCloer" v-if="BASIC.FRNAME">{{BASIC.FRNAME}}</span></p></li>
              <li><p><span>经营期限：</span><span v-if="BASIC.OPTO">{{BASIC.OPTO}}</span></p></li>
              <li><p><span>注册资本（万元）：</span><span v-if="BASIC.REGCAP">{{BASIC.REGCAP}}</span></p></li>
              <li><p><span>注册资本币种：</span><span v-if="BASIC.REGCAPCUR">{{BASIC.REGCAPCUR}}</span></p></li>
              <li><p><span>登记机关：</span><span v-if="BASIC.REGORG">{{BASIC.REGORG}}</span></p></li>
              <li><p><span>最后年检年度：</span><span v-if="BASIC.ANCHEYEAR">{{BASIC.ANCHEYEAR}}</span></p></li>
              <li><p><span>地址：</span><span v-if="BASIC.DOM">{{BASIC.DOM}}</span></p></li>
            </ul>
            <p class="gongshangInofjingying" style="margin-top:30px;" v-if="BASIC.OPSCOPE">经营业务范围：</p>
            <p class="gongshangInofjingying">{{BASIC.OPSCOPE}}</p>
            <p class="gongshangInofH3 gaoguanto">主要高管<span class="count">{{personCount}}</span><!--<span class="grey" v-if="PERSON.length == 0">(暂无信息)</span>--></p>
            <table class="tableList" width="100%"  cellspacing="0" border="1" v-if="PERSON && PERSON.length != 0">
              <thead>
                <td>姓名</td>
                <td>职位</td>
                <td>性别</td>
              </thead>
              <tbody>
              <tr v-for="item in PERSON">
                <td>{{item.PERNAME}}</td><td>{{item.POSITION}}</td>
                <td>{{item.SEX}}</td>
              </tr>
              </tbody>
            </table>
            <p class="gongshangInofH3 gudongto">股东信息<span class="count">{{shareCount}}</span><!--<span class="grey" v-if="SHAREHOLDER.length == 0">(暂无信息)</span>--></p>

            <table class="tableList" width="100%"  cellspacing="0" border="1" v-if="SHAREHOLDER && SHAREHOLDER.length != 0">
              <thead>
              <td>股东名称</td><td>出资日期</td><td>出资方式</td><td>出资比例</td><td>认缴出资币种</td><td>认缴出资额（万元）</td>
              </thead>
              <tbody>
              <tr v-for="item in SHAREHOLDER">
                <td>{{item.SHANAME}}</td><td>{{item.CONDATE}}</td><td>{{item.CONFORM}}</td><td>{{item.FUNDEDRATIO}}</td><td>{{item.REGCAPCUR}}</td><td>{{item.SUBCONAM}}</td>
              </tr>
              </tbody>
            </table>
            <p class="gongshangInofH3 lishito">历史变更<span class="count">{{alterCount}}</span><!--<span class="grey" v-if="ALTER.length == 0">(暂无信息)</span>--></p>

            <table class="tableList" width="100%"  cellspacing="0" border="1" v-if="ALTER && ALTER.length != 0">
              <thead>
              <td width="100">变更时间</td><td width="140">变更项</td><td>变更前</td><td>变更后</td>
              </thead>
              <tbody>
              <tr v-for="item in ALTER">
                <td>{{item.ALTDATE}}</td><td>{{item.ALTITEM}}</td><td>{{item.ALTBE}}</td><td>{{item.ALTAF}}</td>
              </tr>
              </tbody>
            </table>
            <p class="gongshangInofH3 fenzhito">分支机构<span class="count">{{filiationCount}}</span> <!--<span class="grey" v-if="FILIATION.length == 0">(暂无信息)</span>--></p>


            <div class="fenzhiList clearfix">
              <ul class="clearfix" v-for="(item,index) in  FILIATION">
                <li>{{index+1}}</li>
                <li>{{item.BRNAME}}</li>
              </ul>
            </div>
            <p class="gongshangInofH3 duiwaito">对外投资<span class="count">{{entinvcount}}</span><!--<span class="grey" v-if="ALTER.length == 0">(暂无信息)</span>--></p>
            <div class="guquandongjieBox guquandongjieBoxzhixingren tableList" v-for="item in ENTINV">
              <ul class="clearfix lineghtSEtt">
                <li><span class="jiujiujiu">企业名称：</span><span>{{item.ENTJGNAME}}</span></li>
                <li><span class="jiujiujiu">注册号：</span><span>{{item.REGNO}}</span></li>
                <li><span class="jiujiujiu">企业(机构)类型：</span><span>{{item.ENTTYPE}} </span>元</li></span>
                <li><span class="jiujiujiu">注册资本(万元)：</span><span>{{item.REGCAP}}</span></li>
                <li><span class="jiujiujiu">注册资本币种：</span><span>{{item.REGCAPCUR}}</span></li>
                <li><span class="jiujiujiu">企业状态：</span><span>{{item.ENTSTATUS}}</span></li></span>
                <li><span class="jiujiujiu">登记机关：</span><span>{{item.REGORG}}</span></li></span>
                <li><span class="jiujiujiu">认缴出资额(万元)：</span><span>{{item.SUBCONAM}}</span></li>
                <li><span class="jiujiujiu">认缴出资币种：</span><span>{{item.CONGROCUR}}</span></li>
                <li><span class="jiujiujiu">风险提示：</span><span>{{item.ALERT_DIS}}</span></li>
                <li><span class="jiujiujiu">出资比例：</span><span>{{item.FUNDEDRATIO}}</span></li>
                <li><span class="jiujiujiu">开业日期：</span><span>{{item.ESDATE}}</span></li>
                <li><span class="jiujiujiu">法定代表人姓名：</span><span>{{item.NAME}}</span></li>
                <li><span class="jiujiujiu">企业总数量：</span><span>{{item.BINVVAMOUNT}}</span></li>
                <li><span class="jiujiujiu">注销日期：</span><span>{{item.CANDATE}}</span></li>
                <li><span class="jiujiujiu">吊销日期:</span><span>{{item.REVDATE}}</span></li>
                <li><span class="jiujiujiu">出资方式：</span><span>{{item.CONFORM}}</span></li>
              </ul>
            </div>

            <p class="gongshangInofH3 farenduiwaito">法定代表人对外投资<span class="count">{{FRINV.length}}</span></p>
            <div class="guquandongjieBox guquandongjieBoxzhixingren tableList" v-for="item in FRINV">
              <ul class="clearfix lineghtSEtt">
                <li><span class="jiujiujiu">企业名称：</span><span>{{item.ENTNAME}}</span></li>
                <li><span class="jiujiujiu">注册号：</span><span>{{item.REGNO}}</span></li>
                <li><span class="jiujiujiu">企业(机构)类型：</span><span>{{item.ENTTYPE}} </span>元</li></span>
                <li><span class="jiujiujiu">注册资本(万元)：</span><span>{{item.REGCAP}}</span></li>
                <li><span class="jiujiujiu">注册资本币种：</span><span>{{item.REGCAPCUR}}</span></li>
                <li><span class="jiujiujiu">企业状态：</span><span>{{item.ENTSTATUS}}</span></li></span>
                <li><span class="jiujiujiu">登记机关：</span><span>{{item.REGORG}}</span></li></span>
                <li><span class="jiujiujiu">认缴出资额(万元)：</span><span>{{item.SUBCONAM}}</span></li>
                <li><span class="jiujiujiu">认缴出资币种：</span><span>{{item.CURRENCY}}</span></li>
                <li><span class="jiujiujiu">风险提示：</span><span>{{item.ALERT_DIS}}</span></li>
                <li><span class="jiujiujiu">出资比例：</span><span>{{item.FUNDEDRATIO}}</span></li>
                <li><span class="jiujiujiu">开业日期：</span><span>{{item.ESDATE}}</span></li>
                <li><span class="jiujiujiu">法定代表人姓名：</span><span>{{item.NAME}}</span></li>
                <li><span class="jiujiujiu">企业总数量：</span><span>{{item.PINVAMOUNT}}</span></li>
                <li><span class="jiujiujiu">注销日期：</span><span>{{item.CANDATE}}</span></li>
                <li><span class="jiujiujiu">吊销日期:</span><span>{{item.REVDATE}}</span></li>
                <li><span class="jiujiujiu">出资方式：</span><span>{{item.CONFORM}}</span></li>
              </ul>
            </div>

            <p class="gongshangInofH3 farenGduiwaito">法定代表人其他公司任职 <span class="count">{{FRPOSITION.length}}</span></p>
            <div class="guquandongjieBox guquandongjieBoxzhixingren tableList" v-for="item in FRPOSITION">
              <ul class="clearfix lineghtSEtt">
                <li><span class="jiujiujiu">企业名称：</span><span>{{item.ENTNAME}}</span></li>
                <li><span class="jiujiujiu">注册号：</span><span>{{item.REGNO}}</span></li>
                <li><span class="jiujiujiu">企业(机构)类型：</span><span>{{item.ENTTYPE}} </span>元</li></span>
                <li><span class="jiujiujiu">注册资本(万元)：</span><span>{{item.REGCAP}}</span></li>
                <li><span class="jiujiujiu">注册资本币种：</span><span>{{item.REGCAPCUR}}</span></li>
                <li><span class="jiujiujiu">企业状态：</span><span>{{item.ENTSTATUS}}</span></li></span>
                <li><span class="jiujiujiu">登记机关：</span><span>{{item.REGORG}}</span></li></span>
                <li><span class="jiujiujiu">职务：</span><span>{{item.POSITION}}</span></li>
                <li><span class="jiujiujiu">是否法定代表人：</span><span>{{item.LEREPSIGN}}</span></li>
                <li><span class="jiujiujiu">风险提示：</span><span>{{item.ALERT_DIS}}</span></li>
                <li><span class="jiujiujiu">开业日期：</span><span>{{item.ESDATE}}</span></li>
                <li><span class="jiujiujiu">法定代表人姓名：</span><span>{{item.NAME}}</span></li>
                <li><span class="jiujiujiu">企业总数量：</span><span>{{item.PPVAMOUNT}}</span></li>
                <li><span class="jiujiujiu">注销日期：</span><span>{{item.CANDATE}}</span></li>
                <li><span class="jiujiujiu">吊销日期:</span><span>{{item.REVDATE}}</span></li>
              </ul>
            </div>
          </div>
        </div>
        <!--风险信息-->
        <div class="contabListDiv">
          <div class="gongshangList">
            <ul class="clearfix">
              <li @click="guquanchuzhiTo" class="gongshangActive">股权出质 <span>{{impawnCount}}</span></li>
              <li @click="guquandongjieTo">股权冻结 <span>{{sharefrostCount}}</span></li>
              <li @click="jingyingyichangTo">经营异常 <span>{{exceptCount}}</span></li>
              <li @click="xingzhenchufaTo">行政处罚 <span>{{caseCount}}</span></li>
              <li @click="beizhixingrenTo">被执行人 <span>{{punishedCount}}</span></li>
              <li @click="shixinxinxiTo">失信信息 <span>{{breakCount}}</span></li>
              <li @click="dongchandiyaTo">动产抵押 <span>{{mortCount}}</span></li>
            </ul>
          </div>
          <div class="gongshangInof">
            <p class="gongshangInofH2 guquanchuzhito">股权出质 <span class="count">{{impawnCount}}</span></p>
            <table class="tableList" width="100%"  cellspacing="0" border="1"  v-if="SHARESIMPAWN && SHARESIMPAWN.length != 0">
              <thead>
            <td>序号</td><td>质权人</td><td>质权人类别</td><td>出资金额(万元)</td><td>出资审批部门</td><td>出资备案日期</td><td>出资截至日期</td>
            </thead>
              <tbody>
              <tr v-for="(item,index) in SHARESIMPAWN">
                <td>{{index+1}}</td>
                <td>{{item.IMPORG}}</td>
                <td>{{item.IMPORGTYPE}}</td><td>{{item.IMPAM}}</td><td>{{item.IMPEXAEEP}}</td><td>{{item.IMPONRECDATE}}</td><td>{{item.IMPTO}}</td>
              </tr>
              </tbody>
            </table>
            <p class="gongshangInofH3 guquandongjieto">股权冻结<span class="count">{{sharefrostCount}}</span></p>
            <!--<span class="grey" v-if="SHARESFROST.length == 0">(暂无信息)</span>-->
            <div class="guquandongjieBox tableList" v-for="item in SHARESFROST">
              <p class="guquandongjieBoxH">冻结文号：{{item.FRODOCNO}}</p>
              <ul class="clearfix">
                <li>冻结机关：<span>{{item.FROAUTH}}</span></li>
                <li>冻结金额：<span v-if="item.FROAM">{{item.FROAM}}万元</span><span>未公开</span></li>
                <li>冻结起始日期：<span>{{item.FROFROM}}</span></li>
                <li>冻结截至日期：<span>{{item.FROTO}}</span></li>
                <li>解冻机关：<span>{{item.THAWAUTH}}</span></li>
                <li>解冻文号：<span>{{item.THAWDOCNO}}</span></li>
                <li>解冻日期：<span>{{item.THAWDATE}}</span></li>
                <li style="width:100%; line-height: 25px;"><p>解冻说明：</p><p>{{item.THAWCOMMENT}}</p></li>
              </ul>
            </div>
            <p class="gongshangInofH3 jingyingyichangto">经营异常<span class="count">{{exceptCount}}</span></p>
            <!--<span class="grey" v-if="EXCEPTIONLIST.length == 0">(暂无信息)</span>-->
            <table class="tableList" width="100%"  cellspacing="0" border="1" v-if="EXCEPTIONLIST && EXCEPTIONLIST.length != 0">
              <thead>
              <td>列入时间</td><td>列入经营异常名录原因</td><td>列入机关名称</td><td>移出时间</td><td>移出经营异常名录原因</td><td>移出机关名称</td>
              </thead>
              <tbody>
              <tr v-for="item in EXCEPTIONLIST">
                <td width="80">{{item.INDATE}}</td><td>{{item.INREASON}}</td><td>{{item.YR_REGORG}}</td><td width="80">{{item.OUTDATE}}</td><td>{{item.OUTREASON}}</td><td>{{item.YC_REGORG}}</td>
              </tr>
              </tbody>
            </table>
            <p class="gongshangInofH3 xingzhenchufato">行政处罚<span class="count">{{caseCount}}</span></p>
            <!--<span class="grey" v-if="CASEINFO.length == 0">(暂无信息)</span>-->
            <table class="tableList" width="100%"  cellspacing="0" border="1" v-if="CASEINFO && CASEINFO.length != 0">
              <thead>
              <td>案号</td><td>案由</td><td>主要违法事实</td><td width="86">案件结果</td><td width="160">处罚决定书签发日期</td>
              </thead>
              <tbody>
              <tr v-for="item in CASEINFO">
                <td width="200">{{item.PENDECNO}}</td><td>{{item.CASEREASON}}</td><td width="200">{{item.ILLEGFACT}}</td><td width="70">{{item.CASERESULT}}</td><td width="135">{{item.PENDECISSDATE}}</td>
              </tr>
              </tbody>
            </table>
            <p class="gongshangInofH3 beizhixingrento">被执行人<span class="count">{{punishedCount}}</span></p>
            <!--<span class="grey" v-if="PUNISHED.length == 0">(暂无信息)</span>-->
            <div class="guquandongjieBox guquandongjieBoxzhixingren tableList" v-for="item in PUNISHED">
              <p class="guquandongjieBoxH">案号：{{item.CASECODE}}</p>
              <ul class="clearfix lineghtSEtt">
                <li><span class="jiujiujiu">被执行人：</span><span>{{item.INAMECLEAN}}</span></li>
                <li><span class="jiujiujiu">组织机构代码：</span><span>{{item.CARDNUMCLEAN}}</span></li>
                <li><span class="jiujiujiu">执行标的：</span><span>{{item.EXECMONEY}} </span>元</li></span>
                <li><span class="jiujiujiu">案件状态：</span><span>{{item.CASESTATE}}</span></li>
                <li><span class="jiujiujiu">执行法院：</span><span>{{item.COURTNAME}}</span></li>
                <li><span class="jiujiujiu">省       份：</span><span>{{item.AREANAMECLEAN}}</span></li></span>
                <li><span class="jiujiujiu">立案时间：</span><span>{{item.REGDATECLEAN}}</span></li></span>
                <li v-if="item.FOCUSNUMBER"><span class="jiujiujiu">关注次数：</span><span>{{item.FOCUSNUMBER}}</span></li>
              </ul>
            </div>
            <div class="page">

              <pager
                mode="event"
                :total-page="zhixingrenPage"
                :init-page="punishedCur"
                @go-page="_gozhixingrenkPage">
              </pager>
            </div>
            <p class="gongshangInofH3 shixinxinxito">失信信息<span class="count">{{breakCount}}</span></p>
            <!--<span class="grey" v-if="PUNISHBREAK.length == 0">(暂无信息)</span>-->
            <div class="guquandongjieBox guquandongjieBoxzhixingren tableList" v-for="item in PUNISHBREAK">
              <p class="guquandongjieBoxH">{{item.INAMECLEAN}}</p>
              <ul class="clearfix">
                <li><span class="jiujiujiu">案号：</span><span>{{item.CASECODE}}</span></li>
                <li><span class="jiujiujiu">组织机构代码：</span><span>{{item.CARDNUM}}</span></li>
                <li style="width:100%; line-height: 25px;"><p class="jiujiujiu">生效法律文书确定的义务：</p><p>{{item.DUTY}}</p></li>
                <li style="width:100%; line-height: 25px;"><p class="jiujiujiu">失信被执行人行为具体情形：</p><p>{{item.DISRUPTTYPENAME}}</p></li>
                <li><span class="jiujiujiu">被执行人的履行情况</span>：<span>{{item.PERFORMANCE}}</span></li>
                <li><span class="jiujiujiu">执行法院：</span><span>{{item.COURTNAME}}</span></li>
                <li><span class="jiujiujiu">执行依据文号：</span><span>{{item.GISTID}}</span></li>
                <li><span class="jiujiujiu">做出执行依据单位</span><span>{{item.GISTUNIT}}</span></li>
                <li><span class="jiujiujiu">立案时间：</span><span>{{item.REGDATECLEAN}}</span></li>
                <li><span class="jiujiujiu">发布时间：</span><span>{{item.PUBLISHDATECLEAN}}</span></li>
              </ul>
            </div>
            <p class="gongshangInofH3 dongchandiyato">动产抵押<span class="count">{{mortCount}}</span></p>
            <!--<span class="grey" v-if="MORDETAIL.length == 0">(暂无信息)</span>-->
            <div class="guquandongjieBox guquandongjieBoxzhixingren tableList" v-for="item in MORDETAIL">
              <p class="guquandongjieBoxH">登记证号：{{item.MORREGCNO}}</p>
              <ul class="clearfix">
                <li>抵押人：<span>{{item.MORTGAGOR}}</span></li>
                <li>抵押权人：<span>{{item.MORE}}</span></li>
                <li>申请抵押原因：<span>{{item.APPREGREA}}</span></li>
                <li>被担保主债权种类：<span>{{item.PRICLASECKIND}}</span></li>
                <li>被担保主债权数额(万元)：<span>{{item.PRICLASECAM}}</span></li>
                <li>登记机关：<span>{{item.REGORG}}</span></li>
                <li>状态标识：<span>{{item.MORTYPE}}</span></li>
                <li>登记日期：<span>{{item.REGIDATE}}</span></li>
                <li>履约起始日期：<span>{{item.PEFPERFORM}}</span></li>
                <li>履约截止日期：<span>{{item.PEFPERTO}}</span></li>
              </ul>
            </div>
          </div>
        </div>
        <!--知识产权-->
        <div class="contabListDiv">
          <div class="gongshangList">
            <ul class="clearfix">
              <li @click="shangbiaoxinxiTo" class="gongshangActive">商标信息 <span>{{trademarkCount}}</span></li>
              <li @click="zhuzuoquanTo">著作权 <span>{{zuopingCopycount}}</span></li>
              <li @click="rujianzhuzuoquanTo">软件著作权 <span>{{runjianCopycount}}</span></li>
            </ul>
          </div>
          <div class="gongshangInof">
            <div class="shangbiaoTab clearfix">
              <p class="shangbiaoTabH2 shangbiaoxinxito" style="padding: 0">商标信息<span class="count">{{trademarkCount}}</span></p>
             </div>
            <table class="tableList" width="100%"  cellspacing="0" border="1" v-if="TRADEMARK && TRADEMARK.length != 0">
              <thead>
              <td>商标</td>
              <td>商标名</td>
              <td>商标最新状态</td>
              <td>注册码</td>
              <td>申请时间</td>
              <td>商标类型</td>
              </thead>
              <tbody>
              <tr v-for="item in TRADEMARK">
                <td><img style="width: 100px;" :src="'http://tm.bidata.com.cn/'+item.IMGNAME" :onerror="errorImg" alt="" /></td>
                <td>{{item.MARKNAME || "--"}}</td>
                <td>{{item.XIANGMU_NEW}}</td>
                <td>{{item.MARKCODEKEY}}</td>
                <td>{{item.APPDATE}}</td>
                <td>{{item.MARKTYPE_NEW}}</td>
                <!--<td @click="shangbiaoDetail">详情</td>-->
              </tr>
              </tbody>
            </table>
            <!--商标分页组件-->
            <div class="page" v-if="TRADEMARK && TRADEMARK.length != 0">
              <pager
                mode="event"
                :total-page="trademarkAll"
                :init-page="curPage"
                @go-page="_goTrademarkPage">
              </pager>
            </div>
            <p class="gongshangInofH3 zhuzuoquanto">著作权<span class="count">{{zuopingCopycount}}</span></p>
            <table class="tableList" width="100%"  cellspacing="0" border="1" v-if="zuopingCopy.length != 0">
              <thead>
              <td width="60">序号</td><td>名称</td><td>登记号</td><td width="105">登记日期</td><td width="90">登记类别</td>
              </thead>
              <tbody>
              <tr v-for="(item, index) in zuopingCopy">
                <td>{{index+1}}</td><td>{{item.FZD_ZPMC}}</td>
                <td>{{item.FZD_DJH}}</td><td>{{item.FZD_DJDATE}}</td><td>{{item.FZD_ZPLB}}</td>
              </tr>
              </tbody>
            </table>
            <!--作品著作权分页组件-->
            <div class="page" v-if="zuopingCopy.length != 0">
              <pager
                mode="event"
                :total-page="proAll"
                :init-page="proCurPage"
                @go-page="_goProductPage">
              </pager>
            </div>
            <!--./作品著作权分页组件-->
            <p class="gongshangInofH3 rujianzhuzuoquanto">软件著作权<span class="count">{{runjianCopycount}}</span></p>
            <table class="tableList" width="100%"  cellspacing="0" border="1" v-if="runjianCopy.length != 0">
              <thead>
              <td>序号</td><td>名称</td><td>分类号</td><td>登记号</td><td>登记批准日期</td>
              </thead>
              <tbody>
              <tr v-for="(item, index) in runjianCopy">
                <td>{{index+1}}</td><td>{{item.FRJ_RJQC}}</td>
                <td>{{item.FRJ_RJFLH}}</td><td>{{item.FRJ_DJH}}</td><td>{{item.FRJ_DJDATE}}</td>
              </tr>
              </tbody>
            </table>
            <!--软件著作权分页组件-->
            <div class="page" v-if="runjianCopy.length != 0">
              <!--<pagination :cur="softCurPage" :all="softAll" :callback="_softCallback" @click="_handleSoftCurrentChange(softCurPage)"></pagination>-->
              <pager
                mode="event"
                :total-page="softAll"
                :init-page="softCurPage"
                @go-page="_goSoftductPage">
              </pager>
            </div>
          </div>
        </div>
        <!--企业年报-->
        <div class="contabListDiv report">
          <div class="gongshangList yearlist">
            <ul class="clearfix">
              <li class="noReport" v-if="reportBasic.length == 0">该公司暂无年度报告</li>
              <li class="report-item" v-for="(item,index) in reportBasic" @click="reportClick(item.ANCHEID)" :class="{active:item.ANCHEID == nowIndex}">{{item.ANCHEYEAR}}年度报告</li>
              <!--<li>2015年度报告</li>-->
              <!--<li>2014年度报告</li>-->
            </ul>
          </div>
          <div class="tab-content">
            <div style="display: block;" class="item-report">
              <div class="basic">
                <h2>企业基本信息<span class="grey" v-if="reportBasic.length == 0">(暂无信息)</span></h2>
                <ul class="basic-list clearfix" v-if="reportBasic.length != 0">
                  <li><span>注册号：</span><span>{{basicObj.REGNO}}</span></li>
                  <li><span>企业经营状态：</span><span>{{basicObj.BUSST}}</span></li>
                  <li><span>企业联系电话：</span><span>{{basicObj.TEL}}</span></li>
                  <li><span>电子邮箱：</span><span>{{basicObj.EMAIL}}</span></li>
                  <li><span>地址：</span><span>{{basicObj.ADDR}}</span></li>
                  <li><span>邮政编码：</span><span>{{basicObj.POSTALCODE}}</span></li>
                </ul>
              </div>
              <div class="websit">
                <h2>网站或网店信息<span class="grey" v-if="this.websitArr.length == 0">(暂无信息)</span></h2>
                <table class="tableList" width="100%"  cellspacing="0" border="1" v-if="this.websitArr.length != 0">
                  <thead>
                    <td>类型</td>
                    <td>名称</td>
                    <td>网址</td>
                  </thead>
                  <tbody>
                    <tr v-for="(item,index) in websitArr">
                      <td>{{item.WEBTYPE}}</td>
                      <td>{{item.WEBSITNAME}}</td>
                      <td>{{item.DOMAIN}}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="share">
                <h2>股东(发起人)及出资信息<span class="grey" v-if="capArr.length ==0">(暂无信息)</span></h2>
                <table class="tableList" width="100%"  cellspacing="0" border="1" v-if="capArr.length !=0">
                  <thead>
                  <td>发起人</td>
                  <td>认缴出资日期</td>
                  <td>累计认缴额(万元)</td>
                  <td>出资方式</td>
                  <td>币种</td>
                  </thead>
                  <tbody>
                    <tr v-for="(item,index) in capArr">
                      <td>{{item.INV}}</td>
                      <td>{{item.CONDATE}}</td>
                      <td>{{item.LIACCONAM}}</td>
                      <td>{{item.CONFORM}}</td>
                      <td>{{item.CURRENCY}}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
    <div class="sure-layer" v-if="surePutToMonitorBool"></div>
    <div class="sure-section" v-if="surePutToMonitorBool">
        <h3>添加</h3>
        <span class="note">*不选择订单策略将自动选为默认策略</span>
        <div class="select" v-if="policyList.length > 0">
           <div class="select-selected">
               <span>
                    选择策略分组
               </span>
               <i></i>
           </div>
           <div class="policydetailwrap">
               <ul>
                    <li  @click="selectPolicy()">默认策略 </li>
                    <li v-for="row in policyList"  @click="selectPolicy(row)">{{row.name}}</li>
               </ul>
               <!-- <div class="policyDetail">
                    <a target="_blank" @click="policyDetail()"></a>
                    <a  target="_blank" @click="policyDetail(row)" v-for="row in policyList">编辑</a>
               </div> -->
            </div>
        </div>
        <div class="btn-section">
            <button class="cancel" @click="cancelMonitor()">取消</button><button class="sure" @click="putToMonitorAjax()">确认</button>
        </div>
    </div>
  </div>
</template>

<script>
import Pager from '../../components/pager.vue'
export default {
  components:{
    Pager
  },
  data () {
    return {
        query:'',
        serList:[],
        showing:false,
        name:'',
        BASIC:{},
        PERSON:[],
        SHAREHOLDER:[],
        listKeyword:'',
        ALTER:[],
        FILIATION:[],
        ENTINV:[],
        FRINV:[],
        FRPOSITION:[],
        entinvcount:0,
        TRADEMARK:[],
        PUNISHED:[],
        PUNISHBREAK:[],
        SHARESIMPAWN:[],
        SHARESFROST:[],
        EXCEPTIONLIST:[],
        CASEINFO:[],
        MORDETAIL:[],
        reportBasic:[],//年报基本信息
        basicArr:[],
        basicObj:{},
        websiteInfo:[],//网站信息
        websitArr:[],
        webObj:{},
        capitalInfo:[],//年报出资信息
        capArr:[],
        dealinInfo:[],//企业资产状况信息
        deaArr:[],
        deaObj:{},
        nowIndex:'',//默认第一个tab为激活状态
        curPage: 1, //默认当前页1(公用变量)
        punishedCur:1,
        pagesize:10, //商标：每页显示条数
        trademarkAll: 0,  //商标总数
        zhixingrenPage:0, //执行人
        runjianCopy:[],
        zuopingCopy:[],
        count:'',
        runjianCopycount:0,
        zuopingCopycount:0,
        proCurPage:1,//作品著作权分页
        proAll:0,//作品著作权总页数
        softCurPage:1,//软件著作权分页
        softAll:0,//软件著作权总页数
        entName:'',//公司名称
        errorImg:'this.src="' + require('../../assets/errorImg.png') + '"',
        addMonitorState:false,
        policyId:0,
        policyList:[],
        surePutToMonitorBool: false, //添加监控弹框是否显示
        personCount:0,
        shareCount:0,
        exceptCount:0,
        alterCount:0,
        filiationCount:0,
        impawnCount:0,
        sharefrostCount:0,
        caseCount:0,
        punishedCount:0,
        breakCount:0,
        mortCount:0,
        trademarkCount:0,
    }
  },
   watch: {
    '$route': function () {
      //2. $route发生变化时再次赋值listId
      this.listKeyword = this.$route.params.entid;
    }
  },
  mounted(){
      var _this = this;
      this.listKeyword = this.$route.params.entid;
      this.gongshangAjax();
      this.$nextTick(()=>{
        this.tabList();
      });
      // 获取策略列表
      this.$get(_this.api.fl_policy_name_list,function(result){
        if(result.success){
          _this.policyList = result.data;
        }
      });

      // 判断是否已经添加监控
      var pripid;
      if(this.$route.query.state == "fengling"){
        pripid = this.$route.params.entid;
      }else{
        pripid = (this.$route.params.entid).split("\u0001")[1];
      }

      _this.$getData(_this.api.fl_isMonitorEnter,{"pripid" : pripid},function(data){
        if(data.success && data.hasMonitor){
          _this.addMonitorState = true;
        }
      });

  },
  methods:{
      // 关闭弹窗
      cancelMonitor: function(){
       this.surePutToMonitorBool = false;
      },
      // 添加监控弹窗
      appendMointorCurrent: function() {
        var _this =this;
        var pripids = "";
        var entNames = "";
        _this.policyId = 0;
        $(".sure-section .select-selected span ").html("选择订单策略");
        if(_this.policyList.length>0){
          _this.surePutToMonitorBool = true;
          setTimeout(function(){
            _this.mySelect(".select");
          },0);
        }else{
          swal({
            title: "确认",
            text: "确认添加监控吗？",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "确认",
            cancelButtonText: "取消",
            closeOnConfirm: true,
            closeOnCancel: true
          },function(confirm){
            if(confirm){
              _this.putToMonitorAjax();
            }
          });
        }
      },
      // 添加监控
      putToMonitorAjax: function(){
        var _this = this;
        var condition = {
          "name" : _this.BASIC.ENTNAME,
          "policyId":_this.policyId,
        };
        var params = JSON.stringify(condition);
        _this.$post(_this.api.fl_putToMonitorListSingle,params,function(result){
          _this.surePutToMonitorBool = false;
          if(result.success){
            _this.addMonitorState = true;
            swal({
               title: "确认",
               text: "添加成功 ",
               type: "success",
               showCancelButton: false,
               confirmButtonColor: "#DD6B55",
               confirmButtonText: "确认",
               cancelButtonText: "取消",
               closeOnConfirm: true,
               closeOnCancel: true
            });
          }else{
            window.swal({
               title: "提示",
               text: result.message,
               type: "info",
               showCancelButton: false,
               confirmButtonColor: "#DD6B55",
               confirmButtonText: "确认",
               cancelButtonText: "取消",
               closeOnConfirm: true,
               closeOnCancel: true
            });
          }
        });
      },
      // 选择策略
      selectPolicy: function(row){
        if(row){
          this.policyId = row.id;
        }else{
          this.policyId = 0;
        }
      },
     //年报接口调用
      _getYearReport(){
        // this.axios.get(this.api.entBase+'/detail?id='+ encodeURIComponent(this.listKeyword)+"&mask=1000000000000000000000000000001000000010000").then((res) => {
        this.axios.get(this.api.entBase+'/detail',{params: this.getCondition(this,"1000000000000000000000000000001000000010000")}).then((res)=>{
          console.log(res);
          //年报
          this.reportBasic = res.data.ENT_INFO.YEARREPORTBASIC.reverse(); //年报基本信息
          this.websiteInfo = res.data.ENT_INFO.YEARREPORTWEBSITEINFO;//年报网站信息
          this.capitalInfo = res.data.ENT_INFO.YEARREPORTPAIDUPCAPITAL;//年报股东出资信息
          this.dealinInfo =  res.data.ENT_INFO.DEALIN;//企业资产状况信息
          this.$nextTick(function(){
            $(".report-item").eq(0).click();
            $(".report-item").eq(0).addClass('gongshangActive')
          })
        }).catch(err => {
            console.log(err);
        })
      },
      //年报年度报告切换
      reportClick(yearId){
        this.nowIndex = yearId;
        console.log(this.nowIndex);
        //基本信息
        var bArr = [];
        for(var l in this.reportBasic){
          if(yearId == this.reportBasic[l].ANCHEID){
            bArr.push(this.reportBasic[l]);
          }
        }
        this.basicArr = bArr;
        if(bArr.length != 0){
          this.basicObj = bArr[0];
        }

        //console.log(this.basicObj);
        //网站信息
        var webArr = [];
        for(var k in this.websiteInfo){
          if(yearId == this.websiteInfo[k].ANCHEID){
            webArr.push(this.websiteInfo[k]);
          }
        }
        this.websitArr = webArr;
        //股东出资信息
        var cArr = [];
        for(var m in this.capitalInfo){
          if(yearId == this.capitalInfo[m].ANCHEID){
            cArr.push(this.capitalInfo[m]);
          }
        }
        this.capArr = cArr;
      },
      //作品著作权分页方法调用
      _goProductPage (data) {
        this.proCurPage = data.page;
        this._getProCopyRight(this.entName);
      },
      //软件著作权分页方法调用
      _goSoftductPage(data){
        this.softCurPage = data.page;
        this._getSoftCopyRight(this.entName);
      },
      //商标分页
      _goTrademarkPage(data){
        this.curPage = data.page;
        this._getTradeMarkInfo();
      },
      //被执行人分页新
      _gozhixingrenkPage(data){
        this.punishedCur = data.page;
        this.fengxianxinxiAjax();
      },

      getCondition(_this,mask){
        var condition = {
           mask: mask
        };
        if(_this.$route.query.state == "fengling"){
            condition.creditcode = _this.$route.query.creditcode || "";
            condition.regno = _this.$route.query.regno || "";
            condition.entname = _this.$route.query.entname || "";
        }else{
          condition.id = _this.listKeyword;
        }
        return condition;
      },
  	 //工商
      gongshangAjax(){
        //count接口

        this.axios.get(this.api.entBase+'/statistic',{params:this.getCondition(this,"1111111111111111111111111111111111111111111")}).then((res)=>{
            console.log(res);
            this.count = res.data.RESULT;
            this.personCount = res.data.RESULT.COUNTOFPERSON;
            this.shareCount = res.data.RESULT.COUNTOFSHAREHOLDER;
            this.alterCount = res.data.RESULT.COUNTOFALTER;
            this.filiationCount = res.data.RESULT.COUNTOFFILIATION;
            this.entinvcount = res.data.RESULT.COUNTOFENTINV;
            this.impawnCount = res.data.RESULT.COUNTOFSHARESIMPAWN;
            this.sharefrostCount = res.data.RESULT.COUNTOFSHARESFROST;
            this.exceptCount = res.data.RESULT.COUNTOFEXCEPTIONLIST;
            this.caseCount = res.data.RESULT.COUNTOFCASEINFO;
            this.punishedCount = res.data.RESULT.COUNTOFPUNISHED;
            this.breakCount = res.data.RESULT.COUNTOFPUNISHBREAK;
            this.mortCount = res.data.RESULT.COUNTOFMORDETAIL;
            this.trademarkCount = res.data.RESULT.COUNTOFTRADEMARK;
        }).catch((err)=>{
          console.log(err)
        })
        //照面信息
        this.axios.get(this.api.entBase+'/detail',{params: this.getCondition(this,"1000000000000000000000000000000000000000000")}).then((res)=>{
          console.log(res)
             if(res.data.CODE == 703){
                 window.swal({
                   title: "",
                   text: "你已超过查询次数，如想继续查询请购买次数！",
                   type: "info",
                   showCancelButton: false,
                   confirmButtonColor: "#DD6B55",
                   confirmButtonText: "确认",
                   cancelButtonText: "取消",
                   closeOnConfirm: true,
                   closeOnCancel: true
                 });
             }

              this.BASIC = res.data.ENT_INFO.BASIC;
              this.entName = res.data.ENT_INFO.BASIC.ENTNAME;
              this._getProCopyRight(this.entName);
              this._getSoftCopyRight(this.entName);
              console.log(this.entName)
        }).catch((err)=>{
          console.log(err)
        })
        //主要高管
        // this.axios.get(this.api.entBase+'/detail?id='+ encodeURIComponent(this.listKeyword)+'&mask=1001000000000000000000000000000000000000000').then((res)=>{

        this.axios.get(this.api.entBase+'/detail',{params: this.getCondition(this,"1001000000000000000000000000000000000000000")}).then((res)=>{

              this.PERSON = res.data.ENT_INFO.PERSON;
        }).catch((err)=>{
          console.log(err)
        })
        //股东信息
        // this.axios.get(this.api.entBase+'/detail?id='+ encodeURIComponent(this.listKeyword)+'&mask=1100000000010000000000000000000000000000000').then((res)=>{
        this.axios.get(this.api.entBase+'/detail',{params: this.getCondition(this,"1100000000010000000000000000000000000000000")}).then((res)=>{
              this.SHAREHOLDER = res.data.ENT_INFO.SHAREHOLDER;
              console.log("this.SHAREHOLDER");
              console.log(this.SHAREHOLDER);
        }).catch((err)=>{
          console.log(err)
        })
        //历史变更
        // this.axios.get(this.api.entBase+'/detail?id='+ encodeURIComponent(this.listKeyword)+ '&mask=1000000000000001000000000000000000000000000').then((res)=>{
        this.axios.get(this.api.entBase+'/detail',{params: this.getCondition(this,"1000000000000001000000000000000000000000000")}).then((res)=>{
              this.ALTER = res.data.ENT_INFO.ALTER;
        }).catch((err)=>{
          console.log(err)
        })
        //分支机构
        // this.axios.get(this.api.entBase+'/detail?id='+ encodeURIComponent(this.listKeyword)+ '&mask=1000000000000000010000000000000000000000000').then((res)=>{
        this.axios.get(this.api.entBase+'/detail',{params: this.getCondition(this,"1000000000000000010000000000000000000000000")}).then((res)=>{
              this.FILIATION = res.data.ENT_INFO.FILIATION;
        }).catch((err)=>{
          console.log(err)
        })
        //对外投资

        this.axios.get(this.api.entBase+'/detail',{params: this.getCondition(this,"1000000001000000000000000000000000000000000")}).then((res)=>{
              this.ENTINV = res.data.ENT_INFO.ENTINV
        }).catch((err)=>{
          console.log(err)
        })
        //法定代表人对外投资

        this.axios.get(this.api.entBase+'/detail',{params: this.getCondition(this,"1000000100000000000000000000000000000000000")}).then((res)=>{
              this.FRINV = res.data.ENT_INFO.FRINV
        }).catch((err)=>{
          console.log(err)
        })
        //法定代表人其他公司任职

        this.axios.get(this.api.entBase+'/detail',{params: this.getCondition(this,"1000000010000000000000000000000000000000000")}).then((res)=>{
              console.log(res.data.ENT_INFO.FRPOSITION)
              this.FRPOSITION = res.data.ENT_INFO.FRPOSITION
        }).catch((err)=>{
          console.log(err)
        })
      },
     //风险
     fengxianxinxiAjax(){
          //股权出质
          // {params: this.getCondition(this,"1000000000000001000000000000000000000000000")}
        // this.axios.get(this.api.entBase+'/detail?id='+ encodeURIComponent(this.listKeyword)+ '&mask=1000000000000000000000010000000000000000000').then((res)=>{
        this.axios.get(this.api.entBase+'/detail',{params: this.getCondition(this,"1000000000000000000000010000000000000000000")}).then((res)=>{
              this.SHARESIMPAWN = res.data.ENT_INFO.SHARESIMPAWN;
        }).catch((err)=>{
          console.log(err)
        })
      //股权冻结
        // this.axios.get(this.api.entBase+'/detail?'+ encodeURIComponent(this.listKeyword)+ '&mask=1000000000000000000000000000010000000000000').then((res)=>{
        this.axios.get(this.api.entBase+'/detail',{params: this.getCondition(this,"1000000000000000000000000000010000000000000")}).then((res)=>{
              this.SHARESFROST = res.data.ENT_INFO.SHARESFROST;
        }).catch((err)=>{
          console.log(err)
        })
        //经营异常
        // this.axios.get(this.api.entBase+'/detail?id='+ encodeURIComponent(this.listKeyword)+'&mask=1000000000000000000000000000000000000000001').then((res)=>{
        this.axios.get(this.api.entBase+'/detail',{params: this.getCondition(this,"1000000000000000000000000000000000000000001")}).then((res)=>{
              this.EXCEPTIONLIST = res.data.ENT_INFO.EXCEPTIONLIST;
        }).catch((err)=>{
          console.log(err)
        })
        //行政处罚
        // this.axios.get(this.api.entBase+'/detail?id='+ encodeURIComponent(this.listKeyword)+'&mask=1000000000000000000000000000000010000000000').then((res)=>{
        this.axios.get(this.api.entBase+'/detail',{params: this.getCondition(this,"1000000000000000000000000000000010000000000")}).then((res)=>{
              this.CASEINFO = res.data.ENT_INFO.CASEINFO;
              console.log(this.CASEINFO);
        }).catch((err)=>{
          console.log(err)
        })
        //被执行人
        // this.axios.get(this.api.entBase+'/detail?id='+ encodeURIComponent(this.listKeyword)+ '&mask=1101000111011000000000000010000001000000000').then((res)=>{
        this.axios.get(this.api.entBase+'/detail',{params: this.getCondition(this,"1101000111011000000000000010000001000000000")}).then((res)=>{
          // var aa=res.data.ENT_INFO.PUNISHED;
          // var arr = [];
          // for(var index in aa){
          //     arr.push(aa[index].CASECODE)
          // }
          //  document.write(res.data.ENT_INFO.PUNISHED)
              console.log(res);

              this.PUNISHED = res.data.ENT_INFO.PUNISHED;
              if(res.data.ENT_INFO.PUNISHED.length > 10000){
                res.data.ENT_INFO.PUNISHED.length = 10000;
              }
              this.zhixingrenPage = Math.ceil(res.data.ENT_INFO.PUNISHED.length/this.pagesize);   //总页数执行人
              var m = 0;
              m = this.punishedCur*this.pagesize;
              this.PUNISHED = this.PUNISHED.slice(m-this.pagesize,m)
        }).catch((err)=>{
          console.log(err)
        })
         //失信信息
        // this.axios.get(this.api.entBase+'/detail?id='+ encodeURIComponent(this.listKeyword)+ '&mask=1101000111000000000000000100000000000000000').then((res)=>{
        this.axios.get(this.api.entBase+'/detail',{params: this.getCondition(this,"1101000111000000000000000100000000000000000")}).then((res)=>{
              this.PUNISHBREAK = res.data.ENT_INFO.PUNISHBREAK;
        }).catch((err)=>{
          console.log(err)
        })
        //动产抵押
        // this.axios.get(this.api.entBase+'/detail?id='+ encodeURIComponent(this.listKeyword)+  '&mask=1000000000000000000000001000000000000000000').then((res)=>{
        this.axios.get(this.api.entBase+'/detail',{params: this.getCondition(this,"1000000000000000000000001000000000000000000")}).then((res)=>{
              this.MORDETAIL = res.data.ENT_INFO.MORDETAIL;
        }).catch((err)=>{
          console.log(err)
        })
     },
       //知识产权点击事件整合
      _knowledgeClick(){

        this._getTradeMarkInfo();

      },
      //年报点击事件整合
      _yearReportClick(){
        this._getYearReport();
      },
      //商标接口
      _getTradeMarkInfo(){

          console.log(this.entName)
        // this.axios.get(this.api.entBase+'/detail?id='+ encodeURIComponent(this.listKeyword)+"&mask=1000000000000000000000000000000000000000010").then((res) => {
        this.axios.get(this.api.entBase+'/trademark/list?key='+ encodeURIComponent(this.entName)+"&page="+this.curPage+"&size="+this.pagesize).then((res)=>{
          console.log(res.data.TRADEMARKLIST);
          this.TRADEMARK = res.data.TRADEMARKLIST;
          // //商标分页start
           var trademarkLen = res.data.TRADEMARKLIST.length;
          if(res.data.TRADEMARKLIST > 10000){
            trademarkLen = res.data.TRADEMARKLIST = 10000;
          }
           this.trademarkAll = trademarkLen; //商标总页数计算
          // var n=0;
          // n=this.curPage*this.pagesize    //5  10
          // this.TRADEMARK = this.TRADEMARK.slice(n-this.pagesize,n);
        }).catch(err => {
            console.log(err);
        })
      },
      //产权-作品著作权
      _getProCopyRight(entname){
        this.axios.get(this.api.entBase+'/copyright?key='+ encodeURIComponent(entname)+"&mask=001"+"&page="+this.proCurPage+"&size="+this.pagesize).then((res)=>{
        // this.axios.get(this.api.entBase+'/detail',{params: this.getCondition(this,"001")}).then((res)=>{
          console.log(res);
          this.zuopingCopy = res.data.result.PRODUCTCOPYRIGHT;
          this.zuopingCopycount = res.data.result.COUNTOFPRODUCTCOPYRIGHT;
          if(res.data.result.COUNTOFPRODUCTCOPYRIGHT >10000){
            this.zuopingCopycount = res.data.result.COUNTOFPRODUCTCOPYRIGHT = 10000;  //当超过10000条数据时，赋值10000；
          }
          //作品著作权处理时间截取
          var proArr = [];
          for(var i in res.data.result.PRODUCTCOPYRIGHT){
            var temp = {
              FZD_ZPMC:res.data.result.PRODUCTCOPYRIGHT[i].FZD_ZPMC,
              FZD_DJH:res.data.result.PRODUCTCOPYRIGHT[i].FZD_DJH,
              FZD_DJDATE:res.data.result.PRODUCTCOPYRIGHT[i].FZD_DJDATE.substring(0,10),
              FZD_ZPLB:res.data.result.PRODUCTCOPYRIGHT[i].FZD_ZPLB,
            }
            proArr.push(temp);
          }
          this.zuopingCopy = proArr;
          this.proAll = Math.ceil(this.zuopingCopycount/this.pagesize);

        }).catch((err)=>{
          console.log(err);
        })
      },
      //软件著作权
      _getSoftCopyRight(entname){

        this.axios.get(this.api.entBase+'/copyright?key='+ encodeURIComponent(entname)+"&mask=010"+"&page="+this.softCurPage+"&size="+this.pagesize).then((res) => {
        // this.axios.get(this.api.entBase+"/detail?page="+this.softCurPage+"&size="+this.pagesize,{params: this.getCondition(this,"&mask=010")}).then((res)=>{
          this.runjianCopy = res.data.result.COPYRIGHTINFO;
          this.runjianCopycount = res.data.result.COUNTOFCOPYRIGHTINFO;
          if(res.data.result.COUNTOFCOPYRIGHTINFO > 10000){
            this.runjianCopycount = res.data.result.COUNTOFCOPYRIGHTINFO = 10000;//当超过10000条数据时，赋值10000；
          }
          //软件著作权时间截取
          var softArr = [];
          for(var k in res.data.result.COPYRIGHTINFO){
            var temp = {
              FRJ_RJQC:res.data.result.COPYRIGHTINFO[k].FRJ_RJQC,
              FRJ_RJFLH:res.data.result.COPYRIGHTINFO[k].FRJ_RJFLH,
              FRJ_DJH:res.data.result.COPYRIGHTINFO[k].FRJ_DJH,
              FRJ_DJDATE:res.data.result.COPYRIGHTINFO[k].FRJ_DJDATE.substring(0,10),
            }
            softArr.push(temp);
          }
          this.runjianCopy = softArr;
          this.softAll = Math.ceil(this.runjianCopycount/this.pagesize);
        }).catch(err => {
            console.log(err);
        })

      },
     //上线定位 dongchandiyato
      dongchandiyaTo(){
        this.allTo($('.dongchandiyato'));
      },
      xingzhenchufaTo(){
        this.allTo($('.xingzhenchufato'));
      },
      shixinxinxiTo(){
        this.allTo($('.shixinxinxito'));
      },
      beizhixingrenTo(){
        this.allTo($('.beizhixingrento'));
      },
      rujianzhuzuoquanTo(){
        this.allTo($('.rujianzhuzuoquanto'));
      },
      zhuzuoquanTo(){
        this.allTo($('.zhuzuoquanto'));
      },
      shangbiaoxinxiTo(){
        this.allTo($('.shangbiaoxinxito'));
      },
      jingyingyichangTo(){
        this.allTo($('.jingyingyichangto'));
      },
      guquandongjieTo(){
        this.allTo($('.guquandongjieto'));
      },
      guquanchuzhiTo(){
        this.allTo($('.guquanchuzhito'));
      },
      fenzhiTo(){
        this.allTo($('.fenzhito'));
      },
      duiwaiTo(){
        this.allTo($('.duiwaito'));
      },
      farenduiwaiTo(){
        this.allTo($('.farenduiwaito'));
      },
      farenGduiwaiTo(){
        this.allTo($('.farenGduiwaito'));
      },
      lishiTo(){
        this.allTo($('.lishito'));
      },
      gudunTo(){
        this.allTo($('.gudongto'));
      },
      gaoguanTo(){
        this.allTo($('.gaoguanto'));
      },
      gongshangTo(){
        this.allTo($('.gongshangto'));
      },
      allTo(nameTo){
        if(($('html').scrollTop() || $('body').scrollTop()) >= 0 && ($('html').scrollTop() || $('body').scrollTop()) < $('.contabList').offset().top){
          $('body,html').animate({'scrollTop':(nameTo.offset().top-214)},500)
        }else{
          $('body,html').animate({'scrollTop':(nameTo.offset().top-151)},500)
        }
      },
       //获取搜索列表
      _getSerLists(){
        var name = this.$refs.inputValue.value;
        if(name == ""){
          return false;
          this.serList = [];
          this.query = "";
          this.showing = false;
        }
        if(name && name.replace(/ /g,"").length <= 2){
          this.serList = [];
          this.showing = false;
          return false;

        }
        this.axios.get(this.api.entBase+'/list?key='+encodeURIComponent(name)).then((res) => {
          //console.log(res);
          if(res.data.ENTERPRISES != []){
            this.serList = [];
            if(res.data.ENTERPRISES.length > 6){
              for(var i=0;i<6;i++){
                this.serList.push(res.data.ENTERPRISES[i]);
              }
            }else{
              this.serList = res.data.ENTERPRISES;
            }
            this.showing = true;
          }
        }).catch(err => {
          console.log(err);
        })
      },
      //延时减少请求
      _timeflash(){
        var that = this;
        clearTimeout(this.timer);// 关闭400ms内的上一个计时器，400ms后认为用户停止输入，即输入完成，开始搜索，从而减少多余的请求次数
        this.timer = setTimeout(function () {
          console.log(1);
          that._getSerLists();// 发送搜索请求
        }, 400);
      },
      _closeSearch(){
        var that = this;
        setTimeout(function(){
          that.list = [];
          that.showing = false;
        },300)
      },
      //搜索点击跳到列表页
//      _goList(keyword){
//        this.$router.push({ name: '企业视图', params: { keyword: keyword }});
//      },
      _goList(keyword){
          this.$router.push({ name: '企业视图'});
          window.sessionStorage.removeItem('hcname');
          sessionStorage.setItem('hcname',keyword);
      },
      //列表切换
      tabList(){

          var locataionH= window.location.href;
          var n= locataionH.indexOf('#/');
          var pathHref= locataionH.substring(n);
          //传到index页面
          sessionStorage.setItem('qiteDetailPathHref',pathHref);

          console.log(pathHref)

          var top = $('.contabList').offset().top

          // window.onscroll=function(){
          //   console.log(top)
          //   if((document.documentElement.scrollTop || document.body.scrollTop) > 200){
          //     $('.totopde').show()
          //   }else {
          //     $('.totopde').hide()
          //   }
          //     if(($('html').scrollTop() || $('body').scrollTop()) >= top){
          //         $('.contabList').addClass('fiexTablist')
          //         $('.gongshangList ul').addClass('fiexTablistXia')
          //     }else{
          //       $('.contabList').removeClass('fiexTablist')
          //       $('.gongshangList ul').removeClass('fiexTablistXia')
          //     }
          // }
          $('.shangbiaoTabXiala').click(function(){
              var index=$(this).index()
            console.log(index)
            if($('.shangbiaoTabXialaBoxBottom').eq(index-1).is(":hidden")){
              $('.shangbiaoTabXialaBoxBottom').hide();
              $('.shangbiaoTabXialaBoxBottom').eq(index-1).show();
            }else{
              $('.shangbiaoTabXialaBoxBottom').hide();
              $('.shangbiaoTabXialaBoxBottom').eq(index-1).hide();
            }
          });
        $('.gongshangList ul li').hover(function(){
            console.log('hover')
          $('.gongshangList ul li').removeClass('gongshanghover')
          $(this).addClass('gongshanghover')
        },function(){
          $('.gongshangList ul li').removeClass('gongshanghover')
        });
        $('.gongshangList ul li').click(function(){
          console.log('click')
          $('.gongshangList ul li').removeClass('gongshangActive')
          $(this).addClass('gongshangActive')
        });

        $(".contabList li").click(function(){
          // $('html,body').scrollTop(0);
          $(".contabList li").removeClass('active');
          $('.contabListDiv').hide();
          $(this).addClass('active')
          $('.contabListDiv').eq($(this).index()).show();
        });
      },
      getMonitorState:function(){
        var _this = this;

        _this.$getData(_this.api.fl_isMonitorEnter,{"pripid" : row.pripid},function(data){
          if(data.isExist){
            window.swal({
               title: "确认",
               text: "你已添加",
               type: "info",
               showCancelButton: false,
               confirmButtonColor: "#DD6B55",
               confirmButtonText: "确认",
               cancelButtonText: "取消",
               closeOnConfirm: true,
               closeOnCancel: true
             });
          }
        });
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss"  scoped>
.tableLists{
  margin-top: 24px;
}
.tableLists tr td{
  line-height: 30px;
    padding-left: 15px;
    border: 1px solid #E6E6E6;
    padding: 5px 8px 5px 15px;
}
.tableLists tr td:first-child{
  width: 300px;
}
.lineghtSEtt li{
  height: 20px;
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
          border-bottom:1px solid #7fb6f0;
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
                          background:#7fb6f0;
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
              background:#7fb6f0;
              font-size:14px;
              color:#fff;
              &.cancel{
                  background:#a0a0a0;
                  margin-right:18px;
              }
          }
      }

  }
  .btn-group{
    position: static;
  }
  .monitor-btn{
      position:absolute;
      top:30px;
      right:40px;
      width:120px;
      height:40px;
      line-height:40px;
      padding:0px 16px 0px 40px;
      background: #F59639 url("/static/images/fengling/enter-add-monitor.png") no-repeat 12px 6px;;;
      background-size:24px;
      margin-right: 18px;
      color: #fff;
      margin-top: 12px;
      cursor:pointer;
      i{
          margin-right:8px;
      }
  }
  .already-monitor-btn{
      background: #e8e8e8 url("/static/images/fengling/enter-add-monitor.png") no-repeat 12px 6px;
      background-size:24px;
  }
  .count{
    background: #3BD2A2;
    border-radius: 3px;
    height:16px;
    line-height:16px;
    font-weight:normal;
    padding: 0 4px;
    color: #fff;
    font-size: 12px;
    margin-left: 10px;
    position: relative;
    top:-1px;
  }

  .fiexTablist{
  position: fixed;
  background: #ffffff;
  top: 0px;
  left: 50%;
  margin-left: -600px;
  width: 1200px;
    z-index: 2;
  }
  .fiexTablistXia{
    box-shadow: 0 5px 20px 0 rgba(0,0,0,0.05);
  position: fixed;
  top: 74px;
  left: 0;
  background: #ffffff;
  width:100%;
    z-index: 1;
  }
  .guquandongjieBoxH{
    height: 44px;
    background: #F3F7FA;
    border-bottom: 1px solid #E6E6E6;
    line-height: 44px;
    padding-left:15px;
    font-size: 14px;
  }
  .guquandongjieBox{
    width: 100%;
    /*min-height: 235px;*/
    background: #FFFFFF;
    border:1px solid #e6e6e6;
  }
  .guquandongjieBox ul{
    margin-top: 10px;
    padding:15px;
  }
  .guquandongjieBox ul li{
    float: left;
    width: 25%;
    font-size: 14px;
    color: #323232;
    margin-top: 24px;
  }
  .guquandongjieBoxzhixingren ul li{
    float: left;
    width: 33.3%;
    font-size: 14px;
    color: #323232;
    margin-top: 24px;
    line-height: 20px;
  }
  .shangbiaoDetailConterBox div{
    height: 235px;
    width: 50%;
    box-sizing: border-box;
    border:1px solid #e6e6e6;
    float: left;
  }
  .shangbiaoDetailConterBox{
    margin:20px;
  }
  .shangbiaoDetailConterH2 span:first-child{
    font-size: 18px;
    color: #323232;
    font-weight: bold;
  }
  .shangbiaoDetailConterH2 span:nth-child(2){
    color: #D8D8D8;
    float: right;
    font-size: 40px;
  }
  .shangbiaoDetailConterH2{
    padding:0 20px;
    background: #F3F7FA;
    height: 60px;
    line-height:60px;
  }
  .shangbiaoDetailConter{
    width: 1200px;
    min-height:800px;
    top:150px;
    background: #fff;
    position: absolute;
    left: 50%;
    margin-left: -600px;
    z-index: 2;
  }
  .jiujiujiu{
    color: #999999;
  }
  .shangbiaoDetailBack{
    position: fixed;
    height: 100%;
    width: 100%;
    top: 0px;
    left:0px;
    background: #2B2C2D;
    opacity: 0.5;
    z-index: 1;
  }
  .iconIMG{
    display: inline-block;
    width: 0;
    height: 0;
    margin-left: 2px;
    vertical-align: middle;
    border-top: 4px solid;
    border-right: 4px solid transparent;
    border-left: 4px solid transparent;
    color: #788288 !important;
  }
  .shangbiaoTabXialaBox{
    padding: 5px 10px;
    background-color: #fcfcfd;
    border: 1px solid #d2dae1;
    border-radius: 3px;
    font-size: 15px;
    display: block;
    cursor: pointer;
  }
  .shangbiaoTabXialaBoxBottom{
    border: 1px solid #d2dae1;
    padding: 5px 10px;
    margin-top: 6px;
    position: absolute;
    right:0;
    top:22px;
    min-width:160px;
    background-color: #fff;
    display: none;
  }
  .shangbiaoTabXialaBoxBottom li{
    height: 25px;
    line-height: 25px;
    cursor: pointer;
    white-space: nowrap;
  }
  .shangbiaoTabH2{
    font-size: 16px;
    font-weight: bold;
    float: left;
    padding: 5px 10px;
  }
  .shangbiaoTabXiala{
    float: right;
    margin-right: 10px;
    position: relative;
  }
  .shangbiaoTab{
  }
  .fenzhiList ul{
    border: 1px solid #E6E6E6;
    height: 44px;
    float: left;
    width: 50%;
    box-sizing: border-box;
  }
  .fenzhiList ul li{
    float: left;
    height: 44px;
    line-height:44px;
  }
  .fenzhiList ul li:first-child{
    line-height:42px;
    height: 42px;
    width: 58px;
    background: #F3F7FA;
    text-align: center;
    border-right:1px solid #E6E6E6;
  }
  .fenzhiList ul li:nth-child(2){
    padding-left:15px;
  }
  .fenzhiList{
    margin-top:24px;
  }
  .tableList{
    margin-top:24px;
    border-collapse: collapse;
  }
  .tableList thead td{
    background: #F3F7FA;
    height: 44px;
    line-height: 44px;
    padding-left: 15px;
    border:1px solid #E6E6E6;
    color: #5E7386;
    font-weight: bold;
  }
  .tableList tbody td{
    line-height: 30px;
    padding-left: 15px;
    border:1px solid #E6E6E6;
    padding: 5px 8px 5px 15px;
  }
  .gongshangInofjingying{
    line-height: 30px;
  }
  .gongshangInofH3{
    margin-top:50px;
    font-size: 16px;
    font-weight: bold;
  }
  .gongshangInofList{
    margin-top:20px;
  }
  .gongshangInofList li .spanCloer{
    color: #4AA6FF;
  }
  .gongshangInofList li{
    width:50%;
    font-size: 14px;
    height: 40px;
    line-height:40px;
    float: left;
  }
  .gongshangInofH2{
    font-size: 16px;
    font-weight: bold;
  }
  .gongshangInof{
    padding:20px;
  }
  .gongshangList{

  }
  .gongshangList ul{
    padding-bottom: 14px;
    box-shadow: 0 5px 20px 0 rgba(0,0,0,0.05);
  }
  .gongshangList ul li{
    float: left;
    margin-left:20px;
    margin-top:14px;
    font-size: 14px;
    padding:10px;
    border:1px solid #E6E6E6;
    border-radius: 3px;
    cursor: pointer;
    color: #5E7386;
  }
  .gongshangList ul li.gongshanghover{
    background: #4AA6FF;
    color: #fff;
  }
  .gongshangList ul li.gongshangActive{
    background: #F2F6FA;
    color: #637789;
  }
  .gongshangList ul .report-item:hover{
    background: #4AA6FF;
    color: #fff;
  }
  .gongshangList ul .report-item.active{
    background: #F2F6FA;
    color: #637789;
  }

  .contabListDiv{
    margin-top:1px;
    display: none;
  }
  .conListTab{
    margin-top:24px;
    background: #ffffff;
    box-shadow: 0 2px 5px 0 rgba(0,0,0,0.05);
    padding-bottom:50px;
  }
  .conListTab .contabList{
    height: 60px;
    border-bottom:1px solid #e6e6e6;
  }
  .conListTab .contabList li{
    font-size: 18px;
    height: 60px;
    line-height: 60px;
    float: left;
    text-align: center;
    width: 25%;
    cursor: pointer;
  }
  .conListTab .contabList li.active{
    color: #4AA6FF;
    border-bottom:3px solid #4AA6FF;
    height: 59px;
    line-height: 59px;
  }
  .conHeader{
    position:relative;
    margin-top: 20px;
  }
  .conHeaderAdd{
    margin-top:24px;
    font-size: 14px;
  }
  .conHeaderList{
    margin-top:30px;
  }
  .conHeaderList li{
    float: left;
    width: 33%;
    font-size: 14px;
  }
  .box{
    background: #f3f7fa;
  }
  .conHeaderName{
    padding-top:24px;
    font-size: 24px;
    font-weight: bold;
  }
  .conHeader{
    padding:24px 20px;
    background: #ffffff;
    box-shadow: 0 2px 5px 0 rgba(0,0,0,0.05);
  }
  .item-report{
    display: none;
  }
  .conter{
    margin:auto;
    min-height:900px;
    word-break: break-all;
word-wrap: break-word;

  }
  /*企业年报*/
  .report .gongshangList{
    border-bottom:0;
    box-shadow: 0 5px 20px 0 rgba(0,0,0,0.05);
  }
  .report .tab-content{
    margin: 0 20px;
    padding:0 0 50px 0;
  }
  .report h2{
    font-size:16px;
    color: #323232;
    font-weight:bold;
    padding:20px 0 18px 0;
  }
  .basic-list > li{
    width:50%;
    float: left;
    line-height:38px;
    color: #323232;
  }
  .report thead td{
    font-weight:bold;
    color: #5E7386;
  }
  .report tbody th{
    border:1px solid #e6e6e6;
    background-color: #F3F7FA;
    padding-left:15px;
    color: #5E7386;
    font-weight:bold;
  }
  .fund{
    padding-bottom:150px;
  }
  .grey{
    color: #999;
  }
  .page{
    margin-top:30px;
  }
  .bell{
    font-size:14px;
    color: #323232;
    margin-left:20px;
  }
  .bell:hover{
    font-weight:bold;
    color: #4AA6FF;
  }
.search{
  width:100%;
  position: relative;
}
.ser{
  position: relative;
}
.search-box{
  height:38px;
  -webkit-border-radius:3px 0 0 3px;
  -moz-border-radius:3px 0 0 3px;
  border-radius:3px 0 0 3px;
  margin-right:40px;
}
.ser-btn{
  width:40px;
  height: 38px;
  background: #4AA6FF;
  -webkit-border-radius:0 3px 3px 0;
  -moz-border-radius:0 3px 3px 0;
  border-radius:0 3px 3px 0;
  position: absolute;
  top:0px;
  right:0;
  cursor: pointer;
}
.ser-btn .icon-ser{
  position: absolute;
  left:12px;
  top:9px;
  width:16px;
  height: 16px;
  background: url(../../assets/search_icon.png) no-repeat;
}
.search-box input[type="text"]{
  width:100%;
  height: 38px;
  border:0 none;
  background: none;
  background: #fff;
  padding:0 10px;
  box-sizing:border-box;
  -moz-box-sizing:border-box; /* Firefox */
  -webkit-box-sizing:border-box; /* Safari */
}
/*去除ie浏览器input中的自带删除图标*/
input::-ms-clear{display:none;}
/**/
.search-results{
  position: absolute;
  left:0;
  top:44px;
  width:100%;
  height:auto;
  background-color: #fff;
  -webkit-border-radius:3px;
  -moz-border-radius:3px;
  border-radius:3px;
  box-shadow: 0 10px 20px 0 rgba(0,0,0,0.10);
  z-index:999;
  overflow: hidden;
}
.search-results > li{
  line-height:40px;
  padding:0 10px;
  font-size:14px;
  color: #808080;
  cursor: pointer;
}
.search-results > li:hover{
  background: #f2f6f9;
  color: #323232;
}
</style>
