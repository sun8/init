 <template>
    <div class="over_box">
        <div class="middle_box">
            <div class="inner_box">
                <p class="qm_title">多节点关联查询</p>
                <p class="qm_state">
                    多节点关联查询产品旨在为客户提供基于股权投资、任职关系与同一电话、同一地址关系系项下，多个企业或自然人间最短关联路径的识别服务。满足快速获取已知多个节点间是否存在关联，以及相关联节点间的关联类型和路径层级的需求
                </p>
                <div class="mt_search">
                    <div class="w_b">
                        <div class="mt_top_search">
                            <input class="mt_input" placeholder="输入公司名称/注册号/统一社会信用代码，可手动添加查询" v-model.trim="company" @keyup="choose_event($event)"  @focus="miss_cover">
                            <div class="mt_sousuo" @click="arrjisuan" :class="{cur : $store.state.queryCur}" v-show="!is_needcheck">查询</div>
                            <div class="mt_sousuo mt_check" @click="multi_check" v-show="is_needcheck">校验 </div>
                        </div>
                        <item-list v-if="$store.state.showlist" @itemZhi="getCompany"></item-list>
                    </div>
                    <div class="mt_center_search" >
                        <a class="mt_download" v-show="$store.state.multi_startShow" @click="download_txt">下载模版</a>
                        <a class="mt_download" v-show="!$store.state.multi_startShow" @click="multi_startShow1($event)">批量添加</a>
                        <div class="mt_right_method">
                            <a class="mt_empty" @click="multi_emptyCheck">清空</a>
                        </div>
                    </div>

                    <div class="mt_allBottom">
                        <!-- 单个添加 -->
                        <div class="mt_bottom_search" v-show="this.$store.state.multi_yesCheck">
                            <ul class="mt_list_add_right">
                                <li v-for="(item,index) in multiList1"> {{item}} <span class="muti_delBtn" @click="removeright(index)"></span></li>
                            </ul>
                            <span class="mt_notcheck" v-show="$store.state.multi_checkShow" @click="check_tab1">未识别</span>
                        </div>
                        <div class="mt_bottom_search"  v-show="$store.state.multi_notCheck">
                            <ul class="mt_list_add_right">
                                <li v-for="(item,index) in multiList2" class="multi_not"> {{item}} <span class="muti_delBtn" @click="removefalse(index)"></span></li>
                            </ul>
                            <span class="mt_notcheck mt_yescheck" v-show="$store.state.multi_checkShow" @click="check_tab2">已识别</span>
                        </div>
                        <!-- 批量添加 -->
                        <div class="mt_btn_cover" v-show="$store.state.multi_coverShow">
                            <div class="mt_btn_bigbox" >
                                <div class="mt_btn_addbox">
                                    <i></i>
                                </div>
                                <span class="mt_btn_text">上传批量文件，格式txt</span>
                            </div>
                            <input type="file" value="upload" v-on:change="upload_file($event)" />
                        </div>
                    </div>
                </div>
                <ul class="setting mt_setting">
                    <li class="cxcj_li">
                        <i class="in_title">查询层级：</i>
                        <span class="radioBtn" :class="{active:cxcj == 1}" @click = "change_radio(1)">
                            <i class="radioStyle"></i>
                            <input type="radio" id="ceng_1" value="1" v-model="cxcj">
                            <label >1</label>
                        </span>
                        <span class="radioBtn" :class="{active:cxcj == 2}" @click = "change_radio(2)">
                            <i class="radioStyle"></i>
                            <input type="radio" id="ceng_2" value="2" v-model="cxcj">
                            <label >2</label>
                        </span>
                        <span class="radioBtn" :class="{active:cxcj == 3}" @click = "change_radio(3)">
                            <i class="radioStyle"></i>
                            <input type="radio" id="ceng_3" value="3" v-model="cxcj">
                            <label >3</label>
                        </span>
                        <span class="radioBtn" :class="{active:cxcj == 4}" @click = "change_radio(4)">
                            <i class="radioStyle"></i>
                            <input type="radio" id="ceng_4" value="4" v-model="cxcj">
                            <label>4</label>
                        </span>
                        <span class="radioBtn" :class="{active:cxcj == 5}" @click = "change_radio(5)">
                            <i class="radioStyle"></i>
                            <input type="radio" id="ceng_5" value="5" v-model="cxcj">
                            <label >5</label>
                        </span>
                    </li>
                    <li>
                        <i class="in_title ceng_title">关系类型：</i>
                        <span class="checkBtn active small" >
                            <i class="checkStyle"></i>
                            <input name="attIds" type="checkbox" value="invest" v-model="attrIds">
                            <label>投资关联</label>
                        </span>
                        <span class="checkBtn active small" >
                            <i class="checkStyle"></i>
                            <input name="attIds" type="checkbox" value="manager" v-model="attrIds">
                            <label>任职关联</label>
                        </span>
                        <span class="checkBtn active" >
                            <i class="checkStyle"></i>
                            <input name="attIds" type="checkbox" value="samedom" v-model="attrIds">
                            <label>办公地址疑似关联</label>
                        </span>
                        <span class="checkBtn active" >
                            <i class="checkStyle"></i>
                            <input name="attIds" type="checkbox" value="sametel" v-model="attrIds">
                            <label>电话疑似关联</label>
                        </span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data : function(){
            return {
                attrIds:["invest","manager","sametel","samedom"],
                company:"",
                isshow:true,
                select_show:false,
                cxcj:"3",
                type:"multi",
                multiList1 : [],
                multiList2 : [],
                isActive:true,
                checkColor:false,
                rightCheck:false,
                not_check:false,
                is_needcheck:false,
                // 控制多次按回车
                is_enter:false
            }
        },
        watch:{
            company(curval){
                var _this = this
                clearTimeout(this.timer);
                this.timer = setTimeout(function(){
                    _this.watch_axios(curval)
                },500)
            },
            multiList1(curval){
                if(curval.length>=2&&this.not_check){
                    this.$store.state.queryCur = true
                }else{
                    this.$store.state.queryCur = false
                }

            }
        },
        mounted(){
            // 搜索框上来必须是不可见
            this.$store.state.showlist=false
            this.$store.state.queryCur = false
            // 多节点刚上来的页面
            this.$store.state.multi_startShow = true
            // 多节点cover的是否显示
            this.$store.state.multi_coverShow =true
            // 开锁
            this.$store.state.multicheck_isclick = false
            // $(".mt_input").focus();

            var _this = this;
            // 复选框
            $(".checkBtn").on('click',function(){
                // console.log($(this).attr('class').indexOf('active')!=-1)
                if($(this).attr('class').indexOf('active')!=-1){
                    $(this).removeClass('active');
                    for(var i = 0 ;i< _this.attrIds.length;i++){
                        if(_this.attrIds[i] == $(this).find('input').val())
                        _this.attrIds.splice(i,1);
                    }
                }else {
                    $(this).addClass('active');
                    _this.attrIds.push($(this).find('input').val())
                }
            })
        },
        methods: {
            watch_axios:function(curval){
                if(curval.length == 0){
                    this.$store.state.item = []
                    this.$store.state.showlist=false
                    return;
                }
                if(curval.length>=2&&this.$store.state.preventMohu){
                    // this.$store.state.showlist=true
                    // 清零
                    this.is_enter = true
                    this.$store.state.mohuIndex = 0;
                    var _this = this ;
                    this.axios.get(_this.api.blurredQuery+encodeURIComponent(curval)).then(res => {
                        _this.$store.state.item = [];
                        _this.$store.state.showlist=false
                        if(res.data.code==200){
                            _this.$store.state.showlist=true
                            for(var i = 0 ; i<res.data.result.length; i++){
                                if(i<6){
                                    // console.log(data.result[i].entName)
                                    _this.$store.state.item.push(res.data.result[i].entName)
                                }

                            }
                        }else if(res.data.code == 404 || res.data.CODE == 404){
                          window.swal({
                            title: "确认",
                            text: "未找到相关企业",
                            type: "info",
                            showCancelButton: false,
                            confirmButtonColor: "#DD6B55",
                            confirmButtonText: "确认",
                            cancelButtonText: "取消",
                            closeOnConfirm: false,
                            closeOnCancel: true
                          });
                        }
                    }).catch(err =>{
                        _this.$store.state.item = []
                        _this.$store.state.showlist=false
                    })
                }else{
                    this.$store.state.showlist=false
                    this.$store.state.item = []
                    this.$store.state.preventMohu = true
                }
            },
            // hide_mohu:function(){
            //     this.$store.state.showlist = false;
            //     this.company="";
            //     $(".mt_input").focus();
            //     console.log(2)
            // },
            check_tab2:function(){
                this.$store.state.multi_notCheck = false;
                this.$store.state.multi_yesCheck = true;
            },
            check_tab1:function(){
                this.$store.state.multi_notCheck = true;
                this.$store.state.multi_yesCheck = false;
            },
            // lose_focus:function(){
            //     this.$store.state.showlist=false
            // },
            miss_cover:function(){
                // 打开校验锁
                this.not_check = true;
                // this.is_needcheck=false;
                this.$store.state.multi_checkShow = false;
                this.$store.state.multi_coverShow = false;
                this.$store.state.multi_startShow = false;
            },
            miss_input:function(){
                this.$store.state.showlist = false;
            },
            choose_event : function(e){
                if(e.keyCode == 13){
                    if(this.$store.state.mohuIndex != 0&&this.is_enter){
                        this.is_enter = false
                        // console.log(this.$store.state.mohuIndex)
                        this.multiList1.push(this.$store.state.item[this.$store.state.mohuIndex-1]) ;
                        this.$store.state.showlist = false;
                        this.$store.state.preventMohu = false;
                        $(".mt_input").focus();
                        this.company="";
                    }
                }else if(e.keyCode == 40){
                    if(this.$store.state.item.length!=0){
                        this.$store.state.mohuIndex++;
                        // 验收
                        if(this.$store.state.mohuIndex>=this.$store.state.item.length){
                            this.$store.state.mohuIndex = 0;
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
                        console.log(this.$store.state.mohuIndex)
                        $("ul.list li").eq(this.$store.state.mohuIndex-1).addClass("cur").siblings().removeClass("cur");
                    }
                }
            },
            // 单选
            change_radio : function(index){
                this.cxcj = index
            },
            getCompany : function(msg){
                // console.log(msg)
                this.multiList1.push(msg);
                this.$store.state.showlist=false;
                this.$store.state.preventMohu=false
                //清空
                this.company = ""
                this.$store.state.mohuIndex = 0;
                $(".mt_input").focus();
            },
            arrjisuan:function(event){
                if(this.multiList1.length<2){
                    window.swal({
                        title: "确认",
                        text: "至少输入两个企业名称",
                        type: "info",
                        showCancelButton: false,
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "确认",
                        cancelButtonText: "取消",
                        closeOnConfirm: false,
                        closeOnCancel: true
                    });
                    return;
                }else{
                    var model=this.cxcj,
                    attrIds=this.attrIds.join(";"),
                    name=this.multiList1.join(";"),
                    type=this.type,
                    host = window.location.host;
                    window.open(window.location.protocol+"//"+host+"/#/entRelation?model="+model+"&attrIds="+attrIds+"&name="+name+"&type="+type)
                }
            },
            removeright:function(index){
                this.multiList1.splice(index,1);
                $(".mt_input").focus();
            },
            removefalse:function(index){
                this.multiList2.splice(index,1);
                $(".mt_input").focus();
            },
            download_txt:function(){
                var token = window.localStorage.getItem('token')
                
                window.location.href=this.api.download_txt+"?xToken="+token;
            },
            upload_file:function(e){
                // console.log(e.target.value)
                var file = e.target.files[0];
                if(file==null||file==undefined||file==""){
                    window.swal({
                        title: "确认",
                        text: "请选择要上传的文件",
                        type: "info",
                        showCancelButton: true,
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "确认",
                        cancelButtonText: "取消",
                        closeOnConfirm: false,
                        closeOnCancel: true
                    });
                    return;
                }
                var reader = new FileReader();
                var _this = this;
                reader.onload = function() {
                    if(file.name.split(".")[1]=="txt"){
                        // console.log(this.result)
                        var fileContArr = this.result.split("\n")
                        for(var i = fileContArr.length ; i >= 0  ; i--){
                            if(fileContArr[i] == "" || typeof(fileContArr[i]) == "undefined"||/^#/g.test(fileContArr[i])){
                                fileContArr.splice(i,1)
                            }
                        }
                        var yuanarr = _this.multiList1
                        _this.multiList1 = yuanarr.concat(fileContArr)
                        // 清空后可以上传同一个文件名的文件
                        e.target.value = '';
                        //cover消失
                        _this.$store.state.multi_coverShow = false;
                        //校验颜色高亮
                        // _this.checkColor = true;
                        _this.is_needcheck = true;
                    }else{
                        window.swal({
                            title: "确认",
                            text: "请选择\'下载模版\'中文件样式进行上传",
                            type: "info",
                            showCancelButton: true,
                            confirmButtonColor: "#DD6B55",
                            confirmButtonText: "确认",
                            cancelButtonText: "取消",
                            closeOnConfirm: false,
                            closeOnCancel: true
                        });
                    }
                }
                reader.readAsText(file);
            },
            multi_check : function(){
                if(this.multiList1 == "") {
                    window.swal({
                        title: "确认",
                        text: "请输入或上传要查询的企业名称",
                        type: "info",
                        showCancelButton: true,
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "确认",
                        cancelButtonText: "取消",
                        closeOnConfirm: false,
                        closeOnCancel: true
                    });
                    return;
                }
                // 验证是否已经点击过节点核验
                if(this.$store.state.multicheck_isclick){
                    window.swal({
                        title: "确认",
                        text: "请勿重复验证,如果输入有误请点击\'清空\'",
                        type: "info",
                        showCancelButton: false ,
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "确认",
                        cancelButtonText: "取消",
                        closeOnConfirm: false,
                        closeOnCancel: true
                    });
                    return
                }
                //*****************去重*************************
                var noRept_multiList1 = [];
                for(var i = 0 ; i < this.multiList1.length ; i++){
                    for(var j = 0 ; j <noRept_multiList1.length ; j++){
                        if(this.multiList1[i] == noRept_multiList1[j]) break;
                    }
                    if(j == noRept_multiList1.length){
                        noRept_multiList1.push(this.multiList1[i])
                    }
                }
                //*****************去重*************************
                var _this = this;
                var multiData = JSON.stringify({"mks" : noRept_multiList1});
                this.axios.post(_this.api.multi_check,multiData).then(res =>{
                    _this.multiList1 = []
                    // 关锁
                    _this.$store.state.multicheck_isclick = true ;
                    for(var i = 0 ; i<res.data.result.length ; i++){
                        if(res.data.result[i].type==0){
                            _this.multiList2.push(res.data.result[i].mks)
                        }else if(res.data.result[i].type==1){
                            _this.multiList1.push(res.data.result[i].mks)
                        }
                    }
                    if(_this.multiList2.length==0){
                        _this.$store.state.multi_checkShow = false
                    }else{
                        _this.$store.state.multi_checkShow = true
                    }
                    _this.not_check = true
                    _this.is_needcheck = false
                }).catch(err => {
                    console.log(err)
                })
            },
            multi_emptyCheck : function(){
                this.multiList1 = [];
                this.multiList2 = [];
                this.company = "";
                this.$store.state.multi_checkShow = false;
                // 开锁（节点校验）
                this.$store.state.multicheck_isclick = false ;
            },
            multi_startShow1 : function(ev){
                // console.log(ev)
                // 阻止事件冒泡
                ev.cancelBubble = true
                this.$store.state.multi_coverShow = true;
                this.$store.state.multi_startShow = true;
            }
        }
    }
</script>


<style lang="scss" scoped type="text/css">
    .over_box{
        position:relative;
        z-index:2;
        width:100%;
        height:100%;
        min-height:740px;
        display:table;
        background-color:#fff;
        font-family: "microsoft YaHei";
        .middle_box{
            display:table-cell;
            text-align:center;
            vertical-align:middle;
            .inner_box{
                width:730px;
                display:inline-block;
                .qm_title{
                    width:730px;
                    padding-bottom: 15px;
                    color:#666;
                    font-size:50px;
                    font-family:"microsoft yahei";
                    font-weight:400;
                    text-align: center;
                }
                .qm_state{
                    width:100%;
                    font-size:15px;
                    line-height:25px;
                    color:#666;
                    text-align: center;
                }
                .mt_search{
                    width:100%;
                    padding:32px 0 0 0;
                    overflow:hidden;
                    .mt_top_search{
                        overflow: hidden;
                        .mt_input{
                            float: left;
                            width: 620px;
                            height:45px;
                            padding-left: 20px;
                            background:rgba(255,255,255,0.2);
                            border:1px solid #5B9BD1;
                            font-size:14px;
                            color:#666;
                        }
                        .mt_sousuo{
                            float: right;
                            width: 100px;
                            height:45px;
                            background-color: #acacac;
                            font-size: 14px;
                            line-height: 45px;
                            text-align: center;
                            color:white;
                            cursor: pointer;
                            &.mt_check{
                                background-color: #5B9BD1;
                                color:#fff;
                            }
                            &.cur{
                                background-color:#5B9BD1;
                                color:#fff;
                            }
                        }

                    }
                    .mt_center_search{
                        height:50px;
                        overflow: hidden;
                        .mt_download{
                            display: block;
                            float: left;
                            padding: 0 1px 0 1px;
                            height: 50px;
                            line-height: 50px;
                            font-size: 14px;
                            color:#4DB3A4;
                            cursor: pointer;
                            &:hover{
                               text-decoration:none; 
                               color:#089983;
                               cursor: pointer; 
                            }
                        }
                        .mt_right_method{
                            float: right;
                            font-size: 14px;
                            line-height: 50px;
                            .mt_empty{
                                display: inline-block;
                                color:#333;
                                cursor:pointer;
                            }
                        }
                    }
                    .mt_allBottom{
                        .mt_bottom_search{
                            width: 100%;
                            height:215px;
                            background: #EFF2F9;
                            margin-bottom:40px;
                            overflow-y: auto;
                            .mt_notcheck{
                                position: absolute;
                                padding: 0 4px 0 5px;
                                height: 30px;
                                background-color: #a7a7a7;
                                bottom:0;
                                right: 0;
                                font-size: 16px;
                                line-height: 30px;
                                text-align: center;
                                color:#666;
                            }
                            .mt_list_add_right{
                                float: left;
                                text-align:left;
                                padding: 13px 0 0 19px;
                                li{
                                    font-size: 14px;
                                    color:#666;
                                    line-height: 30px;
                                    height: 30px;
                                    &.multi_not{
                                        color:#C30;
                                    }
                                    .muti_delBtn{
                                        display: inline-block;
                                        width: 10px;
                                        height:10px;
                                        background: url(/static/images/relations/close.png) no-repeat;
                                        background-size: 10px 10px;
                                        margin-top: 2px;
                                        margin-left: 30px;
                                    }
                                }
                            }
                            .mt_notcheck.mt_yescheck{
                                background-color: #3e51b5;
                            }
                        }
                        .mt_btn_cover{
                            position: absolute;
                            top: 0;
                            left: 0;
                            width: 100%;
                            height: 215px;
                            background-color:#EFF2F9;
                            cursor: pointer;
                            display: inline-block;
                            input{
                                position: absolute;
                                width: 100%;
                                height: 215px;
                                top: 0;
                                left: 0;
                                opacity: 0;
                            }
                            .mt_btn_bigbox{
                                height: 100px;
                                position: absolute;
                                left: 50%;
                                top:50%;
                                margin-top: -50px;
                                margin-left: -73px;
                                .mt_btn_text{
                                    display: inline-block;
                                    font-size: 14px;
                                    color:#666;
                                    margin-top:78px;
                                }
                                .mt_btn_addbox{
                                    width: 60px;
                                    height:60px;
                                    border:1px dashed #666;
                                    position: absolute;
                                    left:50%;
                                    margin-left: -30px;
                                    text-align: center;
                                    
                                    i{
                                        display: inline-block;
                                        width: 18px;
                                        height: 18px;
                                        background: url("/static/images/relations/icon_add.png") no-repeat;
                                        background-size: 18px 18px;
                                        margin-top: 20px;
                                    }
                                }
                            }
                        }
                    }   
                    .w_b .item_list{
                        top:45px;
                        box-shadow: 0 10px 20px 0 rgba(0,0,0,0.10);
                        -moz-box-shadow: 0 10px 20px 0 rgba(0,0,0,0.10);
                        -webkit-box-shadow: 0 10px 20px 0 rgba(0,0,0,0.10);
                    }
                    .mt_allBottom{
                        width: 100%;
                        position: relative;
                    }
                }
                .setting{
                    list-style:none;
                    // padding-left:20px;
                    text-align: left;
                    li{
                        width: 720px;
                        overflow:hidden;
                        font-size:16px;
                        .radioBtn{
                            cursor: pointer;
                            width: 128px;
                        }
                        .in_title{
                            float: left;
                            font-style: normal;
                            color:#666;
                        }
                        .ceng_title{
                            height:120px;
                        }
                        span{
                            float: left;
                            color:#666;
                            width: 190px;
                            height: 60px;
                            font-size:16px;
                            &.checkBtn{
                                cursor: pointer;
                            }
                            &.small{
                                width: 130px;
                            }
                            &.checkBtn1{
                                float: left;
                                padding-left: 60px;
                                color:#666;
                            }
                            &.cBtn{
                                float: left;
                                padding-left: 56px;
                                width: 300px;
                                color:#666;
                            }
                            label{
                                color:#666;
                                cursor: pointer;
                                &.rs{
                                    width: 30px;
                                }
                            }
                            input{
                                display: none;
                            }
                            .radioStyle{
                                margin-right: 2px;
                                display: inline-block;
                                position: relative;
                                top:2px;
                                width: 16px;
                                height: 16px;
                                background: url('/static/images/relations/simple_choose_gray.png') no-repeat center;
                                background-size:cover;
                            }
                            .checkStyle{
                                margin-right: 2px;
                                display: inline-block;
                                width: 16px;
                                height: 16px;
                                position: relative;
                                top:2px;
                                background: url('/static/images/relations/choose_check.png') no-repeat center;
                                background-size:cover;
                            }
                        }
                    }
                    .active>.radioStyle{
                        background: url('/static/images/relations/simple_choosed_gray.png') no-repeat;
                        background-size:cover;
                    }
                    .active>.checkStyle{
                        background: url('/static/images/relations/choosed_checked.png') no-repeat center;
                        background-size:cover;
                    }
                }
            }
        }
    }
    @media screen and (max-width: 1440px){
        .over_box{
            position:relative;
            z-index:2;
            width:100%;
            height:100%;
            display:table;
            font-family: "microsoft YaHei";
            .middle_box{
                display:table-cell;
                text-align:center;
                vertical-align:middle;
                .inner_box{
                    position:relative;
                    top:-24px;
                    width:730px*0.8;
                    display:inline-block;
                    .qm_title{
                        width:730px*0.8;
                        padding-bottom: 18px;
                        color:#666;
                        font-size:38px;
                        font-family:"microsoft yahei";
                        font-weight:400;
                        text-align: center;
                    }
                    .qm_state{
                        width:100%;
                        font-size:14px;
                        line-height:20px;
                        color:#666;
                        text-align: center;
                    }
                    .mt_search{
                        width:100%;
                        padding:20px 0 36px 0;
                        overflow:hidden;
                        .mt_top_search{
                            overflow: hidden;
                            .mt_input{
                                float: left;
                                width: 620px*0.8;
                                height:45px;
                                padding-left: 20px;
                                background:rgba(255,255,255,0.2);
                                border:1px solid #5B9BD1;
                                font-size:14px;
                                color:#666;
                            }
                            .mt_sousuo{
                                float: right;
                                width: 100px*0.8;
                                height:45px;
                                background-color: #acacac;
                                font-size: 14px;
                                line-height: 45px;
                                text-align: center;
                                color:white;
                                cursor: pointer;
                                &.mt_check{
                                    background-color: #5B9BD1;
                                    color:#fff;
                                }
                                &.cur{
                                    background-color:#5B9BD1;
                                    color:#fff;
                                }
                            }

                        }
                        .mt_center_search{
                            height:50px*0.85;
                            overflow: hidden;
                            .mt_download{
                                display: block;
                                float: left;
                                padding: 0 1px 0 1px;
                                height: 50px*0.85;
                                line-height: 50px*0.85;
                                font-size: 14px;
                                color:#4DB3A4;
                                cursor: pointer;
                                &:hover{
                                   text-decoration:none; 
                                   color:#089983;
                                   cursor: pointer; 
                                }
                            }
                            .mt_right_method{
                                float: right;
                                font-size: 14px;
                                line-height: 50px*0.85;
                                .mt_empty{
                                    display: inline-block;
                                    color:#666;
                                    cursor:pointer;
                                }
                            }
                        }
                        .mt_allBottom{
                            .mt_bottom_search{
                                width: 100%;
                                height:215px;
                                background: #EFF2F9;
                                margin-bottom:0px;
                                overflow-y: auto;
                                .mt_notcheck{
                                    position: absolute;
                                    padding: 0 4px 0 5px;
                                    height: 30px*0.8;
                                    background-color: #a7a7a7;
                                    bottom:0;
                                    right: 0;
                                    font-size: 12px;
                                    line-height: 30px*0.85;
                                    text-align: center;
                                    color:#FFF;
                                }
                                .mt_list_add_right{
                                    float: left;
                                    text-align:left;
                                    padding: 13px 0 0 19px;
                                    li{
                                        font-size: 16px;
                                        color:#666;
                                        line-height: 30px;
                                        height: 30px;
                                        &.multi_not{
                                            color:#C30;
                                        }
                                        .muti_delBtn{
                                            display: inline-block;
                                            width: 10px;
                                            height:10px;
                                            background: url(/static/images/relations/close.png) no-repeat;
                                            background-size: 10px 10px;
                                            margin-top: 2px;
                                            margin-left: 30px;
                                        }
                                    }
                                }
                                .mt_notcheck.mt_yescheck{
                                    background-color: #3e51b5;
                                }
                            }
                            .mt_btn_cover{
                                position: absolute;
                                top: 0;
                                left: 0;
                                width: 100%;
                                height: 215px;
                                background-color:#EFF2F9;
                                cursor: pointer;
                                display: inline-block;
                                input{
                                    position: absolute;
                                    width: 100%;
                                    height: 215px;
                                    top: 0;
                                    left: 0;
                                    opacity: 0;
                                }
                                .mt_btn_bigbox{
                                    height: 100px;
                                    position: absolute;
                                    left: 50%;
                                    top:50%;
                                    margin-top: -50px;
                                    margin-left: -73px;
                                    .mt_btn_text{
                                        display: inline-block;
                                        font-size: 16px;
                                        color:#666;
                                        margin-top:78px;
                                    }
                                    .mt_btn_addbox{
                                        width: 60px;
                                        height:60px;
                                        border:1px dashed #666;
                                        position: absolute;
                                        left:50%;
                                        margin-left: -30px;
                                        text-align: center;
                                        
                                        i{
                                            display: inline-block;
                                            width: 18px;
                                            height: 18px;
                                            background: url("/static/images/relations/icon_add.png") no-repeat;
                                            background-size: 18px 18px;
                                            margin-top: 20px;
                                        }
                                    }
                                }
                            }
                        }   
                        .w_b .item_list{
                            top:45px;
                            width: 496px;
                            height: 276px;
                            box-shadow: 0 10px 20px 0 rgba(0,0,0,0.10);
                            -moz-box-shadow: 0 10px 20px 0 rgba(0,0,0,0.10);
                            -webkit-box-shadow: 0 10px 20px 0 rgba(0,0,0,0.10);
                        }
                        .mt_allBottom{
                            width: 100%;
                            position: relative;
                        }
                    }
                    .setting{
                        list-style:none;
                        text-align: left;
                        li{
                            width: 720px*0.85;
                            overflow:hidden;
                            font-size:14px;
                            .radioBtn{
                                cursor: pointer;
                                width: 102px;
                            }
                            .in_title{
                                float: left;
                                font-style: normal;
                                color:#666;
                            }
                            .ceng_title{
                                height:120px*0.85;
                            }
                            span{
                                float: left;
                                color:#666;
                                width: 160.5px;
                                font-size:14px;
                                height: 60px*0.85;
                                &.checkBtn{
                                    cursor: pointer;
                                }
                                &.checkBtn1{
                                    float: left;
                                    padding-left: 60px;
                                    color:#666;
                                }
                                &.small{
                                    width: 130px*0.85;
                                }
                                &.cBtn{
                                    float: left;
                                    padding-left: 56px*0.85;
                                    width: 300px;
                                    color:#666;
                                }
                                label{
                                    color:#666;
                                    cursor: pointer;
                                    &.rs{
                                        width: 30px;
                                    }
                                }
                                input{
                                    display: none;
                                }
                                .radioStyle{
                                    margin-right: 2px;
                                    display: inline-block;
                                    position: relative;
                                    top:2px;
                                    width: 16px*0.85;
                                    height: 16px*0.85;
                                    background: url('/static/images/relations/simple_choose_gray.png') no-repeat ;
                                    background-size:cover;
                                }
                                .checkStyle{
                                    margin-right: 2px;
                                    display: inline-block;
                                    width: 16px*0.85;
                                    height: 16px*0.85;
                                    position: relative;
                                    top:2px;
                                    background: url('/static/images/relations/choose_check.png') no-repeat center;
                                    background-size:cover;
                                }
                            }
                        }
                        .active>.radioStyle{
                            background: url('/static/images/relations/simple_choosed_gray.png') no-repeat;
                            background-size:cover;
                        }
                        .active>.checkStyle{
                            background: url('/static/images/relations/choosed_checked.png') no-repeat center;
                            background-size:cover;
                        }
                    }
                }
            }
        }
    }
</style>